import React, { useEffect, useState } from 'react';
import { useAuth } from '../../App';
import { storeService } from '../../services/storeService';
import { productService } from '../../services/productService';
import { Store, Product } from '../../types';
import { motion } from 'motion/react';
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  MessageSquare,
  ArrowRight,
  TrendingDown,
  Eye,
  Plus,
  ExternalLink
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

export default function Overview() {
  const { profile } = useAuth();
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!profile?.storeId) return;
      const myStore = await storeService.getStoreById(profile.storeId);
      if (myStore) {
        setStore(myStore);
        const p = await productService.getProductsByStore(myStore.id);
        setProducts(p);
      }
      setLoading(false);
    }
    fetchData();
  }, [profile]);

  const stats = [
    { label: 'Store Views', value: store?.analytics.views || 0, icon: Eye, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { label: 'Total Products', value: products.length, icon: ShoppingBag, color: 'text-gold', bg: 'bg-gold/10' },
    { label: 'Inquiries', value: store?.analytics.inquiries || 0, icon: MessageSquare, color: 'text-rose', bg: 'bg-rose/5' },
    { label: 'Conversion', value: '2.4%', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
  ];

  if (loading) return <div>Loading Overview...</div>;

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif text-ink tracking-tight">Bonjour, {profile?.displayName?.split(' ')[0]}</h1>
          <p className="text-gray-400 font-sans text-sm mt-1 uppercase tracking-widest font-bold">Here is what is happening at <span className="text-gold italic">"{store?.name}"</span></p>
        </div>
        <Link to="/dashboard/products">
          <Button className="wa-button !py-2 h-10 px-6 rounded-full">
            <Plus size={16} /> Add Product
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start justify-between"
          >
            <div className="space-y-4">
              <div className={`w-10 h-10 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">{stat.label}</p>
                <h3 className="text-3xl font-serif text-ink">{stat.value}</h3>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full uppercase tracking-tighter">
              <TrendingUp size={10} /> +12%
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Products */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif text-ink">Recent Products</h2>
            <Link to="/dashboard/products" className="text-xs font-bold text-gold uppercase tracking-widest hover:underline flex items-center gap-1">
              View All <ArrowRight size={10} />
            </Link>
          </div>

          <div className="space-y-4">
            {products.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                    <img src={p.images[0]} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink uppercase tracking-tight">{p.name}</h4>
                    <p className="text-xs text-gray-400 font-sans">{p.category || 'Luxury Item'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-sans font-bold text-ink">₹ {p.price.toLocaleString()}</p>
                  <p className={`text-[9px] uppercase tracking-widest font-black ${p.inStock ? 'text-green-500' : 'text-rose'}`}>
                    {p.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
              </div>
            ))}
            {products.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                  <Plus className="mx-auto mb-2 text-gray-300" />
                  <p className="text-gray-400 text-sm italic font-serif">No products added yet.</p>
                </div>
            )}
          </div>
        </div>

        {/* Store Health / Quick Actions */}
        <div className="space-y-8">
          <div className="bg-ink text-cream p-8 rounded-[2rem] shadow-xl space-y-6 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <p className="text-gold text-[10px] font-bold uppercase tracking-[0.4em]">Store Identity</p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md p-3">
                  <img src={store?.logoUrl || `https://ui-avatars.com/api/?name=${store?.name}`} className="w-full h-full object-contain rounded-full" alt="" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif italic tracking-tighter">{store?.name}</h3>
                  <p className="text-[10px] text-cream/40 uppercase tracking-widest font-black">Live at /s/{store?.slug}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full border-gold/30 text-gold text-[10px] font-bold uppercase tracking-widest hover:bg-gold hover:text-white"
                onClick={() => window.open(`/s/${store?.slug}`, '_blank')}
              >
                Visit Boutique <ExternalLink size={12} className="ml-2" />
              </Button>
            </div>
            <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
             <h3 className="text-xl font-serif text-ink">Marketplace Trends</h3>
             <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gold" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-ink">Handmade Silks</span>
                   </div>
                   <span className="text-[10px] text-green-500 font-black">+45%</span>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-ink">Statement Jewelry</span>
                   </div>
                   <span className="text-[10px] text-green-500 font-black">+22%</span>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-rose" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-ink">Organic Fabrics</span>
                   </div>
                   <span className="text-[10px] text-rose font-black">-5%</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
