
import React, { useState, useEffect } from 'react';
import { Product, Review, User } from '../types';
import { backend } from '../services/backendService';

interface ProductDetailProps {
  product: Product;
  user: User | null;
  onAddToCart: (p: Product) => void;
  onBack: () => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  user, 
  onAddToCart, 
  onBack,
  isWishlisted,
  onToggleWishlist
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [product.id]);

  const fetchReviews = async () => {
    try {
      const data = await backend.getReviews(product.id);
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await backend.addReview({
        productId: product.id,
        userId: user.id,
        userName: user.name || user.email,
        rating: newRating,
        comment: newComment
      });
      setNewComment('');
      setNewRating(5);
      fetchReviews();
    } catch (error) {
      console.error("Error adding review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 font-bold mb-10 transition-all group"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
        Back to Marketplace
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-20">
        <div className="relative group">
          <div className="aspect-square rounded-[3.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute top-6 left-6 px-6 py-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl text-xs font-black text-indigo-600 uppercase tracking-[0.2em] shadow-xl">
            {product.category}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5 text-sm font-black text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-4 py-1 rounded-xl">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                {product.rating} (Verified Product)
              </div>
              <span className="text-emerald-500 font-bold text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                In Stock
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight mb-4">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-indigo-600">KES {product.price.toLocaleString()}</span>
              <span className="text-slate-400 line-through text-lg font-bold">KES {(product.price * 1.2).toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border-2 border-slate-50 dark:border-slate-800 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">About this item</h3>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-3xl text-center">
              <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Shipping</span>
              <span className="font-bold text-slate-900 dark:text-white">Nairobi Express</span>
            </div>
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-3xl text-center">
              <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Authenticity</span>
              <span className="font-bold text-slate-900 dark:text-white">Susan Certified</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => onAddToCart(product)}
              className="flex-1 bg-slate-900 dark:bg-indigo-600 text-white py-6 rounded-[2rem] font-black text-2xl hover:bg-indigo-600 dark:hover:bg-indigo-700 transition-all shadow-2xl active:scale-[0.98] flex items-center justify-center gap-4"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Add to Bag
            </button>
            <button 
              onClick={onToggleWishlist}
              className={`w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all shadow-xl active:scale-90 border-2 ${
                isWishlisted 
                  ? 'bg-rose-500 border-rose-500 text-white' 
                  : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:text-rose-500'
              }`}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </button>
          </div>
          
          <p className="text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
            Eligible for free M-Pesa delivery across Kenya
          </p>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="space-y-12">
        <div className="flex items-end justify-between border-b-4 border-slate-100 dark:border-white/5 pb-8">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Customer Reviews</h2>
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-6 py-2 rounded-full">{reviews.length} Reviews</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {reviews.length === 0 ? (
              <div className="p-12 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800 text-center">
                <p className="text-slate-400 font-bold">No reviews yet. Be the first to share your experience!</p>
              </div>
            ) : (
              reviews.map((rev) => (
                <div key={rev.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border-2 border-slate-50 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 font-black text-xs">
                        {rev.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 dark:text-white text-sm">{rev.userName}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(rev.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < rev.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 dark:bg-indigo-600 p-8 rounded-[3rem] text-white shadow-2xl sticky top-40">
              <h3 className="text-2xl font-black tracking-tight mb-6">Write a Review</h3>
              {user ? (
                <form onSubmit={handleAddReview} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest opacity-60 mb-3">Your Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${newRating >= star ? 'bg-amber-500 text-white shadow-lg' : 'bg-white/10 text-white/40 hover:bg-white/20'}`}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest opacity-60 mb-3">Your Comment</label>
                    <textarea 
                      required
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={4}
                      className="w-full bg-white/10 border-2 border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 outline-none focus:border-white/40 transition-all font-medium resize-none"
                      placeholder="What did you think of this product?"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-100 transition-all shadow-xl disabled:opacity-50"
                  >
                    {isSubmitting ? 'Posting...' : 'Post Review'}
                  </button>
                </form>
              ) : (
                <div className="text-center space-y-4">
                  <p className="font-bold opacity-80">Please login to share your review with the community.</p>
                  <div className="w-12 h-1 bg-white/20 mx-auto rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
