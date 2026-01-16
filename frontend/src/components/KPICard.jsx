import React from 'react';

/**
 * Create a KPI trend card
 * @param {String} title - Title for the Card
 * @param {String} value - Value to display
 * @param {String} unit - Unit of the value
 * @param {*} trend - Trend indicator
 * @param {String} status - Status for color coding ('success', 'warning', etc.)
 * @returns Card element
 */
const KPICard = ({ title, value, unit, trend, status }) => {

  // Define conditional colors
  const statusColor =
    status === 'success' ? 'text-green-500' :
      status === 'warning' ? 'text-red-500' : 'text-gray-500';

  const trendBg =
    status === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
      status === 'warning' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-gray-100 dark:bg-gray-800';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${trendBg} ${statusColor}`}>
          {trend}
        </span>
      </div>
      <div className="flex items-baseline">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mr-2">{value}</h2>
        <span className="text-sm text-gray-500">{unit}</span>
      </div>
    </div>
  );
};

export default KPICard;
