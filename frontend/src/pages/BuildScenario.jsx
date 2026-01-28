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
  FileText
} from 'lucide-react';
import { LocationService } from '../fakeBackend/services/LocationService';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend } from 'recharts';
import ScenarioSidebar from '../components/ScenarioBuilder/ScenarioSidebar';
import LiveEstimate from '../components/ScenarioBuilder/LiveEstimate';
import ScenarioForm from '../components/ScenarioBuilder/ScenarioForm';

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
      // Removed window.scrollTo because we will use a scrollable div in the dashboard layout
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

  // WIZARD VIEW - DASHBOARD LAYOUT
  return (
    <div className="h-full rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl">
      {/* SIDEBAR */}
      <div className="lg:w-80 bg-black/20 border-r border-white/10 flex flex-col">
          <ScenarioSidebar 
              steps={steps} 
              currentStep={currentStep} 
              setCurrentStep={setCurrentStep} 
          />
          
          {/* Live Monitor / Bottom Sidebar */}
          <div className="p-4 bg-black/20 border-t border-white/5">
              <LiveEstimate liveImpact={liveImpact} />
          </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col relative bg-gradient-to-br from-white/5 to-transparent">
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center">
             <div>
                 <h2 className="text-2xl font-heading font-bold text-white">{steps[currentStep-1].name}</h2>
                 <p className="text-sm text-gray-400">{steps[currentStep-1].description}</p>
             </div>
             {/* Step counter */}
             <div className="text-xs font-mono text-gray-500 border border-white/10 px-3 py-1 rounded-full">
                 Step {currentStep} / {steps.length}
             </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
            <div className="max-w-3xl mx-auto pt-4">
                <ScenarioForm 
                    currentStep={currentStep} 
                    formData={formData} 
                    handleInputChange={handleInputChange} 
                    locations={locations} 
                />
            </div>
        </div>

        {/* Action Footer */}
        <div className="p-6 border-t border-white/5 bg-black/10 backdrop-blur-md flex justify-between items-center">
             <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${currentStep === 1 ? 'text-gray-600 opacity-0 cursor-default' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
             >
                <ArrowLeft className="w-4 h-4" /> Back
             </button>

             <button
                onClick={handleNext}
                className="group flex items-center gap-3 px-8 py-3 bg-secondary text-primary hover:bg-white font-bold rounded-xl shadow-[0_0_20px_rgba(0,198,194,0.3)] transition-all duration-300"
             >
                {currentStep === 6 ? 'Generate Report' : 'Continue'} 
                {currentStep === 6 ? <FileText className="w-4 h-4" /> : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
             </button>
        </div>
      </div>
    </div>
  );
}
