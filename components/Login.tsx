import React, { useState } from 'react';
import { User } from '../types';
import { backend } from '../services/backendService';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

interface LoginProps {
  onLogin: (user: User) => void;
  onBack: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user && result.user.email) {
        const user = await backend.login(result.user.email);
        onLogin(user);
      }
    } catch (err: any) {
      console.error("Google login failed:", err);
      setError(err.message || "Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let result;
      if (mode === 'signup') {
        result = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        result = await signInWithEmailAndPassword(auth, email, password);
      }
      
      if (result.user && result.user.email) {
        const user = await backend.login(result.user.email);
        onLogin(user);
      }
    } catch (err: any) {
      console.error("Email auth failed:", err);
      if (err.code === 'auth/operation-not-allowed') {
        setError("Email/Password authentication is not enabled in the Firebase Console. Please enable it under Authentication > Sign-in method.");
      } else {
        setError(err.message || "Authentication failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
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
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Join the Elite'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">
            {mode === 'login' ? 'Enter the elite circle.' : 'Start your luxury journey.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl text-red-600 dark:text-red-400 text-[10px] font-bold uppercase tracking-widest text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4 mb-8">
          <div>
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
            <input 
              type="email" required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-50 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:border-indigo-600 outline-none transition-all font-bold dark:text-white text-sm"
              placeholder="susan@market.com"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-50 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:border-indigo-600 outline-none transition-all font-bold dark:text-white text-sm"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100 dark:border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
            <span className="bg-white dark:bg-slate-900 px-4 text-slate-400">Or continue with</span>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-white/5 py-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-black text-lg shadow-sm group disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            <span className="text-slate-700 dark:text-slate-200">Google</span>
          </button>
        </div>

        <div className="mt-8 text-center space-y-4">
          <button 
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline"
          >
            {mode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
          <br/>
          <button onClick={onBack} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">Return to browsing</button>
        </div>
      </div>
    </div>
  );
};
