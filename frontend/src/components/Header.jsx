import React from 'react';

const Header = ({ title }) => {
    return (
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-8 sticky top-0 z-10">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>

            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white relative">
                    Noti
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Generate Report
                </button>
            </div>
        </header>
    );
};

export default Header;
