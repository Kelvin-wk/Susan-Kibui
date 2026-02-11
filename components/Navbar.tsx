
import React, { useRef } from 'react';
import { Page, User, Theme } from '../types';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  cartCount: number;
  user: User | null;
  onLogout: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  onUpdateProfilePhoto: (photo: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  setCurrentPage, 
  cartCount, 
  user, 
  onLogout, 
  theme, 
  onToggleTheme,
  onUpdateProfilePhoto
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const navItems: { label: string; page: Page; icon?: string }[] = [
    { label: 'Market', page: 'products' },
    { label: 'Style Hub', page: 'style-hub' },
    { label: 'Dropship', page: 'affiliate' },
    { label: 'Contact', page: 'contact' }
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-white/5 glass px-4 py-4 sm:px-12 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-5 cursor-pointer group"
          onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <div className="relative">
            {/* Redesigned Luxury Monogram Logo */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 rounded-2xl rotate-6 group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-indigo-500/20"></div>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl -rotate-3 group-hover:rotate-0 transition-all duration-500 border border-white/20"></div>
              <span className="relative z-10 text-3xl font-black text-white italic tracking-tighter select-none">S.</span>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-4 border-white dark:border-slate-900 shadow-sm animate-pulse z-20"></div>
            </div>
          </div>
          
          <div className="hidden lg:block leading-none">
             <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white flex items-baseline gap-1">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Susan's</span>
                <span className="text-slate-900 dark:text-white">Market</span>
             </h1>
             <div className="flex items-center gap-2 mt-1">
               <span className="h-[2px] w-8 bg-indigo-600/30 rounded-full"></span>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Curated Excellence</p>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-6 sm:gap-10">
          <div className="hidden md:flex items-center gap-10">
            {navItems.map(item => (
              <button 
                key={item.page}
                onClick={() => { setCurrentPage(item.page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all relative py-2 ${
                  currentPage === item.page 
                    ? 'text-indigo-600' 
                    : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
                {currentPage === item.page && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-full animate-in slide-in-from-left-2"></span>
                )}
              </button>
            ))}
            {user?.isAdmin && (
              <button 
                onClick={() => setCurrentPage('admin-panel')}
                className={`text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-2xl border-2 transition-all ${currentPage === 'admin-panel' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'text-amber-600 border-amber-600/30 hover:bg-amber-50 dark:hover:bg-amber-900/20'}`}
              >
                Manager
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 sm:gap-6 border-l border-slate-200 dark:border-white/10 pl-6 sm:pl-10">
            {user && (
              <div className="hidden sm:flex items-center gap-2 bg-amber-50 dark:bg-amber-950/30 px-4 py-2 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center text-[8px] text-white shadow-inner animate-pulse">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-amber-600 uppercase tracking-tighter leading-none mb-0.5">Points</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white leading-none">{user.loyaltyPoints?.toLocaleString() || 0}</span>
                </div>
              </div>
            )}

            <button 
              onClick={onToggleTheme}
              className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-all shadow-sm"
              title="Toggle Dark Mode"
            >
              {theme === 'light' ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
            
            <button 
              onClick={() => setCurrentPage('cart')}
              className="relative p-3.5 text-slate-500 dark:text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-all shadow-sm group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-black text-white ring-4 ring-white dark:ring-slate-900 shadow-xl group-hover:scale-125 transition-transform">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-4 group relative">
                <div className="hidden sm:block text-right leading-none">
                  <p className="text-xs font-black text-slate-900 dark:text-white mb-1 tracking-tight">{user.name}</p>
                  <button onClick={onLogout} className="text-[10px] text-red-500 font-black uppercase tracking-widest hover:underline">Logout</button>
                </div>
                <div 
                  onClick={handlePhotoClick}
                  className="w-14 h-14 bg-indigo-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 border-2 border-transparent hover:border-indigo-600 overflow-hidden cursor-pointer transition-all shadow-sm hover:shadow-lg"
                >
                  {user.profilePhoto ? (
                    <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                />
              </div>
            ) : (
              <button 
                onClick={() => setCurrentPage('login')}
                className="text-[11px] font-black bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-[1.2rem] hover:bg-indigo-600 dark:hover:bg-indigo-600 dark:hover:text-white transition-all active:scale-95 shadow-2xl uppercase tracking-[0.2em]"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
