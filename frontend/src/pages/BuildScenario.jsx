import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Server, 
  Cloud, 
  Cpu, 
  Users, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Save,
  HelpCircle,
  FileText,
  TrendingDown,
  AlertTriangle
} from 'lucide-react';
import { LocationService } from '../fakeBackend/services/LocationService';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend } from 'recharts';

const steps = [
  { id: 1, name: 'Project Scope', icon: Server, description: 'Define the scope and lifecycle' },
  { id: 2, name: 'Infrastructure', icon: Cloud, description: 'Infrastructure and hosting details' },
  { id: 3, name: 'AI & Compute', icon: Cpu, description: 'Model training and intensity' },
  { id: 4, name: 'Workforce', icon: Users, description: 'Teams and remote working' },
  { id: 5, name: 'Location', icon: MapPin, description: 'Physical footprint and travel' },
  { id: 6, name: 'Timeline', icon: Clock, description: 'Duration and retention policies' },
];

export default function BuildScenario() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showReport, setShowReport] = useState(false);
  const [locations, setLocations] = useState([]);
  
  useEffect(() => {
    try {
      const allLocations = LocationService.getAllLocations();
      setLocations(allLocations);
    } catch (err) {
      console.error("Failed to load locations", err);
    }
  }, []);

  const [formData, setFormData] = useState({
    // Defaults
    projectName: 'New Transformation Project',
    teamSize: 10,
    durationMonths: 12,
    
    // Tech
    cloudProvider: 'aws',
    environmentCount: 3, // Dev, Test, Prod
    storageTB: 1,
    
    // AI
    trainingHours: 0,
    gpuCount: 0,

    // People
    remotePercent: 20,
    
    // Location
    officeLocation: 'london',
    
    // Advanced/Toggles
    includeEmbodied: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // --- LIVE CALCULATION ENGINE ---
  const liveImpact = useMemo(() => {
    // 1. Compute (Servers/Cloud)
    // Assumption: 1 Environment ~ 200kg CO2e/month (very rough avg for mid-size microservices app)
    const computeBase = formData.environmentCount * 200;
    
    // 2. Storage
    // Assumption: 50kg/TB/year -> ~4kg/TB/month
    const storageBase = formData.storageTB * 4;

    // 3. AI / GPU
    // Assumption: 1 GPU hour (A100) ~ 0.15 kg CO2e (depending on grid)
    const aiImpact = formData.trainingHours * formData.gpuCount * 0.15; 
    
    // 4. People (Office + Commute + Devices)
    // Avg office worker: 150kg/month. 
    // Remote worker: 80kg/month (home energy).
    const remoteWorkers = formData.teamSize * (formData.remotePercent / 100);
    const officeWorkers = formData.teamSize - remoteWorkers;
    const peopleImpact = (officeWorkers * 150) + (remoteWorkers * 80);

    const monthlyTotal = computeBase + storageBase + aiImpact + peopleImpact;
    const projectTotal = monthlyTotal * formData.durationMonths;

    return {
      monthly: monthlyTotal,
      total: projectTotal,
      breakdown: [
        { name: 'Compute', value: computeBase * formData.durationMonths, color: '#00C49F' },
        { name: 'Storage', value: storageBase * formData.durationMonths, color: '#FFBB28' },
        { name: 'AI/ML', value: aiImpact * formData.durationMonths, color: '#FF8042' },
        { name: 'People', value: peopleImpact * formData.durationMonths, color: '#0088FE' },
      ]
    };
  }, [formData]);

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowReport(true);
    }
  };

  const handleBack = () => {
    if (showReport) {
        setShowReport(false);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const inputClass = "w-full bg-primary/50 border border-white/10 focus:border-secondary rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:ring-1 focus:ring-secondary/50";
  const labelClass = "block text-sm font-medium text-gray-300 mb-1.5 ml-1";
  const cardClass = "bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl animate-in slide-in-from-right-4 duration-500";

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Project Scope
        return (
          <div className="space-y-6">
            <div className={cardClass}>
              <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-secondary" /> Project Basics
              </h3>
              <div className="grid gap-6">
                <div>
                  <label className={labelClass}>Project Name</label>
                  <input type="text" name="projectName" value={formData.projectName} onChange={handleInputChange} className={inputClass} />
                </div>
                 <div>
                  <label className={labelClass}>Duration (Months)</label>
                  <input type="number" name="durationMonths" value={formData.durationMonths} onChange={handleInputChange} className={inputClass} />
                </div>
              </div>
            </div>
          </div>
        );
      case 2: // Infrastructure
        return (
            <div className="space-y-6">
                <div className={cardClass}>
                    <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
                        <Cloud className="w-5 h-5 text-secondary" /> Infrastructure Scale
                    </h3>
                    <div className="grid gap-6">
                        <div>
                            <label className={labelClass}>Environments (Dev, Test, Stage, Prod)</label>
                            <input type="number" name="environmentCount" value={formData.environmentCount} onChange={handleInputChange} className={inputClass} />
                            <p className="text-xs text-gray-400 mt-1">More environments = more idle compute waste.</p>
                        </div>
                        <div>
                            <label className={labelClass}>Est. Storage (TB)</label>
                            <input type="number" name="storageTB" value={formData.storageTB} onChange={handleInputChange} className={inputClass} />
                        </div>
                    </div>
                </div>
            </div>
        );
      case 3: // AI
        return (
             <div className="space-y-6">
                <div className={cardClass}>
                    <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-secondary" /> Compute Intensity (AI/ML)
                    </h3>
                    <div className="grid gap-6">
                        <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex gap-3">
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
            </div>
        );
       case 4: // Workforce
         return (
            <div className="space-y-6">
                <div className={cardClass}>
                    <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-secondary" /> Team Impact
                    </h3>
                    <div className="grid gap-6">
                        <div>
                             <label className={labelClass}>Team Size (FTEs)</label>
                             <input type="number" name="teamSize" value={formData.teamSize} onChange={handleInputChange} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Remote Work %</label>
                            <input type="range" name="remotePercent" min="0" max="100" value={formData.remotePercent} onChange={handleInputChange} className="w-full h-2 bg-primary rounded-lg appearance-none cursor-pointer accent-secondary" />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>0% (Full Office)</span>
                                <span className="text-secondary font-bold">{formData.remotePercent}%</span>
                                <span>100% (Remote)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
       case 5: // Location
         return (
             <div className="space-y-6">
                <div className={cardClass}>
                    <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-secondary" /> Primary Location
                    </h3>
                     <div>
                        <label className={labelClass}>Region</label>
                        <select name="officeLocation" value={formData.officeLocation} onChange={handleInputChange} className={inputClass}>
                            {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.city}, {loc.country}</option>)}
                            <option value="other">Other (Global Avg)</option>
                        </select>
                    </div>
                </div>
             </div>
         );
       case 6: // Timeline
          return (
             <div className="space-y-6">
                 <div className={cardClass}>
                    <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-secondary" /> Review
                    </h3>
                    <div className="text-center py-10">
                        <div className="inline-flex items-center justify-center p-4 bg-secondary/20 rounded-full mb-4 text-secondary">
                            <FileText size={48} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Ready to generate report?</h2>
                        <p className="text-gray-400 max-w-md mx-auto">We've gathered all the necessary data points to estimate your project's carbon footprint.</p>
                    </div>
                 </div>
             </div>
          );
      default: return null;
    }
  };

  if (showReport) {
      return (
          <div className="space-y-8 animate-in zoom-in-95 duration-500">
               {/* Header */}
               <div className="flex justify-between items-start">
                   <div>
                       <h1 className="text-3xl font-heading font-bold text-white mb-2">Scenario Analysis: {formData.projectName}</h1>
                       <p className="text-gray-400">Proforma Estimate vs Industry Baseline</p>
                   </div>
                   <button onClick={handleBack} className="px-4 py-2 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/5">Edit Scenario</button>
               </div>

               {/* Top Cards */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/20 p-6 rounded-2xl">
                        <div className="text-secondary uppercase text-xs font-bold tracking-wider mb-2">Total Estimated Footprint</div>
                        <div className="text-4xl font-bold text-white mb-1">{liveImpact.total.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-lg text-secondary/70">kg CO2e</span></div>
                        <div className="text-xs text-secondary/60">Over {formData.durationMonths} months</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <div className="text-gray-400 uppercase text-xs font-bold tracking-wider mb-2">Project Intensity</div>
                        <div className="text-4xl font-bold text-white mb-1">{(liveImpact.monthly / formData.teamSize).toFixed(1)} <span className="text-lg text-gray-500">kg/person/mo</span></div>
                        <div className="text-xs text-gray-500">Industry avg: ~250kg</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                         <div className="text-gray-400 uppercase text-xs font-bold tracking-wider mb-2">Equivalent To</div>
                         <div className="text-4xl font-bold text-white mb-1">{Math.floor(liveImpact.total / 120)} <span className="text-lg text-gray-500">Flights</span></div>
                         <div className="text-xs text-gray-500">LHR to NYC (Economy)</div>
                    </div>
               </div>

               {/* Charts */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   <div className="bg-white/5 border border-white/10 p-6 rounded-2xl min-h-[400px]">
                       <h3 className="font-bold text-white mb-6">Emission Breakdown</h3>
                       <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie 
                                    data={liveImpact.breakdown} 
                                    cx="50%" cy="50%" 
                                    innerRadius={60} 
                                    outerRadius={100} 
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {liveImpact.breakdown.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.5)" />
                                    ))}
                                </Pie>
                                <RechartsTooltip contentStyle={{ backgroundColor: '#052831', borderColor: '#333', color: '#fff' }} />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                       </ResponsiveContainer>
                   </div>
                   
                   <div className="bg-white/5 border border-white/10 p-6 rounded-2xl min-h-[400px]">
                       <h3 className="font-bold text-white mb-6">Optimization Potential</h3>
                       <div className="space-y-4">
                           <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                               <h4 className="text-emerald-400 font-bold mb-1">Switch to Green Region</h4>
                               <p className="text-sm text-gray-400 mb-2">Moving workloads to Sweden or Canada could reduce server emissions by 80%.</p>
                               <div className="h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                                   <div className="h-full bg-emerald-500 w-[80%]"></div>
                               </div>
                           </div>
                           <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                               <h4 className="text-blue-400 font-bold mb-1">Increase Remote Work</h4>
                               <p className="text-sm text-gray-400 mb-2">Increasing remote work to 50% reduces office energy overhead.</p>
                               <div className="h-2 bg-blue-500/20 rounded-full overflow-hidden">
                                   <div className="h-full bg-blue-500 w-[30%]"></div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
          </div>
      )
  }

  // WIZARD VIEW
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Navigation & Live Ticker Sidebar */}
      <div className="lg:w-80 flex-shrink-0 flex flex-col gap-6">
          {/* Nav */}
          <div className="bg-white/5 rounded-2xl border border-white/10 p-4">
            <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 px-2">Scenario Steps</h4>
            <nav className="space-y-1">
              {steps.map((step) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                const Icon = step.icon;
                return (
                  <button
                    key={step.id}
                    onClick={() => { if (step.id < currentStep) setCurrentStep(step.id); }}
                    disabled={step.id > currentStep}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 ${isActive ? 'bg-secondary text-primary font-bold' : ''} ${step.id > currentStep ? 'opacity-50' : 'hover:bg-white/5'}`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{step.name}</span>
                    {isCompleted && <CheckCircle2 size={14} className="ml-auto text-secondary" />}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Live Impact Ticker */}
          <div className="bg-gradient-to-br from-secondary/20 to-primary border border-secondary/20 rounded-2xl p-6 sticky top-4">
               <div className="flex items-center gap-2 mb-4 text-secondary">
                   <TrendingDown size={20} />
                   <span className="font-bold text-sm uppercase tracking-wider">Live Estimate</span>
               </div>
               
               <div className="space-y-4">
                   <div>
                       <div className="text-xs text-gray-400 uppercase mb-1">Monthly Footprint</div>
                       <div className="text-3xl font-bold text-white">{liveImpact.monthly.toFixed(0)} <span className="text-sm font-normal text-gray-500">kg</span></div>
                   </div>
                   
                   <div className="h-px bg-white/10 my-2"></div>
                   
                   <div className="space-y-2">
                       {liveImpact.breakdown.map((item, i) => (
                           <div key={i} className="flex justify-between text-xs">
                               <span className="text-gray-300 flex items-center gap-2">
                                   <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></div>
                                   {item.name}
                               </span>
                               <span className="text-white font-mono">{(item.value / formData.durationMonths).toFixed(0)}</span>
                           </div>
                       ))}
                   </div>
               </div>
          </div>
      </div>

      {/* Main Form Area */}
      <div className="flex-1">
        {renderStepContent()}

        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${currentStep === 1 ? 'text-gray-600 opacity-0' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <button
            onClick={handleNext}
            className="group flex items-center gap-2 px-8 py-3 bg-secondary text-primary hover:bg-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            {currentStep === 6 ? 'Generate Report' : 'Continue'} 
            {currentStep === 6 ? <FileText className="w-4 h-4" /> : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </div>
      </div>
    </div>
  );
}
