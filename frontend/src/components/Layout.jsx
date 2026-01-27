import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  {
    name: 'Build',
    path: '/build',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    name: 'Outcome',
    path: '/outcome',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    name: 'Landing',
    path: '/landing',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

function Layout({ children }) {
  const navigate = useNavigate();

  const { logout, authenticatedUser } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0f172a] overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#1e293b] transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } flex flex-col`}
      >
        {/* Sidebar Header - matches page header height */}
        <div className="h-16 flex items-center px-6 border-b border-[#334155]">
          <h1
            onClick={() => navigate('/build')}
            className="text-xl font-bold text-white cursor-pointer hover:text-[#00C6C2] transition-colors"
          >
            Carbon IQ
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-[#9ca3af] hover:text-white ml-auto"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                  ? 'bg-[#00C6C2] text-white'
                  : 'text-[#9ca3af] hover:bg-[#1f2937] hover:text-white'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-[#334155] space-y-2">
          {/* User Profile Section */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1f2937]">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00C6C2] text-white flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-white truncate">
              {authenticatedUser?.fullName || 'User'}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => {
              setSidebarOpen(false);
              logout();
              navigate('/');
            }}
            className="cursor-pointer flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-[#9ca3af] hover:bg-[#1f2937] hover:text-white transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="h-16 bg-[#1e293b] border-b border-[#334155] flex items-center px-6 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="ml-4 text-xl font-bold text-white">Carbon IQ</h1>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
