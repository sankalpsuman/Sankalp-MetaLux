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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 gap-4">
        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Assembling Dashboard</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 transition-colors duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif text-foreground tracking-tight italic">Bonjour, {profile?.displayName?.split(' ')[0]}</h1>
          <p className="text-muted-foreground font-sans text-xs md:text-sm mt-1 uppercase tracking-[0.2em] font-bold">Here is the latest intelligence for <span className="text-gold italic font-black">"{store?.name}"</span></p>
        </div>
        <Link to="/dashboard/products" className="wa-button !py-2 h-10 px-6 rounded-full w-full sm:w-auto flex items-center justify-center">
          <Plus size={16} className="mr-1" /> Add Product
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card p-6 rounded-3xl border border-border shadow-sm flex items-start justify-between hover:shadow-lg transition-all duration-300 group"
          >
            <div className="space-y-4">
              <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-1">{stat.label}</p>
                <h3 className="text-3xl md:text-4xl font-serif text-foreground italic">{stat.value}</h3>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-full uppercase tracking-tighter">
              <TrendingUp size={10} /> +12%
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Products */}
        <div className="lg:col-span-2 bg-card rounded-[2.5rem] border border-border shadow-sm p-6 md:p-10 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif text-foreground italic">Recent Collections</h2>
            <Link to="/dashboard/products" className="text-[10px] font-black text-gold uppercase tracking-[0.2em] hover:opacity-70 transition-opacity flex items-center gap-2 px-4 py-2 bg-gold/5 rounded-full border border-gold/10">
              Manage All <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-2 md:space-y-4">
            {products.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 md:p-5 rounded-2xl border border-transparent hover:border-border hover:bg-background/80 transition-all group">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden bg-accent/20 border border-border group-hover:scale-105 transition-transform">
                    <img src={p.images[0]} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all" alt="" />
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-serif italic text-foreground tracking-tight">{p.name}</h4>
                    <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest font-black">{p.category || 'Luxury Item'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base md:text-xl font-sans font-black text-foreground">₹ {p.price.toLocaleString()}</p>
                  <p className={`text-[9px] md:text-[10px] uppercase tracking-widest font-black inline-flex items-center gap-1 ${p.inStock ? 'text-green-500' : 'text-rose'}`}>
                    <span className={`w-1 h-1 rounded-full ${p.inStock ? 'bg-green-500' : 'bg-rose'}`} />
                    {p.inStock ? 'Available' : 'Out of Stock'}
                  </p>
                </div>
              </div>
            ))}
            {products.length === 0 && (
                <div className="text-center py-24 bg-accent/5 rounded-3xl border-2 border-dashed border-border group hover:bg-accent/10 transition-colors">
                  <ShoppingBag className="mx-auto mb-4 text-muted-foreground/30 animate-bounce" size={48} />
                  <p className="text-muted-foreground/60 text-lg md:text-xl italic font-serif">Awaiting your first masterpiece...</p>
                  <Link to="/dashboard/products" className="mt-6 inline-flex items-center text-[10px] font-black uppercase tracking-widest text-gold border-b-2 border-gold/30 hover:border-gold transition-all pb-1">Begin Collection</Link>
                </div>
            )}
          </div>
        </div>

        {/* Store Health / Quick Actions */}
        <div className="space-y-8">
          <div className="bg-foreground text-background p-8 md:p-10 rounded-[2.5rem] shadow-2xl space-y-8 relative overflow-hidden group">
            <div className="relative z-10 space-y-8">
              <p className="text-gold text-[10px] font-black uppercase tracking-[0.4em]">Boutique Identity</p>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-background/10 backdrop-blur-md p-4 border border-background/20 group-hover:scale-110 transition-transform duration-500">
                  <img src={store?.logoUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${store?.name}`} className="w-full h-full object-contain rounded-xl" alt="" />
                </div>
                <div>
                  <h3 className="text-3xl font-serif italic tracking-tighter leading-none">{store?.name}</h3>
                  <p className="text-[10px] text-background/40 uppercase tracking-[0.2em] font-black mt-2">Live at /s/{store?.slug}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full border-gold/30 text-gold text-[10px] font-black uppercase tracking-[0.3em] h-14 !rounded-2xl hover:bg-gold hover:text-white transition-all shadow-lg hover:shadow-gold/20"
                onClick={() => window.open(`/s/${store?.slug}`, '_blank')}
              >
                Visit Private View <ExternalLink size={14} className="ml-2" />
              </Button>
            </div>
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-gold/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
            <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 bg-indigo-500/10 rounded-full blur-[40px]" />
          </div>

          <div className="bg-card p-8 md:p-10 rounded-[2.5rem] border border-border shadow-sm space-y-8">
             <div className="flex items-center justify-between">
                <h3 className="text-2xl font-serif text-foreground italic">Ecosystem Trends</h3>
                <TrendingUp size={20} className="text-gold" />
             </div>
             <div className="space-y-8">
                <div className="space-y-2">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-gold" />
                         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">Handmade Silks</span>
                      </div>
                      <span className="text-[10px] text-green-500 font-black">+45%</span>
                   </div>
                   <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-gold rounded-full" style={{ width: '45%' }} />
                   </div>
                </div>
                <div className="space-y-2">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-indigo-500" />
                         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">Statement Jewelry</span>
                      </div>
                      <span className="text-[10px] text-green-500 font-black">+22%</span>
                   </div>
                   <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: '22%' }} />
                   </div>
                </div>
                <div className="space-y-2">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-rose" />
                         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">Organic Fabrics</span>
                      </div>
                      <span className="text-[10px] text-rose font-black">-5%</span>
                   </div>
                   <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-rose rounded-full" style={{ width: '15%' }} />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
