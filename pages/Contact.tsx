import React, { useState, useRef, useEffect } from 'react';
import { Mail, MapPin, Send, Loader2, MessageSquare, Bot } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const Contact: React.FC = () => {
  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm Hasan's AI assistant. Ask me anything about his skills, experience, or projects." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const responseText = await sendMessageToGemini(userMsg);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Get In Touch</h1>
          <p className="text-gray-400 text-lg">Available for freelance and full-time opportunities.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Contact Info & Form */}
          <div className="space-y-8">
            <div className="bg-dark-800 p-8 rounded-xl border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-tech-500" /> 
                Contact Info
              </h3>
              <div className="space-y-4">
                 <div className="flex items-center text-gray-300 hover:text-white transition-colors">
                   <Mail className="w-5 h-5 mr-3 text-gray-500" />
                   <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
                 </div>
                 <div className="flex items-center text-gray-300">
                   <MapPin className="w-5 h-5 mr-3 text-gray-500" />
                   <span>{PERSONAL_INFO.location}</span>
                 </div>
              </div>
            </div>

            <div className="bg-dark-800 p-8 rounded-xl border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("This is a static demo form."); }}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                  <input type="text" id="name" className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-tech-500 transition-colors" placeholder="Your Name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <input type="email" id="email" className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-tech-500 transition-colors" placeholder="your@email.com" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                  <textarea id="message" rows={4} className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-tech-500 transition-colors" placeholder="Hello..." />
                </div>
                <button type="submit" className="w-full bg-tech-600 hover:bg-tech-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: AI Chat */}
          <div className="bg-dark-800 rounded-xl border border-white/10 overflow-hidden flex flex-col h-[600px] shadow-2xl">
            <div className="bg-gradient-to-r from-tech-900 to-dark-900 p-4 border-b border-white/5 flex items-center justify-between">
               <div className="flex items-center">
                 <div className="bg-tech-500/20 p-2 rounded-lg mr-3">
                   <Bot className="w-6 h-6 text-tech-400" />
                 </div>
                 <div>
                   <h3 className="font-bold text-white text-sm">Ask my Resume</h3>
                   <p className="text-xs text-tech-400">Powered by Gemini 2.5 Flash</p>
                 </div>
               </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20" ref={scrollRef}>
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-tech-600 text-white rounded-br-none' 
                      : 'bg-dark-700 text-gray-200 border border-white/5 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                  <div className="bg-dark-700 text-gray-400 px-4 py-3 rounded-2xl rounded-bl-none flex items-center">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-dark-900 border-t border-white/5">
              <form onSubmit={handleSendMessage} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="E.g., What is Hasan's experience with Python?"
                  className="w-full bg-dark-800 text-white placeholder-gray-500 border border-white/10 rounded-full pl-5 pr-12 py-3 focus:outline-none focus:border-tech-500 focus:ring-1 focus:ring-tech-500 transition-all"
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-tech-600 text-white rounded-full hover:bg-tech-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;