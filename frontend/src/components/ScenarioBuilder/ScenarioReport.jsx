import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

export default function ScenarioReport({ formData, liveImpact, handleBack }) {
    return (
        <div className="space-y-8 p-10 animate-in zoom-in-95 duration-500">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">Scenario Analysis: {formData.projectName}</h1>
                    <p className="text-gray-400">Proforma Estimate vs Industry Baseline</p>
                </div>
                <button onClick={handleBack} className="px-4 py-2 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/5">Edit Scenario</button>
            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/20 p-6 rounded-2xl">
                    <div className="text-secondary uppercase text-xs font-bold tracking-wider mb-2">Total Estimated Footprint</div>
                    <div className="text-4xl font-bold text-white mb-1">{liveImpact.total.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-lg text-secondary/70">kg CO2e</span></div>
                    <div className="text-xs text-secondary/60">Over {formData.durationMonths} months</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <div className="text-gray-400 uppercase text-xs font-bold tracking-wider mb-2">Project Intensity</div>
                    <div className="text-4xl font-bold text-white mb-1">{(liveImpact.monthly / formData.teamSize).toFixed(1)} <span className="text-lg text-gray-500">kg/person/mo</span></div>
                    <div className="text-xs text-gray-500">Industry avg: ~250kg</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <div className="text-gray-400 uppercase text-xs font-bold tracking-wider mb-2">Equivalent To</div>
                    <div className="text-4xl font-bold text-white mb-1">{Math.floor(liveImpact.total / 120)} <span className="text-lg text-gray-500">Flights</span></div>
                    <div className="text-xs text-gray-500">LHR to NYC (Economy)</div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl min-h-[400px]">
                    <h3 className="font-bold text-white mb-6">Emission Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={liveImpact.breakdown}
                                cx="50%" cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {liveImpact.breakdown.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.5)" />
                                ))}
                            </Pie>
                            <RechartsTooltip contentStyle={{ backgroundColor: '#052831', borderColor: '#333', color: '#fff' }} />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl min-h-[400px]">
                    <h3 className="font-bold text-white mb-6">Optimization Potential</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                            <h4 className="text-emerald-400 font-bold mb-1">Switch to Green Region</h4>
                            <p className="text-sm text-gray-400 mb-2">Moving workloads to Sweden or Canada could reduce server emissions by 80%.</p>
                            <div className="h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[80%]"></div>
                            </div>
                        </div>
                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                            <h4 className="text-blue-400 font-bold mb-1">Increase Remote Work</h4>
                            <p className="text-sm text-gray-400 mb-2">Increasing remote work to 50% reduces office energy overhead.</p>
                            <div className="h-2 bg-blue-500/20 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[30%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}