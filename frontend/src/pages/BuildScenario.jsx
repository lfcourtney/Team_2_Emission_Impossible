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
import ScenarioSidebar from '../components/ScenarioBuilder/ScenarioSidebar';
import LiveEstimate from '../components/ScenarioBuilder/LiveEstimate';
import ScenarioForm from '../components/ScenarioBuilder/ScenarioForm';
import ScenarioReport from '../components/ScenarioBuilder/ScenarioReport';

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
      return <ScenarioReport formData={formData} liveImpact={liveImpact} handleBack={handleBack} />;
  }

  // WIZARD VIEW - DASHBOARD LAYOUT
  return (
    <div className="h-full w-full overflow-hidden flex flex-col lg:flex-row">
      {/* SIDEBAR */}
      <div className="lg:w-80 bg-black/20 border-r border-white/10 flex flex-col">
          <ScenarioSidebar 
              steps={steps} 
              currentStep={currentStep} 
              setCurrentStep={setCurrentStep} 
          />
          
          {/* Live Monitor / Bottom Sidebar */}
          <div className="p-2 bg-black/20 border-t border-white/5">
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
        <div className="p-4 border-t border-white/5 bg-black/10 backdrop-blur-md flex justify-between items-center">
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
