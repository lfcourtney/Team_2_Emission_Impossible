import { Server, Cloud, Cpu, Users, MapPin, Clock, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function ScenarioForm({ currentStep, formData, handleInputChange, locations }) {
    const inputClass = "w-full bg-black/20 border border-white/10 focus:border-secondary rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:ring-1 focus:ring-secondary/50";
    const labelClass = "block text-sm font-medium text-gray-400 mb-1.5 ml-1";
    const cardClass = "max-w-2xl animate-in slide-in-from-right-8 duration-500";

    switch (currentStep) {
        case 1: // Project Scope
            return (
                <div className={cardClass}>
                    <div className="grid gap-6">
                        <div>
                            <label className={labelClass}>Project Name</label>
                            <input type="text" name="projectName" value={formData.projectName} onChange={handleInputChange} className={inputClass} autoFocus />
                        </div>
                        <div>
                            <label className={labelClass}>Duration (Months)</label>
                            <input type="number" name="durationMonths" value={formData.durationMonths} onChange={handleInputChange} className={inputClass} />
                        </div>
                    </div>
                </div>
            );
        case 2: // Infrastructure
            return (
                <div className={cardClass}>
                    <div className="grid gap-6">
                        <div>
                            <label className={labelClass}>Environments</label>
                            <div className="flex gap-4 mb-2">
                                {[1, 2, 3, 4].map(num => (
                                    <div
                                        key={num}
                                        onClick={() => handleInputChange({ target: { name: 'environmentCount', value: num } })}
                                        className={`flex-1 p-3 rounded-lg border cursor-pointer transition-all text-center ${formData.environmentCount == num ? 'bg-secondary text-primary border-secondary font-bold' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                                    >
                                        {num}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500">e.g., Development, Testing, Staging, Production</p>
                        </div>
                        <div>
                            <label className={labelClass}>Est. Storage (TB)</label>
                            <input type="number" name="storageTB" value={formData.storageTB} onChange={handleInputChange} className={inputClass} />
                        </div>
                    </div>
                </div>
            );
        case 3: // AI
            return (
                <div className={cardClass}>
                    <div className="grid gap-6">
                        <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex gap-3 mb-2">
                            <AlertTriangle className="text-yellow-500 shrink-0" size={20} />
                            <p className="text-sm text-yellow-200">AI Model training is extremely energy intensive. Only fill this if you are training custom models.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>GPU Count</label>
                                <input type="number" name="gpuCount" value={formData.gpuCount} onChange={handleInputChange} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Training Hours / Month</label>
                                <input type="number" name="trainingHours" value={formData.trainingHours} onChange={handleInputChange} className={inputClass} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        case 4: // Workforce
            return (
                <div className={cardClass}>
                    <div className="grid gap-6">
                        <div>
                            <label className={labelClass}>Team Size (FTEs)</label>
                            <input type="number" name="teamSize" value={formData.teamSize} onChange={handleInputChange} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Remote Work %</label>
                            <div className="bg-black/20 p-6 rounded-xl border border-white/10 mt-1">
                                <input type="range" name="remotePercent" min="0" max="100" value={formData.remotePercent} onChange={handleInputChange} className="w-full h-2 bg-primary rounded-lg appearance-none cursor-pointer accent-secondary mb-4" />
                                <div className="flex justify-between items-center">
                                    <div className="text-xs text-gray-400">Office Based</div>
                                    <div className="text-secondary font-bold text-xl">{formData.remotePercent}% <span className="text-sm font-normal text-gray-500">Remote</span></div>
                                    <div className="text-xs text-gray-400">Fully Remote</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        case 5: // Location
            return (
                <div className={cardClass}>
                    <div>
                        <label className={labelClass}>Region</label>
                        <select name="officeLocation" value={formData.officeLocation} onChange={handleInputChange} className={inputClass}>
                            {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.city}, {loc.country}</option>)}
                            <option value="other">Other (Global Avg)</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-2">Grid intensity varies significantly by region.</p>
                    </div>
                </div>
            );
        case 6: // Timeline
            return (
                <div className={cardClass}>
                    <div className="text-center py-10 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                        <div className="inline-flex items-center justify-center p-4 bg-secondary/20 rounded-full mb-4 text-secondary shadow-[0_0_20px_rgba(0,198,194,0.3)]">
                            <FileText size={48} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Ready to generate report?</h2>
                        <p className="text-gray-400 max-w-md mx-auto mb-8">We've gathered all the necessary data points to estimate your project's carbon footprint.</p>

                        <div className="flex justify-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={16} /> Scope Defined</div>
                            <div className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={16} /> Infrastructure Sized</div>
                            <div className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={16} /> Location Set</div>
                        </div>
                    </div>
                </div>
            );
        default: return null;
    }
}