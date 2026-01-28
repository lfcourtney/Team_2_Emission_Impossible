import { useState, useMemo, useEffect } from 'react';
import { useData } from '../contexts/DataContext';
import { CalculatedEmissionsService } from '../fakeBackend/services/CalculatedEmissionsService';
import { Sliders, CheckCircle2, Cloud, ArrowRight, Zap, Car, Building, Database, Server, Code, Users } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

export default function Calculator() {
    const { selectedClientId, selectedLocationId } = useData();
    const [mode, setMode] = useState('project'); // 'existing' or 'project'
    
    // --- Mode: Existing Data ---
    const [baselineData, setBaselineData] = useState([]);
    const [renewableEnergy, setRenewableEnergy] = useState(0); 
    const [evConversion, setEvConversion] = useState(0); 
    const [efficiency, setEfficiency] = useState(0); 

    // --- Mode: Project Modeler ---
    const [staffCount, setStaffCount] = useState(50);
    const [serverCount, setServerCount] = useState(20);
    const [storageTB, setStorageTB] = useState(5);
    const [duration, setDuration] = useState(12);

    // Consultant Levers
    const [greenRegion, setGreenRegion] = useState(false);
    const [armChinps, setArmChips] = useState(false); // Graviton/Cobalt
    const [serverless, setServerless] = useState(10); // % adoption
    const [remoteWork, setRemoteWork] = useState(0); // %

    useEffect(() => {
        // Fetch baseline data for 'existing' mode
        let result = [];
        if (selectedClientId && selectedLocationId) {
            if (selectedLocationId === 'all') {
                result = CalculatedEmissionsService.getEmissionsForClient(selectedClientId);
            } else {
                result = CalculatedEmissionsService.getEmissionsForLocation(Number(selectedLocationId));
            }
        }
        setBaselineData(result);
    }, [selectedClientId, selectedLocationId]);

    // Calculation: Existing Data
    const projectionExisting = useMemo(() => {
        const totalBaseline = baselineData.reduce((acc, curr) => acc + (curr.co2e || 0), 0);
        const electricityShare = totalBaseline * 0.4;
        const fuelShare = totalBaseline * 0.3;
        const gasShare = totalBaseline * 0.3;

        const electricityReduction = electricityShare * (renewableEnergy / 100);
        const fuelReduction = fuelShare * (evConversion / 100) * 0.8; 
        const gasReduction = gasShare * (efficiency / 100);

        const totalReduction = electricityReduction + fuelReduction + gasReduction;
        
        return {
            original: totalBaseline,
            projected: totalBaseline - totalReduction,
            reduction: totalReduction,
            percentReduced: totalBaseline > 0 ? (totalReduction / totalBaseline) * 100 : 0
        };
    }, [baselineData, renewableEnergy, evConversion, efficiency]);

    // Calculation: Project Modeler
    const projectionProject = useMemo(() => {
        // --- BASELINE (Industry Standard) ---
        // Assumptions (Annualized kg CO2e):
        // Employee: 2000kg (Office energy + Commute)
        // x86 Server: 1500kg (Manufacturing + High Energy Grid + Cooling)
        // Storage: 50kg per TB
        const baseEmployee = staffCount * 2000; 
        const baseServer = serverCount * 1500;
        const baseStorage = storageTB * 50;
        const monthlyBase = (baseEmployee + baseServer + baseStorage) / 12;
        const totalBase = monthlyBase * duration;

        // --- OPTIMIZED (Emission Impossible) ---
        // 1. Remote Work: Reduces Employee footprint by ~40% (No commute, less office HVAC)
        const employeeOptimized = baseEmployee * (1 - (remoteWork / 100) * 0.4);

        // 2. Cloud Efficiency:
        // Green Region: -50% intensity
        // ARM Chips: -40% energy
        // Serverless: -80% idle waste for the portion adopted
        let serverOptimized = baseServer;
        
        // Region Factor
        if (greenRegion) serverOptimized *= 0.5;
        
        // Chip Factor
        if (armChinps) serverOptimized *= 0.6; // 40% reduction

        // Serverless Factor
        // For the % that is serverless, we assume 80% efficiency gain
        const traditionalPortion = serverOptimized * (1 - (serverless / 100));
        const serverlessPortion = serverOptimized * (serverless / 100) * 0.2; // 80% reduction
        serverOptimized = traditionalPortion + serverlessPortion;

        const monthlyOptimized = (employeeOptimized + serverOptimized + baseStorage) / 12;
        const totalOptimized = monthlyOptimized * duration;

        // Cost Savings (Proxy: Energy reduction often correlates 1:1 with compute costs + office overhead)
        // Assume industry avg cost per kg CO2e (inefficiency cost): $2.50 (made up proxy for energy bill)
        const costSavings = (totalBase - totalOptimized) * 1.8; 

        return {
            original: totalBase,
            projected: totalOptimized,
            reduction: totalBase - totalOptimized,
            percentReduced: totalBase > 0 ? ((totalBase - totalOptimized) / totalBase) * 100 : 0,
            costSavings
        };
    }, [staffCount, serverCount, storageTB, duration, greenRegion, armChinps, serverless, remoteWork]);

    const activeProjection = mode === 'existing' ? projectionExisting : projectionProject;

    return (
        <div className="p-6 lg:p-8 space-y-6">
            
            {/* Mode Switcher */}
            <div className="flex justify-center mb-4">
                <div className="bg-white/5 p-1 rounded-full border border-white/10 flex">
                    <button 
                        onClick={() => setMode('existing')}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${mode === 'existing' ? 'bg-secondary text-primary shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Analyze Data
                    </button>
                    <button 
                         onClick={() => setMode('project')}
                         className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${mode === 'project' ? 'bg-secondary text-primary shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        New Project Modeler
                    </button>
                </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-8 shadow-xl">
                <div className="flex flex-col xl:flex-row gap-8 items-start">
                    
                    {/* Controls Column */}
                    <div className="w-full xl:w-1/3 space-y-8 h-full">
                        <div>
                            <h2 className="text-2xl font-heading font-bold text-white mb-2">
                                {mode === 'existing' ? 'Reduction Levers' : 'Project Parameters'}
                            </h2>
                            <p className="text-gray-400 text-sm">
                                {mode === 'existing' 
                                    ? 'Adjust sliders to see potential savings on current data.' 
                                    : 'Define infrastructure scope to estimate green cloud impact.'}
                            </p>
                        </div>

                        {mode === 'existing' ? (
                            // --- EXISTING CONTROLS ---
                            <div className="space-y-6">
                                <LeverCard icon={Zap} title="Renewable Energy" value={renewableEnergy} setValue={setRenewableEnergy} color="text-yellow-400" bg="bg-yellow-500/20" desc="Switch to wind/solar sources." />
                                <LeverCard icon={Car} title="EV Conversion" value={evConversion} setValue={setEvConversion} color="text-blue-400" bg="bg-blue-500/20" desc="Replace ICE fleet with EVs." />
                                <LeverCard icon={Building} title="Efficiency" value={efficiency} setValue={setEfficiency} color="text-emerald-400" bg="bg-emerald-500/20" desc="HVAC & insulation upgrades." />
                            </div>
                        ) : (
                            // --- PROJECT MODELER CONTROLS ---
                            <div className="space-y-8 animate-in fade-in duration-500">
                                {/* Inputs */}
                                <div className="space-y-4 pt-2">
                                    <div className="flex justify-between text-sm text-gray-400 font-bold uppercase tracking-wider">
                                        <span>Scale Inputs</span>
                                        <span>Est.</span>
                                    </div>
                                    <LeverInput label="Team Size" value={staffCount} setValue={setStaffCount} min={1} max={500} unit="Staff" icon={Users} />
                                    <LeverInput label="Compute Instances" value={serverCount} setValue={setServerCount} min={1} max={500} unit="VMs" icon={Server} />
                                    <LeverInput label="S3/Blob Storage" value={storageTB} setValue={setStorageTB} min={0} max={100} unit="TB" icon={Database} />
                                    <LeverInput label="Duration" value={duration} setValue={setDuration} min={3} max={60} unit="Months" icon={CheckCircle2} />
                                </div>

                                {/* Strategy Toggles */}
                                <div className="bg-primary/40 rounded-xl p-5 border border-white/10 space-y-4">
                                    <h4 className="text-secondary font-bold text-sm uppercase tracking-wide mb-2">Optimization Strategy</h4>
                                    
                                    <Toggle label="Green Region Shifting" active={greenRegion} toggle={() => setGreenRegion(!greenRegion)} desc="Prioritize EU-North-1 / Hydro-powered zones." />
                                    <Toggle label="ARM/Graviton Processors" active={armChinps} toggle={() => setArmChips(!armChinps)} desc="Use AWS Graviton / Azure Cobalt (60% efficient)." />
                                    
                                    <div className="pt-2">
                                         <div className="flex justify-between items-center mb-2">
                                            <span className="text-white text-sm font-medium">Serverless Adoption</span>
                                            <span className="text-secondary font-bold text-xs">{serverless}%</span>
                                         </div>
                                         <input type="range" min="0" max="100" value={serverless} onChange={(e) => setServerless(Number(e.target.value))} className="w-full h-1.5 bg-black/50 rounded-lg appearance-none cursor-pointer accent-secondary" />
                                    </div>

                                    <div className="pt-2">
                                         <div className="flex justify-between items-center mb-2">
                                            <span className="text-white text-sm font-medium">Remote-First Culture</span>
                                            <span className="text-secondary font-bold text-xs">{remoteWork}%</span>
                                         </div>
                                         <input type="range" min="0" max="100" value={remoteWork} onChange={(e) => setRemoteWork(Number(e.target.value))} className="w-full h-1.5 bg-black/50 rounded-lg appearance-none cursor-pointer accent-secondary" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Results Column */}
                    <div className="w-full xl:w-2/3 flex flex-col gap-6">
                        
                        {/* Big Impact Number */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-2xl p-6 border border-secondary/20 flex flex-col justify-center relative overflow-hidden h-40">
                                <div className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-10 text-secondary"><Cloud size={140} /></div>
                                <div className="relative z-10">
                                    <div className="text-secondary font-bold text-sm uppercase tracking-wider mb-1">Projected Carbon Avoided</div>
                                    <div className="text-4xl font-heading font-bold text-white mb-2">{activeProjection.reduction.toLocaleString(undefined, {maximumFractionDigits:0})} <span className="text-lg text-gray-400">kg CO2e</span></div>
                                    <div className="flex items-center gap-2 text-white/60 text-xs">
                                        <LeafyIcon size={14} className="text-green-400" />
                                        Equivalent to planting {Math.floor(activeProjection.reduction / 21)} trees
                                    </div>
                                </div>
                             </div>

                             {mode === 'project' && (
                                 <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-2xl p-6 border border-emerald-500/20 flex flex-col justify-center relative overflow-hidden h-40">
                                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-10 text-emerald-500"><Zap size={140} /></div>
                                    <div className="relative z-10">
                                        <div className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-1">Est. Cloud Cost Savings</div>
                                        <div className="text-4xl font-heading font-bold text-white mb-2">${activeProjection.costSavings.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
                                        <div className="text-white/60 text-xs">
                                            Based on energy-efficiency correlation
                                        </div>
                                    </div>
                                 </div>
                             )}
                             
                             {mode === 'existing' && (
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex flex-col justify-center h-40">
                                    <div className="text-gray-400 font-bold text-sm uppercase tracking-wider mb-1">Current Target</div>
                                    <div className="text-4xl font-heading font-bold text-white mb-2">{activeProjection.percentReduced.toFixed(1)}%</div>
                                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                        <div className="bg-secondary h-full transition-all duration-700" style={{ width: `${activeProjection.percentReduced}%` }}></div>
                                    </div>
                                </div>
                             )}
                        </div>

                        {/* Chart comparing Baseline vs Projected */}
                         <div className="bg-primary/50 rounded-2xl p-6 border border-white/5 flex-1 min-h-[350px]">
                            <h3 className="text-sm font-bold text-gray-400 mb-4 flex justify-between">
                                <span>Impact Visualization</span>
                                {mode === 'project' && <span className="text-xs font-normal text-white/40">Includes Project Lifecycle</span>}
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={[
                                    { name: 'Standard Industry Approach', value: activeProjection.original, color: '#ef4444' }, // red-500
                                    { name: 'With Emission Impossible', value: activeProjection.projected, color: '#00c6c2' } // secondary
                                ]} layout="vertical" barSize={40} margin={{ left: 20 }}>
                                    <CartesianGrid horizontal={true} vertical={false} stroke="#ffffff10" />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" width={180} tick={{fill: 'white', fontSize: 12}} axisLine={false} tickLine={false} />
                                    <Tooltip 
                                        cursor={{fill: 'transparent'}}
                                        contentStyle={{ backgroundColor: '#052831', borderColor: '#333' }} 
                                        itemStyle={{ color: '#fff' }}
                                        formatter={(val) => [`${val.toLocaleString()} kg`, 'CO2e']}
                                    />
                                    <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                                        {
                                          [{ color: '#ef4444' }, { color: '#00c6c2' }].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                          ))
                                        }
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                         </div>

                        {/* Recommendations */}
                        {mode === 'project' && (
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-4 zoom-in-95 duration-700" style={{animationFillMode: 'both'}}>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-start gap-4 hover:border-secondary/50 transition-colors cursor-pointer group">
                                    <div className="mt-1 p-2 bg-secondary/10 rounded-lg text-secondary group-hover:scale-110 transition-transform"><CheckCircle2 size={20} /></div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm">AWS Carbon Footprint Tool</h4>
                                        <p className="text-xs text-gray-400 mt-1">We configure this pre-deployment to track actuals against our model.</p>
                                    </div>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-start gap-4 hover:border-secondary/50 transition-colors cursor-pointer group">
                                    <div className="mt-1 p-2 bg-secondary/10 rounded-lg text-secondary group-hover:scale-110 transition-transform"><Code size={20} /></div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm">Code Efficiency Audit</h4>
                                        <p className="text-xs text-gray-400 mt-1">Our team optimizes algorithms to reduce compute cycles by up to 30%.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sub-components for cleaner code
function LeverCard({ icon: Icon, title, value, setValue, color, bg, desc }) {
    return (
        <div className="bg-white/5 p-5 rounded-xl border border-white/5">
            <div className="flex justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2 ${bg} ${color} rounded-lg`}><Icon size={18} /></div>
                    <span className="font-medium text-white">{title}</span>
                </div>
                <span className="font-bold text-secondary">{value}%</span>
            </div>
            <input 
                type="range" min="0" max="100" value={value} 
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full h-2 bg-primary rounded-lg appearance-none cursor-pointer accent-secondary"
            />
            <p className="mt-3 text-xs text-gray-500 leading-relaxed">{desc}</p>
        </div>
    );
}

function LeverInput({ label, value, setValue, min, max, unit, icon: Icon }) {
    return (
        <div className="flex items-center justify-between bg-white/[0.03] p-3 rounded-xl border border-white/5">
            <div className="flex items-center gap-3 text-white">
                <Icon size={16} className="text-gray-500" />
                <span className="text-sm font-medium">{label}</span>
            </div>
            <div className="flex items-center gap-2">
                <input 
                    type="number" min={min} max={max} value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="w-16 bg-black/20 text-right text-white text-sm font-bold p-1 rounded border border-white/10 outline-none focus:border-secondary"
                />
                <span className="text-xs text-gray-500 w-8">{unit}</span>
            </div>
        </div>
    );
}

function Toggle({ label, active, toggle, desc }) {
    return (
        <div 
            onClick={toggle}
            className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 ${active ? 'bg-secondary/10 border-secondary' : 'bg-transparent border-white/10 hover:bg-white/5'}`}
        >
            <div className="flex items-center justify-between mb-1">
                <span className={`text-sm font-bold ${active ? 'text-white' : 'text-gray-400'}`}>{label}</span>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${active ? 'bg-secondary' : 'bg-gray-700'}`}>
                    <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${active ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
            </div>
            <p className="text-xs text-gray-500">{desc}</p>
        </div>
    );
}

function LeafyIcon(props) {
    return (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
    )
}
