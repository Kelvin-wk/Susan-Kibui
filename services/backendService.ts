
import { User, Order, CartItem, PaymentMethod, ContactMessage, Product, Inquiry } from '../types';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../constants';

const SIMULATE_DELAY = 1200;
const POINTS_RATE = 0.01; // 1 point per 100 KES

// Susan's Verified Contact Info
export const SUSAN_CONTACT = {
  PHONE: "254114718252",
  EMAIL: "sherrysusannjeri2001@gmail.com"
};

const STORAGE_KEYS = {
  USERS: 'susan_market_users',
  PRODUCTS: 'susan_market_products',
  ORDERS: 'susan_market_orders',
  INQUIRIES: 'susan_market_inquiries',
};

class BackendService {
  private users: User[];
  private products: Product[];
  private orders: Order[];
  private inquiries: Inquiry[];

  constructor() {
    this.users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    if (this.users.length === 0) {
      this.users = [
        { id: '1', email: SUSAN_CONTACT.EMAIL, name: 'Susan Njeri', isAdmin: true, loyaltyPoints: 5000 },
        { id: '2', email: 'user@susan.co.ke', name: 'James Kariuki', isAdmin: false, loyaltyPoints: 120 }
      ];
      this.saveToDisk(STORAGE_KEYS.USERS, this.users);
    }

    this.products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
    if (this.products.length === 0) {
      this.products = DEFAULT_PRODUCTS;
      this.saveToDisk(STORAGE_KEYS.PRODUCTS, this.products);
    }

    this.orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    this.inquiries = JSON.parse(localStorage.getItem(STORAGE_KEYS.INQUIRIES) || '[]');
  }

  private saveToDisk(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  async login(email: string, password?: string): Promise<User> {
    await new Promise(r => setTimeout(r, 600));
    let user = this.users.find(u => u.email === email);
    if (!user) {
      const isAdmin = email.includes('admin') || email === SUSAN_CONTACT.EMAIL;
      user = { 
        id: Math.random().toString(36).substr(2, 9), 
        email, 
        name: email.split('@')[0], 
        isAdmin: isAdmin,
        loyaltyPoints: 0
      };
      this.users.push(user);
      this.saveToDisk(STORAGE_KEYS.USERS, this.users);
    }
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
  }

  async addProduct(product: Product): Promise<Product> {
    await new Promise(r => setTimeout(r, 1000));
    this.products.unshift(product);
    this.saveToDisk(STORAGE_KEYS.PRODUCTS, this.products);
    return product;
  }

  async placeOrder(userId: string, items: CartItem[], total: number, paymentMethod: PaymentMethod): Promise<Order> {
    await new Promise(r => setTimeout(r, SIMULATE_DELAY));
    const pointsEarned = Math.floor(total * POINTS_RATE);
    
    const order: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      userId,
      items,
      total,
      paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString(),
      pointsEarned
    };
    
    this.orders.unshift(order);
    this.saveToDisk(STORAGE_KEYS.ORDERS, this.orders);

    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      this.users[userIndex].loyaltyPoints = (this.users[userIndex].loyaltyPoints || 0) + pointsEarned;
      this.saveToDisk(STORAGE_KEYS.USERS, this.users);
    }

    return order;
  }

  async sendContactMessage(msg: ContactMessage): Promise<boolean> {
    await new Promise(r => setTimeout(r, 800));
    const inquiry: Inquiry = {
      ...msg,
      id: `INQ-${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false
    };
    this.inquiries.unshift(inquiry);
    this.saveToDisk(STORAGE_KEYS.INQUIRIES, this.inquiries);

    const waText = `*Susan's Market Inquiry*\n\n*From:* ${msg.name} (${msg.email})\n*Subject:* ${msg.subject}\n\n*Message:* ${msg.message}`;
    const waUrl = `https://wa.me/${SUSAN_CONTACT.PHONE}?text=${encodeURIComponent(waText)}`;
    
    (window as any).lastWhatsAppInquiryUrl = waUrl;
    return true;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.INQUIRIES) || '[]');
  }

  async markInquiryRead(id: string): Promise<void> {
    this.inquiries = this.inquiries.map(inq => inq.id === id ? { ...inq, read: true } : inq);
    this.saveToDisk(STORAGE_KEYS.INQUIRIES, this.inquiries);
  }
}

export const backend = new BackendService();
