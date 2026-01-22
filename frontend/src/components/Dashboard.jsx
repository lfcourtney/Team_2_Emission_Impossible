// ...existing imports...
import { useState, useEffect, useMemo } from 'react';
import { CalculatedEmissionsService } from '../fakeBackend/services/CalculatedEmissionsService';
import EmissionTrendChart from './EmissionTrendChart.jsx';
import { 
  Leaf, 
  TrendingUp, 
  Activity, 
  Zap, 
  Droplet, 
  Car, 
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function Dashboard({ clientId, locationId }) {
    // ...existing data fetching logic...
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Data Fetching ---
  useEffect(() => {
    setLoading(true);
    // Simulate API Network Latency
    setTimeout(() => {
        let result = [];
        if (locationId === 'all') {
            result = CalculatedEmissionsService.getEmissionsForClient(clientId);
        } else {
            result = CalculatedEmissionsService.getEmissionsForLocation(Number(locationId));
        }
        setData(result);
        setLoading(false);
    }, 400);
  }, [clientId, locationId]);

  // --- Business Logic / aggregations ---
  const stats = useMemo(() => {
    const totalCO2e = data.reduce((acc, curr) => acc + (curr.co2e || 0), 0);
    
    // Group by Emission Type for the Chart
    const byType = data.reduce((acc, curr) => {
        const type = curr.emissionTypeName || 'Other';
        if (!acc[type]) acc[type] = 0;
        acc[type] += (curr.co2e || 0);
        return acc;
    }, {});

    // Sort types by impact
    const sortedTypes = Object.entries(byType)
        .sort(([, a], [, b]) => b - a)
        .map(([name, val]) => ({ 
            name, 
            value: val, 
            percent: totalCO2e > 0 ? (val / totalCO2e) * 100 : 0 
        }));

    return { totalCO2e, totalCount: data.length, sortedTypes };
  }, [data]);

    if (loading) {
        return (
            <div className="h-96 flex flex-col items-center justify-center text-primary/50 animate-pulse">
                <Activity className="w-10 h-10 mb-4 text-secondary" />
                <div className="text-sm font-heading">Synchronizing Data...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ModernStatCard 
                    title="Total CO2e Output" 
                    value={`${stats.totalCO2e.toFixed(1)}`} 
                    unit="kg"
                    trend="+2.4%"
                    trendUp={true}
                    icon={Leaf} 
                />
                <ModernStatCard 
                    title="Active Data Points" 
                    value={stats.totalCount}
                    unit="records"
                    trend="+12"
                    trendUp={true} 
                    icon={Activity} 
                />
                <ModernStatCard 
                    title="Offset Efficiency" 
                    value="94.2"
                    unit="%"
                    trend="-0.8%"
                    trendUp={false} 
                    icon={TrendingUp} 
                />
            </div>

            <EmissionTrendChart data={data} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left: Emission Source Breakdown */}
                <div className="bg-white rounded-xl border border-primary/10 shadow-sm p-6 flex flex-col">
                    <h3 className="text-base font-heading font-bold text-primary mb-6 flex items-center gap-2">
                        <span className="w-1 h-5 bg-secondary rounded-full"></span>
                        Emission Sources
                    </h3>
                    
                    <div className="flex-1 space-y-5">
                        {stats.sortedTypes.map((type) => (
                            <div key={type.name} className="group">
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-sm font-medium text-primary flex items-center gap-2">
                                        <TypeIcon type={type.name} />
                                        {type.name}
                                    </span>
                                    <div className="text-right">
                                        <span className="block text-xs text-primary/60 font-mono">{type.value.toFixed(0)} kg</span>
                                    </div>
                                </div>
                                <div className="w-full bg-accent rounded-full h-2 overflow-hidden">
                                    <div 
                                        className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out group-hover:bg-secondary"
                                        style={{ width: `${type.percent}%` }}
                                    ></div>
                                </div>
                                <div className="text-right mt-1">
                                        <span className="text-xs font-bold text-primary">{type.percent.toFixed(1)}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Log */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-primary/10 shadow-sm flex flex-col">
                    <div className="px-6 py-5 border-b border-primary/5 flex justify-between items-center">
                        <div>
                            <h3 className="font-heading font-bold text-primary">Recent Activity Log</h3>
                        </div>
                        <button className="p-2 hover:bg-accent rounded-lg text-primary/50 transition-colors">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-accent text-primary/70 text-xs uppercase font-heading font-bold">
                                <tr>
                                    <th className="px-6 py-3 border-b border-primary/5">Date</th>
                                    <th className="px-6 py-3 border-b border-primary/5">Location</th>
                                    <th className="px-6 py-3 border-b border-primary/5">Type</th>
                                    <th className="px-6 py-3 border-b border-primary/5 text-right">Raw</th>
                                    <th className="px-6 py-3 border-b border-primary/5 text-right">CO2e</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-primary/5">
                                {data.map((row) => (
                                    <tr key={row.id} className="hover:bg-accent/50 transition-colors group">
                                        <td className="px-6 py-3.5 text-primary/80 font-mono text-xs">{row.date}</td>
                                        <td className="px-6 py-3.5 font-medium text-primary">{row.locationName}</td>
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 rounded-md bg-accent text-primary group-hover:bg-white group-hover:shadow-sm transition-all">
                                                    <TypeIcon type={row.emissionTypeName} size={14} />
                                                </div>
                                                <span className="text-primary/90">{row.emissionTypeName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3.5 text-right text-primary/60 font-mono">
                                            {row.value} <span className="text-xs">{row.unit}</span>
                                        </td>
                                        <td className="px-6 py-3.5 text-right">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-secondary/10 text-primary border border-secondary/20 group-hover:bg-secondary group-hover:text-primary transition-colors">
                                                {row.co2e?.toFixed(2)} kg
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ModernStatCard({ title, value, unit, icon: Icon, trend, trendUp }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-primary/10 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 rounded-lg bg-primary/5 text-primary group-hover:bg-secondary group-hover:text-primary transition-colors">
                    <Icon size={20} />
                </div>
                <div className={`flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-full ${trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {trend}
                </div>
            </div>

            <div>
                <h3 className="text-primary/60 text-xs font-heading font-bold uppercase tracking-wider mb-1">{title}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-heading font-bold text-primary tracking-tight">{value}</span>
                    <span className="text-sm font-medium text-primary/50">{unit}</span>
                </div>
            </div>
        </div>
    );
}

function TypeIcon({ type, size = 16 }) {
    if (!type) return <Activity size={size} />;
    const normalized = type.toLowerCase();
    if (normalized.includes('electricity') || normalized.includes('grid')) return <Zap size={size} />;
    if (normalized.includes('gas') || normalized.includes('water')) return <Droplet size={size} />;
    if (normalized.includes('fuel') || normalized.includes('vehicle')) return <Car size={size} />;
    return <Activity size={size} />;
}