import React, { useState } from 'react';
import { backend } from '../services/backendService';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await backend.sendContactMessage(formData);
    setSending(false);
    setSent(true);
    
    const waUrl = (window as any).lastWhatsAppInquiryUrl;
    if (waUrl) {
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 1500);
    }

    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 8000);
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col lg:flex-row gap-20">
        <div className="lg:w-1/2 space-y-12">
          <div className="space-y-6">
            <span className="inline-block bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.3em] border border-indigo-100 dark:border-indigo-900/30">Connect with us</span>
            <h1 className="text-6xl sm:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.85]">
              Let's Talk <br/> <span className="text-indigo-600 underline decoration-indigo-600/10 underline-offset-8">Quality.</span>
            </h1>
            <p className="text-2xl text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-lg">
              Expert advice on hardware selection and lifestyle curation, direct from Susan's Nairobi headquarters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-8 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-slate-50 dark:border-white/5 shadow-sm group hover:border-indigo-600 transition-all">
              <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <h4 className="font-black text-slate-900 dark:text-white mb-1 uppercase tracking-widest text-xs">Direct Support</h4>
              <p className="text-slate-500 dark:text-slate-400 font-bold mb-4">+254 114 718252</p>
              <a href="https://wa.me/254114718252" className="text-emerald-500 text-[10px] font-black uppercase tracking-widest hover:underline">Instant WhatsApp</a>
            </div>

            <div className="p-8 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-slate-50 dark:border-white/5 shadow-sm group hover:border-indigo-600 transition-all">
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <h4 className="font-black text-slate-900 dark:text-white mb-1 uppercase tracking-widest text-xs">Email Desk</h4>
              <p className="text-slate-500 dark:text-slate-400 font-bold mb-4">susan@kenyamarket.com</p>
              <span className="text-indigo-600 text-[10px] font-black uppercase tracking-widest">24h Response Time</span>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 relative">
          <div className="absolute -inset-4 bg-indigo-600/10 rounded-[4rem] blur-[60px] -z-10"></div>
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-10 sm:p-14 rounded-[4rem] border-2 border-white dark:border-white/5 shadow-2xl relative overflow-hidden">
            {sent && (
              <div className="absolute inset-0 z-20 bg-white dark:bg-slate-950 flex flex-col items-center justify-center text-center p-12 animate-in fade-in duration-500">
                <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-xl">
                   <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
                <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">Inquiry Received.</h3>
                <p className="text-slate-500 dark:text-slate-400 font-bold mb-10 text-lg">Redirecting you to Susan's private WhatsApp for a faster response...</p>
                <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Name</label>
                  <input 
                    type="text" required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-600 outline-none transition-all font-bold dark:text-white shadow-sm"
                    placeholder="E.g. Juma Ali"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-600 outline-none transition-all font-bold dark:text-white shadow-sm"
                    placeholder="juma@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">What's on your mind?</label>
                <input 
                  type="text" required
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-600 outline-none transition-all font-bold dark:text-white shadow-sm"
                  placeholder="Order Support, Style Advice, Hardware Query"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Detailed Message</label>
                <textarea 
                  required rows={5}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full px-6 py-4 rounded-3xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-600 outline-none transition-all font-bold dark:text-white resize-none shadow-sm"
                  placeholder="Tell us more about your request..."
                />
              </div>

              <button 
                disabled={sending}
                className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-6 rounded-[2rem] font-black text-xl hover:bg-indigo-700 transition-all shadow-xl active:scale-95 disabled:opacity-50 group flex items-center justify-center gap-4"
              >
                {sending ? 'Processing...' : (
                  <>
                    Send Inquiry
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
