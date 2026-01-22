import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function EmissionTrendChart({ data }) {
    // ...existing logic...
  // Transform raw data into daily totals separated by SCOPE
  const chartData = useMemo(() => {
    const grouped = data.reduce((acc, curr) => {
        const date = curr.date; 
        if (!acc[date]) {
            acc[date] = { date, scope1: 0, scope2: 0, scope3: 0 };
        }
        
        // Add value to specific scope bucket
        const scopeKey = `scope${curr.scope}`;
        // Safety check in case scope is missing or invalid
        if (acc[date][scopeKey] !== undefined) {
             acc[date][scopeKey] += (curr.co2e || 0);
        }
        
        return acc;
    }, {});

    return Object.values(grouped)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [data]);

    if (data.length === 0) return null;

    return (
        <div className="bg-white rounded-xl border border-primary/10 shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-base font-heading font-bold text-primary">Emissions by Scope</h3>
                    <p className="text-sm font-body text-primary/60">Breakdown of direct vs indirect impact</p>
                </div>
            </div>

            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            {/* Scope 1: Cyan (Secondary) */}
                            <linearGradient id="colorScope1" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00c6c2" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#00c6c2" stopOpacity={0}/>
                            </linearGradient>
                            {/* Scope 2: Dark Teal (Primary - lightened slightly for visibility) */}
                            <linearGradient id="colorScope2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#052831" stopOpacity={0.6}/>
                                <stop offset="95%" stopColor="#052831" stopOpacity={0}/>
                            </linearGradient>
                            {/* Scope 3: Mixed/Neutral (Grayish Teal) */}
                            <linearGradient id="colorScope3" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#5d7b83" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#5d7b83" stopOpacity={0}/>
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#052831', fontSize: 12, fontFamily: 'Avenir Next LT Pro, sans-serif' }} dy={10} tickFormatter={(str) => { const date = new Date(str); return `${date.getMonth() + 1}/${date.getDate()}`; }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#052831', fontSize: 12, fontFamily: 'Avenir Next LT Pro, sans-serif' }} dx={-10} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend iconType="circle" />

                        <Area name="Scope 1 (Direct)" type="monotone" dataKey="scope1" stackId="1" stroke="#00c6c2" fill="url(#colorScope1)" strokeWidth={2} />
                        <Area name="Scope 2 (Energy)" type="monotone" dataKey="scope2" stackId="1" stroke="#052831" fill="url(#colorScope2)" strokeWidth={2} />
                        <Area name="Scope 3 (Value Chain)" type="monotone" dataKey="scope3" stackId="1" stroke="#5d7b83" fill="url(#colorScope3)" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

// ...existing CustomTooltip...
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-primary text-white text-xs p-3 rounded-lg shadow-xl border border-secondary/20 w-48 z-50">
          <p className="font-bold mb-2 border-b border-white/20 pb-1 font-heading">{label}</p>
          <div className="space-y-1">
              {payload.map((entry, index) => (
                  <div key={index} className="flex justify-between items-center">
                      <span style={{ color: entry.stroke }}>{entry.name}:</span>
                      <span className="font-mono">{entry.value.toFixed(1)} kg</span>
                  </div>
              ))}
          </div>
        </div>
      );
    }
    return null;
};