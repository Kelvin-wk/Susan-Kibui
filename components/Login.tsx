
import React, { useState } from 'react';
import { User } from '../types';
import { backend } from '../services/backendService';

interface LoginProps {
  onLogin: (user: User) => void;
  onBack: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mock login with email and password
      const user = await backend.login(email, password);
      onLogin(user);
    } catch (err) {
      alert("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-12 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[3.5rem] p-8 sm:p-12 border border-slate-100 dark:border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden transition-all">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-[80px] -mr-24 -mt-24"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[60px] -ml-16 -mb-16"></div>
        
        <div className="text-center mb-10 relative">
          {/* Appealing Logo for Login */}
          <div className="relative w-24 h-24 flex items-center justify-center mx-auto mb-10 group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 rounded-[2rem] rotate-12 group-hover:rotate-0 transition-all duration-700 shadow-2xl"></div>
              <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-[2rem] -rotate-6 group-hover:rotate-0 transition-all duration-700 border border-white/30"></div>
              <span className="relative z-10 text-4xl font-black text-white italic tracking-tighter">S.</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">Secure Access</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-bold max-w-[250px] mx-auto">
            Log in to manage your orders and personalized style hub.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Email Identity</label>
            <div className="relative group">
              <input 
                type="email" 
                required
                className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-slate-50 dark:border-white/5 bg-slate-50 dark:bg-slate-950 dark:text-white focus:border-indigo-600 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all font-bold text-sm" 
                placeholder="susan@kenyamarket.co.ke"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-2 mr-2">
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Security Key</label>
              <button type="button" className="text-[9px] font-black text-indigo-600 hover:underline uppercase tracking-widest">Forgot?</button>
            </div>
            <div className="relative group">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                className="w-full pl-12 pr-14 py-4 rounded-2xl border-2 border-slate-50 dark:border-white/5 bg-slate-50 dark:bg-slate-950 dark:text-white focus:border-indigo-600 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all font-bold text-sm" 
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-2">
            <input type="checkbox" id="remember" className="w-5 h-5 rounded-lg border-2 border-slate-200 text-indigo-600 focus:ring-indigo-500" />
            <label htmlFor="remember" className="text-xs font-bold text-slate-500 dark:text-slate-400">Keep me logged in</label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-indigo-600 dark:hover:bg-indigo-700 transition-all hover:shadow-[0_20px_50px_rgba(79,70,229,0.3)] active:scale-[0.98] disabled:opacity-50 mt-4"
          >
            {loading ? 'Authenticating...' : 'Enter Marketplace'}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5 text-center">
           <button onClick={onBack} className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors">Return to Homepage</button>
        </div>
      </div>
    </div>
  );
};
