import { TrendingDown } from 'lucide-react';

export default function LiveEstimate({ liveImpact }) {
    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-2">
                <span className="text-secondary text-lg uppercase font-semibold tracking-wide">Live Estimate</span>
                <TrendingDown size={22} className="text-secondary" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{liveImpact.monthly.toFixed(0)} <span className="text-[18px] font-normal text-gray-500">kg/mo</span></div>
            <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden flex">
                {liveImpact.breakdown.map((item, i) => (
                    <div key={i} style={{ width: `${item.value > 0 ? (item.value / (liveImpact.total / (liveImpact.total / liveImpact.monthly))) * 100 : 0}%`, backgroundColor: item.color, flex: item.value }} />
                ))}
            </div>
            {/* Legend/Breakdown textual */}
             <div className="mt-3 space-y-1">
                {liveImpact.breakdown.map((item, i) => (
                    <div key={i} className="flex justify-between text-[13px] text-gray-400">
                        <span className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: item.color}}></div>
                            {item.name}
                        </span>
                        <span>{Math.round(item.value / (liveImpact.total / liveImpact.monthly))}</span>
                    </div>
                ))}
             </div>
        </div>
    );
}