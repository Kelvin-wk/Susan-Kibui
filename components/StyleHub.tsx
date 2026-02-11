
import React, { useState } from 'react';
import { getStyleHubRecommendations } from '../services/geminiService';
import { Product } from '../types';

interface StyleHubProps {
  onAddToCart: (p: Product) => void;
}

export const StyleHub: React.FC<StyleHubProps> = ({ onAddToCart }) => {
  const [vibe, setVibe] = useState('');
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const quickVibes = [
    { label: '🏖️ Diani Beach Getaway', value: 'Lightweight linen, stylish sunglasses, and beach-ready accessories for a tropical vacation.' },
    { label: '🏢 Tech Office Upgrade', value: 'Minimalist high-tech hardware, ergonomic accessories, and sleek professional gadgets for a modern Nairobi office.' },
    { label: '✨ Date Night Glam', value: 'Elegant jewelry, premium body care, and sophisticated fashion for a luxury evening out.' },
    { label: '🛠️ Pro DIY Session', value: 'Heavy-duty hardware tools, durable shoes, and efficient industrial gadgets for a home renovation.' },
    { label: '🏡 Modern Living Room', value: 'Sleek ceramic vases, ambient smart lighting, and cozy throws for a minimalist Nairobi apartment.' },
  ];

  const handleConsult = async (customVibe?: string) => {
    const finalVibe = customVibe || vibe;
    if (!finalVibe.trim()) return;
    if (customVibe) setVibe(customVibe);
    
    setLoading(true);
    const results = await getStyleHubRecommendations(finalVibe);
    setRecommendations(results);
    setLoading(false);
    
    // Smooth scroll to results
    setTimeout(() => {
      const el = document.getElementById('results-anchor');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 relative">
      <div className="text-center mb-28 space-y-10">
        <div className="inline-flex items-center gap-4 bg-indigo-600 text-white text-[11px] font-black px-8 py-3 rounded-full uppercase tracking-[0.45em] mb-4 shadow-2xl animate-bounce-slow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          AI-Powered Stylist
        </div>
        <h1 className="text-7xl sm:text-[9.5rem] font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-none">
          Susan's <span className="text-indigo-600 italic block sm:inline">Style Hub.</span>
        </h1>
        <p className="text-3xl text-slate-500 dark:text-slate-400 max-w-4xl mx-auto font-bold leading-relaxed">
          Describe your mood, an upcoming event, or a hardware project, and Nova will curate your collection.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl p-2 rounded-[5rem] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.15)] border-4 border-white dark:border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[60%] aspect-square bg-indigo-600/5 rounded-full blur-[120px] -z-10 group-hover:bg-indigo-600/10 transition-all duration-1000"></div>
            <div className="relative z-10 p-3">
              <textarea
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                placeholder="Describe your vibe: e.g. 'A sleek modern kitchen renovation' or 'Elegant evening in Westlands'..."
                className="w-full p-12 sm:p-20 text-3xl sm:text-5xl font-black bg-slate-50/50 dark:bg-slate-950/50 rounded-[4rem] border-4 border-transparent focus:border-indigo-600 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all placeholder:text-slate-200 dark:placeholder:text-slate-800 resize-none h-[450px] leading-tight tracking-tighter shadow-inner dark:text-white"
              />
              
              {loading && (
                <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[4rem] flex flex-col items-center justify-center z-20 animate-in fade-in duration-500">
                  <div className="relative w-40 h-40 mb-10">
                    <div className="absolute inset-0 border-[10px] border-indigo-100 dark:border-indigo-900/30 rounded-full"></div>
                    <div className="absolute inset-0 border-[10px] border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                    <div className="absolute inset-6 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-2xl">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="animate-pulse"><path d="M12 2v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="M2 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="M12 18v4"/><path d="m16.24 16.24 2.83 2.83"/><path d="M18 12h4"/><path d="m16.24 7.76 2.83-2.83"/></svg>
                    </div>
                  </div>
                  <p className="text-2xl font-black text-indigo-600 uppercase tracking-[0.3em] animate-pulse">Scanning Catalogs...</p>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={() => handleConsult()}
            disabled={loading || !vibe.trim()}
            className="w-full group relative bg-slate-900 dark:bg-indigo-600 text-white py-12 rounded-[3.5rem] font-black text-4xl hover:bg-indigo-600 dark:hover:bg-indigo-700 transition-all shadow-[0_30px_60px_-15px_rgba(79,70,229,0.5)] disabled:opacity-50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative flex items-center justify-center gap-6">
              {loading ? 'Analyzing...' : 'Generate My Look'}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </button>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mb-10 pl-6">Quick Inspirations</h3>
          <div className="grid grid-cols-1 gap-5">
            {quickVibes.map((qv, i) => (
              <button
                key={i}
                onClick={() => handleConsult(qv.value)}
                disabled={loading}
                className="text-left p-10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-[3rem] border-2 border-transparent hover:border-indigo-600 hover:shadow-2xl transition-all group flex flex-col gap-3 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-indigo-600"><path d="m12 5 7 7-7 7M5 12h14"/></svg>
                </div>
                <span className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">{qv.label}</span>
                <span className="text-xs font-bold text-slate-400 line-clamp-1 uppercase tracking-widest">{qv.value}</span>
              </button>
            ))}
          </div>
          
          <div className="p-10 bg-indigo-50 dark:bg-indigo-950/40 rounded-[3rem] border border-indigo-100 dark:border-indigo-900/30 mt-12 relative">
             <div className="flex items-center gap-5 mb-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                </div>
                <h4 className="font-black text-indigo-900 dark:text-indigo-300 text-sm uppercase tracking-[0.2em]">Stylist Tips</h4>
             </div>
             <p className="text-lg font-bold text-indigo-700/80 dark:text-indigo-400/80 leading-relaxed italic">
               "Be as specific as possible! Mention room dimensions, preferred colors, or even your height for fashion picks."
             </p>
          </div>
        </div>
      </div>

      <div id="results-anchor" className="scroll-mt-32"></div>

      {recommendations.length > 0 && (
        <div className="space-y-24 animate-in fade-in slide-in-from-bottom-12 duration-1000 pb-32">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 border-b-4 border-slate-100 dark:border-white/5 pb-16">
             <div className="space-y-2">
                <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">AI Collection</h2>
                <p className="text-xl text-slate-400 font-bold">Selected specifically for your vibe.</p>
             </div>
             <div className="flex items-center gap-5 text-sm font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/20 px-8 py-4 rounded-[2rem] shadow-sm">
                <span className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(79,70,229,0.5)]"></span>
                Vibe Patterns Matched
             </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {recommendations.map(p => (
              <div key={p.id} className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[4rem] p-10 border-2 border-white dark:border-white/5 hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.2)] transition-all duration-700 flex flex-col">
                <div className="relative aspect-square mb-10 overflow-hidden rounded-[3rem] shadow-xl">
                   <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                   <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter leading-none line-clamp-1">{p.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-bold text-lg mb-10 line-clamp-2 leading-relaxed">{p.description}</p>
                <div className="mt-auto flex items-center justify-between pt-8 border-t border-slate-50 dark:border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic leading-none mb-2">Susan's Price</span>
                    <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">KES {p.price.toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={() => onAddToCart(p)}
                    className="w-20 h-20 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-2xl"
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M12 5v14M5 12h14"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center pt-16">
            <button 
              onClick={() => { setRecommendations([]); setVibe(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-16 py-8 rounded-[2.5rem] border-2 border-slate-200 dark:border-white/10 text-slate-400 font-black uppercase text-sm tracking-[0.5em] hover:text-indigo-600 hover:border-indigo-600 transition-all active:scale-95"
            >
              Start New Style Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
