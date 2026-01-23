/**
 * This component displays a breakdown of emissions by source type.
 * @param {*} stats - Takes in the memoized stats object from Overview page.
 */
export default function SourceBreakdown({ stats }) {
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

            <button className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 text-secondary text-sm font-bold rounded-xl border border-white/5 transition-all">
                View Detailed Report
            </button>
        </div>
    );
}