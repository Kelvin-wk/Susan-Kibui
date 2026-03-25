
import { Product } from './types';

const staticProducts: Product[] = [];

const generatedProducts: Product[] = [];

export const PRODUCTS: Product[] = [...staticProducts, ...generatedProducts];

export const CATEGORIES = ['All', 'Electronics', 'Shoes', 'Fashion', 'Jewelry', 'Hair Care', 'Body Care', 'Home', 'Accessories', 'Groceries', 'Toys', 'Sports', 'Books', 'Automotive', 'Garden', 'Global Finds', 'Tech & Gadgets', 'Beauty & Wellness', 'Home & Living'];
