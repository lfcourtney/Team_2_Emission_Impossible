import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({ title, value, unit, trend, trendUp, icon: Icon, subtext }) {
    return (
        <div className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-xl hover:bg-white/[0.07] transition-all group relative overflow-hidden">
            {/* Background Gradient Blob */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-all"></div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 text-secondary">
                    <Icon size={24} />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-sm font-medium px-2.5 py-1 rounded-full border ${
                        trendUp 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                        {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {trend}
                    </div>
                )}
            </div>

            <div className="relative z-10">
                <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-heading font-bold text-white">{value}</span>
                    <span className="text-sm text-gray-500 font-medium">{unit}</span>
                </div>
                {subtext && <p className="text-xs text-gray-500 mt-2">{subtext}</p>}
            </div>
        </div>
    );
}
