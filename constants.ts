import { Product } from './types';

export const PRODUCTS: Product[] = [
  // ELECTRONICS (Hardware & Tech)
  {
    id: 'e1',
    name: 'Nova Pro ANC Earbuds',
    description: 'Active Noise Cancelling earbuds with spatial audio and 40-hour battery life.',
    price: 15500,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    featured: true
  },
  {
    id: 'e-phone-1',
    name: 'iPhone 15 Pro Titanium',
    description: 'The ultimate smartphone with aerospace-grade titanium design and A17 Pro chip.',
    price: 185000,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    featured: true
  },
  {
    id: 'hdw1',
    name: 'Smart LED Rainfall Shower',
    description: 'Hydroelectric powered LED rainfall shower head with real-time temperature display.',
    price: 12500,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    rating: 4.8
  },
  {
    id: 'e-laptop-1',
    name: 'MacBook Pro M3 Max',
    description: 'Unprecedented performance for pro workflows with the most advanced chips for a personal computer.',
    price: 450000,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    featured: true
  },
  {
    id: 'e-watch-ultra',
    name: 'Watch Ultra 2',
    description: 'The most rugged and capable Watch ever.',
    price: 115000,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1434493907317-a46b53b8183e?auto=format&fit=crop&q=80&w=800',
    rating: 4.9
  },
  {
    id: 'e-tablet-1',
    name: 'iPad Pro 12.9" M2',
    description: 'Astonishing performance. Incredibly advanced displays.',
    price: 165000,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800',
    rating: 4.8
  },
  {
    id: 'e-ps5',
    name: 'PlayStation 5 Pro',
    description: 'Next-gen gaming with enhanced ray tracing.',
    price: 125000,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1606813907291-d86ebb99592d?auto=format&fit=crop&q=80&w=800',
    rating: 4.9
  },

  // SHOES
  {
    id: 'k1',
    name: 'Safari Leather Boots',
    description: 'Handcrafted in Kenya. Genuine leather with a soft crepe sole.',
    price: 4500,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1520639889458-39676b830139?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    featured: true
  },
  {
    id: 's-heel-1',
    name: 'Stiletto Red Pumps',
    description: 'Elegant high heels for a powerful statement.',
    price: 18500,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
    rating: 4.7
  },
  {
    id: 's-sneaker-1',
    name: 'Air Jordan 1 Retro',
    description: 'The classic silhouette that changed the game.',
    price: 25000,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800',
    rating: 4.9
  },
  {
    id: 's-loafer-1',
    name: 'Tassel Leather Loafers',
    description: 'Sophisticated comfort for the modern gentleman.',
    price: 12000,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800',
    rating: 4.6
  },
  {
    id: 's-vans',
    name: 'Old Skool Classic',
    description: 'The essential skate shoe for daily wear.',
    price: 7500,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800',
    rating: 4.7
  },

  // FASHION
  {
    id: 'f-suit-1',
    name: 'Midnight Velvet Suit',
    description: 'Exquisite velvet tailoring for high-end evening galas.',
    price: 45000,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1594932224828-b4b05a8ea998?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    featured: true
  },
  {
    id: 'f-silk-1',
    name: 'Pure Silk Scarf',
    description: 'Hand-painted floral patterns on 100% mulberry silk.',
    price: 9500,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&q=80&w=800',
    rating: 4.9
  },
  {
    id: 'f-coat',
    name: 'Wool Cashmere Coat',
    description: 'Timeless winter luxury for the discerning wardrobe.',
    price: 55000,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1539533018447-63bce167b71c?auto=format&fit=crop&q=80&w=800',
    rating: 4.8
  },
  {
    id: 'f-dress',
    name: 'Evening Satin Gown',
    description: 'Flowing satin with a thigh-high slit.',
    price: 32000,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1518767761162-1593c30ff671?auto=format&fit=crop&q=80&w=800',
    rating: 4.9
  },

  // JEWELRY
  {
    id: 'f-watch-1',
    name: 'Rolex Datejust 41',
    description: 'A masterpiece of precision and timeless design.',
    price: 1250000,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595ee?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    featured: true
  },
  {
    id: 'j-ring-1',
    name: 'Sapphire Halo Ring',
    description: 'Deep blue sapphire surrounded by conflict-free diamonds.',
    price: 245000,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
    rating: 4.9
  },
  {
    id: 'j-gold-1',
    name: '18k Gold Rope Chain',
    description: 'Solid 18k yellow gold with a classic rope twist design.',
    price: 155000,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
    rating: 4.8
  },

  // HAIR & BODY
  {
    id: 'h-dryer-1',
    name: 'Dyson Airwrap',
    description: 'The multi-styler that dries and styles without extreme heat.',
    price: 78000,
    category: 'Hair Care',
    image: 'https://images.unsplash.com/photo-1522338140262-f46f5912018a?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    featured: true
  },
  {
    id: 'b-perfume-1',
    name: 'Chanel No. 5',
    description: 'The essence of femininity. A timeless fragrance.',
    price: 28500,
    category: 'Body Care',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    featured: true
  },

  // HOME
  {
    id: 'hm-chair-1',
    name: 'Velvet Accent Chair',
    description: 'Luxurious teal velvet with gold-finished legs.',
    price: 32000,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800',
    rating: 4.8
  },
  {
    id: 'hm-espresso-1',
    name: 'Breville Barista Pro',
    description: 'Barista-quality performance at home.',
    price: 115000,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
    rating: 4.9
  },

  // MASSIVE EXPANSION (VOL 1-40)
  ...Array.from({ length: 40 }).map((_, i) => ({
    id: `vol-${i + 1}`,
    name: `${['Premium', 'Luxury', 'Elite', 'Vogue', 'Urban'][i % 5]} ${['Kit', 'Set', 'Essential', 'Pro', 'Classic'][i % 5]} ${i + 100}`,
    description: `Expertly curated ${['hardware', 'fashion piece', 'tech gadget', 'lifestyle accessory'][i % 4]} for the modern era.`,
    price: Math.floor(Math.random() * 50000) + 2000,
    category: (['Electronics', 'Shoes', 'Fashion', 'Jewelry', 'Hair Care', 'Body Care', 'Home', 'Accessories'][i % 8]) as any,
    image: `https://picsum.photos/seed/${i + 100}/800/800`,
    rating: 4.0 + (Math.random() * 1.0),
    featured: i < 5
  }))
];

export const CATEGORIES = ['All', 'Electronics', 'Shoes', 'Fashion', 'Jewelry', 'Hair Care', 'Body Care', 'Home', 'Accessories'];


