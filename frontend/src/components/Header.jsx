import { Bell, Search, UserCircle } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

export default function Header({ title }) {
    const { clients, locations, selectedClientId, selectedLocationId, handleClientChange, handleLocationChange } = useData();
    const { authenticatedUser } = useAuth();

    return (
        <header className="h-20 bg-primary/95 backdrop-blur-md border-b border-white/5 sticky top-0 z-30 px-8 flex items-center justify-between">
            {/* Page Title */}
            <div>
                <h2 className="text-2xl font-heading font-bold text-white tracking-tight">{title}</h2>
                <p className="text-gray-400 text-sm hidden md:block">Real-time sustainability monitoring</p>
            </div>

            {/* Controls & Profile */}
            <div className="flex items-center gap-6">

                {/* Global Filters */}
                <div className="hidden md:flex items-center gap-3 bg-white/5 p-1 rounded-xl border border-white/5">
                    <select
                        className="bg-transparent text-white text-sm px-3 py-1.5 outline-none font-medium [&>option]:text-primary"
                        value={selectedClientId}
                        onChange={(e) => handleClientChange(e.target.value)}
                    >
                        {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <div className="w-px h-4 bg-white/10"></div>
                    <select
                        className="bg-transparent text-secondary text-sm px-3 py-1.5 outline-none font-medium [&>option]:text-primary"
                        value={selectedLocationId}
                        onChange={(e) => handleLocationChange(e.target.value)}
                    >
                        <option value="all">All Locations</option>
                        {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                    </select>
                </div>

                <div className="h-8 w-px bg-white/10"></div>

                <div className="flex items-center gap-4">
                    <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full"></span>
                    </button>

                    <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                        <div className="text-right hidden md:block">
                            <div className="text-sm font-bold text-white">{authenticatedUser?.fullName || 'Guest'}</div>
                            <div className="text-xs text-secondary">{authenticatedUser?.role || 'Viewer'}</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-secondary to-blue-500 p-0.5">
                            <div className="w-full h-full rounded-full bg-primary flex items-center justify-center overflow-hidden">
                                <UserCircle size={32} className="text-gray-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
