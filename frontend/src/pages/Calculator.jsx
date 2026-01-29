import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sliders, Cloud, Zap, Building, DollarSign, ArrowRight, 
  Globe, Server, Users, TrendingUp 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

export default function Calculator() {
    const navigate = useNavigate();
    
    // --- 1. EXECUTIVE INPUTS (Baseline) ---
    const [industry, setIndustry] = useState('tech');
    const [monthlySpend, setMonthlySpend] = useState(50000); // $ USD Cloud Spend
    const [headcount, setHeadcount] = useState(250);
    const [region, setRegion] = useState('global'); // Affects Grid Intensity

    // --- 2. STRATEGIC LEVERS (Optimization) ---
    const [renewablesTarget, setRenewablesTarget] = useState(20); 
    const [cloudEfficiency, setCloudEfficiency] = useState(15); 

    // --- 3. HEURISTIC ENGINE ---
    const data = useMemo(() => {
        // Industry Factors: kgCO2e per $ of Cloud Spend
        // Tech is high because 100% of spend is infrastructure. 
        // Retail is lower because spend includes SaaS/Services mix.
        const industryFactors = {
            finance: { intensity: 0.15, label: "Finance & Banking" }, 
            tech: { intensity: 0.40, label: "Technology & SaaS" },
            manufacturing: { intensity: 0.50, label: "Manufacturing" },
            retail: { intensity: 0.25, label: "Retail & E-commerce" },
            media: { intensity: 0.30, label: "Media & Streaming" }
        };
        
        // Grid Carbon Intensity (gCO2e/kWh)
        // Used for Office emissions & Non-Green Cloud regions
        const regionFactors = {
            global: 436, // World Avg
            eu: 250,     // Europe Avg
            us: 370,     // US Avg
            apac: 550,   // Asia Pacific (Coal heavy)
            nordics: 40  // Hydro/Wind heavy
        };

        const indFactor = industryFactors[industry].intensity;
        const gridFactor = regionFactors[region] / 1000; // Convert g to kg

        // --- CALCULATION (Annualized) ---
        
        // A. CLOUD (Scope 3)
        // Base: Spend * Industry Intensity
        const cloudBAU = (monthlySpend * 12) * indFactor;
        
        // B. WORKFORCE (Scope 2)
        // Base: Headcount * Energy per Head * Grid Intensity
        // Assumption: 2500 kWh per employee per year (Office + Equipment)
        const officeBAU = headcount * 2500 * gridFactor;

        const totalBAU_kg = cloudBAU + officeBAU;

        // C. OPTIMIZATION
        // 1. Buying Green: Reduces Cloud Intensity (Market-based approach)
        // Renewables target applies to cloud primarily
        const cloudAfterRenewables = cloudBAU * (1 - (renewablesTarget / 100));
        
        // 2. Being Efficient: Reduces Energy Usage (Location-based approach)
        // Cloud Efficiency (Rightsizing, Idle, Archiving)
        const cloudFinal = cloudAfterRenewables * (1 - (cloudEfficiency / 100));

        // 3. Office Optimization (constant small improvement assumed)
        const officeFinal = officeBAU * 0.95;

        const totalOpt_kg = cloudFinal + officeFinal;
        const totalSavings_kg = totalBAU_kg - totalOpt_kg;

        // D. FINANCIALS
        // Efficiency gains = Direct Bill Savings
        // Assumption: 1% efficiency = 0.8% spend reduction (effort overhead)
        const annualBillSavings = (monthlySpend * 12) * ((cloudEfficiency / 100) * 0.8);

        return {
            bau: Math.round(totalBAU_kg / 1000),      // Tonnes
            optimized: Math.round(totalOpt_kg / 1000), // Tonnes
            savings: Math.round(totalSavings_kg / 1000), // Tonnes
            percent: Math.round((1 - (totalOpt_kg/totalBAU_kg)) * 100),
            billSavings: Math.round(annualBillSavings),
            split: [
                { name: 'Cloud Infrastructure', value: Math.round(cloudBAU/1000), color: '#00C6C2' },
                { name: 'Office & Workforce', value: Math.round(officeBAU/1000), color: '#3b82f6' }
            ]
        };
    }, [industry, monthlySpend, headcount, region, renewablesTarget, cloudEfficiency]);

    return (
        <div className="min-h-full p-4 md:p-8 max-w-[1800px] mx-auto animate-in fade-in duration-500">
            
            {/* HER0 HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-white/5 pb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2 text-secondary font-mono text-xs tracking-widest uppercase">
                        <TrendingUp size={14} /> Strategic Analysis Tool
                    </div>
                    <h1 className="text-4xl font-heading font-bold text-white mb-2">Decarbonization Opportunity</h1>
                    <p className="text-gray-400 max-w-2xl">
                        High-level estimation of your organization's carbon reduction potential. 
                        Adjust levers to forecast financial and environmental ROI before detailed project scoping.
                    </p>
                </div>
                
                <div className="flex gap-4">
                     <div className="text-right px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                        <div className="text-emerald-400 font-bold text-3xl">${(data.billSavings/1000).toFixed(1)}k</div>
                        <div className="text-xs text-emerald-500/70 uppercase font-bold tracking-wider">Annual Savings</div>
                    </div>
                    <div className="text-right px-6 py-2 bg-secondary/10 border border-secondary/20 rounded-xl">
                        <div className="text-secondary font-bold text-3xl">{data.percent}%</div>
                        <div className="text-xs text-secondary/70 uppercase font-bold tracking-wider">Emissions Cut</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                
                {/* === LEFT COLUMN: CONFIGURATION === */}
                <div className="xl:col-span-4 space-y-6">
                    
                    {/* 1. INPUTS CARD */}
                    <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-6 text-white border-b border-white/5 pb-4">
                            <Building size={20} className="text-blue-400"/> 
                            <h3 className="font-bold">Company Profile</h3>
                        </div>

                        <div className="space-y-4">
                            <SelectInput 
                                label="Primary Industry" 
                                icon={Server}
                                value={industry} 
                                onChange={setIndustry}
                                options={[
                                    {val: 'tech', txt: 'Technology / SaaS'},
                                    {val: 'finance', txt: 'Finance & Banking'},
                                    {val: 'retail', txt: 'Retail & E-commerce'},
                                    {val: 'media', txt: 'Media & Production'},
                                    {val: 'manufacturing', txt: 'Manufacturing'}
                                ]}
                            />

                            <SelectInput 
                                label="HQ Region" 
                                icon={Globe}
                                value={region} 
                                onChange={setRegion}
                                options={[
                                    {val: 'global', txt: 'Global Average'},
                                    {val: 'eu', txt: 'Europe (EU)'},
                                    {val: 'us', txt: 'North America (US)'},
                                    {val: 'apac', txt: 'Asia Pacific (APAC)'},
                                    {val: 'nordics', txt: 'Nordics (Low Carbon)'}
                                ]}
                            />

                            <NumberInput 
                                label="Monthly Cloud Spend" 
                                icon={DollarSign}
                                value={monthlySpend} 
                                onChange={setMonthlySpend}
                                min={5000} step={5000} unit="$"
                            />

                            <NumberInput 
                                label="Total Employees" 
                                icon={Users}
                                value={headcount} 
                                onChange={setHeadcount}
                                min={10} step={10} unit="FTE"
                            />
                        </div>
                    </div>

                    {/* 2. LEVERS CARD */}
                    <div className="bg-gradient-to-br from-secondary/5 to-transparent border border-secondary/20 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-6 text-white border-b border-white/5 pb-4">
                            <Sliders size={20} className="text-secondary"/> 
                            <h3 className="font-bold">Strategy Levers</h3>
                        </div>

                        <div className="space-y-8">
                            <RangeInput 
                                label="Green Energy Procurement"
                                desc="Percent of energy matched with RECs or Green Tariffs."
                                value={renewablesTarget}
                                onChange={setRenewablesTarget}
                                color="text-emerald-400"
                                accent="bg-emerald-400"
                            />

                            <RangeInput 
                                label="Cloud Optimization"
                                desc="Efficiency gains from rightsizing, spot instances, and refactoring."
                                value={cloudEfficiency}
                                onChange={setCloudEfficiency}
                                color="text-cyan-400"
                                accent="bg-cyan-400"
                            />
                        </div>
                    </div>
                </div>


                {/* === RIGHT COLUMN: DASHBOARD === */}
                <div className="xl:col-span-8 flex flex-col gap-6">
                    
                    {/* ROW 1: BREAKDOWN & KPIS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[320px]">
                        
                        {/* CHART: SOURCES */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Emissions Sources (BAU)</h4>
                            <div className="flex-1 flex items-center justify-center relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data.split}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {data.split.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{backgroundColor: '#000', borderRadius: '8px', border: '1px solid #333'}} itemStyle={{color: '#fff'}} />
                                        <Legend verticalAlign="bottom" height={36}/>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="text-center mt-[-30px]">
                                        <div className="text-3xl font-bold text-white">{data.bau}</div>
                                        <div className="text-xs text-gray-500">tCO2e</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                         {/* STATS GRID */}
                         <div className="grid grid-rows-2 gap-6">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
                                <div>
                                    <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Projected Footprint</div>
                                    <div className="text-4xl font-bold text-white mb-1">{data.optimized} <span className="text-lg text-gray-500 font-normal">tCO2e</span></div>
                                    <div className="text-sm text-secondary font-medium flex items-center gap-1">
                                        <TrendingUp size={14} className="rotate-180"/> -{data.savings} tonnes avoided
                                    </div>
                                </div>
                                <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center text-white/20">
                                    <Cloud size={32} />
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-2xl p-6 flex items-center justify-between">
                                <div>
                                    <div className="text-emerald-500/80 text-xs font-bold uppercase tracking-wider mb-1">Financial Opportunity</div>
                                    <div className="text-4xl font-bold text-white mb-1">${(data.billSavings/1000).toFixed(1)}k <span className="text-lg text-gray-500 font-normal">/ yr</span></div>
                                    <div className="text-sm text-gray-400">Pure efficiency savings</div>
                                </div>
                                <div className="h-16 w-16 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                                    <DollarSign size={32} />
                                </div>
                            </div>
                         </div>
                    </div>


                    {/* ROW 2: TRAJECTORY CHART */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex-1 min-h-[300px] flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">5-Year Impact Trajectory</h4>
                            <div className="flex gap-4 text-xs">
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500/50"></div> Business as Usual</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary"></div> Optimized Path</div>
                            </div>
                        </div>

                        <div className="flex-1 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={[
                                    { year: '2025', bau: data.bau, opt: data.bau },
                                    { year: '2026', bau: Math.round(data.bau * 1.05), opt: Math.round(data.optimized * 1.0) },
                                    { year: '2027', bau: Math.round(data.bau * 1.10), opt: Math.round(data.optimized * 0.95) },
                                    { year: '2028', bau: Math.round(data.bau * 1.15), opt: Math.round(data.optimized * 0.90) },
                                    { year: '2029', bau: Math.round(data.bau * 1.20), opt: Math.round(data.optimized * 0.85) },
                                ]} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorBau" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorOpt" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00C6C2" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#00C6C2" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                    <XAxis dataKey="year" stroke="#666" axisLine={false} tickLine={false} />
                                    <YAxis stroke="#666" axisLine={false} tickLine={false} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                                        labelStyle={{ color: '#888' }}
                                    />
                                    <Area type="monotone" dataKey="bau" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorBau)" name="No Action" />
                                    <Area type="monotone" dataKey="opt" stroke="#00C6C2" strokeWidth={2} fillOpacity={1} fill="url(#colorOpt)" name="Strategic Plan" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>


                    {/* ROW 3: CTA */}
                    <div className="bg-black/40 border border-white/10 border-l-4 border-l-secondary rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-black/60 transition-colors cursor-pointer group" onClick={() => navigate('/build')}>
                        <div>
                            <h4 className="text-lg font-bold text-white mb-1 group-hover:text-secondary transition-colors">Start Building a Project Scenario</h4>
                            <p className="text-gray-400 text-sm">Take these strategic targets and apply them to a specific project roadmap.</p>
                        </div>
                        <button className="bg-secondary text-primary font-bold py-3 px-8 rounded-xl shadow-lg shadow-black/50 flex items-center gap-2 group-hover:scale-105 transition-all">
                            Create Scenario <ArrowRight size={18} />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

// --- SUBCOMPONENTS FOR CLEANER CODE ---

function SelectInput({ label, icon: Icon, value, onChange, options }) {
    return (
        <div>
            <label className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                <Icon size={14} /> {label}
            </label>
            <div className="relative">
                <select 
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-black/40 text-white border border-white/10 rounded-xl p-3 pl-4 appearance-none hover:border-white/20 focus:border-secondary outline-none transition-colors cursor-pointer"
                >
                    {options.map(o => <option key={o.val} value={o.val}>{o.txt}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
            </div>
        </div>
    )
}

function NumberInput({ label, icon: Icon, value, onChange, min, step, unit }) {
    return (
        <div>
             <label className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                <Icon size={14} /> {label}
            </label>
            <div className="flex items-center bg-black/40 rounded-xl border border-white/10 group focus-within:border-secondary transition-colors">
                <input 
                    type="number"
                    value={value}
                    min={min} step={step}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="w-full bg-transparent text-white p-3 pl-4 outline-none font-mono"
                />
                <div className="pr-4 text-gray-500 font-bold select-none">{unit}</div>
            </div>
        </div>
    )
}

function RangeInput({ label, desc, value, onChange, color, accent }) {
    return (
        <div>
            <div className="flex justify-between mb-2">
                <label className="text-white font-medium">{label}</label>
                <span className={`font-bold ${color}`}>{value}%</span>
            </div>
            <p className="text-xs text-gray-500 mb-3 leading-snug">{desc}</p>
            <input 
                type="range" min="0" max="100" 
                value={value} 
                onChange={(e) => onChange(Number(e.target.value))}
                className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-white/10 accent-${accent.replace('bg-', '')}`}
            />
            {/* Custom Range Styles handled via tailwind accent-color usually, but for reliability we trust the browser default with dark mode scheme */}
        </div>
    )
}