
import React from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onBack }) => {
  return (
    <div className="max-w-6xl mx-auto py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 font-bold mb-10 transition-all group"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
        Back to Marketplace
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="relative group">
          <div className="aspect-square rounded-[3.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute top-6 left-6 px-6 py-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl text-xs font-black text-indigo-600 uppercase tracking-[0.2em] shadow-xl">
            {product.category}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5 text-sm font-black text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-4 py-1 rounded-xl">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                {product.rating} (Verified Product)
              </div>
              <span className="text-emerald-500 font-bold text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                In Stock
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight mb-4">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-indigo-600">KES {product.price.toLocaleString()}</span>
              <span className="text-slate-400 line-through text-lg font-bold">KES {(product.price * 1.2).toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border-2 border-slate-50 dark:border-slate-800 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">About this item</h3>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-3xl text-center">
              <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Shipping</span>
              <span className="font-bold text-slate-900 dark:text-white">Nairobi Express</span>
            </div>
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-3xl text-center">
              <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Authenticity</span>
              <span className="font-bold text-slate-900 dark:text-white">Susan Certified</span>
            </div>
          </div>

          <button 
            onClick={() => onAddToCart(product)}
            className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-6 rounded-[2rem] font-black text-2xl hover:bg-indigo-600 dark:hover:bg-indigo-700 transition-all shadow-2xl active:scale-[0.98] flex items-center justify-center gap-4"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Add to Bag
          </button>
          
          <p className="text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
            Eligible for free M-Pesa delivery across Kenya
          </p>
        </div>
      </div>
    </div>
  );
};
