import { useState, useEffect } from 'react';
import { Radio, Wifi, Zap, Leaf, AlertTriangle } from 'lucide-react';

export default function LiveTelemetry() {
    const [gridData, setGridData] = useState(null);
    const [events, setEvents] = useState([
        { id: 1, text: "System Online: Connected to National Grid ESO", time: "Just now", type: "success" },
    ]);

    useEffect(() => {
        // 1. Fetch Real UK National Grid Data (Intensity)
        const fetchGridData = async () => {
            try {
                const response = await fetch('https://api.carbonintensity.org.uk/intensity');
                const data = await response.json();
                // API structure: { data: [{ from, to, intensity: { forecast, actual, index } }] }
                if (data && data.data && data.data[0]) {
                    setGridData(data.data[0]);
                }
            } catch (err) {
                console.error("Failed to fetch UK Grid API", err);
            }
        };

        // 2. Fetch Generation Mix (Fuel Sources)
        const fetchGenerationMix = async () => {
             try {
                const response = await fetch('https://api.carbonintensity.org.uk/generation');
                const data = await response.json();
                // API Structure: { data: { generationmix: [ { fuel: 'gas', perc: 40 }, ... ] } }
                
                if (data && data.data && data.data.generationmix) {
                    const mix = data.data.generationmix;
                    // Sort by percentage to show dominant sources
                    const sortedMix = mix.sort((a,b) => b.perc - a.perc);
                    
                    // Create events for the top 3 sources
                    const newEvents = sortedMix.slice(0, 3).map((source, idx) => {
                         let type = 'info';
                         // Green sources
                         if (['wind', 'solar', 'hydro', 'nuclear', 'biomass'].includes(source.fuel)) type = 'success';
                         // Dirty sources
                         if (['coal', 'gas'].includes(source.fuel)) type = 'warning';

                         return {
                             id: Date.now() + idx,
                             text: `Grid Source: ${source.fuel.toUpperCase()} providing ${source.perc}% of national power`,
                             time: "LIVE",
                             type: type
                         };
                    });
                    
                    setEvents(prev => {
                        // Avoid duplicates if data hasn't changed much, but for now just prepend
                        const combine = [...newEvents, ...prev];
                        return combine.slice(0, 10);
                    });
                }
             } catch (err) {
                 console.error("Failed to fetch Generation Mix", err);
             }
        };

        fetchGridData();
        fetchGenerationMix();
        
        const gridInterval = setInterval(fetchGridData, 5 * 60 * 1000); // 5 minutes
        const mixInterval = setInterval(fetchGenerationMix, 30 * 60 * 1000); // 30 minutes (mix changes slowly)

        return () => {
            clearInterval(gridInterval);
            clearInterval(mixInterval);
        };
    }, []);

    // Helper to determine recommendation based on grid intensity
    const getRecommendation = () => {
        if (!gridData) return "Connecting to National Grid ESO...";
        const level = gridData.intensity.index;
        if (level === 'very low' || level === 'low') return "Grid is GREEN. Ideal time to charge fleet or run heavy compute.";
        if (level === 'moderate') return "Grid is moderate. Standard operations advised.";
        return "Grid is DIRTY (High Carbon). Defer non-essential heavy loads if possible.";
    };

    return (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden flex flex-col h-full shadow-lg">
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-2">
                    <div className="relative">
                         <Radio size={16} className="text-secondary" />
                         <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-secondary rounded-full animate-ping"></span>
                    </div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Live Telemetry</h3>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono">
                    <Wifi size={10} />
                    <span>Connected: UK National Grid</span>
                </div>
            </div>
            
            {/* Live Grid Data Widget */}
            <div className="p-4 border-b border-white/5 bg-gradient-to-r from-black/20 to-transparent">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">National Grid Carbon Intensity</span>
                    {gridData && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            gridData.intensity.index === 'low' || gridData.intensity.index === 'very low' ? 'bg-emerald-500/20 text-emerald-400' :
                            gridData.intensity.index === 'moderate' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                        }`}>
                            {gridData.intensity.index}
                        </span>
                    )}
                </div>
                
                <div className="flex items-end gap-2 mb-2">
                    <span className="text-3xl font-heading font-bold text-white">
                        {gridData ? gridData.intensity.actual : '--'} 
                    </span>
                    <span className="text-sm text-gray-400 mb-1">gCO2/kWh</span>
                </div>

                <div className="flex items-start gap-2 bg-white/5 p-2 rounded-lg border border-white/5">
                    {gridData && (['low','very low'].includes(gridData.intensity.index) ? 
                        <Leaf size={14} className="text-emerald-400 mt-0.5 shrink-0" /> : 
                        <AlertTriangle size={14} className="text-amber-400 mt-0.5 shrink-0" />
                    )}
                    <p className="text-xs text-secondary leading-tight">
                        {getRecommendation()}
                    </p>
                </div>
            </div>

            <div className="p-0 flex-1 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-primary/10 to-transparent z-10 pointer-events-none"></div>
                <div className="flex flex-col">
                    {events.map((e, index) => (
                        <div key={e.id} className="group flex items-start gap-3 p-3 border-b border-white/[0.03] hover:bg-white/[0.04] transition-colors animate-in fade-in slide-in-from-top-1 duration-300">
                             <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${
                                 e.type === 'success' ? 'bg-emerald-500' :
                                 e.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                             }`}></div>
                             <div className="flex-1">
                                 <p className="text-xs text-gray-300 font-mono leading-relaxed group-hover:text-white transition-colors">
                                     {e.text}
                                 </p>
                                 <span className="text-[10px] text-gray-600 font-mono block mt-0.5">{e.time}</span>
                             </div>
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-primary/90 to-transparent z-10 pointer-events-none"></div>
            </div>
        </div>
    );
}
