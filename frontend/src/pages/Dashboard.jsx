import React, { useState, useEffect, useMemo } from 'react';
import KPICard from '../components/KPICard';
import Card from '../components/Card';
import FilterBar from '../components/FilterBar';
import EmissionsChart from '../components/EmissionsChart';
import SimulationPanel from '../components/SimulationPanel';
import { kpiData as initialKPIs, emissionsBySource, recentActivity, initialChartData } from '../data/mockData';
import { Activity, Sliders, Save } from 'lucide-react';

const Dashboard = () => {
  const [kpiData, setKpiData] = useState(initialKPIs);
  const [chartData, setChartData] = useState(initialChartData);
  const [isSimPanelOpen, setIsSimPanelOpen] = useState(false);

  // GreenOps Calculator State
  const [simParams, setSimParams] = useState({
      rightSizing: 0,     // 0-100% (Impacts Energy Usage)
      timeShifting: false, // Boolean (Impacts Intensity)
      regionShifting: false // Boolean (Impacts Intensity significantly)
  });

  // Calculate the "Projected" line based on simulation params
  // This logic mimics real GreenOps formulas
  const optimizedChartData = useMemo(() => {
      // Factors derived from industry averages
      const rightSizeFactor = (simParams.rightSizing / 100) * 0.40; // Up to 40% reduction from waste
      const timeShiftFactor = simParams.timeShifting ? 0.15 : 0; // ~15% reduction from cleaner grid
      const regionShiftFactor = simParams.regionShifting ? 0.25 : 0; // ~25% reduction from greener regions

      const totalReduction = rightSizeFactor + timeShiftFactor + regionShiftFactor;

      return chartData.map(point => ({
          ...point,
          // "Predicted" becomes the Optimized path
          predicted: Math.round(point.baseline * (1 - totalReduction))
      }));
  }, [chartData, simParams]);

  // Live Data Simulation
  useEffect(() => {
    const interval = setInterval(() => {
        setKpiData(prevData => prevData.map(kpi => {
            const baseVal = parseFloat(kpi.value.replace(/,/g, '').replace('$', ''));
            const change = baseVal * (Math.random() * 0.01 - 0.005);
            let newVal = (baseVal + change).toFixed(kpi.title === 'Energy Usage' ? 1 : 0);

            // Format back
            if (kpi.title === 'Cost Efficiency') newVal = '$' + newVal + 'k';
            else newVal = newVal.toLocaleString();

            return { ...kpi, value: newVal };
        }));

        setChartData(prev => prev.map(point => ({
            ...point,
            actual: point.baseline + (Math.random() * 30 - 15) // Slight deviation from baseline
        })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 space-y-8 relative overflow-x-hidden">

      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <FilterBar />

        <button
            onClick={() => setIsSimPanelOpen(!isSimPanelOpen)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
                isSimPanelOpen
                ? 'bg-green-600 text-white shadow-green-500/30'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50'
            }`}
        >
            <Sliders size={18} />
            {isSimPanelOpen ? 'Hide Simulator' : 'GreenOps Simulator'}
        </button>
      </div>

      <div className="flex gap-6 relative">
          {/* Main Content Area */}
          <div className="flex-1 space-y-8 transition-all duration-300">

            {/* KPI Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map((kpi, index) => (
                <KPICard key={index} {...kpi} />
                ))}
            </div>

            {/* Main Interactive Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card title="Carbon Reduction Projection" className="lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Activity size={16} className="text-green-500 animate-pulse" />
                            <span>Live Emissions vs. Optimized Scenario</span>
                        </div>
                        {(simParams.rightSizing > 0 || simParams.timeShifting || simParams.regionShifting) && (
                            <span className="text-xs font-bold text-blue-500 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full animate-fade-in">
                                Simulator Active
                            </span>
                        )}
                    </div>
                    {/* Pass the computed optimized data to the chart */}
                    <EmissionsChart data={optimizedChartData} />
                </Card>

                <Card title="Emissions by Source">
                    <div className="space-y-6 mt-4">
                        {emissionsBySource.map((item, index) => (
                            <div key={index} className="group cursor-pointer">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors">
                                        {item.source}
                                    </span>
                                    <span className="text-sm font-bold dark:text-white">{item.value}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                                    <div
                                        className="h-2.5 rounded-full transition-all duration-1000 group-hover:scale-x-105 origin-left"
                                        style={{ width: item.value, backgroundColor: item.color }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Activity Section */}
            <Card title="System Activity">
                    <div className="space-y-4">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors cursor-default">
                                <div className={`w-2 h-2 mt-2 rounded-full ${
                                    activity.type === 'success' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' :
                                    activity.type === 'warning' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]' : 'bg-blue-500'
                                }`}></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.message}</p>
                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
            </Card>
          </div>

          {/* Simulator Panel (Slide-over) */}
          <SimulationPanel
            isOpen={isSimPanelOpen}
            togglePanel={() => setIsSimPanelOpen(!isSimPanelOpen)}
            params={simParams}
            setParams={setSimParams}
           />
      </div>
    </div>
  );
};

export default Dashboard;
