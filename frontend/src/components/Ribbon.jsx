import { useRibbon } from '../contexts/RibbonContext';
import { X, Sliders } from 'lucide-react';

export default function Ribbon() {
    const { isRibbonOpen, ribbonContent, closeRibbon } = useRibbon();

    return (
        <div className={`
            fixed right-0 top-20 bottom-0 w-96 bg-[#0f172a]/95 backdrop-blur-xl border-l border-white/10 z-20 
            transition-transform duration-300 ease-in-out shadow-2xl
            ${isRibbonOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
            {/* Header */}
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6">
                <div className="flex items-center gap-2 text-white font-bold font-heading">
                    <Sliders size={18} className="text-secondary" />
                    <span>Page Controls</span>
                </div>
                <button onClick={closeRibbon} className="text-gray-400 hover:text-white transition-colors">
                    <X size={20} />
                </button>
            </div>

            {/* Dynamic Content Area */}
            <div className="p-6 overflow-y-auto h-[calc(100%-4rem)] animate-in fade-in duration-300">
                {ribbonContent}
            </div>
        </div>
    );
}