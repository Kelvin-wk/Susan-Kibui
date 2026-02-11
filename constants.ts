
import { Product } from './types';

export const PRODUCTS: Product[] = [
  // ELECTRONICS (Hardware & Tech)
  {
    id: 'e1',
    name: 'Nova Pro ANC Earbuds',
    description: 'Active Noise Cancelling earbuds with spatial audio and 40-hour battery life. Perfect for the Nairobi commute.',
    price: 15500,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    featured: true
  },
  {
    id: 'hdw1',
    name: 'Smart LED Rainfall Shower',
    description: 'Hydroelectric powered LED rainfall shower head with real-time temperature display. Pure luxury hardware.',
    price: 12500,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    featured: true
  },
  {
    id: 'e2',
    name: 'Solar Power Bank 50k',
    description: 'Rugged 50,000mAh power bank with solar charging. Essential for off-grid travel and safari adventures.',
    price: 5200,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?auto=format&fit=crop&q=80&w=800',
    rating: 4.7
  },
  {
    id: 'hdw3',
    name: 'Brushless Impact Driver 20V',
    description: 'Professional grade cordless impact driver with high-torque brushless motor for serious hardware projects.',
    price: 18900,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    dropshipSource: 'Amazon'
  },
  {
    id: 'ds-e1',
    name: 'Stealth Pro Mechanical Keyboard',
    description: 'Custom Gateron switches, RGB backlighting, and CNC aluminum frame. The ultimate tactile typing experience.',
    price: 22500,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    dropshipSource: 'Amazon',
    featured: true
  },
  {
    id: 'ds-e2',
    name: 'Zenith 49" Curved Monitor',
    description: 'Ultra-wide 5K resolution with 240Hz refresh rate. Elevate your workstation to professional levels.',
    price: 145000,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    dropshipSource: 'Amazon'
  },
  {
    id: 'e3',
    name: 'Smart Home Security Cam',
    description: '4K resolution with AI motion tracking and night vision. Keep your home safe from anywhere.',
    price: 9800,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&q=80&w=800',
    rating: 4.6
  },

  // SHOES
  {
    id: 'k1',
    name: 'Authentic Safari Boots',
    description: 'The legendary "Veldskoen" handcrafted in Kenya. Genuine leather with a soft crepe sole.',
    price: 4500,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1520639889458-39676b830139?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    featured: true
  },
  {
    id: 'ds-k1',
    name: 'Velocity Pro Cycling Cleats',
    description: 'Carbon fiber sole and dual BOA dials for maximum power transfer and precision fit.',
    price: 34000,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    dropshipSource: 'Zalando'
  },
  {
    id: 'k2',
    name: 'Nairobi Runner X1',
    description: 'Ultra-lightweight performance running shoes with responsive cushioning for urban athletes.',
    price: 6800,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    rating: 4.8
  },
  {
    id: 'k3',
    name: 'Executive Derby Shoes',
    description: 'Full-grain Italian leather derbies. Hand-burnished finish with a durable rubber sole.',
    price: 9500,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=800',
    rating: 4.7
  },
  {
    id: 'k4',
    name: 'Canvas High-Top Sneakers',
    description: 'Minimalist canvas sneakers with a reinforced toe cap and eco-friendly rubber sole.',
    price: 3200,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800',
    rating: 4.5
  },
  {
    id: 'k5',
    name: 'Suede Chelsea Boots',
    description: 'Premium suede boots with elastic side panels and a pull tab. Classic London style for Nairobi nights.',
    price: 8500,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=800',
    rating: 4.8
  },

  // FASHION
  {
    id: 'f1',
    name: 'Ankara Wrap Dress',
    description: 'Vibrant high-quality Kitenge fabric tailored for a modern, elegant silhouette.',
    price: 4800,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    featured: true
  },
  {
    id: 'ds-f1',
    name: 'Luxe Quilted Crossbody',
    description: 'Designer quilted lambskin with gold-tone hardware. The ultimate statement accessory for any gala.',
    price: 185000,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1584917033904-491a34d28dc1?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    dropshipSource: 'Farfetch',
    featured: true
  },
  {
    id: 'f2',
    name: 'Linen Summer Set',
    description: 'Breathable ivory linen shirt and trouser set. Perfect for brunch or a coastal getaway.',
    price: 7200,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    rating: 4.6
  },
  {
    id: 'f3',
    name: 'Classic Trench Coat',
    description: 'Timeless camel trench coat. Water-resistant and perfect for chilly Nairobi mornings.',
    price: 11000,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    rating: 4.8
  },
  {
    id: 'f4',
    name: 'Velvet Evening Blazer',
    description: 'Midnight blue velvet blazer with silk lapels. Ultimate luxury for formal events.',
    price: 15000,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1594932224828-b4b05a8ea998?auto=format&fit=crop&q=80&w=800',
    rating: 4.9
  },

  // JEWELRY
  {
    id: 'j1',
    name: 'Zuri Beaded Choker',
    description: 'Intricate Maasai beadwork handcrafted in Narok. A statement piece with centuries of heritage.',
    price: 2200,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    featured: true
  },
  {
    id: 'ds-j1',
    name: 'Titanium Series Chronograph',
    description: 'Swiss-made quartz movement with a grade-5 titanium case and sapphire crystal. Built for endurance.',
    price: 88000,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    dropshipSource: 'Zalando'
  },
  {
    id: 'j2',
    name: 'Minimalist Gold Chain',
    description: '18k gold plated herringbone chain curated for everyday elegance.',
    price: 3800,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
    rating: 4.7
  },
  {
    id: 'j3',
    name: 'Silver Serpent Ring',
    description: 'Adjustable 925 Sterling Silver ring with a sleek serpent design.',
    price: 2900,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
    rating: 4.8
  },
  {
    id: 'j4',
    name: 'Diamond Stud Earrings',
    description: 'Conflict-free 1-carat diamond studs set in 14k white gold. Timeless brilliance.',
    price: 45000,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&q=80&w=800',
    rating: 4.9
  },

  // HAIR & BODY
  {
    id: 'h1',
    name: 'Rosemary Growth Oil',
    description: 'Infused with Kenyan Rosemary and Argan oil. Promotes thick, healthy growth.',
    price: 1200,
    category: 'Hair Care',
    image: 'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    featured: true
  },
  {
    id: 'h2',
    name: 'Honey & Hibiscus Mask',
    description: 'Deep conditioning treatment using organic East African honey.',
    price: 1850,
    category: 'Hair Care',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
    rating: 4.8
  },
  {
    id: 'b1',
    name: 'Whipped Shea Butter',
    description: 'Raw, unrefined shea butter whipped with cocoa butter and essential oils.',
    price: 1500,
    category: 'Body Care',
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800',
    rating: 4.9
  },
  {
    id: 'b2',
    name: 'Eucalyptus Body Scrub',
    description: 'Invigorating sea salt scrub with eucalyptus to refresh tired skin.',
    price: 2200,
    category: 'Body Care',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=800',
    rating: 4.7
  },

  // HOME
  {
    id: 'hm1',
    name: 'Ceramic Textured Vase',
    description: 'Hand-thrown minimalist vase with a textured stone finish.',
    price: 4500,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=800',
    rating: 4.9
  },
  {
    id: 'ds-h1',
    name: 'Aura Smart Indoor Garden',
    description: 'Self-watering hydroponic system with programmable LED growth lights. Fresh herbs year-round.',
    price: 18500,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    dropshipSource: 'AliExpress'
  },
  {
    id: 'ds-h2',
    name: 'PureAir HEPA Ionizer',
    description: 'Medical-grade air filtration system with 360-degree suction and silent sleep mode.',
    price: 24000,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1585131236038-fe0819f6071c?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    dropshipSource: 'AliExpress'
  },
  {
    id: 'hm2',
    name: 'RGB Ambient Lamp',
    description: 'App-controlled ambient light with 16 million colors and music sync.',
    price: 8900,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1543196614-e046c7d3d82e?auto=format&fit=crop&q=80&w=800',
    rating: 4.8
  },
  {
    id: 'hm3',
    name: 'Cotton Throw Blanket',
    description: 'Soft 100% organic cotton throw in a waffle weave. Perfect for cozy evenings.',
    price: 3500,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1520004434532-668416a08753?auto=format&fit=crop&q=80&w=800',
    rating: 4.6
  }
];

export const CATEGORIES = ['All', 'Electronics', 'Shoes', 'Fashion', 'Jewelry', 'Hair Care', 'Body Care', 'Home'];
