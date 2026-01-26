import { useMemo, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ModernEmissionTrendChart({ data }) {
  const [visibleScopes, setVisibleScopes] = useState({
    scope1: true,
    scope2: true,
    scope3: true
  });

  const chartData = useMemo(() => {
    const grouped = data.reduce((acc, curr) => {
        const date = curr.date; 
        if (!acc[date]) {
            acc[date] = { date, scope1: 0, scope2: 0, scope3: 0 };
        }
        
        const scopeKey = `scope${curr.scope}`;
        if (acc[date][scopeKey] !== undefined) {
             acc[date][scopeKey] += (curr.co2e || 0);
        }
        
        return acc;
    }, {});

    return Object.values(grouped)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [data]);

    if (!data || data.length === 0) return (
        <div className="h-64 flex items-center justify-center text-gray-500 border border-white/5 rounded-2xl bg-white/5 border-dashed">
            No emissions data available for this range
        </div>
    );

    return (
        <div className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-lg font-heading font-bold text-white">Emissions by Scope</h3>
                    <p className="text-sm font-body text-gray-400">Breakdown of direct vs indirect impact over time</p>
                </div>
                <div className="flex gap-2">
                    {[
                        { label: 'Scope 1', key: 'scope1', color: '#00c6c2' },
                        { label: 'Scope 2', key: 'scope2', color: '#3b82f6' },
                        { label: 'Scope 3', key: 'scope3', color: '#f59e0b' }
                    ].map((scope) => (
                        <button 
                            key={scope.key}
                            onClick={() => setVisibleScopes(prev => ({ ...prev, [scope.key]: !prev[scope.key] }))}
                            className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all ${
                                visibleScopes[scope.key] 
                                    ? 'bg-white/10 border-white/20' 
                                    : 'bg-transparent border-white/5 opacity-50'
                            }`}
                        >
                            <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: scope.color}}></div>
                            <span className="text-xs text-gray-300 font-medium">{scope.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorScope1" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00c6c2" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#00c6c2" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorScope2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorScope3" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="#ffffff10" />
                        <XAxis 
                            dataKey="date" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                        />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: '#052831', 
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                            }}
                            itemStyle={{ color: '#fff' }}
                            labelStyle={{ color: '#9ca3af', marginBottom: '0.5rem' }}
                        />
                        {visibleScopes.scope1 && (
                            <Area 
                                type="monotone" 
                                dataKey="scope1" 
                                stackId="1" 
                                stroke="#00c6c2" 
                                strokeWidth={2}
                                fill="url(#colorScope1)" 
                                name="Scope 1 (Direct)"
                            />
                        )}
                        {visibleScopes.scope2 && (
                            <Area 
                                type="monotone" 
                                dataKey="scope2" 
                                stackId="1" 
                                stroke="#3b82f6" 
                                strokeWidth={2}
                                fill="url(#colorScope2)" 
                                name="Scope 2 (Indirect)"
                            />
                        )}
                        {visibleScopes.scope3 && (
                            <Area 
                                type="monotone" 
                                dataKey="scope3" 
                                stackId="1" 
                                stroke="#f59e0b" 
                                strokeWidth={2}
                                fill="url(#colorScope3)" 
                                name="Scope 3 (Value Chain)"
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
