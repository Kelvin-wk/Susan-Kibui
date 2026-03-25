
import React, { useRef, useState } from 'react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const navItems: { label: string; page: Page }[] = [
    { label: 'Market', page: 'products' },
    { label: 'Style Hub', page: 'style-hub' },
    { label: 'Global', page: 'affiliate' },
    { label: 'Contact', page: 'contact' }
  ];

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-white/5 glass px-2 py-3 sm:px-12 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section - Now visible on mobile */}
        <div 
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
          onClick={() => navigateTo('home')}
        >
          <div className="relative">
            <div className="relative w-9 h-9 sm:w-14 sm:h-14 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 rounded-xl sm:rounded-2xl rotate-6 group-hover:rotate-12 transition-all duration-500"></div>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl -rotate-3 group-hover:rotate-0 transition-all duration-500 border border-white/20"></div>
              <span className="relative z-10 text-lg sm:text-2xl font-black text-white italic tracking-tighter">S.</span>
            </div>
          </div>
          
          <div className="leading-none block">
             <h1 className="text-sm sm:text-2xl font-black tracking-tighter text-slate-900 dark:text-white flex items-baseline gap-0.5 sm:gap-1">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Susan's</span>
                <span className="text-slate-900 dark:text-white">Market</span>
             </h1>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-1 sm:gap-8">
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button 
                key={item.page}
                onClick={() => navigateTo(item.page)}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative py-2 ${
                  currentPage === item.page 
                    ? 'text-indigo-600' 
                    : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1 sm:gap-4 md:border-l md:border-slate-200 md:dark:border-white/10 md:pl-8">
            <button 
              onClick={onToggleTheme}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-all"
            >
              {theme === 'light' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="4"/><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
            
            <button 
              onClick={() => navigateTo('wishlist')}
              className={`relative p-2 sm:p-2.5 transition-all rounded-xl ${currentPage === 'wishlist' ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-500 dark:text-slate-400 hover:text-rose-500'}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={currentPage === 'wishlist' ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </button>

            <button 
              onClick={() => navigateTo('cart')}
              className="relative p-2 sm:p-2.5 text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-all rounded-xl"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[8px] font-black text-white shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-2 sm:gap-4 group relative">
                {user.isAdmin && (
                  <button 
                    onClick={() => navigateTo('admin-panel')}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-700 transition-all shadow-lg"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    Admin
                  </button>
                )}
                
                <div className="flex items-center gap-2 relative group">
                  <div 
                    className="w-8 h-8 sm:w-11 sm:h-11 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-indigo-600 overflow-hidden cursor-pointer border-2 border-transparent hover:border-indigo-600 transition-all"
                  >
                    {user.profilePhoto ? (
                      <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    )}
                  </div>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-white/5 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <div className="px-4 py-2 border-b border-slate-50 dark:border-white/5 mb-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Signed in as</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={() => navigateTo('order-history')}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 transition-all flex items-center gap-2"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                      Order History
                    </button>
                    <button 
                      onClick={handlePhotoClick}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 transition-all flex items-center gap-2"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                      Change Photo
                    </button>
                    <div className="h-px bg-slate-50 dark:bg-white/5 my-1"></div>
                    <button 
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all flex items-center gap-2"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                      Sign Out
                    </button>
                  </div>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                </div>
              </div>
            ) : (
              <button 
                onClick={() => navigateTo('login')}
                className="text-[9px] font-black bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 sm:px-6 sm:py-3 rounded-xl uppercase tracking-widest shadow-xl"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 rounded-xl"
            >
              {isMobileMenuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/5 animate-in slide-in-from-top duration-300 shadow-2xl">
          <div className="p-6 flex flex-col gap-4">
            {navItems.map(item => (
              <button 
                key={item.page}
                onClick={() => navigateTo(item.page)}
                className={`text-sm font-black uppercase tracking-[0.1em] text-left py-3 border-b border-slate-50 dark:border-white/5 ${
                  currentPage === item.page ? 'text-indigo-600' : 'text-slate-500'
                }`}
              >
                {item.label}
              </button>
            ))}
            {user && user.isAdmin && (
              <button 
                onClick={() => navigateTo('admin-panel')}
                className="text-left py-3 text-indigo-600 font-black text-sm uppercase border-b border-slate-50 dark:border-white/5"
              >
                Admin Panel
              </button>
            )}
            {user && (
              <button onClick={onLogout} className="text-left py-3 text-red-500 font-black text-sm uppercase">Sign Out</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
