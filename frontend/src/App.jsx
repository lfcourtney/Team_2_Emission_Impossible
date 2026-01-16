import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

import { Server } from 'lucide-react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activePage, setActivePage] = useState('Dashboard');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 font-sans">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
        <Header title={activePage} />

        <div className="flex-1 overflow-y-auto">
            {activePage === 'Dashboard' && <Dashboard />}
            {activePage !== 'Dashboard' && (
              <div className="p-8 flex items-center justify-center h-full text-gray-400">

                <div className="min-h-screen flex flex-col items-center justify-center">
                  <span>
                    <Server className="h-9 w-9" />
                  </span>
                  <h2 className="text-xl font-semibold">Work in Progress</h2>
                  <p>{activePage} view is coming soon.</p>
                </div>

              </div>
            )}
        </div>
      </main>
    </div>
  );
}

export default App;
