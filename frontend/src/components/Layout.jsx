import Sidebar from './Sidebar';
import Header from './Header';
import CarbonPilot from './CarbonPilot'; // Import the new AI Assistant

export default function Layout({ children, title = "Dashboard" }) {
    return (
        <div className="flex min-h-screen bg-primary text-white font-body selection:bg-secondary selection:text-primary">
            <Sidebar />
            
            <div className="flex-1 ml-0 lg:ml-64 flex flex-col transition-all duration-300">
                <Header title={title} />
                
                <main className="flex-1 p-6 lg:p-8 overflow-x-hidden relative">
                    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </main>
            </div>
            
            {/* AI Assistant Overlay */}
            <CarbonPilot />
        </div>
    );
}
