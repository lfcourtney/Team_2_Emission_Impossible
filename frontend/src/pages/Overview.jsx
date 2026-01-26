// React imports
import { useState, useEffect, useMemo } from 'react';

// Import the API service to fetch calculated emissions data
import { CalculatedEmissionsService } from '../fakeBackend/services/CalculatedEmissionsService';

// Import our components
import ModernEmissionTrendChart from '../components/ModernEmissionTrendChart';
import WeatherCorrelationChart from '../components/WeatherCorrelationChart';
import SourceBreakdown from '../components/SourceBreakdown';
import StatCard from '../components/StatCard';
import LiveTelemetry from '../components/LiveTelemetry';

// Import our Data context. Contexts provide global state management for our app.
// In this case, we use it to manage selected client/location across multiple pages.
import { useData } from '../contexts/DataContext';

// Import icons from lucide-react
import { Leaf, Activity, TrendingUp, Zap, Droplet, Car, AlertCircle, Settings, Target } from 'lucide-react';

// Main Page Component Export
export default function Overview() {

    // We get the selected client and location from our DataContext. This is changed in the Header component.
    const { selectedClientId, selectedLocationId } = useData();


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Budget / Target States (Used for the YTD Carbon Budget stat card)
    const [annualBudget, setAnnualBudget] = useState(250000); // Default 250t
    const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
    const [reductionTarget, setReductionTarget] = useState(10); // 10% reduction default

    // useEffect is a React hook that runs on component mount, and when any specified dependencies change.
    useEffect(() => {

        // This is where we would call our API to fetch data based on selected client/location.
        // Each time the user changes the client or location from the header, this effect will re-run and fetch new data.
        setLoading(true);
        // For now, we simulate an API call with a timeout.
        setTimeout(() => {
            let result = [];
            if (selectedClientId && selectedLocationId) {
                if (selectedLocationId === 'all') {
                    result = CalculatedEmissionsService.getEmissionsForClient(selectedClientId);
                } else {
                    result = CalculatedEmissionsService.getEmissionsForLocation(Number(selectedLocationId));
                }
            }
            setData(result);
            setLoading(false);
        }, 500);
    }, [selectedClientId, selectedLocationId]); // Re-run when client/location changes

    /* Memoization (useMemo()) allows a function to cache its results based on its inputs.
    If a component calls these functions with the same inputs again, it can return the cached result 
    instead of performing expensive calculations again. It is also easier than iterating through an object.

    If our component widgets re-render (e.g. user switches timeframe), we don't want to recalculate stats unnecessarily!
    */

    // Calculate key statistics from data object returned from API endpoint.
    const stats = useMemo(() => {
        const totalCO2e = data.reduce((acc, curr) => acc + (curr.co2e || 0), 0);
        
        // Mock calculations for trends
        const lastMonth = totalCO2e * 0.92; 
        const difference = totalCO2e - lastMonth;
        const percentChange = lastMonth > 0 ? ((difference / lastMonth) * 100).toFixed(1) : 0;

        // Group by type for breakdown
        // We first call the reduce() function with an accumulator object 'acc' and the current data point 'curr'.
        const byType = data.reduce((acc, curr) => {

            // We define type using the emissionTypeName property from curr (Current data point).
            const type = curr.emissionTypeName || 'Other';

            // If the type does not exist in the accumulator, we initialize it to 0.
            if (!acc[type]) acc[type] = 0;
            // We then add the co2e value of the current data point to the corresponding type in the accumulator.
            acc[type] += (curr.co2e || 0);

            // We then return the accumulator for the next iteration.
            return acc;
        }, {});


        // Identify largest contributor
        const sortedTypes = Object.entries(byType).sort(([, a], [, b]) => b - a);
        const topContributor = sortedTypes.length > 0 ? sortedTypes[0][0] : 'None';

        return { totalCO2e, totalCount: data.length, percentChange, topContributor, byType };
    }, [data]); // If the data object changes, THEN recalculate stats.

    // Use state-based budget
    const budgetUsed = ((stats.totalCO2e / annualBudget) * 100).toFixed(1);

    // If our page is loading data, show a loading spinner.
    if(loading) {
        return (
            <div className="h-96 flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-white/10 border-t-secondary rounded-full animate-spin mb-6"></div>
                <div className="text-gray-400 font-medium">Synchronizing environmental data...</div>
            </div>
        );
    }
    // The return statement contains the JSX that defines the structure of the Overview page. (HTML-like syntax)
    return (
        <div className="space-y-6">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Emissions" 
                    value={stats.totalCO2e.toLocaleString(undefined, { maximumFractionDigits: 0 })} 
                    unit="kg CO2e"
                    trend={`${stats.percentChange > 0 ? '+' : ''}${stats.percentChange}%`}
                    trendUp={stats.percentChange < 0} // Good if went down
                    icon={Leaf} 
                    subtext="vs. previous period"
                />
                <StatCard 
                    title="Data Points" 
                    value={stats.totalCount}
                    unit="verified"
                    trend="+12"
                    trendUp={true} 
                    icon={Activity} 
                    subtext="Last updated 2 mins ago"
                />
                 <StatCard 
                    title="Top Contributor" 
                    value={stats.topContributor}
                    unit=""
                    trend="Needs Action"
                    trendUp={false}
                    icon={AlertCircle} 
                    subtext="Highest emission source"
                />
                <div onClick={() => setIsBudgetModalOpen(true)} className="cursor-pointer group relative">
                    <div className="absolute top-2 right-2 p-2 text-gray-500 opacity-0 group-hover:opacity-100 bg-white/10 rounded-full transition-all z-20">
                        <Settings size={14} />
                    </div>
                    <StatCard 
                        title="YTD Carbon Budget" 
                        value={budgetUsed}
                        unit="%"
                        trend={Number(budgetUsed) < 100 ? "On Track" : "Over Budget"}
                        trendUp={Number(budgetUsed) < 100} 
                        icon={Target} 
                        subtext={`${(annualBudget - stats.totalCO2e).toLocaleString()} kg remaining`}
                    />
                </div>
            </div>

            {/* Main Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <ModernEmissionTrendChart data={data} />
                    
                    <WeatherCorrelationChart />

                    {/* Additional Wide Widget Area - e.g. Goals or Alerts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-2xl p-6 border border-secondary/20 relative overflow-hidden group hover:border-secondary/40 transition-colors cursor-pointer">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-secondary/20 rounded-lg text-secondary"><Zap size={18} /></div>
                                    <h4 className="font-bold text-white">Efficiency Opportunity</h4>
                                </div>
                                <p className="text-sm text-gray-300 mb-4">Dublin office usage is 12% higher than average during off-hours.</p>
                                <div className="text-xs font-bold text-secondary uppercase tracking-wider flex items-center gap-1">
                                    View Suggestion <i className="ml-1 w-1 h-1 bg-secondary rounded-full group-hover:w-4 transition-all duration-300"></i>
                                </div>
                            </div>
                         </div>
                         <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl p-6 border border-blue-500/20 relative overflow-hidden group hover:border-blue-500/40 transition-colors cursor-pointer">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-2">
                                      <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Droplet size={18} /></div>
                                    <h4 className="font-bold text-white">Water Usage Normal</h4>
                                </div>
                                <p className="text-sm text-gray-300 mb-4">All sensors reporting within expected ranges for this season.</p>
                                <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                                    System Healthy
                                </div>
                            </div>
                         </div>
                    </div>
                </div>

                {/* Right Column: Telemetry & Breakdown */}
                <div className="flex flex-col gap-6">
                    {/* Live Telemetry Widget */}
                    <div className="h-[300px]">
                        <LiveTelemetry />
                    </div>

                <SourceBreakdown stats={stats} />
                    
                </div>
            </div>

             {/* Budget Calculator Modal */}
             {isBudgetModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-[#052831] w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-blue-500"></div>
                        <div className="p-8">
                             <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-heading font-bold text-white flex items-center gap-2">
                                        <Target className="text-secondary" /> 
                                        Set Carbon Budget
                                    </h3>
                                    <p className="text-gray-400 text-sm mt-1">Adjust your reduction ambition to calculate your annual allowance.</p>
                                </div>
                                <button onClick={() => setIsBudgetModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">Close</button>
                             </div>

                             <div className="space-y-8">
                                 {/* Interactive Calculator */}
                                 <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                                     <div className="flex justify-between items-center mb-2">
                                         <label className="text-sm font-bold text-white uppercase tracking-wider">Reduction Target</label>
                                         <span className="text-2xl font-bold text-secondary">{reductionTarget}%</span>
                                     </div>
                                     <input 
                                        type="range" 
                                        min="0" 
                                        max="50" 
                                        step="1"
                                        value={reductionTarget} 
                                        onChange={(e) => setReductionTarget(Number(e.target.value))}
                                        className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-secondary"
                                     />
                                     <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
                                         <span>Business As Usual</span>
                                         <span>Net Zero Trajectory</span>
                                     </div>
                                 </div>

                                 {/* Results Visualization */}
                                 <div className="grid grid-cols-2 gap-4">
                                     <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                         <span className="text-xs text-gray-400 block mb-1">Baseline (Last Year)</span>
                                         <span className="text-xl font-bold text-white">277,800 <span className="text-sm font-normal text-gray-500">kg</span></span>
                                     </div>
                                     <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20">
                                         <span className="text-xs text-secondary block mb-1">New Annual Budget</span>
                                         <span className="text-xl font-bold text-white">
                                            {(277800 * (1 - reductionTarget / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })} 
                                            <span className="text-sm font-normal text-gray-500"> kg</span>
                                         </span>
                                     </div>
                                 </div>

                                 <button 
                                    onClick={() => {
                                        const newBudget = 277800 * (1 - reductionTarget / 100);
                                        setAnnualBudget(newBudget);
                                        setIsBudgetModalOpen(false);
                                    }}
                                    className="w-full py-4 bg-secondary text-primary font-bold text-lg rounded-xl hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,198,194,0.3)]"
                                 >
                                     Apply New Budget
                                 </button>
                             </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
