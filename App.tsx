
import React, { useState, useMemo, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
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
import { OrderHistory } from './components/OrderHistory';
import { generateReceipt } from './services/ReceiptGenerator';
import { backend } from './services/backendService';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastOrder, setLastOrder] = useState<{ items: CartItem[], total: number, method: PaymentMethod, orderId: string, mpesaNumber?: string } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState<Theme>('light');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && firebaseUser.email) {
        try {
          const userData = await backend.login(firebaseUser.email);
          setUser(userData);
        } catch (err) {
          console.error("Failed to sync user data:", err);
        }
      } else {
        setUser(null);
      }
      setIsAuthReady(true);
    });

    const savedTheme = localStorage.getItem('susan_market_theme') as Theme;
    if (savedTheme) setTheme(savedTheme);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('susan_market_theme', theme);
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
    return products.filter((p: Product) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm, products]);

  const featuredProducts = useMemo(() => products.filter((p: Product) => p.featured), [products]);

  const addToCart = (product: Product) => {
    setCart((prev: CartItem[]) => {
      const existing = prev.find((item: CartItem) => item.id === product.id);
      if (existing) {
        toast.success(`Added another ${product.name} to cart`);
        return prev.map((item: CartItem) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      toast.success(`${product.name} added to cart`);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart((prev: CartItem[]) => prev.filter((item: CartItem) => item.id !== id));

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev: CartItem[]) => prev.map((item: CartItem) => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleCheckout = async (method: PaymentMethod, mpesaNumber?: string) => {
    if (!user) {
      setCurrentPage('login');
      return;
    }
    const total = cart.reduce((a: number, b: CartItem) => a + b.price * b.quantity, 0);
    const order = await backend.placeOrder(user.id, cart, total, method, mpesaNumber);
    
    setLastOrder({ items: [...cart], total, method, orderId: order.id, mpesaNumber });
    
    const updatedUser = await backend.login(user.email);
    setUser(updatedUser);
    localStorage.setItem('susan_market_active_user', JSON.stringify(updatedUser));

    setCart([]);
    setCurrentPage('checkout-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Trigger Admin WhatsApp Alert
    if ((window as any).lastOrderWhatsAppUrl) {
      setTimeout(() => {
        window.open((window as any).lastOrderWhatsAppUrl, '_blank');
      }, 2000);
    }

    // Auto-generate receipt
    setTimeout(() => {
      generateReceipt(user, cart, total, method, order.id, mpesaNumber);
    }, 1500);
  };

  const openProductDetail = (p: Product) => {
    setSelectedProduct(p);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (u: User) => {
    setUser(u);
    localStorage.setItem('susan_market_active_user', JSON.stringify(u));
    setCurrentPage('home');
  };

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
    setCurrentPage('home');
  };

  const handleUpdateProfilePhoto = (photo: string) => {
    if (user) {
      const updatedUser = { ...user, profilePhoto: photo };
      setUser(updatedUser);
      localStorage.setItem('susan_market_active_user', JSON.stringify(updatedUser));
    }
  };

  const toggleWishlist = async (productId: string) => {
    if (!user) {
      setCurrentPage('login');
      return;
    }
    try {
      const isRemoving = user.wishlist?.includes(productId);
      const newWishlist = await backend.toggleWishlist(user.id, productId);
      const updatedUser = { ...user, wishlist: newWishlist };
      setUser(updatedUser);
      localStorage.setItem('susan_market_active_user', JSON.stringify(updatedUser));
      
      if (isRemoving) {
        toast.info('Removed from wishlist');
      } else {
        toast.success('Added to wishlist');
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      toast.error('Failed to update wishlist');
    }
  };

  const wishlistProducts = products.filter(p => user?.wishlist?.includes(p.id));

  const cartItemIds = cart.map((item: CartItem) => item.id);

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      <div className="fixed inset-0 -z-10 pointer-events-none transition-all">
        <div className="absolute top-[-10%] left-[-10%] w-[65%] h-[65%] bg-indigo-500/10 rounded-full blur-[180px] animate-[pulse_12s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[65%] h-[65%] bg-emerald-400/10 rounded-full blur-[180px] animate-[pulse_18s_ease-in-out_infinite] [animation-delay:4s]"></div>
      </div>

      <Toaster position="top-center" richColors />
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        cartCount={cart.reduce((a: number, b: CartItem) => a + b.quantity, 0)} 
        user={user}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        onUpdateProfilePhoto={handleUpdateProfilePhoto}
      />

      <main className="flex-1 max-w-[2000px] mx-auto w-full px-2 py-4 sm:px-6">
        {isLoading && currentPage === 'products' ? (
          <div className="flex flex-col items-center justify-center py-60 space-y-8">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] animate-pulse">Syncing Susan's Catalog...</p>
          </div>
        ) : (
          <>
            {currentPage === 'login' && <Login onLogin={handleLoginSuccess} onBack={() => setCurrentPage('home')} />}
            {currentPage === 'contact' && <Contact />}
            {currentPage === 'style-hub' && <StyleHub onAddToCart={addToCart} products={products} />}
            {currentPage === 'admin-panel' && (
              <AdminPanel 
                products={products}
                onAddProduct={(p) => { 
                  backend.addProduct(p); 
                  setProducts(prev => [p, ...prev]); 
                  setCurrentPage('products'); 
                }} 
                onUpdateProduct={(id, updates) => {
                  backend.updateProduct(id, updates);
                  setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
                  setCurrentPage('products');
                }}
                onDeleteProduct={(id) => {
                  backend.deleteProduct(id);
                  setProducts(prev => prev.filter(p => p.id !== id));
                }}
              />
            )}
            {currentPage === 'affiliate' && <AffiliateProgram onAddToCart={addToCart} onViewDetail={openProductDetail} />}
            {currentPage === 'cart' && (
              <Cart items={cart} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} onCheckout={handleCheckout} onGoShopping={() => setCurrentPage('products')} />
            )}
            {currentPage === 'product-detail' && selectedProduct && (
              <ProductDetail 
                product={selectedProduct} 
                user={user} 
                onAddToCart={addToCart} 
                onBack={() => setCurrentPage('products')} 
                isWishlisted={user?.wishlist?.includes(selectedProduct.id) || false}
                onToggleWishlist={() => toggleWishlist(selectedProduct.id)}
              />
            )}

            {currentPage === 'checkout-success' && lastOrder && user && (
              <div className="max-w-4xl mx-auto py-20 text-center space-y-10 animate-in fade-in zoom-in-95 duration-700">
                <div className="w-32 h-32 bg-emerald-500 rounded-[3.5rem] flex items-center justify-center text-white mx-auto shadow-2xl animate-bounce">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
                <div className="space-y-4">
                  <h2 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">Order Confirmed.</h2>
                  <p className="text-xl font-bold text-slate-500 dark:text-slate-400">Thank you for shopping at Susan's Market. Your order ID is <span className="text-indigo-600 font-black">#{lastOrder.orderId}</span>.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button 
                    onClick={async () => await generateReceipt(user, lastOrder.items, lastOrder.total, lastOrder.method, lastOrder.orderId, lastOrder.mpesaNumber)}
                    className="px-12 py-5 bg-indigo-600 text-white rounded-[2rem] font-black uppercase text-sm tracking-[0.3em] shadow-2xl hover:scale-105 transition-all flex items-center gap-4"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                    Download Receipt
                  </button>
                  <button 
                    onClick={() => setCurrentPage('home')}
                    className="px-12 py-5 bg-slate-900 dark:bg-slate-800 text-white rounded-[2rem] font-black uppercase text-sm tracking-[0.3em] shadow-2xl hover:scale-105 transition-all"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            )}

            {currentPage === 'home' && (
              <div className="space-y-24 py-4 animate-in fade-in duration-1000">
                <section className="relative h-[350px] sm:h-[500px] rounded-[2rem] overflow-hidden group shadow-2xl border-4 border-white dark:border-slate-900 bg-slate-900 mx-2">
                  <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[4000ms]" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/30 to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col items-start justify-center p-6 sm:p-16">
                    <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.4em] mb-6 border border-white/20">
                      Rewards Active
                    </span>
                    <h1 className="text-4xl sm:text-7xl font-black text-white mb-6 leading-none tracking-tighter max-w-4xl">
                      Style <span className="text-indigo-400">Earns.</span><br/>
                      <span className="text-slate-400">Rewards.</span>
                    </h1>
                    <p className="text-base sm:text-xl text-slate-300 max-w-lg mb-8 leading-relaxed font-bold">
                      Shop Nairobi's finest hardware and tech. Earn points on every KES spent.
                    </p>
                    <button onClick={() => setCurrentPage('products')} className="bg-white text-indigo-950 px-8 py-3 rounded-xl font-black text-lg hover:bg-indigo-50 hover:shadow-2xl transition-all active:scale-95">Shop Now</button>
                  </div>
                </section>

                <section className="relative py-12 px-4">
                  <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                    <div className="w-full lg:w-1/3 relative group">
                      <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500 to-emerald-500 rounded-[3rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                      <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl bg-slate-200 dark:bg-slate-800 animate-[float_12s_ease-in-out_infinite]">
                        <img 
                          src="https://iili.io/fyskfxj.jpg" 
                          alt="Susan Njeri" 
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'; }}
                        />
                      </div>
                      <div className="absolute -bottom-6 -right-6 glass dark:bg-slate-800/80 p-5 rounded-3xl shadow-xl border border-slate-100 dark:border-white/10">
                        <p className="text-2xl font-black text-indigo-600 tracking-tighter italic">S. Njeri</p>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Founder & CEO</p>
                      </div>
                    </div>

                    <div className="flex-1 space-y-6">
                      <h2 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                        The Face of <span className="text-indigo-600">Luxury.</span>
                      </h2>
                      <p className="text-xl text-slate-600 dark:text-slate-300 font-bold leading-relaxed italic">
                        "Susan's Market isn't just about products; it's about a lifestyle defined by performance hardware and uncompromising style."
                      </p>
                    </div>
                  </div>
                </section>

                <section className="px-2">
                  <div className="flex items-end justify-between mb-8 px-2">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Hot Picks</h2>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-1.5 sm:gap-3">
                    {featuredProducts.map((p: Product) => (
                      <ProductCard 
                        key={p.id} 
                        product={p} 
                        isWishlisted={user?.wishlist?.includes(p.id) || false}
                        onToggleWishlist={() => toggleWishlist(p.id)}
                        onAdd={() => addToCart(p)} 
                        onClick={() => openProductDetail(p)} 
                      />
                    ))}
                  </div>
                </section>
              </div>
            )}

            {currentPage === 'products' && (
              <div className="space-y-8 py-4 animate-in fade-in duration-500">
                <div className="sticky top-20 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-4 sm:p-6 rounded-2xl shadow-xl border border-white/20 dark:border-white/5 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Marketplace</h1>
                    <div className="relative w-full md:w-[350px]">
                      <input 
                        type="text" placeholder="Search..." 
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:border-indigo-600 outline-none transition-all font-bold text-xs"
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide">
                    {CATEGORIES.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-2 ${
                          selectedCategory === category 
                            ? 'bg-indigo-600 text-white border-indigo-600' 
                            : 'bg-white dark:bg-slate-800 text-slate-400 border-slate-50 dark:border-white/5 hover:border-indigo-600/30'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-1.5 sm:gap-3">
                    {filteredProducts.length > 0 ? (
                    filteredProducts.map((p: Product) => (
                      <ProductCard 
                        key={p.id} 
                        product={p} 
                        isWishlisted={user?.wishlist?.includes(p.id) || false}
                        onToggleWishlist={() => toggleWishlist(p.id)}
                        onAdd={() => addToCart(p)} 
                        onClick={() => openProductDetail(p)} 
                      />
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center">
                       <p className="text-lg font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest">No products found.</p>
                       <button onClick={() => setSelectedCategory('All')} className="text-indigo-600 font-bold hover:underline mt-4">Clear All</button>
                    </div>
                  )}
                </div>
              </div>
            )}
            {currentPage === 'order-history' && user && (
              <OrderHistory user={user} onGoShopping={() => setCurrentPage('products')} />
            )}
            {currentPage === 'wishlist' && (
              <div className="space-y-8 py-4 animate-in fade-in duration-500">
                <div className="flex items-end justify-between border-b-4 border-slate-100 dark:border-white/5 pb-8">
                  <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">My Wishlist</h1>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-6 py-2 rounded-full">{wishlistProducts.length} Items</span>
                </div>
                
                {wishlistProducts.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-1.5 sm:gap-3">
                    {wishlistProducts.map((p: Product) => (
                      <ProductCard 
                        key={p.id} 
                        product={p} 
                        isWishlisted={true}
                        onToggleWishlist={() => toggleWishlist(p.id)}
                        onAdd={() => addToCart(p)} 
                        onClick={() => openProductDetail(p)} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-40 text-center space-y-6">
                    <div className="w-24 h-24 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto text-slate-300">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                    </div>
                    <p className="text-xl font-bold text-slate-400">Your wishlist is empty.</p>
                    <button onClick={() => setCurrentPage('products')} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl">Start Shopping</button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      <Assistant cartItemIds={cartItemIds} products={products} />

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5 py-20 px-4 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black italic">S.</div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Susan's Market</h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Nairobi's premier destination for high-performance hardware and luxury tech lifestyle.
            </p>
          </div>
          
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Shop</h3>
            <ul className="space-y-4">
              {CATEGORIES.slice(0, 5).map(cat => (
                <li key={cat}>
                  <button onClick={() => { setSelectedCategory(cat); setCurrentPage('products'); window.scrollTo(0,0); }} className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-all">{cat}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Company</h3>
            <ul className="space-y-4">
              <li><button onClick={() => setCurrentPage('contact')} className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-all">Contact Us</button></li>
              <li><button onClick={() => setCurrentPage('affiliate')} className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-all">Affiliate Program</button></li>
              <li><button className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-all">Privacy Policy</button></li>
              <li><button className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-all">Terms of Service</button></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Newsletter</h3>
            <p className="text-sm font-bold text-slate-500">Get the latest drops and tech news.</p>
            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); alert('Subscribed! Welcome to the inner circle.'); (e.target as HTMLFormElement).reset(); }}>
              <input 
                type="email" 
                placeholder="Email address" 
                required
                className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 ring-indigo-600 transition-all"
              />
              <button type="submit" className="bg-slate-900 dark:bg-indigo-600 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">Join</button>
            </form>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-50 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">© 2026 Susan's Market. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nairobi, Kenya</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Built for Performance</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ProductCard: React.FC<{ 
  product: Product; 
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onAdd: () => void; 
  onClick: () => void;
}> = ({ product, isWishlisted, onToggleWishlist, onAdd, onClick }) => {
  return (
    <div className="group bg-white dark:bg-slate-900/40 backdrop-blur-md rounded-lg overflow-hidden border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col relative h-full">
      <button 
        onClick={(e) => { 
          e.preventDefault();
          e.stopPropagation(); 
          onToggleWishlist(); 
        }}
        className={`absolute top-1 right-1 z-10 w-6 h-6 rounded-full flex items-center justify-center transition-all ${isWishlisted ? 'bg-rose-500 text-white shadow-lg' : 'bg-white/80 dark:bg-slate-800/80 text-slate-400 hover:text-rose-500'}`}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="3"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
      </button>
      <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer" onClick={onClick}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        <div className="absolute top-1 left-1 px-1 py-0.5 bg-white/90 dark:bg-slate-900/90 rounded text-[5px] font-black text-indigo-600 uppercase tracking-tighter shadow-sm">
           {product.category}
        </div>
      </div>
      <div className="p-1.5 flex-1 flex flex-col justify-between gap-0.5">
        <div>
          <h3 className="text-[9px] font-black text-slate-900 dark:text-white leading-tight tracking-tight line-clamp-1">{product.name}</h3>
          <p className="text-[7px] text-slate-400 dark:text-slate-500 line-clamp-1 font-bold italic leading-none">{product.description}</p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[9px] font-black text-slate-900 dark:text-white tracking-tighter">KES {product.price.toLocaleString()}</span>
          <button onClick={(e) => { e.stopPropagation(); onAdd(); }} className="w-5 h-5 bg-slate-900 dark:bg-indigo-600 text-white rounded flex items-center justify-center hover:bg-indigo-600 transition-all active:scale-90">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
