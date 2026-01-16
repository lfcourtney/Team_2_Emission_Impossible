import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg shadow-xl">
        <p className="text-gray-300 mb-2">{label}</p>
        <p className="text-green-400 font-bold">
          Actual: {payload[0].value} <span className="text-xs">tCO2e</span>
        </p>
        <p className="text-blue-400 font-bold">
          Predicted: {payload[1].value} <span className="text-xs">tCO2e</span>
        </p>
      </div>
    );
  }
  return null;
};

const EmissionsChart = ({ data }) => { // Removed scenarioImpact prop
  // Data is now pre-calculated in Dashboard.jsx

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
             {/* ... defs and grid ... */}
             <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
            <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />

            {/* Predicted (Blue Dashed) - The Optimized Scenario */}
            <Area
                type="monotone"
                dataKey="predicted"
                stroke="#3B82F6"
                strokeWidth={2}
                strokeDasharray="5 5"
                fillOpacity={1}
                fill="url(#colorPredicted)"
                name="Optimized Scenario"
            />
            {/* Actual (Green Solid) - Real Time */}
            <Area
                type="monotone"
                dataKey="actual"
                stroke="#10B981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorActual)"
                name="Actual Emissions"
            />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmissionsChart;
