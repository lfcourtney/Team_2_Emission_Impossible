import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, Leaf, CheckCircle, ArrowLeft, AlertCircle, BarChart3, Globe, ShieldCheck } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Steps: 1 = Email, 2 = Password, 3 = Success
    const [step, setStep] = useState(1);
    const [error, setError] = useState(false);
    
    const { login, authenticatedUser } = useAuth();
    const navigate = useNavigate();

    const handleNext = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setStep(2);
            setError(false);
        }
    };

    const handleBack = () => {
        setStep(1);
        setError(false);
        setPassword('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(false);

        const success = await login(email, password);

        if (success) {
            setStep(3);
            // Redirect after a brief success animation
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } else {
            setError(true);
        }
    };

    // Define login messages
    function getGreetingMessage() {
        const index = Math.floor(Math.random() * loginMessages.length);
        return loginMessages[index];
    }

    const loginMessages = [
        "Sustainability starts here.",
        "Empower your green initiatives.",
        "Data-driven environmental impact.",
        "Sustainability meets Intelligence.",
    ]

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-primary text-white">
            
            {/* Left Panel - Interactive Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative overflow-hidden">
                
                {/* Background Decorative Elements for Left Panel */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-t from-secondary/5 to-transparent rounded-full blur-3xl"></div>
                </div>

                <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-500">
                    
                    {/* Brand Header */}
                    <div className="mb-10 text-center lg:text-left">
                        <div className="inline-flex items-center gap-3 mb-2">
                            <h1 className="text-4xl font-semibold text-white tracking-tight">Carbon<span className="font-bold">IQ</span></h1>
                        </div>
                        <p className="text-gray-400 pl-1">Transforming data into sustainable action.</p>
                    </div>

                    {/* Main Interaction Card */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-500">
                        
                        {/* Step Indicators */}
                        <div className="flex items-center gap-2 mb-8">
                            {[1, 2, 3].map((s) => (
                                <div 
                                    key={s}
                                    className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                                        step === s ? 'w-12 bg-secondary shadow-[0_0_10px_rgba(0,198,194,0.5)]' : 
                                        step > s ? 'w-4 bg-secondary/40' : 
                                        'w-4 bg-white/10'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Step Titles */}
                        <div className="mb-8 min-h-[80px]">
                            <h2 className="text-3xl font-heading font-bold text-white mb-2 transition-all">
                                {step === 1 && "Welcome Back"}
                                {step === 2 && "Enter Password"}
                                {step === 3 && "Success!"}
                            </h2>
                            <p className="text-secondary/90 font-medium">
                                {step === 1 && "Enter your email to continue."}
                                {step === 2 && "Please enter your password."}
                                {step === 3 && `Welcome aboard, ${authenticatedUser?.fullName || 'User'}!`}
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                                    <div className="text-sm">
                                        <p className="text-red-200 font-bold">Login Failed</p>
                                        <p className="text-red-300/80">Incorrect email or password.</p>
                                    </div>
                            </div>
                        )}

                        {/* Form Body */}
                        <form onSubmit={step === 1 ? handleNext : handleSubmit}>
                            <div className="relative overflow-hidden min-h-[100px]">
                                
                                {/* Step 1: Email Input */}
                                <div className={`transition-all duration-500 ease-in-out absolute w-full ${step === 1 ? 'translate-x-0 opacity-100 relative' : '-translate-x-full opacity-0 absolute top-0'}`}>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-primary/40 border border-white/10 focus:border-secondary rounded-xl px-4 py-3.5 text-white placeholder-gray-600 outline-none transition-all focus:ring-2 focus:ring-secondary/20 shadow-inner"
                                        placeholder="name@company.com"
                                        autoFocus
                                    />
                                </div>

                                {/* Step 2: Password Input */}
                                <div className={`transition-all duration-500 ease-in-out absolute w-full ${step === 2 ? 'translate-x-0 opacity-100 relative' : step < 2 ? 'translate-x-full opacity-0' : '-translate-x-full opacity-0 absolute top-0'}`}>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Password</label>
                                    <input
                                        type="password"
                                        required={step === 2}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (error) setError(false);
                                        }}
                                        className={`w-full bg-primary/40 border focus:border-secondary rounded-xl px-4 py-3.5 text-white placeholder-gray-600 outline-none transition-all focus:ring-2 focus:ring-secondary/20 shadow-inner ${error ? 'border-red-500/50' : 'border-white/10'}`}
                                        placeholder="••••••••"
                                        autoFocus={step === 2}
                                    />
                                    <div className="flex justify-between items-center mt-3 ml-1">
                                        <label className="flex items-center text-xs text-gray-400 cursor-pointer hover:text-white transition-colors">
                                            <input type="checkbox" className="mr-2 rounded border-white/10 bg-white/5 text-secondary focus:ring-offset-primary" />
                                            Remember me
                                        </label>
                                        <button type="button" className="text-xs text-secondary hover:text-white transition-colors">Forgot password?</button>
                                    </div>
                                </div>

                                {/* Step 3: Success Animation */}
                                <div className={`flex flex-col items-center justify-center py-2 transition-all duration-500 absolute w-full ${step === 3 ? 'translate-x-0 opacity-100 relative' : 'translate-x-[150%] opacity-0 absolute top-0'}`}>
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-secondary blur-xl opacity-20 animate-pulse rounded-full"></div>
                                        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,198,194,0.4)] relative z-10">
                                            <CheckCircle className="w-10 h-10 text-primary" />
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-800 h-1.5 mt-4 rounded-full overflow-hidden">
                                        <div className="bg-secondary h-full animate-[width_1.5s_ease-in-out_forwards] w-full origin-left transition-all duration-1000"></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-3 animate-pulse">Redirecting to dashboard...</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex gap-3">
                                {step === 2 && (
                                    <button 
                                        type="button" 
                                        onClick={handleBack}
                                        className="px-5 py-3.5 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors font-semibold flex items-center justify-center"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                    </button>
                                )}
                                
                                {step !== 3 && (
                                    <button
                                        type="submit"
                                        className="flex-1 group bg-secondary hover:bg-white hover:text-primary text-primary font-bold py-3.5 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center shadow-[0_4px_20px_rgba(0,198,194,0.2)] hover:shadow-[0_4px_30px_rgba(0,198,194,0.4)]"
                                    >
                                        {step === 1 ? 'Continue' : 'Sign In'}
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Don't have an account? <span className="text-secondary/80 cursor-pointer hover:text-white hover:underline transition-colors">Contact Sales</span>
                    </div>
                </div>
            </div>

            {/* Right Panel - Cinematic Video Background */}
            <div className="hidden lg:block lg:w-[55%] relative overflow-hidden bg-black">
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-primary/30 z-10 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/40 z-20"></div>
                
                {/* Video */}
                <video className="absolute inset-0 w-full h-full object-cover opacity-80" autoPlay loop muted playsInline>
                    <source
                        src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
                        type="video/mp4"
                    />
                </video>

                {/* Floating Stats Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-16 z-30">
                    <div className="max-w-2xl animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-300">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-secondary mb-6">
                            <span className="text-secondary">✦</span>
                            New Generation Platform
                        </div>

                        {/* Page Greeting */}
                        <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6 leading-tight drop-shadow-lg">
                            {getGreetingMessage()}
                        </h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors cursor-default group">
                                <div className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <BarChart3 className="w-5 h-5 text-secondary" />
                                </div>
                                <h3 className="text-white font-bold text-lg mb-1">Analytics</h3>
                                <p className="text-gray-400 text-xs leading-relaxed">Real-time data visualization and reporting.</p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors cursor-default group">
                                <div className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Globe className="w-5 h-5 text-secondary" />
                                </div>
                                <h3 className="text-white font-bold text-lg mb-1">Global Scale</h3>
                                <p className="text-gray-400 text-xs leading-relaxed">Track emissions across all your locations.</p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors cursor-default group">
                                <div className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <ShieldCheck className="w-5 h-5 text-secondary" />
                                </div>
                                <h3 className="text-white font-bold text-lg mb-1">Secure</h3>
                                <p className="text-gray-400 text-xs leading-relaxed">Enterprise-grade security for your data.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
