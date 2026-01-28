import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, GitBranch, BarChart3, ChevronRight, Zap, Target, Leaf } from 'lucide-react';

export default function Hub() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-primary relative overflow-hidden flex flex-col items-center selection:bg-secondary selection:text-primary font-sans">
            
            {/* --- Ambient Background Effects --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Darker base gradient for more contrast */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary via-[#081828] to-primary"></div>
                
                 {/* Subtle glowing orbs */}
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] animate-pulse duration-[10000ms]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse duration-[15000ms]"></div>
                
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
            </div>

            {/* --- Upward Triangle Portal Effect --- */}
            <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[150vw] h-[85vh] z-0 pointer-events-none"
                style={{
                    clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                    background: "linear-gradient(to bottom, rgba(0, 198, 194, 0.03), rgba(0, 198, 194, 0.0) 80%)"
                }}
            />

            {/* --- Main Content Container --- */}
            <div className="relative z-10 w-full max-w-6xl flex-1 flex flex-col items-center pt-24 pb-12 px-6">
                
                {/* Header Group */}
                <div className="text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <div className="relative inline-block mb-8">
                        {/* Logo Circle Glow */}
                        <div className="absolute inset-0 bg-secondary/20 rounded-full blur-xl animate-pulse"></div>
                        <div className="relative w-24 h-24 bg-primary border border-white/10 rounded-full flex items-center justify-center shadow-2xl shadow-secondary/20">
                            <Leaf className="text-secondary w-10 h-10" />
                        </div>
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-4 tracking-tight">
                        Carbon<span className="text-secondary">IQ</span>
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto rounded-full mb-6 opacity-50"></div>
                    <p className="text-secondary font-mono tracking-[0.2em] text-sm uppercase">
                        Intelligent Carbon Monitoring
                    </p>
                </div>

                {/* --- The Navigation Triangle --- */}
                <div className="w-full max-w-5xl flex-1 flex flex-col justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
                        
                        {/* 1️⃣ DASHBOARD (Center/Top visually in grid on mobile, Left on large desktop? Or standard 3-col) */}
                        {/* Let's stick to the 3-column layout requested in code snippet but styled up */}

                        {/* Card 1: Dashboard (Left) */}
                        <button 
                            onClick={() => navigate('/dashboard')}
                            className="group relative h-64 w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-secondary/50 rounded-3xl p-8 flex flex-col items-start justify-between transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,198,194,0.15)] hover:-translate-y-2 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-32 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-secondary/10 transition-all duration-500"></div>
                            
                            <div className="p-4 bg-secondary/10 rounded-2xl text-secondary group-hover:bg-secondary group-hover:text-primary transition-colors duration-300">
                                <LayoutDashboard size={28} />
                            </div>
                            
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-secondary transition-colors">Dashboard</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">Track performance signals and emissions progress.</p>
                                <div className="flex items-center text-xs font-bold text-secondary tracking-widest uppercase opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    Launch Orbit <ChevronRight size={14} className="ml-1" />
                                </div>
                            </div>
                        </button>

                        {/* Card 2: Scenarios (Center - Featured) */}
                        <button 
                            onClick={() => navigate('/build-scenario')}
                            className="group relative h-72 w-full bg-gradient-to-b from-[#0c303d] to-primary border border-secondary/30 hover:border-secondary rounded-3xl p-8 flex flex-col items-start justify-between transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,198,194,0.25)] hover:-translate-y-3 z-20 md:-mt-8"
                        >
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="p-4 bg-secondary text-primary rounded-2xl shadow-lg shadow-secondary/20 group-hover:scale-110 transition-transform duration-300">
                                <GitBranch size={32} />
                            </div>
                            
                            <div className="relative">
                                <span className="absolute -top-12 right-0 px-3 py-1 bg-secondary/20 border border-secondary/30 rounded-full text-[10px] font-bold text-secondary uppercase tracking-wider backdrop-blur-sm">
                                    Interactive
                                </span>
                                <h3 className="text-2xl font-bold text-white mb-2">Build Scenarios</h3>
                                <p className="text-gray-300 text-sm leading-relaxed mb-4">Model infrastructure changes and predict impact.</p>
                                <div className="flex items-center text-xs font-bold text-white tracking-widest uppercase group-hover:text-secondary transition-colors">
                                    Enter Forge <ChevronRight size={14} className="ml-1" />
                                </div>
                            </div>
                        </button>

                        {/* Card 3: Analysis (Right) */}
                        <button 
                            onClick={() => navigate('/analysis')}
                            className="group relative h-64 w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 rounded-3xl p-8 flex flex-col items-start justify-between transition-all duration-500 hover:shadow-[0_0_40px_rgba(192,132,252,0.15)] hover:-translate-y-2 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-32 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/10 transition-all duration-500"></div>
                            
                            <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400 group-hover:bg-purple-400 group-hover:text-primary transition-colors duration-300">
                                <BarChart3 size={28} />
                            </div>
                            
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">View Results</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">Deep dive into granular emission vectors.</p>
                                <div className="flex items-center text-xs font-bold text-purple-400 tracking-widest uppercase opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    Access Data <ChevronRight size={14} className="ml-1" />
                                </div>
                            </div>
                        </button>

                    </div>
                </div>

                {/* Footer Status */}
                <div className="mt-16 text-center animate-in fade-in duration-1000 delay-500">
                    <div className="flex items-center justify-center gap-2 mb-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                         <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">System Online</span>
                    </div>
                    <div className="text-[10px] text-gray-600 font-mono">
                        CarbonIQ v2.4.0 • Secure Connection
                    </div>
                </div>

            </div>
        </div>
    );
}