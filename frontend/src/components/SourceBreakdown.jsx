import { useRibbon } from '../contexts/RibbonContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

/**
 * This component displays a breakdown of emissions by source type.
 * @param {*} stats - Takes in the memoized stats object from Overview page.
 * @return A JSX component representing the Source Breakdown section.
 */
export default function SourceBreakdown({ stats }) {
    const { openRibbon } = useRibbon();

    const openDetailedReport = () => {
        const data = Object.entries(stats.byType).map(([name, value]) => ({ name, value }));
        const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6']; // Matching Tailwind colors

        // Mock industry data for comparison
        const industryComparisonData = data.map(item => ({
            name: item.name,
            MyEmissions: item.value,
            IndustryAvg: item.value * (0.8 + Math.random() * 0.4) // Random variation around +/- 20%
        }));

        // Initialize the ribbon with detailed report content
        openRibbon(
            <div className="space-y-8 p-1">
                <h3 className="text-2xl font-heading font-bold text-white mb-6">Detailed Source Analysis</h3>
                
                <div className="h-72 w-full bg-white/5 rounded-2xl p-4 border border-white/10">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="45%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6', borderRadius: '0.5rem' }}
                                itemStyle={{ color: '#f3f4f6' }}
                                formatter={(value) => `${value.toFixed(2)} kg CO2e`}
                            />
                            <Legend verticalAlign="bottom" height="auto" iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="w-1 h-6 bg-secondary rounded-full"></span>
                        Breakdown Statistics
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                        {data.map((item, index) => (
                            <div key={item.name} className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                    <span className="text-gray-200 font-medium">{item.name}</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-white font-bold">{item.value.toFixed(1)} <span className="text-xs text-gray-400 font-normal">kg</span></div>
                                    <div className="text-xs text-gray-500">
                                        {stats.totalCO2e > 0 ? ((item.value / stats.totalCO2e) * 100).toFixed(1) : 0}% contribution
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Industry Comparison Section */}
                <div className="space-y-4 mt-8 pt-6 border-t border-white/10">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                        Industry Benchmarking
                    </h4>
                    <p className="text-sm text-gray-400 mb-4">
                        Comparison against average emissions for similar sized organizations in your sector.
                    </p>
                    
                    <div className="h-64 w-full bg-white/5 rounded-2xl p-4 border border-white/10">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={industryComparisonData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                <XAxis dataKey="name" stroke="#9ca3af" tick={{fill: '#9ca3af'}} />
                                <YAxis stroke="#9ca3af" tick={{fill: '#9ca3af'}} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                                />
                                <Legend />
                                <Bar dataKey="MyEmissions" name="My Emissions" fill="#10b981" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="IndustryAvg" name="Industry Average" fill="#6b7280" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-sm text-amber-200 mt-4">
                        <p className="flex gap-2">
                             <span className="font-bold">Recommendation:</span>
                             Your {industryComparisonData.find(d => d.MyEmissions > d.IndustryAvg)?.name || 'overall'} emissions are higher than the industry average. Consider upgrading to more efficient alternatives or reviewing usage policies.
                        </p>
                    </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-sm text-blue-200 mt-6">
                    <p className="flex gap-2">
                        <span className="font-bold">Insight:</span>
                        The largest contributor to your emissions is {data.sort((a,b) => b.value - a.value)[0]?.name || 'N/A'}. 
                        Focusing reduction efforts here will yield the highest impact.
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col flex-1">
            <h3 className="text-lg font-heading font-bold text-white mb-6">Source Breakdown</h3>

            {/* We use the map() function to iterate over each Emission Type in the stats.byType object */}
            <div className="flex-1 space-y-6">
                {Object.entries(stats.byType).map(([type, value], index) => {
                    const percent = stats.totalCO2e > 0 ? (value / stats.totalCO2e) * 100 : 0;
                    const colors = ['bg-secondary', 'bg-blue-500', 'bg-amber-500', 'bg-purple-500'];
                    const color = colors[index % colors.length];

                    return (
                        <div key={type} className="group cursor-pointer">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{type}</span>
                                <div className="text-right">
                                    <span className="text-white font-bold">{value.toFixed(0)}</span>
                                    <span className="text-xs text-gray-500 ml-1">kg</span>
                                </div>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
                                    style={{ width: `${percent}%` }}
                                ></div>
                            </div>
                            <div className="mt-1 text-xs text-gray-500 text-right">{percent.toFixed(1)}%</div>
                        </div>
                    );
                })}

                {Object.keys(stats.byType).length === 0 && (
                    <div className="text-gray-500 text-center py-10">No breakdown available</div>
                )}
            </div>

            <button 
                onClick={openDetailedReport}
                className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 text-secondary text-sm font-bold rounded-xl border border-white/5 transition-all"
            >
                View Detailed Report
            </button>
        </div>
    );
}
