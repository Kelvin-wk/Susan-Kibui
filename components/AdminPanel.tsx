
import React, { useState, useEffect } from 'react';
import { Product, Inquiry } from '../types';
import { backend } from '../services/backendService';

interface AdminPanelProps {
  onAddProduct: (p: Product) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onAddProduct }) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'inquiries'>('inventory');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Fashion',
    image: '',
    featured: false
  });

  useEffect(() => {
    if (activeTab === 'inquiries') {
      fetchInquiries();
    }
  }, [activeTab]);

  const fetchInquiries = async () => {
    setLoading(true);
    const data = await backend.getInquiries();
    setInquiries(data);
    setLoading(false);
  };

  const handleMarkRead = async (id: string) => {
    await backend.markInquiryRead(id);
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, read: true } : inq));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: 'new-' + Date.now(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category as any,
      image: formData.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
      rating: 5.0,
      featured: formData.featured
    };
    onAddProduct(newProduct);
    setFormData({ name: '', description: '', price: '', category: 'Fashion', image: '', featured: false });
    alert("Product added successfully to Susan's Market!");
  };

  return (
    <div className="max-w-6xl mx-auto py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Market Manager</h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold">Hello Susan, manage your marketplace below.</p>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl gap-2">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'inventory' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Inventory
          </button>
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === 'inquiries' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Inquiries
            {inquiries.filter(i => !i.read).length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
            )}
          </button>
        </div>
      </div>

      {activeTab === 'inventory' ? (
        <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-[3rem] shadow-2xl border-2 border-slate-50 dark:border-slate-800 transition-colors">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Product Name</label>
                <input 
                  type="text" required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-50 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:border-indigo-600 outline-none transition-all font-bold dark:text-white"
                  placeholder="e.g. Premium Silk Scarf"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Category</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-50 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:border-indigo-600 outline-none transition-all font-bold dark:text-white"
                >
                  {['Shoes', 'Electronics', 'Fashion', 'Jewelry', 'Hair Care', 'Body Care', 'Accessories', 'Home'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Price (KES)</label>
                <input 
                  type="number" required
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-50 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:border-indigo-600 outline-none transition-all font-bold dark:text-white"
                  placeholder="0.00"
                />
              </div>
              <div className="flex items-center gap-3 p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
                <input 
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={e => setFormData({...formData, featured: e.target.checked})}
                  className="w-6 h-6 rounded-lg text-indigo-600 focus:ring-indigo-500 border-slate-300"
                />
                <label htmlFor="featured" className="text-sm font-black text-indigo-900 dark:text-indigo-300 uppercase tracking-widest">Feature on Homepage</label>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Image URL</label>
                <input 
                  type="url"
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-50 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:border-indigo-600 outline-none transition-all font-bold dark:text-white"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Description</label>
                <textarea 
                  required rows={5}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-50 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:border-indigo-600 outline-none transition-all font-bold dark:text-white resize-none"
                  placeholder="Tell users why this product is amazing..."
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-5 rounded-3xl font-black text-xl hover:bg-indigo-700 transition-all shadow-xl active:scale-[0.98]"
              >
                Add Product to Marketplace
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          {loading ? (
            <div className="py-20 text-center text-slate-400 font-bold animate-pulse">Loading inquiries...</div>
          ) : inquiries.length === 0 ? (
            <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
               <p className="text-xl font-bold text-slate-400">No inquiries found yet.</p>
            </div>
          ) : (
            inquiries.map(inq => (
              <div 
                key={inq.id} 
                className={`p-8 rounded-[2.5rem] border-2 transition-all hover:shadow-lg ${inq.read ? 'bg-white/50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 opacity-60' : 'bg-white dark:bg-slate-900 border-indigo-100 dark:border-indigo-900/30 shadow-md'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-1">{inq.subject}</span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">{inq.name}</h3>
                    <p className="text-sm font-bold text-slate-400">{inq.email}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 block mb-2">{new Date(inq.createdAt).toLocaleString()}</span>
                    {!inq.read && (
                      <button 
                        onClick={() => handleMarkRead(inq.id)}
                        className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-indigo-600 hover:text-white transition-all"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl italic text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  "{inq.message}"
                </div>
                <div className="mt-6 flex gap-4">
                   <a 
                    href={`mailto:${inq.email}`} 
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:underline"
                   >
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><rect width="20" height="16" x="2" y="4" rx="2"/></svg>
                     Reply via Email
                   </a>
                   <a 
                    href={`https://wa.me/254114718252?text=Hi Susan, following up on inquiry from ${inq.name}...`} 
                    target="_blank"
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:underline"
                   >
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
                     WhatsApp Sync
                   </a>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
