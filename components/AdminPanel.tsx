
import React, { useState, useEffect } from 'react';
import { Product, Inquiry, Order, User } from '../types';
import { CATEGORIES } from '../constants';
import { backend } from '../services/backendService';
import { generateReceipt } from '../services/ReceiptGenerator';

interface AdminPanelProps {
  onAddProduct: (p: Product) => void;
  onUpdateProduct: (id: string, updates: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
  products: Product[];
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onAddProduct, onUpdateProduct, onDeleteProduct, products }) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'inquiries' | 'orders'>('inventory');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);
  const [showSeedConfirm, setShowSeedConfirm] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Fashion',
    image: '',
    featured: false
  });

  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    if (activeTab === 'inquiries') {
      fetchInquiries();
    } else if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await backend.getOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (id: string) => {
    try {
      await backend.deleteOrder(id);
      setOrders(prev => prev.filter(o => o.id !== id));
      setDeletingOrderId(null);
      setMessage({ text: "Order record deleted.", type: 'success' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error deleting order:", error);
      setMessage({ text: "Failed to delete order.", type: 'error' });
    }
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await backend.seedProducts();
      setMessage({ text: "Database seeded successfully! Refreshing...", type: 'success' });
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.error("Seeding error:", error);
      setMessage({ text: "Failed to seed database.", type: 'error' });
    } finally {
      setSeeding(false);
      setShowSeedConfirm(false);
    }
  };

  const fetchInquiries = async () => {
    setLoading(true);
    const data = await backend.getInquiries();
    setInquiries(data);
    setLoading(false);
  };

  const handleMarkRead = async (id: string) => {
    await backend.markInquiryRead(id);
    setInquiries((prev: Inquiry[]) => prev.map((inq: Inquiry) => inq.id === id ? { ...inq, read: true } : inq));
  };

  const handleDeleteInquiry = async (id: string) => {
    try {
      await backend.deleteInquiry(id);
      setInquiries(prev => prev.filter(i => i.id !== id));
      setMessage({ text: "Inquiry record deleted.", type: 'success' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      setMessage({ text: "Failed to delete inquiry.", type: 'error' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const updates: Partial<Product> = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category as any,
        image: formData.image,
        featured: formData.featured
      };
      onUpdateProduct(editingId, updates);
      setEditingId(null);
      setMessage({ text: "Product updated successfully!", type: 'success' });
    } else {
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
      setMessage({ text: "Product added successfully to Susan's Market!", type: 'success' });
    }
    setFormData({ name: '', description: '', price: '', category: 'Fashion', image: '', featured: false });
    setTimeout(() => setMessage(null), 3000);
  };

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setFormData({
      name: p.name,
      description: p.description,
      price: p.price.toString(),
      category: p.category,
      image: p.image,
      featured: p.featured || false
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', price: '', category: 'Fashion', image: '', featured: false });
  };

  const confirmDelete = (id: string) => {
    onDeleteProduct(id);
    setDeletingId(null);
    setMessage({ text: "Product deleted permanently.", type: 'success' });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Market Manager</h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold">Hello Susan, manage your marketplace below.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setShowSeedConfirm(!showSeedConfirm)}
              disabled={seeding}
              className="px-6 py-2.5 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all disabled:opacity-50"
            >
              {seeding ? 'Seeding...' : 'Seed Database'}
            </button>
            
            {showSeedConfirm && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl border-2 border-emerald-100 dark:border-emerald-900/30 z-50 animate-in zoom-in-95">
                <p className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest mb-3">Populate with default products?</p>
                <div className="flex gap-2">
                  <button 
                    onClick={handleSeed}
                    className="flex-1 py-2 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl"
                  >
                    Confirm
                  </button>
                  <button 
                    onClick={() => setShowSeedConfirm(false)}
                    className="flex-1 py-2 bg-slate-100 dark:bg-slate-700 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
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
            <button 
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Orders
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'inventory' ? (
        <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-[3rem] shadow-2xl border-2 border-slate-50 dark:border-slate-800 transition-colors">
          {message && (
            <div className={`mb-8 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center animate-in fade-in slide-in-from-top-4 ${
              message.type === 'success' ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
            }`}>
              {message.text}
            </div>
          )}
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
                  {CATEGORIES.filter(c => c !== 'All').map((c: string) => (
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
              <div className="flex gap-4">
                <button 
                  type="submit"
                  className="flex-1 bg-slate-900 dark:bg-indigo-600 text-white py-5 rounded-3xl font-black text-xl hover:bg-indigo-700 transition-all shadow-xl active:scale-[0.98]"
                >
                  {editingId ? 'Update Product' : 'Add Product to Marketplace'}
                </button>
                {editingId && (
                  <button 
                    type="button"
                    onClick={cancelEdit}
                    className="px-8 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 py-5 rounded-3xl font-black text-xl hover:bg-slate-300 transition-all active:scale-[0.98]"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>

          <div className="mt-16 pt-16 border-t-2 border-slate-50 dark:border-slate-800">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">Current Inventory</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(p => (
                <div key={p.id} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-3xl border-2 border-transparent hover:border-indigo-600/30 transition-all group">
                  <div className="flex gap-4">
                    <img src={p.image} alt={p.name} className="w-20 h-20 rounded-2xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-slate-900 dark:text-white truncate">{p.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.category}</p>
                      <p className="text-sm font-black text-indigo-600 mt-1">KES {p.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 transition-opacity">
                    <button 
                      onClick={() => startEdit(p)}
                      className="flex-1 py-2 bg-white dark:bg-slate-700 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-50 transition-all"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => setDeletingId(p.id)}
                      className="flex-1 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-600 hover:text-white transition-all"
                    >
                      Delete
                    </button>
                  </div>
                  
                  {deletingId === p.id && (
                    <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl border-2 border-red-100 dark:border-red-900/30 animate-in zoom-in-95">
                      <p className="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest mb-3 text-center">Confirm Permanent Delete?</p>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => confirmDelete(p.id)}
                          className="flex-1 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg"
                        >
                          Yes, Delete
                        </button>
                        <button 
                          onClick={() => setDeletingId(null)}
                          className="flex-1 py-2 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-xl"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === 'inquiries' ? (
        <div className="space-y-6">
          {loading ? (
            <div className="py-20 text-center text-slate-400 font-bold animate-pulse">Loading inquiries...</div>
          ) : inquiries.length === 0 ? (
            <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
               <p className="text-xl font-bold text-slate-400">No inquiries found yet.</p>
            </div>
          ) : (
            inquiries.map((inq: Inquiry) => (
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
                    <button 
                      onClick={() => handleDeleteInquiry(inq.id)}
                      className="ml-2 px-4 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-red-600 hover:text-white transition-all"
                    >
                      Delete
                    </button>
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
      ) : (
        <div className="space-y-8">
          {loading ? (
            <div className="py-20 text-center text-slate-400 font-bold animate-pulse">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
               <p className="text-xl font-bold text-slate-400">No orders placed yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {orders.map((order: Order) => (
                <div key={order.id} className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border-2 border-slate-50 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">#{order.id}</span>
                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                          order.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-slate-400 font-bold text-xs">
                        <span className="flex items-center gap-1">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                          {new Date(order.createdAt).toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                          {order.userId}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Order Total</p>
                      <p className="text-3xl font-black text-indigo-600 tracking-tighter">KES {order.total.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t-2 border-slate-50 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Items Purchased</h4>
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center font-black text-xs text-indigo-600 shadow-sm">
                                {item.quantity}x
                              </div>
                              <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">{item.name}</span>
                            </div>
                            <span className="font-black text-slate-400 text-xs">KES {(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col justify-end gap-4">
                      <div className="flex gap-3">
                        <button 
                          onClick={() => generateReceipt({ id: order.userId, name: 'Customer', email: 'customer@market.com', isAdmin: false, loyaltyPoints: 0 } as User, order.items, order.total, order.paymentMethod, order.id, order.mpesaNumber)}
                          className="flex-1 py-4 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                          View Receipt
                        </button>
                        <button 
                          onClick={() => setDeletingOrderId(order.id)}
                          className="px-6 py-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                      </div>
                      
                      {deletingOrderId === order.id && (
                        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl border-2 border-red-100 dark:border-red-900/30 animate-in zoom-in-95">
                          <p className="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest mb-3 text-center">Delete this order record?</p>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleDeleteOrder(order.id)}
                              className="flex-1 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg"
                            >
                              Yes, Delete
                            </button>
                            <button 
                              onClick={() => setDeletingOrderId(null)}
                              className="flex-1 py-2 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-xl"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                      
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest text-center">
                        Payment via {order.paymentMethod.toUpperCase()}
                        {order.mpesaNumber && ` (${order.mpesaNumber})`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
