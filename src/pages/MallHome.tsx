import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { storeService } from '../services/storeService';
import { Store } from '../types';
import { useAuth } from '../App';
import { authService } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, ArrowRight, User as UserIcon, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function MallHome() {
  const [stores, setStores] = useState<Store[]>([]);
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    storeService.getStores().then(setStores);
  }, []);

  const handleLogin = async () => {
    await authService.signInWithGoogle();
  };

  return (
    <div className="min-h-screen bg-cream selection:bg-rose/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-cream/50 border-b luxury-border">
        <Link to="/" className="text-2xl font-serif font-black tracking-tighter text-ink">
          SANKALP METALUX<span className="text-gold">.</span>
        </Link>
        
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              {profile?.storeId ? (
                <Link to="/dashboard" className="text-[10px] font-bold uppercase tracking-widest hover:text-gold transition-colors">
                  Dashboard
                </Link>
              ) : (
                <Link to="/onboarding" className="text-[10px] font-bold uppercase tracking-widest hover:text-gold transition-colors">
                  Open a Store
                </Link>
              )}
              <button 
                onClick={() => authService.logout()}
                className="p-2 hover:bg-gold/10 rounded-full transition-colors"
                title="Logout"
              >
                <LogOut size={16} className="text-ink/60" />
              </button>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gold/30">
                <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} alt="Avatar" />
              </div>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              onClick={handleLogin}
              className="text-[10px] font-bold uppercase tracking-widest hover:bg-gold hover:text-white transition-all"
            >
              Sign In
            </Button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">The Luxury Ecosystem</span>
              <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] text-ink">
                Boutique <br />
                <span className="italic font-normal">Excellence</span>
              </h1>
              <p className="text-lg text-ink/60 max-w-md font-sans font-light leading-relaxed">
                Step into a world of curated luxury. Discover independent boutiques, artisan designers, and exclusive collections all in one digital destination.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/onboarding" className="wa-button group">
                Start Your Boutique <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 border border-ink/10 text-[10px] font-bold uppercase tracking-widest hover:bg-ink hover:text-cream transition-all">
                Explore MetaLux
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?mxw=1200&q=80" 
              className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] hover:scale-110 transition-transform duration-1000"
              alt="Hero luxury fashion"
            />
            <div className="absolute inset-0 bg-ink/10" />
            <div className="absolute bottom-8 left-8 right-8 glass-card p-6 rounded-2xl flex justify-between items-end">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gold mb-1">Featured Boutique</p>
                <h3 className="text-2xl font-serif text-ink">Anshi Collection</h3>
              </div>
              <Link to="/s/anshicollection" className="w-12 h-12 rounded-full border border-gold flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all">
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Boutique List */}
      <section className="py-24 px-6 bg-ink text-cream overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex justify-between items-end">
            <div className="space-y-4">
              <h2 className="text-5xl font-serif tracking-tight">Active Boutiques</h2>
              <div className="h-1 w-24 bg-gold" />
            </div>
            <div className="hidden md:flex gap-4">
              <button className="px-6 py-2 border border-cream/20 text-[10px] font-bold uppercase tracking-widest hover:bg-cream hover:text-ink transition-all">
                All Categories
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stores.map((store, idx) => (
              <motion.div 
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-[400px] overflow-hidden rounded-xl bg-ink/50 border border-white/5"
              >
                <Link to={`/s/${store.slug}`}>
                  <img 
                    src={store.bannerUrl || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?mxw=800&q=80"} 
                    alt={store.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full border border-white/20 p-2 flex items-center justify-center">
                        <img 
                          src={store.logoUrl || `https://ui-avatars.com/api/?name=${store.name}&background=random`} 
                          alt="Logo" 
                          className="w-full h-full object-contain rounded-full"
                        />
                      </div>
                      <span className="px-3 py-1 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full text-[10px] font-bold uppercase tracking-widest text-gold">
                        {store.category || 'Fashion'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-3xl font-serif">{store.name}</h3>
                      <p className="text-sm text-cream/60 line-clamp-2 italic font-light">
                        {store.description || 'Step into our boutique and discover artisanal quality.'}
                      </p>
                      <div className="pt-4 flex items-center gap-2 text-gold text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        Visit Store <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            
            {/* If empty stores, show placeholder */}
            {stores.length === 0 && (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-white/10 rounded-3xl">
                <ShoppingBag className="mx-auto mb-4 text-gold/40" size={48} />
                <p className="text-gold/40 font-serif italic text-xl">Sankalp MetaLux is awakening... Be the first to open your doors.</p>
                <Link to="/onboarding" className="mt-6 inline-block text-gold underline tracking-widest text-xs uppercase font-bold">Start Now</Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center silk-gradient">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-5xl font-serif text-ink italic leading-tight">
            Ready to give your boutique <br /> the digital stage it deserves?
          </h2>
          <p className="text-ink/60 text-lg font-sans font-light">
            Sankalp MetaLux is more than a platform. It's a luxury ecosystem for the ambitious creator. No coding, no hassle—just pure, polished storefronts.
          </p>
          <div className="pt-6">
            <Link to="/onboarding" className="wa-button px-12">
              Apply to MetaLux
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-cream border-t luxury-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-serif font-black tracking-tighter text-ink opacity-40">
            SANKALP METALUX<span className="text-gold">.</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-ink/40 font-bold">
            © 2026 SANKALP METALUX. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 uppercase text-[10px] font-bold tracking-widest text-ink/60">
            <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms</a>
            <a href="#" className="hover:text-gold transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
