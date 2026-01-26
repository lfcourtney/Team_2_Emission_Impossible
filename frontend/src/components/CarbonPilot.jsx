//  Import necessary React components
import { useState, useRef, useEffect } from 'react';
// Import icons from lucide-react
import { MessageSquare, X, Send, Sparkles, Bot } from 'lucide-react';

/**
 * This component renders an inteactive chat interface for Carbon Pilot AI.
 * A selection of pre-defined prompts are provided for a demo experience.
 * @returns A JSX component representing the Carbon Pilot AI chat interface.
 */
export default function CarbonPilot() {
    // State to track open/closed status of chat
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: 'Hello! I\'m Carbon Pilot. I can help analyze your emission trends or suggest reduction strategies. How can I assist you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const suggestions = [
        "Analyze Q1 Scope 2 trends",
        "Suggest quick wins for Dublin",
        "Draft a sustainability report"
    ];

    const handleSend = async (text) => {
        if (!text.trim()) return;

        // User Message
        const userMsg = { id: Date.now(), type: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI "Thinking"
        setTimeout(() => {
            let botResponse = "I can certainly help with that. Based on the current dataset, switching the Dublin office to a renewable energy provider would reduce net emissions by approximately 18% annually.";

            if (text.toLowerCase().includes('report')) {
                botResponse = "I've generated a draft Executive Summary highlighting the 2.4% increase in vehicle fuel consumption. Would you like me to export this to PDF?";
            } else if (text.toLowerCase().includes('scope')) {
                botResponse = "Scope 2 (Indirect Energy) metrics indicate a spike in February due to increased heating requirements. Consider adjusting the BMS schedules.";
            }

            const botMsg = { id: Date.now() + 1, type: 'bot', text: botResponse };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center
                ${isOpen ? 'bg-red-500 rotate-90' : 'bg-gradient-to-r from-secondary to-blue-500 animate-bounce-subtle'}`}
            >
                {isOpen ? <X className="text-white" size={24} /> : <Bot className="text-primary" size={28} />}
            </button>

            {/* Chat Interface */}
            <div className={`fixed bottom-24 right-6 z-50 w-[380px] h-[500px] bg-primary/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right
                ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>

                {/* Header */}
                <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-white/5 rounded-t-2xl">
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                        <Sparkles size={18} className="text-primary" />
                    </div>
                    <div>
                        <h3 className="font-heading font-bold text-white text-sm">Carbon Pilot AI</h3>
                        <p className="text-xs text-green-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                            Online
                        </p>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.type === 'user'
                                    ? 'bg-secondary text-primary font-medium rounded-tr-none'
                                    : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/10 bg-white/5 rounded-b-2xl">
                    {messages.length < 3 && !isTyping && (
                        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 hide-scrollbar">
                            {suggestions.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(s)}
                                    className="whitespace-nowrap px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-secondary transition-colors"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                            placeholder="Ask me anything about your emissions..."
                            className="w-full bg-black/20 text-white text-sm rounded-xl pl-4 pr-10 py-3 outline-none focus:ring-1 focus:ring-secondary/50 placeholder-gray-500 border border-white/5"
                        />
                        <button
                            onClick={() => handleSend(input)}
                            className="absolute right-2 top-2 p-1 text-secondary hover:text-white transition-colors"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                    <div className="text-center mt-2">
                        <p className="text-[10px] text-gray-600">AI can make mistakes. Verify important info.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
