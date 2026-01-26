import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Zap, ArrowRight, Leaf } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        // Prevent form submission from refreshing the page
        event.preventDefault();
        const success = await login(email, password);

        // Only navigate to homepage if user is successfully signed in
        if (success) {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-2/3 h-full bg-primary z-0">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary/10 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-secondary/5 to-transparent rounded-full blur-3xl"></div>

                {/* Triangle motif from branding */}
                <svg className="absolute top-1/2 right-20 transform -translate-y-1/2 opacity-20" width="400" height="400" viewBox="0 0 100 100">
                    <polygon points="50,15 90,85 10,85" stroke="#00c6c2" strokeWidth="1" fill="none" />
                </svg>
            </div>

            <div className="relative z-10 w-full max-w-md p-8">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary mb-6 shadow-[0_0_20px_rgba(0,198,194,0.3)]">
                        <Leaf className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl font-heading font-bold text-white mb-2">CarbonIQ</h1>
                    <p className="text-secondary/80 text-lg">Transforming data into sustainable action.</p>
                </div>

                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <h2 className="text-xl font-heading font-semibold text-white mb-6">Sign In</h2>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-primary/50 border border-white/10 focus:border-secondary rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:ring-1 focus:ring-secondary/50"
                                placeholder="name@company.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-primary/50 border border-white/10 focus:border-secondary rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:ring-1 focus:ring-secondary/50"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-gray-400 cursor-pointer hover:text-white transition-colors">
                                <input type="checkbox" className="mr-2 rounded border-white/10 bg-white/5 text-secondary focus:ring-offset-primary" />
                                Remember me
                            </label>
                            <a href="#" className="text-secondary hover:underline">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            className="w-full group bg-secondary hover:bg-white text-primary font-bold py-3.5 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
                        >
                            Sign In
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-400">
                        Don't have an account? <span className="text-secondary cursor-pointer hover:underline">Contact Sales</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
