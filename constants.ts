
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
    id: 'e2',
    name: 'Solar Power Bank 50k',
    description: 'Rugged 50,000mAh power bank with solar charging. Essential for safari adventures.',
    price: 5200,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?auto=format&fit=crop&q=80&w=800',
    rating: 4.7
  },
  {
    id: 'e-watch-ultra',
    name: 'Watch Ultra 2',
    description: 'The most rugged and capable Watch ever. Designed for the extremes.',
    price: 115000,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1434493907317-a46b53b8183e?auto=format&fit=crop&q=80&w=800',
    rating: 4.9
  },
  {
    id: 'ds-e1',
    name: 'Stealth Pro Keyboard',
    description: 'Custom Gateron switches and CNC aluminum frame. The ultimate tactile typing.',
    price: 22500,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    dropshipSource: 'Amazon'
  },
  {
    id: 'e-tablet-1',
    name: 'iPad Pro 12.9" M2',
    description: 'Astonishing performance. Incredibly advanced displays. Superfast wireless.',
    price: 165000,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800',
    rating: 4.8
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
    description: 'Elegant high heels for a powerful statement. Italian craftsmanship.',
    price: 18500,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
    rating: 4.7
  },
  {
    id: 'k2',
    name: 'Nairobi Runner X1',
    description: 'Performance running shoes with responsive cushioning for urban athletes.',
    price: 6800,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    rating: 4.8
  },
  {
    id: 's-sneaker-1',
    name: 'Air Jordan 1 Retro',
    description: 'The classic silhouette that changed the game. Premium materials.',
    price: 25000,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800',
    rating: 4.9
  },
  {
    id: 'k5',
    name: 'Suede Chelsea Boots',
    description: 'Premium suede boots. Classic London style for Nairobi nights.',
    price: 8500,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=800',
    rating: 4.8
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

  // FASHION
  {
    id: 'f1',
    name: 'Ankara Wrap Dress',
    description: 'Vibrant Kitenge fabric tailored for a modern, elegant silhouette.',
    price: 4800,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
    rating: 4.9
  },
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
    id: 'ds-f1',
    name: 'Luxe Quilted Bag',
    description: 'Designer quilted lambskin with gold-tone hardware. Pure luxury.',
    price: 185000,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1584917033904-491a34d28dc1?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    dropshipSource: 'Farfetch'
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
    id: 'f-watch-1',
    name: 'Rolex Datejust 41',
    description: 'A masterpiece of precision and timeless design.',
    price: 1250000,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595ee?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    featured: true
  },

  // JEWELRY
  {
    id: 'j1',
    name: 'Maasai Beaded Choker',
    description: 'Intricate Maasai beadwork handcrafted in Narok.',
    price: 2200,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
    rating: 5.0
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
    id: 'h1',
    name: 'Rosemary Growth Oil',
    description: 'Infused with Kenyan Rosemary. Promotes healthy growth.',
    price: 1200,
    category: 'Hair Care',
    image: 'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&q=80&w=800',
    rating: 4.9
  },
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
    description: 'The essence of femininity. A timeless, legendary fragrance.',
    price: 28500,
    category: 'Body Care',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    featured: true
  },
  {
    id: 'b1',
    name: 'Whipped Shea Butter',
    description: 'Raw, unrefined shea butter whipped with cocoa butter.',
    price: 1500,
    category: 'Body Care',
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800',
    rating: 4.9
  },

  // HOME
  {
    id: 'hm1',
    name: 'Ceramic Textured Vase',
    description: 'Hand-thrown minimalist vase with a stone finish.',
    price: 4500,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=800',
    rating: 4.9
  },
  {
    id: 'hm-chair-1',
    name: 'Velvet Accent Chair',
    description: 'Luxurious teal velvet with gold-finished legs for a modern touch.',
    price: 32000,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800',
    rating: 4.8
  },
  {
    id: 'hm-espresso-1',
    name: 'Breville Barista Pro',
    description: 'Barista-quality performance with a new intuitive interface.',
    price: 115000,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    dropshipSource: 'Amazon'
  },
  {
    id: 'hm-art-1',
    name: 'Abstract Canvas Art',
    description: 'Hand-painted modern abstract art for sophisticated interiors.',
    price: 18000,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800',
    rating: 4.7
  },

  // ADDITIONAL PRODUCTS TO INCREASE VOLUME
  { id: 'vol1', name: 'Smart Bulb Pack', description: 'Millions of colors at your fingertips.', price: 4500, category: 'Electronics', image: 'https://images.unsplash.com/photo-1550524514-9636edba3118?auto=format&fit=crop&q=80&w=800', rating: 4.5 },
  { id: 'vol2', name: 'Premium Yoga Mat', description: 'Non-slip eco-friendly rubber.', price: 5500, category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=800', rating: 4.8 } as any,
  { id: 'vol3', name: 'Organic Face Serum', description: 'Vitamin C booster.', price: 3200, category: 'Body Care', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800', rating: 4.9 },
  { id: 'vol4', name: 'Steel Water Bottle', description: 'Keeps cold for 24h.', price: 2800, category: 'Home', image: 'https://images.unsplash.com/photo-1602143307185-8c155639b324?auto=format&fit=crop&q=80&w=800', rating: 4.7 },
  { id: 'vol5', name: 'Leather Tech Pouch', description: 'Organize your cables in style.', price: 7500, category: 'Accessories', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800', rating: 4.6 } as any,
  { id: 'vol6', name: 'White Linen Shirt', description: 'Summer essential.', price: 5200, category: 'Fashion', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800', rating: 4.5 },
  { id: 'vol7', name: 'Graphic Tee Nairobi', description: 'Local artist series.', price: 2500, category: 'Fashion', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800', rating: 4.7 },
  { id: 'vol8', name: 'Denim Jacket', description: 'Vintage wash.', price: 8500, category: 'Fashion', image: 'https://images.unsplash.com/photo-1527082395-e939b847da0d?auto=format&fit=crop&q=80&w=800', rating: 4.4 },
  { id: 'vol9', name: 'Smart Air Purifier', description: 'Cleaner air for home.', price: 22000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1585131236038-fe0819f6071c?auto=format&fit=crop&q=80&w=800', rating: 4.8 },
  { id: 'vol10', name: 'Espresso Cups Set', description: 'Handcrafted ceramics.', price: 4200, category: 'Home', image: 'https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&q=80&w=800', rating: 4.9 },
  { id: 'vol11', name: 'Bamboo Bath Tray', description: 'Luxury spa at home.', price: 6500, category: 'Home', image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=800', rating: 4.7 },
  { id: 'vol12', name: 'Weighted Blanket', description: 'Sleep like a cloud.', price: 14500, category: 'Home', image: 'https://images.unsplash.com/photo-1520004434532-668416a08753?auto=format&fit=crop&q=80&w=800', rating: 4.8 },
  { id: 'vol13', name: 'Leather Belt', description: 'Full grain leather.', price: 3800, category: 'Accessories', image: 'https://images.unsplash.com/photo-1624222247344-550fb86ef74d?auto=format&fit=crop&q=80&w=800', rating: 4.6 } as any,
  { id: 'vol14', name: 'Wool Beanie', description: 'Soft alpaca wool.', price: 3200, category: 'Fashion', image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=800', rating: 4.7 },
  { id: 'vol15', name: 'Canvas Tote Bag', description: 'Sustainable shopper.', price: 1800, category: 'Accessories', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800', rating: 4.5 } as any,
  { id: 'vol16', name: 'Noise Dampening Mats', description: 'For studio setup.', price: 12000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800', rating: 4.3 },
  { id: 'vol17', name: 'Adjustable Dumbbells', description: 'Space saving home gym.', price: 35000, category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2ae617?auto=format&fit=crop&q=80&w=800', rating: 4.8 } as any,
  { id: 'vol18', name: 'Electric Kettle Pro', description: 'Precision temperature.', price: 14500, category: 'Electronics', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=800', rating: 4.9 },
  { id: 'vol19', name: 'Silk Pillowcase', description: 'Better hair and skin.', price: 4800, category: 'Home', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800', rating: 4.9 },
  { id: 'vol20', name: 'Aromatic Candle', description: 'Sandalwood scent.', price: 3500, category: 'Home', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800', rating: 4.8 },
  { id: 'vol21', name: 'Leather Key Organizer', description: 'Silent key storage.', price: 2900, category: 'Accessories', image: 'https://images.unsplash.com/photo-1545465345-037146522791?auto=format&fit=crop&q=80&w=800', rating: 4.6 } as any,
  { id: 'vol22', name: 'Cordless Vacuum', description: 'Lightweight power.', price: 42000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1558317374-067df5f15430?auto=format&fit=crop&q=80&w=800', rating: 4.8 },
  { id: 'vol23', name: 'Designer Umbrella', description: 'Sturdy and chic.', price: 6500, category: 'Accessories', image: 'https://images.unsplash.com/photo-1531315630201-bb15abeb1653?auto=format&fit=crop&q=80&w=800', rating: 4.5 } as any,
  { id: 'vol24', name: 'Tabletop Firepit', description: 'Smokeless ethanol fire.', price: 15000, category: 'Home', image: 'https://images.unsplash.com/photo-1521331043140-5e60802c638e?auto=format&fit=crop&q=80&w=800', rating: 4.7 },
  { id: 'vol25', name: 'Pet Smart Feeder', description: 'App controlled feeding.', price: 18500, category: 'Electronics', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800', rating: 4.9 }
];

export const CATEGORIES = ['All', 'Electronics', 'Shoes', 'Fashion', 'Jewelry', 'Hair Care', 'Body Care', 'Home'];

