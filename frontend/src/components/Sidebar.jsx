import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Calculator, User, LogOut, Settings, Leaf } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();

    const menuItems = [
        { path: '/', icon: LayoutDashboard, label: 'Overview' },
        { path: '/analysis', icon: BarChart3, label: 'Analysis' },
        { path: '/calculator', icon: Calculator, label: 'Calculator' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="h-screen w-20 lg:w-64 bg-primary border-r border-white/5 flex flex-col transition-all duration-300 fixed left-0 top-0 z-40">
            {/* Logo Area */}
            <div className="h-20 flex items-center justify-center lg:justify-start lg:px-8 border-b border-white/5">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-primary font-bold shadow-[0_0_15px_rgba(0,198,194,0.3)]">
                    <Leaf size={24} />
                </div>
                <span className="hidden lg:block ml-4 text-xl font-heading font-bold text-white tracking-wide">CarbonIQ</span>
            </div>

            {/* Navigation */}
            <div className="flex-1 py-8 px-3 lg:px-4 space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`w-full flex items-center justify-center lg:justify-start px-3 py-3.5 rounded-xl transition-all duration-200 group
                        ${isActive(item.path)
                                ? 'bg-secondary text-primary font-bold shadow-[0_0_15px_rgba(0,198,194,0.2)]'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <item.icon size={22} className={isActive(item.path) ? 'stroke-2' : 'stroke-[1.5]'} />
                        <span className="hidden lg:block ml-4 text-sm">{item.label}</span>
                    </button>
                ))}
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-white/5 space-y-2">
                <button className="w-full flex items-center justify-center lg:justify-start px-3 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                    <Settings size={22} className="stroke-[1.5]" />
                    <span className="hidden lg:block ml-4 text-sm">Settings</span>
                </button>
                <button
                    onClick={() => {
                        logout();
                        navigate('/login');
                    }}
                    className="w-full flex items-center justify-center lg:justify-start px-3 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors cursor-pointer"
                >
                    <LogOut size={22} className="stroke-[1.5]" />
                    <span className="hidden lg:block ml-4 text-sm">Sign Out</span>
                </button>
            </div>
        </div>
    );
}
