
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Electronics' | 'Lifestyle' | 'Fashion' | 'Home' | 'Shoes' | 'Accessories' | 'Jewelry' | 'Hair Care' | 'Body Care';
  image: string;
  rating: number;
  featured?: boolean;
  dropshipSource?: 'Amazon' | 'AliExpress' | 'Zalando' | 'Farfetch';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface GroundingSource {
  title?: string;
  uri?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: GroundingSource[];
}

export type Page = 'home' | 'products' | 'cart' | 'login' | 'contact' | 'style-hub' | 'product-detail' | 'admin-panel' | 'affiliate';

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  profilePhoto?: string;
  isAffiliate?: boolean;
  affiliateCode?: string;
  earnings?: number;
  referrals?: number;
  loyaltyPoints?: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  paymentMethod: PaymentMethod;
  status: 'pending' | 'completed';
  createdAt: string;
  pointsEarned?: number;
}

export interface Inquiry extends ContactMessage {
  id: string;
  createdAt: string;
  read: boolean;
}

export type PaymentMethod = 'mpesa' | 'paypal' | 'visa' | 'mastercard';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type Theme = 'light' | 'dark';
