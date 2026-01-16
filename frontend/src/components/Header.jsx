import React from 'react';
import { Bell } from 'lucide-react';

const Header = ({ title }) => {
    return (
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-8 sticky top-0 z-10">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>

            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white relative">
                    <Bell className="w-6" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <select className="bg-gray-50 dark:bg-gray-900 border-none text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none dark:text-white">
                    <option>Select Client...</option>
                    <option>Government Project</option>
                    <option>Client A</option>
                    <option>Client B</option>
                </select>
            </div>
        </header>
    );
};

export default Header;
