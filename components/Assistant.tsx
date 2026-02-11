
import React, { useState, useRef, useEffect } from 'react';
import { getShoppingAssistantResponse } from '../services/geminiService';
import { ChatMessage, GroundingSource } from '../types';

interface AssistantProps {
  cartItemIds: string[];
}

export const Assistant: React.FC<AssistantProps> = ({ cartItemIds }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I am Nova, your personal shopping assistant at Susan\'s Market. Need help finding smart hardware or comparing the latest tech?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const result = await getShoppingAssistantResponse(userMsg, cartItemIds);
    
    setMessages(prev => [...prev, { 
      role: 'model', 
      text: result.text,
      sources: result.sources
    }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-6 w-[380px] sm:w-[450px] h-[600px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-white/10 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="bg-indigo-600 p-8 flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
              </div>
              <div>
                <h3 className="font-black text-lg tracking-tight">Nova AI</h3>
                <span className="text-[10px] text-indigo-100 font-black flex items-center gap-2 uppercase tracking-widest">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_#34d399]"></span>
                  Market Expert
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-xl transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[90%] p-5 rounded-[2rem] text-sm font-bold leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-white/5 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-3 max-w-[85%] flex flex-col gap-2 p-4 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
                    <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                       Verified Sources
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {m.sources.slice(0, 3).map((source, sIdx) => (
                        <a 
                          key={sIdx}
                          href={source.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 hover:underline bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-white/5 truncate max-w-[150px]"
                        >
                          {source.title || 'View Reference'}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex flex-col items-start gap-3">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-[1.5rem] rounded-bl-none border border-slate-100 dark:border-white/5 shadow-sm flex gap-2 items-center">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 animate-pulse">Searching the web...</span>
              </div>
            )}
          </div>

          <div className="p-8 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5">
            <div className="flex gap-4">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about trends or prices..."
                className="flex-1 px-6 py-4 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-indigo-600 text-white p-4 rounded-2xl hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-200 dark:shadow-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center shadow-[0_20px_50px_rgba(79,70,229,0.4)] hover:bg-indigo-700 transition-all hover:scale-110 active:scale-90 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:rotate-12 transition-transform"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
      </button>
    </div>
  );
};
