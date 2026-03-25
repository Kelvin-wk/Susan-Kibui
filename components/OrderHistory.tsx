import React, { useState, useEffect } from 'react';
import { Order, User } from '../types';
import { backend } from '../services/backendService';
import { generateReceipt } from '../services/ReceiptGenerator';

interface OrderHistoryProps {
  user: User;
  onGoShopping: () => void;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ user, onGoShopping }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await backend.getUserOrders(user.id);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [user.id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 space-y-6">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse">Retrieving your history...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-end justify-between border-b-4 border-slate-100 dark:border-white/5 pb-8 mb-12">
        <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">Order History</h1>
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-6 py-2 rounded-full">{orders.length} Orders</span>
      </div>

      {orders.length === 0 ? (
        <div className="py-40 text-center space-y-8 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-slate-50 dark:border-slate-800 shadow-sm">
          <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-300">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">No orders yet.</p>
            <p className="text-slate-500 font-bold">Start your shopping journey today!</p>
          </div>
          <button 
            onClick={onGoShopping}
            className="px-12 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl"
          >
            Explore Marketplace
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-slate-50 dark:border-slate-800 shadow-sm overflow-hidden group hover:border-indigo-600/20 transition-all">
              <div className="p-8 flex flex-col md:flex-row justify-between gap-6 border-b border-slate-50 dark:border-white/5">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight">#{order.id}</p>
                  <p className="text-xs font-bold text-slate-500">{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</p>
                </div>
                <div className="flex flex-col md:items-end justify-center gap-2">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    order.status === 'delivered' ? 'bg-emerald-100 text-emerald-600' : 
                    order.status === 'shipped' ? 'bg-indigo-100 text-indigo-600' : 
                    'bg-amber-100 text-amber-600'
                  }`}>
                    {order.status}
                  </span>
                  <p className="text-2xl font-black text-indigo-600 tracking-tighter">KES {order.total.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="p-8 bg-slate-50/50 dark:bg-slate-800/20 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex -space-x-4 overflow-hidden">
                  {order.items.slice(0, 4).map((item, i) => (
                    <div key={i} className="w-16 h-16 rounded-2xl border-4 border-white dark:border-slate-900 overflow-hidden bg-white shadow-sm">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <div className="w-16 h-16 rounded-2xl border-4 border-white dark:border-slate-900 bg-slate-900 flex items-center justify-center text-white text-xs font-black">
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => generateReceipt(user, order.items, order.total, order.paymentMethod, order.id, order.mpesaNumber)}
                  className="flex items-center gap-3 px-8 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black uppercase text-[10px] tracking-widest border-2 border-slate-100 dark:border-white/5 hover:bg-slate-900 hover:text-white dark:hover:bg-indigo-600 transition-all shadow-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                  Download Receipt
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
