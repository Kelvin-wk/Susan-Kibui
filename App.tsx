import React, { useState, useMemo, useEffect } from 'react';
import { Product, CartItem, Page, User, PaymentMethod, Theme } from './types';
import { CATEGORIES } from './constants';
import { Navbar } from './components/Navbar';
import { Assistant } from './components/Assistant';
import { Login } from './components/Login';
import { Contact } from './components/Contact';
import { StyleHub } from './components/StyleHub';
import { ProductDetail } from './components/ProductDetail';
import { AdminPanel } from './components/AdminPanel';
import { AffiliateProgram } from './components/AffiliateProgram';
import { Cart } from './components/Cart';
import { backend } from './services/backendService';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState<Theme>('light');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await backend.getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm, products]);

  const featuredProducts = useMemo(() => products.filter(p => p.featured), [products]);

  const handleAddProduct = async (newProduct: Product) => {
    const added = await backend.addProduct(newProduct);
    setProducts(prev => [added, ...prev]);
    setCurrentPage('products');
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.id !== id));

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleCheckout = async (method: PaymentMethod) => {
    if (!user) {
      setCurrentPage('login');
      return;
    }
    const total = cart.reduce((a, b) => a + b.price * b.quantity, 0);
    await backend.placeOrder(user.id, cart, total, method);
    
    const updatedUser = await backend.login(user.email);
    setUser(updatedUser);

    setCart([]);
    alert(`Success! Payment of KES ${total.toLocaleString()} received via ${method.toUpperCase()}. You earned ${Math.floor(total * 0.01)} loyalty points!`);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProductDetail = (p: Product) => {
    setSelectedProduct(p);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleUpdateProfilePhoto = (photo: string) => {
    if (user) {
      setUser({ ...user, profilePhoto: photo });
    }
  };

  const cartItemIds = cart.map(item => item.id);

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      
      <div className="fixed inset-0 -z-10 pointer-events-none transition-all">
        <div className="absolute top-[-10%] left-[-10%] w-[65%] h-[65%] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[180px] animate-[pulse_12s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[65%] h-[65%] bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-[180px] animate-[pulse_18s_ease-in-out_infinite] [animation-delay:4s]"></div>
        
        <div 
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]" 
          style={{ backgroundImage: `linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)`, backgroundSize: '60px 60px' }}
        ></div>
      </div>

      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)} 
        user={user}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        onUpdateProfilePhoto={handleUpdateProfilePhoto}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 sm:px-8">
        {isLoading && currentPage === 'products' ? (
          <div className="flex flex-col items-center justify-center py-60 space-y-8">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] animate-pulse">Syncing Susan's Catalog...</p>
          </div>
        ) : (
          <>
            {currentPage === 'login' && <Login onLogin={(u) => { setUser(u); setCurrentPage('home'); }} onBack={() => setCurrentPage('home')} />}
            {currentPage === 'contact' && <Contact />}
            {currentPage === 'style-hub' && <StyleHub onAddToCart={addToCart} />}
            {currentPage === 'admin-panel' && <AdminPanel onAddProduct={handleAddProduct} />}
            {currentPage === 'affiliate' && <AffiliateProgram onAddToCart={addToCart} onViewDetail={openProductDetail} />}
            {currentPage === 'cart' && (
              <Cart items={cart} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} onCheckout={handleCheckout} onGoShopping={() => setCurrentPage('products')} />
            )}
            {currentPage === 'product-detail' && selectedProduct && (
              <ProductDetail product={selectedProduct} onAddToCart={addToCart} onBack={() => setCurrentPage('products')} />
            )}

            {currentPage === 'home' && (
              <div className="space-y-48 py-8 animate-in fade-in duration-1000">
                <section className="relative h-[600px] sm:h-[800px] rounded-[4rem] overflow-hidden group shadow-2xl border-8 border-white dark:border-slate-900 bg-slate-900">
                  <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[4000ms]" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/30 to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col items-start justify-center p-12 sm:p-24">
                    <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-[10px] font-black px-6 py-2.5 rounded-full uppercase tracking-[0.4em] mb-10 border border-white/20">
                      <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                      Now with Rewards
                    </span>
                    <h1 className="text-7xl sm:text-[11rem] font-black text-white mb-10 leading-[0.8] tracking-tighter max-w-5xl">
                      Style <span className="text-indigo-400">Earns.</span><br/>
                      <span className="text-slate-400">Rewards.</span>
                    </h1>
                    <p className="text-2xl sm:text-4xl text-slate-300 max-w-2xl mb-16 leading-relaxed font-bold">
                      Shop Nairobi's finest hardware and tech. Earn points on every KES spent.
                    </p>
                    <div className="flex flex-wrap gap-10">
                      <button onClick={() => setCurrentPage('products')} className="bg-white text-indigo-950 px-16 py-7 rounded-[2.5rem] font-black text-2xl hover:bg-indigo-50 hover:shadow-2xl transition-all active:scale-95">Explore Shop</button>
                      <button onClick={() => setCurrentPage('style-hub')} className="glass text-white px-16 py-7 rounded-[2.5rem] font-black text-2xl border-2 border-white/40 hover:bg-white/10 transition-all flex items-center gap-4">
                        AI Stylist Nova
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>
                      </button>
                    </div>
                  </div>
                </section>

                <section className="relative py-24 px-4 overflow-visible">
                  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
                    <div className="w-full lg:w-1/2 relative group">
                      <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-emerald-500 rounded-[5.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                      <div className="relative aspect-[3/4] rounded-[5rem] overflow-hidden border-8 border-white dark:border-slate-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] bg-slate-200 dark:bg-slate-800 animate-[float_12s_ease-in-out_infinite]">
                        <img 
                          src="https://iili.io/fyskfxj.jpg" 
                          alt="Susan Njeri" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                          onError={(e) => { 
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'; 
                          }}
                        />
                      </div>
                      <div className="absolute -bottom-10 -right-10 glass dark:bg-slate-800/80 p-10 rounded-[3.5rem] shadow-2xl border border-slate-100 dark:border-white/10 animate-bounce-slow">
                        <p className="text-5xl font-black text-indigo-600 tracking-tighter italic">S. Njeri</p>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-3 text-center">Founder & CEO</p>
                      </div>
                    </div>

                    <div className="flex-1 space-y-12">
                      <span className="inline-block bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-[11px] font-black px-8 py-3 rounded-full uppercase tracking-[0.4em] shadow-sm">Nairobi's Retail Visionary</span>
                      <h2 className="text-7xl sm:text-[8rem] font-black text-slate-900 dark:text-white tracking-tighter leading-[0.85]">
                        The Face of <span className="text-indigo-600 underline decoration-8 decoration-indigo-600/10 underline-offset-[12px]">Luxury.</span>
                      </h2>
                      <p className="text-3xl text-slate-600 dark:text-slate-300 font-bold leading-relaxed">
                        "Susan's Market isn't just about products; it's about a lifestyle defined by performance hardware and uncompromising style."
                      </p>
                    </div>
                  </div>
                </section>

                <section className="px-4">
                  <div className="flex items-end justify-between mb-20">
                    <div>
                      <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">Market Hotlist</h2>
                      <p className="text-2xl text-slate-500 dark:text-slate-400 mt-3 font-bold">Vetted by Susan Njeri.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {featuredProducts.map(p => (
                      <ProductCard key={p.id} product={p} onAdd={() => addToCart(p)} onClick={() => openProductDetail(p)} />
                    ))}
                  </div>
                </section>
              </div>
            )}

            {currentPage === 'products' && (
              <div className="space-y-16 py-8 animate-in fade-in duration-500">
                <div className="sticky top-24 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-8 sm:p-12 rounded-[3.5rem] shadow-xl border border-white/20 dark:border-white/5 space-y-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
                    <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">Marketplace</h1>
                    <div className="relative w-full md:w-[450px] group">
                      <input 
                        type="text" placeholder="Search brands, hardware, style..." 
                        className="w-full pl-16 pr-8 py-6 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:border-indigo-600 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all shadow-sm font-bold text-lg"
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                  {filteredProducts.map(p => (
                    <ProductCard key={p.id} product={p} onAdd={() => addToCart(p)} onClick={() => openProductDetail(p)} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <Assistant cartItemIds={cartItemIds} />
    </div>
  );
};

const ProductCard: React.FC<{ 
  product: Product; 
  onAdd: () => void; 
  onClick: () => void;
}> = ({ product, onAdd, onClick }) => {
  return (
    <div className="group bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[4rem] overflow-hidden border-2 border-slate-50 dark:border-white/5 shadow-sm hover:shadow-[0_45px_90px_-20px_rgba(0,0,0,0.18)] hover:-translate-y-4 transition-all duration-700 flex flex-col relative">
      <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer" onClick={onClick}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" loading="lazy" />
      </div>
      <div className="p-12 flex-1 flex flex-col">
        <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter mb-4">{product.name}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-lg line-clamp-2 mb-12 leading-relaxed font-bold">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">KES {product.price.toLocaleString()}</span>
          <button onClick={onAdd} className="w-20 h-20 bg-slate-900 dark:bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center hover:bg-indigo-600 hover:shadow-2xl transition-all active:scale-[0.8] shadow-lg">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;