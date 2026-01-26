import { useState, useEffect, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import { CalculatedEmissionsService } from '../fakeBackend/services/CalculatedEmissionsService';
import { LocationService } from '../fakeBackend/services/LocationService';
import { Download, Filter, Search, ArrowUpDown, Plus, X } from 'lucide-react';

export default function Analysis() {
    const { selectedClientId, selectedLocationId } = useData();
    const [data, setData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    useEffect(() => {
        let result = [];
        if (selectedClientId && selectedLocationId) {
            if (selectedLocationId === 'all') {
                result = CalculatedEmissionsService.getEmissionsForClient(selectedClientId);
            } else {
                result = CalculatedEmissionsService.getEmissionsForLocation(Number(selectedLocationId));
            }
        }
        
        // Enrich data with Location Name if looking at 'All'
        const enriched = result.map(item => {
            const loc = LocationService.getLocation(item.locationId);
            return {
                ...item,
                locationName: loc ? loc.name : 'Unknown'
            };
        });

        setData(enriched);
    }, [selectedClientId, selectedLocationId]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = useMemo(() => {
        let sortableItems = [...data];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [data, sortConfig]);

    const SortIcon = ({ column }) => {
        if (sortConfig.key !== column) return <ArrowUpDown size={14} className="opacity-30 ml-2" />;
        return <ArrowUpDown size={14} className={`ml-2 transform text-secondary duration-300 ${sortConfig.direction === 'asc' ? 'rotate-180' : ''}`} />;
    };

    return (
        <div className="space-y-6 relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                     <h2 className="text-2xl font-heading font-bold text-white">Emission Records</h2>
                     <p className="text-gray-400 text-sm">Detailed logs of all tracked activities across your portfolio.</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-secondary text-primary font-bold text-sm rounded-lg hover:bg-white transition-colors shadow-[0_0_15px_rgba(0,198,194,0.3)] hover:shadow-[0_0_20px_rgba(0,198,194,0.5)]"
                    >
                        <Plus size={16} /> Add Record
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm rounded-lg border border-white/10 transition-colors">
                        <Filter size={16} /> Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm rounded-lg border border-white/10 transition-colors">
                        <Download size={16} /> Export CSV
                    </button>
                </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-white/5 text-white uppercase font-heading font-bold text-xs tracking-wider">
                            <tr>
                                <th 
                                    className="px-6 py-4 cursor-pointer hover:text-secondary transition-colors group select-none"
                                    onClick={() => handleSort('date')}
                                >
                                    <div className="flex items-center">Date <SortIcon column="date" /></div>
                                </th>
                                <th 
                                    className="px-6 py-4 cursor-pointer hover:text-secondary transition-colors group select-none"
                                    onClick={() => handleSort('locationName')}
                                >
                                    <div className="flex items-center">Location <SortIcon column="locationName" /></div>
                                </th>
                                <th 
                                    className="px-6 py-4 cursor-pointer hover:text-secondary transition-colors group select-none"
                                    onClick={() => handleSort('emissionTypeName')}
                                >
                                    <div className="flex items-center">Source <SortIcon column="emissionTypeName" /></div>
                                </th>
                                <th 
                                    className="px-6 py-4 cursor-pointer hover:text-secondary transition-colors group select-none"
                                    onClick={() => handleSort('scope')}
                                >
                                    <div className="flex items-center">Scope <SortIcon column="scope" /></div>
                                </th>
                                <th className="px-6 py-4">Consumption</th>
                                <th 
                                    className="px-6 py-4 text-right cursor-pointer hover:text-secondary transition-colors group select-none"
                                    onClick={() => handleSort('co2e')}
                                >
                                    <div className="flex items-center justify-end">CO2e (kg) <SortIcon column="co2e" /></div>
                                </th>
                                <th className="px-6 py-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {sortedData.map((row) => (
                                <tr key={row.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{row.date}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-secondary/50"></div>
                                            {row.locationName}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{row.emissionTypeName}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                            ${row.scope === '1' ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' : 
                                              row.scope === '2' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                                              'bg-orange-500/10 text-orange-400 border-orange-500/20'}`}>
                                            Scope {row.scope}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{row.value} {row.unit}</td>
                                    <td className="px-6 py-4 text-right font-bold text-white">{row.co2e?.toFixed(1)}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></span>
                                    </td>
                                </tr>
                            ))}
                            {sortedData.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                        No data available for the selected filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                 </div>
                 <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                    <span>Showing {sortedData.length} records</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-50 text-gray-400 hover:text-white transition-colors">Previous</button>
                        <button className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-50 text-gray-400 hover:text-white transition-colors">Next</button>
                    </div>
                 </div>
            </div>

            {/* Ingestion Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[#052831] w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h3 className="text-xl font-heading font-bold text-white">Ingest New Data</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4 mb-4">
                                <p className="text-sm text-secondary">
                                    <span className="font-bold">Pro Tip:</span> Connect your utility provider API for automatic real-time ingestion.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1">Date</label>
                                    <input type="date" className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white text-sm outline-none focus:border-secondary" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1">Location</label>
                                    <select className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white text-sm outline-none focus:border-secondary">
                                        <option>Dublin Office</option>
                                        <option>London Office</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-1">Emission Source</label>
                                <select className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white text-sm outline-none focus:border-secondary">
                                    <option>Grid Electricity (Scope 2)</option>
                                    <option>Natural Gas (Scope 1)</option>
                                    <option>Fleet Diesel (Scope 1)</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1">Consumption</label>
                                    <input type="number" placeholder="0.00" className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white text-sm outline-none focus:border-secondary" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1">Unit</label>
                                    <select className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white text-sm outline-none focus:border-secondary">
                                        <option>kWh</option>
                                        <option>m³</option>
                                        <option>Litres</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        // Demo interaction
                                        alert("Data cached! It will appear in the next sync cycle."); 
                                    }}
                                    className="px-6 py-2 bg-secondary text-primary font-bold text-sm rounded-lg hover:bg-white transition-colors"
                                >
                                    Submit Record
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
