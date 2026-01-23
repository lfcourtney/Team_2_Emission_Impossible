import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import { Thermometer, CloudSun } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#0f172a] border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-md">
                <p className="text-white font-bold mb-2 font-heading">{label}</p>
                {payload.map((entry, index) => {
                    if (entry.name === 'Temperature Range') {
                        return (
                            <div key={index} className="flex items-center gap-2 text-xs mb-1">
                                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                                <span className="text-gray-300">Temp:</span>
                                <span className="text-white font-mono">{entry.value[0]}°C - {entry.value[1]}°C</span>
                            </div>
                        );
                    }
                    return (
                        <div key={index} className="flex items-center gap-2 text-xs mb-1">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                            <span className="text-gray-300">{entry.name}:</span>
                            <span className="text-white font-mono">{entry.value} kgCO2e</span>
                        </div>
                    );
                })}
            </div>
        );
    }
    return null;
};

export default function WeatherCorrelationChart() {
    // Mock Data: Combining Emission Volume with Met Office Historic Temp Data
    const data = [
        { name: 'Jan', scope1: 4200, scope2: 2400, tempRange: [2, 8] },
        { name: 'Feb', scope1: 3800, scope2: 2200, tempRange: [2, 9] },
        { name: 'Mar', scope1: 3000, scope2: 2000, tempRange: [4, 11] },
        { name: 'Apr', scope1: 2000, scope2: 1800, tempRange: [6, 14] },
        { name: 'May', scope1: 1500, scope2: 1500, tempRange: [9, 17] },
        { name: 'Jun', scope1: 1200, scope2: 1400, tempRange: [12, 21] },
        { name: 'Jul', scope1: 1100, scope2: 1600, tempRange: [14, 23] }, // High AC (Scope 2)
        { name: 'Aug', scope1: 1000, scope2: 1550, tempRange: [14, 23] },
        { name: 'Sep', scope1: 1300, scope2: 1450, tempRange: [12, 20] },
        { name: 'Oct', scope1: 2200, scope2: 1600, tempRange: [9, 16] },
        { name: 'Nov', scope1: 3500, scope2: 2100, tempRange: [5, 11] }, // Heating starts (Scope 1 Gas)
        { name: 'Dec', scope1: 4500, scope2: 2500, tempRange: [3, 9] },
    ];

    return (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 p-6 shadow-xl relative overflow-hidden">
             <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                        <CloudSun className="text-amber-400" size={20} />
                        Weather Normalization
                    </h3>
                    <p className="text-xs text-secondary mt-1 max-w-md">
                        Correlating consumption with Met Office temperature data. 
                        Note the correlation between low temps and Scope 1 (Gas Heating) vs high temps and Scope 2 (AC Cooling).
                    </p>
                </div>
                <div className="flex gap-2">
                     <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5">
                        Source: Met Office DataPoint
                     </span>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data}>
                        <defs>
                            <linearGradient id="scope1Gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="scope2Gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis 
                            dataKey="name" 
                            stroke="#9ca3af" 
                            fontSize={12} 
                            tickLine={false}
                            axisLine={false}
                        />
                        {/* Left Axis: Emissions */}
                        <YAxis 
                            yAxisId="left"
                            stroke="#9ca3af" 
                            fontSize={12} 
                            tickLine={false}
                            axisLine={false}
                            label={{ value: 'Emissions (kgCO2e)', angle: -90, position: 'insideLeft', style: { fill: '#6b7280', fontSize: '10px' } }}
                        />
                        
                        {/* Right Axis: Temperature */}
                        <YAxis 
                            yAxisId="right"
                            orientation="right"
                            stroke="#f59e0b" 
                            fontSize={12} 
                            tickLine={false}
                            axisLine={false}
                            unit="°C"
                            domain={[-5, 35]}
                        />
                        
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff05' }} />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}/>

                        {/* Stacked Bars for Emissions */}
                        <Bar yAxisId="left" dataKey="scope1" name="Direct Emissions (Scope 1)" stackId="a" fill="url(#scope1Gradient)" radius={[0, 0, 4, 4]} barSize={20} />
                        <Bar yAxisId="left" dataKey="scope2" name="Indirect Emissions (Scope 2)" stackId="a" fill="url(#scope2Gradient)" radius={[4, 4, 0, 0]} barSize={20} />

                        {/* Floating Bar for Temperature Range (Candlestick style) */}
                        <Bar 
                            yAxisId="right" 
                            dataKey="tempRange" 
                            name="Temperature Range" 
                            fill="#f59e0b" 
                            opacity={0.6}
                            radius={[10, 10, 10, 10]} 
                            barSize={8}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
