import React from 'react';
import KPICard from '../components/KPICard';
import Card from '../components/Card';
import FilterBar from '../components/FilterBar';
import { kpiData, emissionsBySource, recentActivity } from '../data/mockData';

const Dashboard = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Filter Bar */}
      <FilterBar />

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Emissions Trend" className="lg:col-span-2">
            <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                <span className="text-gray-400">Chart Placeholder (Line Graph)</span>
            </div>
        </Card>

        <Card title="Emissions by Source">
             <div className="space-y-4">
                {emissionsBySource.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{item.source}</span>
                        </div>
                        <span className="text-sm font-semibold dark:text-white">{item.value}</span>
                    </div>
                ))}
                <div className="h-32 mt-4 flex items-center justify-center bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                    <span className="text-gray-400">Pie Chart</span>
                </div>
             </div>
        </Card>
      </div>

       {/* Activity Section */}
       <Card title="Recent Activity">
            <div className="space-y-4">
                {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                        <div className={`w-2 h-2 mt-2 rounded-full ${
                            activity.type === 'success' ? 'bg-green-500' :
                            activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
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
  );
};

export default Dashboard;
