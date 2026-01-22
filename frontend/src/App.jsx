import { useEffect, useState } from 'react'

// Backend "API"
import { seedDatabase } from './fakeBackend/SeedData'
import { ClientService } from './fakeBackend/services/ClientService'
import { LocationService } from './fakeBackend/services/LocationService'

// Components
import Dashboard from './components/Dashboard'

// Initialize "DB"
seedDatabase();

function App() {
  const [clients, setClients] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [selectedLocationId, setSelectedLocationId] = useState('all');

  useEffect(() => {
    const allClients = ClientService.getAllClients();
    setClients(allClients);
    if(allClients.length > 0) handleClientChange(allClients[0].id);
  }, []);

  const handleClientChange = (cId) => {
    const id = Number(cId);
    setSelectedClientId(id);
    const locs = LocationService.getLocationsForClient(id);
    setLocations(locs);
    setSelectedLocationId('all');
  };

  return (
    // Application Background: Warm Cream (accent)
    <div className="min-h-screen bg-accent font-body text-primary">
      
      {/* Top Navigation Bar: Deep Midnight Teal (primary) */}
      <nav className="bg-primary text-secondary shadow-md sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
                {/* Logo Icon: Electric Cyan (secondary) */}
                <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center font-heading font-bold text-primary">EI</div>
                <h1 className="font-heading font-bold tracking-tight text-white text-lg">CarbonIQ</h1>
            </div>

            <div className="flex gap-3">
                <select 
                    className="bg-primary border border-secondary/30 text-white text-sm rounded px-3 py-1.5 focus:ring-2 focus:ring-secondary outline-none cursor-pointer"
                    value={selectedClientId}
                    onChange={(e) => handleClientChange(e.target.value)}
                >
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>

                <select 
                    className="bg-primary border border-secondary/30 text-white text-sm rounded px-3 py-1.5 focus:ring-2 focus:ring-secondary outline-none cursor-pointer"
                    value={selectedLocationId}
                    onChange={(e) => setSelectedLocationId(e.target.value)}
                >
                    <option value="all">All Locations</option>
                    {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
            </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        
        <header className="mb-8 border-b border-primary/10 pb-4">
            <h2 className="text-3xl font-heading font-bold text-primary">Overview Dashboard</h2>
            <p className="font-heading font-normal text-primary/70 mt-1">
                Real-time carbon tracking for <span className="text-secondary font-bold">{clients.find(c => c.id === selectedClientId)?.name}</span>
            </p>
        </header>

        {selectedClientId && (
            <Dashboard 
                clientId={selectedClientId} 
                locationId={selectedLocationId} 
            />
        )}

      </main>
    </div>
  )
}

export default App