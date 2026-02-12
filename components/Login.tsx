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
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await backend.login(email, password);
      onLogin(user);
    } catch (err) {
      alert("Invalid credentials. Try using 'admin@susan.co.ke' or your own email.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    // Simulate Google Login popup delay
    setTimeout(async () => {
      try {
        const googleUser = await backend.login('google_user@gmail.com', 'google-auth');
        onLogin(googleUser);
      } catch (err) {
        console.error("Google login simulation failed.");
      } finally {
        setGoogleLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-12 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[3.5rem] p-8 sm:p-12 border border-slate-100 dark:border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden transition-all">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-[80px] -mr-24 -mt-24"></div>
        
        <div className="text-center mb-8 relative">
          <div className="relative w-20 h-20 flex items-center justify-center mx-auto mb-6 group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 rounded-[1.8rem] rotate-12 group-hover:rotate-0 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-[1.8rem] -rotate-6 group-hover:rotate-0 transition-all duration-700 border border-white/30"></div>
              <span className="relative z-10 text-3xl font-black text-white italic tracking-tighter">S.</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">Welcome Back</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">Enter the elite circle.</p>
        </div>

        <div className="space-y-4 mb-8">
          <button 
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-white/5 py-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-bold text-sm shadow-sm group disabled:opacity-50"
          >
            {googleLoading ? (
              <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            )}
            <span className="text-slate-700 dark:text-slate-200">{googleLoading ? 'Authenticating...' : 'Sign in with Google'}</span>
          </button>
          
          <div className="flex items-center gap-4 py-2">
            <div className="h-[1px] flex-1 bg-slate-100 dark:bg-white/5"></div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Or email</span>
            <div className="h-[1px] flex-1 bg-slate-100 dark:bg-white/5"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <div className="relative group">
              <input 
                type="email" required
                className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-slate-50 dark:border-white/5 bg-slate-50 dark:bg-slate-950 dark:text-white focus:border-indigo-600 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all font-bold text-sm" 
                placeholder="Identity Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative group">
              <input 
                type={showPassword ? "text" : "password"} required
                className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-slate-50 dark:border-white/5 bg-slate-50 dark:bg-slate-950 dark:text-white focus:border-indigo-600 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all font-bold text-sm" 
                placeholder="Secure Key"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading || googleLoading}
            className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-600 dark:hover:bg-indigo-700 transition-all hover:shadow-xl disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating...' : 'Enter Market'}
          </button>
        </form>

        <div className="mt-8 text-center">
           <button onClick={onBack} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">Return to browsing</button>
        </div>
      </div>
    </div>
  );
};
