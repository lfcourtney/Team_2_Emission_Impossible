import { Server, Cloud, Cpu, Users, MapPin, Clock, CheckCircle2, TrendingDown } from 'lucide-react';

export default function ScenarioSidebar({ steps, currentStep, setCurrentStep }) {
    return (
        <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-white/5">
                <div className="flex items-center gap-3 text-white">
                    <span className="font-heading font-bold text-lg">Scenario Builder</span>
                </div>
            </div>

            {/* Steps List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {steps.map((step) => {
                    const isActive = currentStep === step.id;
                    const isCompleted = currentStep > step.id;
                    const Icon = step.icon;
                    return (
                        <button
                            key={step.id}
                            onClick={() => { if (step.id < currentStep) setCurrentStep(step.id); }}
                            disabled={step.id > currentStep}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 relative overflow-hidden ${isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-gray-200'} ${step.id > currentStep ? 'opacity-40 cursor-not-allowed' : ''}`}
                        >
                            {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>}
                            <Icon size={18} className={isActive ? 'text-secondary' : ''} />
                            <span className={`text-sm ${isActive ? 'font-medium' : ''}`}>{step.name}</span>
                            {isCompleted && <CheckCircle2 size={14} className="ml-auto text-emerald-500" />}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}