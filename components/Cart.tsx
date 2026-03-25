
import React, { useState } from 'react';
import { CartItem, PaymentMethod } from '../types';
import { SUSAN_CONTACT } from '../services/backendService';

interface CartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: (method: PaymentMethod, mpesaNumber?: string) => void;
  onGoShopping: () => void;
}

export const Cart: React.FC<CartProps> = ({ items, onRemove, onUpdateQuantity, onCheckout, onGoShopping }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('mpesa');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMpesaPrompt, setShowMpesaPrompt] = useState(false);
  const [showPaybillInstructions, setShowPaybillInstructions] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [error, setError] = useState('');
  
  const total = items.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0);
  const potentialPoints = Math.floor(total * 0.01);

  const handleCheckout = () => {
    setError('');
    
    if (selectedMethod === 'mpesa') {
      if (!mpesaNumber || mpesaNumber.length < 10) {
        setError('Please enter a valid M-Pesa number');
        return;
      }
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setShowMpesaPrompt(true);
      }, 1500);
    } else if (selectedMethod === 'paypal') {
      setIsProcessing(true);
      // Link to real paying platform
      setTimeout(() => {
        window.open('https://www.paypal.com/checkoutnow', '_blank');
        onCheckout('paypal');
        setIsProcessing(false);
      }, 1000);
    } else if (selectedMethod === 'visa' || selectedMethod === 'mastercard') {
      setShowCardModal(true);
    }
  };

  const confirmMpesaPayment = () => {
    setShowMpesaPrompt(false);
    setIsProcessing(true);
    setTimeout(() => {
      onCheckout('mpesa', mpesaNumber);
      setIsProcessing(false);
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-32 text-center animate-in fade-in zoom-in-95 duration-700">
        <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-[3rem] flex items-center justify-center text-slate-300 dark:text-slate-600 mx-auto mb-10 shadow-inner">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.56-7.43H5.12"/></svg>
        </div>
        <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">Your bag is empty.</h2>
        <button 
          onClick={onGoShopping}
          className="px-16 py-6 bg-indigo-600 text-white rounded-[2rem] font-black uppercase text-sm tracking-[0.3em] shadow-2xl hover:scale-105 transition-all"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
      
      {/* Secure Checkout Header for Mobile */}
      <div className="lg:hidden flex items-center justify-center gap-2 mb-8 py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Secure Checkout</span>
      </div>

      {/* M-Pesa STK Push Simulation Modal */}
      {showMpesaPrompt && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-6">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[3.5rem] p-10 shadow-2xl border border-slate-100 dark:border-white/5 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-xl">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
            </div>
            <h3 className="text-2xl font-black text-center text-slate-900 dark:text-white mb-4 tracking-tight">Check your phone</h3>
            <p className="text-center text-slate-500 dark:text-slate-400 font-bold leading-relaxed mb-8">
              A secure prompt has been sent to <span className="text-indigo-600 dark:text-indigo-400 font-black">{mpesaNumber}</span>.
            </p>
            <div className="space-y-4">
              <button 
                onClick={confirmMpesaPayment}
                className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-black text-lg hover:bg-emerald-600 transition-all shadow-xl active:scale-95"
              >
                I have entered my PIN
              </button>
              <button 
                onClick={() => { setShowMpesaPrompt(false); setShowPaybillInstructions(true); }}
                className="w-full text-indigo-600 font-black text-[10px] uppercase tracking-widest py-2 hover:underline"
              >
                Didn't get the prompt? Pay via Paybill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Paybill Instructions Modal */}
      {showPaybillInstructions && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-6">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[3.5rem] p-10 shadow-2xl border border-slate-100 dark:border-white/5 animate-in zoom-in-95 duration-300">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">Manual M-Pesa Paybill</h3>
            <div className="space-y-6">
              <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl space-y-4">
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Business No.</span>
                  <span className="font-black text-xl text-emerald-500">247247</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account No.</span>
                  <span className="font-black text-xl text-indigo-600">{mpesaNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</span>
                  <span className="font-black text-xl text-slate-900 dark:text-white">KES {total.toLocaleString()}</span>
                </div>
              </div>
              <button 
                onClick={() => { setShowPaybillInstructions(false); onCheckout('mpesa', mpesaNumber); }}
                className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl"
              >
                Confirm Payment Sent
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simulated Card Payment Modal */}
      {showCardModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-6">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[3.5rem] p-10 shadow-2xl border border-slate-100 dark:border-white/5 animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Secure Card Payment</h3>
              <div className="flex gap-2">
                <div className="w-10 h-6 bg-slate-100 rounded-md"></div>
                <div className="w-10 h-6 bg-slate-100 rounded-md"></div>
              </div>
            </div>
            <div className="space-y-6">
              <input type="text" placeholder="Card Number" className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white outline-none focus:border-indigo-600 font-bold" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/YY" className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white outline-none focus:border-indigo-600 font-bold" />
                <input type="text" placeholder="CVC" className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white outline-none focus:border-indigo-600 font-bold" />
              </div>
              <button 
                onClick={() => { setShowCardModal(false); onCheckout('visa'); }}
                className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl"
              >
                Pay KES {total.toLocaleString()}
              </button>
              <button onClick={() => setShowCardModal(false)} className="w-full text-slate-400 font-black text-[10px] uppercase tracking-widest">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="flex-1 space-y-8 w-full">
          <div className="flex items-end justify-between border-b-4 border-slate-100 dark:border-white/5 pb-10">
            <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">Shopping Bag</h1>
            <span className="text-sm font-black text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-6 py-2 rounded-full">{items.length} Items</span>
          </div>

          <div className="space-y-6">
            {items.map((item: CartItem) => (
              <div key={item.id} className="group bg-white dark:bg-slate-900 p-8 rounded-[3.5rem] border-2 border-slate-50 dark:border-white/5 flex flex-col sm:flex-row items-center gap-10 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden bg-slate-100 flex-shrink-0 shadow-lg">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                </div>
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{item.name}</h3>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">{item.category}</p>
                  <p className="text-2xl font-black text-indigo-600 tracking-tighter">KES {item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-6 bg-slate-50 dark:bg-slate-800 p-2 rounded-[2rem]">
                  <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M5 12h14"/></svg>
                  </button>
                  <span className="text-xl font-black dark:text-white w-8 text-center">{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M5 12h14M12 5v14"/></svg>
                  </button>
                </div>
                <button onClick={() => onRemove(item.id)} className="p-4 text-slate-300 hover:text-red-500 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[450px] space-y-8 sticky top-40">
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[4rem] border-2 border-slate-50 dark:border-white/5 shadow-2xl space-y-10 relative overflow-hidden">
            {/* Premium Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            
            <div className="flex items-center justify-between border-b-2 border-slate-50 dark:border-white/5 pb-6">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Summary</h2>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-full">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600">Secure</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-slate-400">Subtotal</span>
                <span className="text-slate-900 dark:text-white font-black">KES {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span className="text-slate-400">Shipping</span>
                <span className="text-emerald-500 font-black uppercase text-xs tracking-widest">Free</span>
              </div>
              
              <div className="p-5 bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl border border-indigo-100 dark:border-indigo-900/30 flex items-center justify-between group cursor-help">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block">Loyalty Reward</span>
                    <span className="text-xs font-bold text-slate-500">Susan's Points</span>
                  </div>
                </div>
                <span className="text-xl font-black text-indigo-600">+{potentialPoints}</span>
              </div>

              <div className="pt-6 border-t-2 border-slate-50 dark:border-white/5 flex justify-between items-center">
                <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">Total</span>
                <span className="text-4xl font-black text-indigo-600 tracking-tighter">KES {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Payment Method</h3>
                <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Encrypted</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'mpesa' as PaymentMethod, label: 'M-Pesa', color: 'bg-emerald-500', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg> },
                  { id: 'paypal' as PaymentMethod, label: 'PayPal', color: 'bg-indigo-500', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v10Z"/><path d="M16 8V5a3 3 0 0 0-6 0v1"/></svg> },
                  { id: 'visa' as PaymentMethod, label: 'Visa/Card', color: 'bg-slate-900', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg> },
                  { id: 'mastercard' as PaymentMethod, label: 'Mastercard', color: 'bg-amber-600', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="8" cy="12" r="4"/><circle cx="16" cy="12" r="4"/></svg> }
                ].map((method) => (
                  <button 
                    key={method.id}
                    onClick={() => { setSelectedMethod(method.id); setError(''); }}
                    className={`p-5 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 group ${selectedMethod === method.id ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-xl scale-[1.02]' : 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-800 hover:border-indigo-200'}`}
                  >
                    <div className={`w-12 h-12 rounded-2xl ${method.color} flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform`}>
                      {method.icon}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest dark:text-white">{method.label}</span>
                  </button>
                ))}
              </div>

              {selectedMethod === 'mpesa' && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="relative">
                    <input 
                      type="tel"
                      value={mpesaNumber}
                      onChange={(e) => setMpesaNumber(e.target.value)}
                      placeholder="0712345678"
                      className="w-full px-6 py-5 rounded-2xl border-2 border-slate-50 dark:border-white/5 bg-slate-50 dark:bg-slate-950 dark:text-white focus:border-indigo-600 outline-none transition-all font-black text-lg tracking-widest placeholder:text-slate-300 dark:placeholder:text-slate-700"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                  </div>
                  {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest ml-2 animate-pulse">{error}</p>}
                </div>
              )}
            </div>

            <button 
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-8 rounded-[2.5rem] font-black text-2xl hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-all shadow-2xl active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4 group"
            >
              {isProcessing ? (
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="uppercase tracking-widest text-sm font-black">Authorizing...</span>
                </div>
              ) : (
                <>
                  <span className="uppercase tracking-tighter">Complete Order</span>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="group-hover:translate-x-2 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </>
              )}
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 px-4">
            <div className="flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400 dark:text-slate-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span className="text-[7px] font-black uppercase tracking-widest text-slate-500 text-center">SSL Secure</span>
            </div>
            <div className="flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400 dark:text-slate-500"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              <span className="text-[7px] font-black uppercase tracking-widest text-slate-500 text-center">24/7 Support</span>
            </div>
            <div className="flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400 dark:text-slate-500"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span className="text-[7px] font-black uppercase tracking-widest text-slate-500 text-center">Nairobi Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
