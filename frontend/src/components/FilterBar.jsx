import React from 'react';

const FilterBar = () => {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Filters</span>
            </div>

            <div className="flex flex-wrap gap-4">
                <select className="bg-gray-50 dark:bg-gray-900 border-none text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none dark:text-white">
                    <option>Last 24 Hours</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>YTD</option>
                </select>

                <select className="bg-gray-50 dark:bg-gray-900 border-none text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none dark:text-white">
                    <option>All Regions</option>
                    <option>EU</option>
                    <option>NA</option>
                    <option>AUS</option>
                </select>

                 <select className="bg-gray-50 dark:bg-gray-900 border-none text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none dark:text-white">
                    <option>All Locations</option>
                    <option>Dublin Office</option>
                    <option>Birmingham Office</option>
                </select>
            </div>

            <div className="flex gap-2">
                 <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer">
                    Apply
                 </button>
            </div>
        </div>
    )
}
export default FilterBar;
