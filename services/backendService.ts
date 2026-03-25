
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query, 
  where, 
  orderBy, 
  onSnapshot,
  Timestamp,
  serverTimestamp,
  getDocFromServer
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { User, Order, CartItem, PaymentMethod, ContactMessage, Product, Inquiry, Review } from '../types';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../constants';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const POINTS_RATE = 0.01; // 1 point per 100 KES

// Susan's Verified Contact Info
export const SUSAN_CONTACT = {
  PHONE: "254114718252",
  EMAIL: "kibuikevin@zetech.ac.ke" // Updated to match user context
};

class BackendService {
  constructor() {
    this.testConnection();
  }

  private async testConnection() {
    try {
      await getDocFromServer(doc(db, 'test', 'connection'));
    } catch (error) {
      if(error instanceof Error && error.message.includes('the client is offline')) {
        console.error("Please check your Firebase configuration. ");
      }
    }
  }

  async login(email: string): Promise<User> {
    const path = `users/${auth.currentUser?.uid}`;
    try {
      if (!auth.currentUser) throw new Error("No authenticated user");
      
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      const isAdmin = email === SUSAN_CONTACT.EMAIL;
      
      if (userDoc.exists()) {
        const existingData = userDoc.data() as User;
        // If the email matches but the document says they aren't admin, update it
        if (isAdmin && !existingData.isAdmin) {
          await updateDoc(doc(db, 'users', auth.currentUser.uid), { isAdmin: true });
          return { ...existingData, isAdmin: true };
        }
        return existingData;
      } else {
        const isAdmin = email === SUSAN_CONTACT.EMAIL;
        const newUser: User = {
          id: auth.currentUser.uid,
          email,
          name: auth.currentUser.displayName || email.split('@')[0],
          isAdmin,
          loyaltyPoints: 0,
          profilePhoto: auth.currentUser.photoURL || undefined
        };
        await setDoc(doc(db, 'users', auth.currentUser.uid), newUser);
        return newUser;
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
      throw error;
    }
  }

  async getProducts(): Promise<Product[]> {
    const path = 'products';
    try {
      const q = query(collection(db, path)); // Removed orderBy to avoid index issues
      const snapshot = await getDocs(q);
      let products = snapshot.docs.map(doc => doc.data() as Product);
      
      if (products.length === 0) {
        return [];
      }
      return products;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      throw error;
    }
  }

  async seedProducts(): Promise<void> {
    const path = 'products';
    try {
      for (const p of DEFAULT_PRODUCTS) {
        await setDoc(doc(db, 'products', p.id), p);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
      throw error;
    }
  }

  async addProduct(product: Product): Promise<Product> {
    const path = `products/${product.id}`;
    try {
      await setDoc(doc(db, 'products', product.id), product);
      return product;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
      throw error;
    }
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<void> {
    const path = `products/${id}`;
    try {
      await updateDoc(doc(db, 'products', id), updates);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<void> {
    const path = `products/${id}`;
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
      throw error;
    }
  }

  async placeOrder(userId: string, items: CartItem[], total: number, paymentMethod: PaymentMethod, mpesaNumber?: string): Promise<Order> {
    const path = 'orders';
    try {
      const pointsEarned = Math.floor(total * POINTS_RATE);
      const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      const order: any = {
        id: orderId,
        userId,
        items,
        total,
        paymentMethod,
        mpesaNumber,
        status: 'pending',
        createdAt: serverTimestamp(),
        pointsEarned
      };
      
      await setDoc(doc(db, 'orders', orderId), order);

      // Update user points
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      let userName = userId;
      if (userDoc.exists()) {
        const userData = userDoc.data();
        userName = userData.name || userData.email || userId;
        const currentPoints = userData.loyaltyPoints || 0;
        await updateDoc(userRef, { loyaltyPoints: currentPoints + pointsEarned });
      }

      // Admin WhatsApp Alert
      const itemsList = items.map(i => `- ${i.name} (x${i.quantity})`).join('\n');
      let waText = `*New Order Alert - Susan's Market*\n\n*Order ID:* ${orderId}\n*Customer:* ${userName}\n*Total:* KES ${total.toLocaleString()}\n*Payment:* ${paymentMethod.toUpperCase()}`;
      if (mpesaNumber) waText += `\n*M-Pesa No:* ${mpesaNumber}`;
      waText += `\n\n*Items:*\n${itemsList}\n\n_Please check the admin panel to manage this order._`;
      
      const waUrl = `https://wa.me/${SUSAN_CONTACT.PHONE}?text=${encodeURIComponent(waText)}`;
      
      // Store in window for App.tsx to pick up if needed
      (window as any).lastOrderWhatsAppUrl = waUrl;

      return { ...order, createdAt: new Date().toISOString() };
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
      throw error;
    }
  }

  async getOrders(): Promise<Order[]> {
    const path = 'orders';
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt
        } as Order;
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      throw error;
    }
  }

  async deleteOrder(id: string): Promise<void> {
    const path = `orders/${id}`;
    try {
      await deleteDoc(doc(db, 'orders', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
      throw error;
    }
  }

  async sendContactMessage(msg: ContactMessage): Promise<boolean> {
    const path = 'inquiries';
    try {
      const inquiryId = `INQ-${Date.now()}`;
      const inquiry: any = {
        ...msg,
        id: inquiryId,
        createdAt: serverTimestamp(),
        read: false
      };
      await setDoc(doc(db, 'inquiries', inquiryId), inquiry);

      const waText = `*Susan's Market Inquiry*\n\n*From:* ${msg.name} (${msg.email})\n*Subject:* ${msg.subject}\n\n*Message:* ${msg.message}`;
      const waUrl = `https://wa.me/${SUSAN_CONTACT.PHONE}?text=${encodeURIComponent(waText)}`;
      
      (window as any).lastWhatsAppInquiryUrl = waUrl;
      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
      throw error;
    }
  }

  async getInquiries(): Promise<Inquiry[]> {
    const path = 'inquiries';
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt
        } as Inquiry;
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      throw error;
    }
  }

  async markInquiryRead(id: string): Promise<void> {
    const path = `inquiries/${id}`;
    try {
      await updateDoc(doc(db, 'inquiries', id), { read: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
      throw error;
    }
  }

  async deleteInquiry(id: string): Promise<void> {
    const path = `inquiries/${id}`;
    try {
      await deleteDoc(doc(db, 'inquiries', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
      throw error;
    }
  }

  async addReview(review: Omit<Review, 'id' | 'createdAt'>): Promise<void> {
    const path = 'reviews';
    try {
      const reviewId = `REV-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const newReview: Review = {
        ...review,
        id: reviewId,
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'reviews', reviewId), newReview);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
      throw error;
    }
  }

  async getReviews(productId: string): Promise<Review[]> {
    const path = 'reviews';
    try {
      const q = query(collection(db, path), where('productId', '==', productId), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => doc.data() as Review);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      throw error;
    }
  }

  async toggleWishlist(userId: string, productId: string): Promise<string[]> {
    const path = `users/${userId}`;
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) throw new Error('User not found');
      
      const userData = userDoc.data() as User;
      const wishlist = userData.wishlist || [];
      const index = wishlist.indexOf(productId);
      
      let newWishlist: string[];
      if (index > -1) {
        newWishlist = wishlist.filter(id => id !== productId);
      } else {
        newWishlist = [...wishlist, productId];
      }
      
      await updateDoc(userRef, { wishlist: newWishlist });
      return newWishlist;
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
      throw error;
    }
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    const path = 'orders';
    try {
      const q = query(collection(db, path), where('userId', '==', userId), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => doc.data() as Order);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      throw error;
    }
  }
}

export const backend = new BackendService();
