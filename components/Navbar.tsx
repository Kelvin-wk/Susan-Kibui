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
    { label: 'Global Finds', page: 'affiliate' },
    { label: 'Contact', page: 'contact' }
  ];

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-white/5 glass px-4 py-3 sm:px-12 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigateTo('home')}
        >
          <div className="relative">
            <div className="relative w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 rounded-2xl rotate-6 group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-indigo-500/20"></div>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl -rotate-3 group-hover:rotate-0 transition-all duration-500 border border-white/20"></div>
              <span className="relative z-10 text-xl sm:text-2xl font-black text-white italic tracking-tighter select-none">S.</span>
            </div>
          </div>
          
          <div className="leading-none hidden sm:block">
             <h1 className="text-xl sm:text-2xl font-black tracking-tighter text-slate-900 dark:text-white flex items-baseline gap-1">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Susan's</span>
                <span className="text-slate-900 dark:text-white">Market</span>
             </h1>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-2 sm:gap-8">
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
            {user?.isAdmin && (
              <button 
                onClick={() => navigateTo('admin-panel')}
                className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border-2 transition-all flex items-center gap-2 ${currentPage === 'admin-panel' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'text-amber-600 border-amber-600/30 hover:bg-amber-50 dark:hover:bg-amber-900/20'}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                Dashboard
              </button>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-4 md:border-l md:border-slate-200 md:dark:border-white/10 md:pl-8">
            <button 
              onClick={onToggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-all"
              title="Toggle Theme"
            >
              {theme === 'light' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="4"/><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
            
            <button 
              onClick={() => navigateTo('cart')}
              className="relative p-2.5 text-slate-500 dark:text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-all group rounded-xl"
            >
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:scale-110 transition-transform">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-[9px] font-black text-white ring-4 ring-white dark:ring-slate-900 shadow-lg shadow-indigo-500/40 animate-in zoom-in-50">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>

            {user ? (
              <div className="flex items-center gap-2 group relative">
                <div 
                  onClick={handlePhotoClick}
                  className="w-10 h-10 sm:w-11 sm:h-11 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-indigo-600 overflow-hidden cursor-pointer border-2 border-transparent hover:border-indigo-600 transition-all shadow-sm"
                >
                  {user.profilePhoto ? (
                    <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  )}
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              </div>
            ) : (
              <button 
                onClick={() => navigateTo('login')}
                className="hidden sm:block text-[10px] font-black bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl hover:bg-indigo-600 dark:hover:bg-indigo-600 dark:hover:text-white transition-all uppercase tracking-widest shadow-xl"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 rounded-xl"
            >
              {isMobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
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
                className={`text-lg font-black uppercase tracking-[0.1em] text-left py-4 border-b border-slate-50 dark:border-white/5 ${
                  currentPage === item.page ? 'text-indigo-600' : 'text-slate-500'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {user?.isAdmin && (
              <button 
                onClick={() => navigateTo('admin-panel')}
                className={`flex items-center justify-between w-full p-5 rounded-2xl border-2 transition-all mt-2 ${currentPage === 'admin-panel' ? 'bg-indigo-600 text-white border-indigo-600' : 'text-amber-600 border-amber-600 border-dashed bg-amber-50/30 dark:bg-amber-900/10'}`}
              >
                <div className="flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                  <span className="text-sm font-black uppercase tracking-widest">Open Admin Dashboard</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            )}

            {!user ? (
              <button 
                onClick={() => navigateTo('login')}
                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-2xl font-black uppercase tracking-widest mt-4"
              >
                Sign In
              </button>
            ) : (
               <button 
               onClick={onLogout}
               className="w-full bg-red-50 dark:bg-red-950/20 text-red-500 py-5 rounded-2xl font-black uppercase tracking-widest mt-4"
             >
               Sign Out ({user.name})
             </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
