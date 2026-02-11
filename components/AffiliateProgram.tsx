
import React from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';

interface DropshipHubProps {
  onAddToCart: (p: Product) => void;
  onViewDetail: (p: Product) => void;
}

export const AffiliateProgram: React.FC<DropshipHubProps> = ({ onAddToCart, onViewDetail }) => {
  const dropshipProducts = PRODUCTS.filter(p => p.dropshipSource);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -z-10"></div>
        <span className="inline-block bg-indigo-600 text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.4em] mb-8 shadow-xl">Exclusive Partnerships</span>
        <h1 className="text-6xl sm:text-[7rem] font-black text-slate-900 dark:text-white tracking-tighter mb-8 leading-none">
          Global <span className="text-indigo-600 italic">Finds.</span>
        </h1>
        <p className="text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-bold leading-relaxed">
          Susan bridges the gap. We partner with giants like Amazon, Farfetch, and Zalando to bring you hardware and tech that's usually out of reach.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {dropshipProducts.map(p => (
          <div key={p.id} className="group bg-white dark:bg-slate-900 rounded-[4rem] overflow-hidden border-2 border-slate-50 dark:border-white/5 shadow-sm hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.2)] transition-all duration-700 flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer" onClick={() => onViewDetail(p)}>
              <img 
                src={p.image} alt={p.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms]" 
              />
              <div className="absolute top-8 left-8 flex items-center gap-3">
                 <div className="px-5 py-2 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl">
                   {p.dropshipSource}
                 </div>
                 <div className="px-4 py-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest shadow-xl border border-white/20">
                    Imported
                 </div>
              </div>
            </div>
            <div className="p-12 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter">{p.name}</h3>
                <div className="text-amber-500 font-black flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-xl">
                  {p.rating}
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-lg line-clamp-2 mb-10 leading-relaxed font-bold">{p.description}</p>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2 italic">Landing in Kenya</span>
                  <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">KES {p.price.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => onAddToCart(p)}
                  className="w-20 h-20 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center hover:bg-indigo-700 hover:shadow-2xl transition-all active:scale-90 shadow-xl"
                >
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M12 5v14M5 12h14"/></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-32 p-20 bg-white dark:bg-slate-900 rounded-[5rem] text-center border-2 border-dashed border-indigo-200 dark:border-indigo-900/50 relative overflow-hidden group">
        <div className="absolute inset-0 bg-indigo-600/5 dark:bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
           <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white mx-auto shadow-2xl">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
           </div>
           <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Susan's Vetting Promise</h2>
           <p className="text-xl text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
              Every international order is physically inspected by our team upon arrival in Nairobi to ensure hardware specifications and authenticity meet our standards.
           </p>
        </div>
      </div>
    </div>
  );
};
