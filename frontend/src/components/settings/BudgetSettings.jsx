import { useState } from 'react';

export default function BudgetSettings({ currentBudget, onApply, initialTarget = 10 }) {
    const [target, setTarget] = useState(initialTarget);    // We need a local state for the slider

    return (
        <div className="space-y-6">
            <div>
                 <h3 className="text-xl font-heading font-bold text-white mb-2">Budget Settings</h3>
                 <p className="text-sm text-gray-400">Adjust the annual reduction targets for this facility.</p>
            </div>

            <div className="space-y-4">
                <label className="text-sm font-bold text-white uppercase tracking-wider block">Reduction Target</label>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-secondary">{target}%</span>
                        <span className="text-xs text-gray-500">vs 2025 Baseline</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="50" 
                        step="1"
                        value={target} 
                        onChange={(e) => setTarget(Number(e.target.value))}
                        className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-secondary"
                    />
                </div>
            </div>

            <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20">
                 <span className="text-xs text-secondary block mb-1">New Annual Budget</span>
                 <span className="text-xl font-bold text-white">
                    {(currentBudget * (1 - target / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })} 
                    <span className="text-sm font-normal text-gray-500"> kg</span>
                 </span>
             </div>
             
             {/* use our callback function to update the parent states (Overview Page)*/}
             <button 
                onClick={() => onApply(target)}
                className="w-full py-3 bg-secondary text-primary font-bold rounded-xl hover:bg-white transition-colors"
            >
                Apply Changes
            </button>
        </div>
    );
}