import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CarbonPilot from '../components/CarbonPilot'; 
import Ribbon from '../components/Ribbon';

/**
 * The Layout component wraps around the main pages of the application.
 * This includes the Sidebar, Header, and main content area.
 * @param {*} children - Content to be displayed in the main content area.
 * @param {string} title - The title to be displayed in the Header. 
 */

export default function Layout({ children, title = "Dashboard" }) {
    return (
        <div className="flex min-h-screen bg-primary text-white font-body selection:bg-secondary selection:text-primary">
            <Sidebar />
            
            <div className="flex-1 ml-0 lg:ml-64 flex flex-col transition-all duration-300">
                {/* Pass the title of the page to the Header as a prop*/}
                <Header title={title} />

                <Ribbon />
                
                <main className="flex-1 p-6 lg:p-8 overflow-x-hidden relative">
                    {/* This wrapper centers the content and adds animation to child elements */}
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
