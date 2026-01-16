import React from 'react';

const Sidebar = ({ activePage, setActivePage }) => {
    const menuItems = [
        { name: 'Dashboard', icon: '📊' },
        { name: 'Analytics', icon: '📈' },
        { name: 'Facilities', icon: '🏢' },
        { name: 'Reports', icon: '📑' },
        { name: 'Settings', icon: '⚙️' },
    ];

    return (
        <aside className="w-64 fixed h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-10 hidden md:flex flex-col">
            <div className="h-16 flex items-center px-8 border-b border-gray-200 dark:border-gray-700">
                <div className="text-2xl mr-2">hicon</div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  App Name
                </h1>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setActivePage(item.name)}
                        className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                            activePage === item.name
                            ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                    >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        {item.name}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                        👤
                    </div>
                    <div>
                        <p className="text-sm font-medium dark:text-white">User Name</p>
                        <p className="text-xs text-gray-500">Admin</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
