import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { storeService } from '../services/storeService';
import { Store } from '../types';
import { useAuth } from '../App';
import { authService } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, ArrowRight, User as UserIcon, LogOut, Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ThemeToggle } from '../components/ThemeToggle';

export default function MallHome() {
  const [stores, setStores] = useState<Store[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    storeService.getStores().then(setStores);
  }, []);

  const handleLogin = async () => {
    await authService.signInWithGoogle();
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-rose/20 transition-colors duration-500 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-4 md:px-8 py-3 md:py-4 flex justify-between items-center backdrop-blur-md bg-background/70 border-b border-border shadow-sm">
        <Link to="/" className="text-xl md:text-2xl font-serif font-black tracking-tighter text-foreground">
          SANKALP METALUX<span className="text-gold">.</span>
        </Link>
        
        <div className="flex items-center gap-3 md:gap-6">
          <Link to="/about" className="text-[10px] font-bold uppercase tracking-widest text-foreground hover:text-gold transition-colors hidden lg:block">
            About
          </Link>
          <Link to="/guide" className="text-[10px] font-bold uppercase tracking-widest text-foreground hover:text-gold transition-colors hidden lg:block">
            Guide
          </Link>
          
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-2 md:gap-4">
              {profile?.storeId ? (
                <Link to="/dashboard" className="text-[10px] font-bold uppercase tracking-widest hover:text-gold transition-colors hidden sm:block">
                  Dashboard
                </Link>
              ) : (
                <Link to="/onboarding" className="text-[10px] font-bold uppercase tracking-widest hover:text-gold transition-colors hidden sm:block">
                  Open a Store
                </Link>
              )}
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gold/30">
                <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              onClick={handleLogin}
              className="text-[10px] font-bold uppercase tracking-widest hover:bg-gold hover:text-white transition-all h-8 md:h-10 px-3 md:px-6"
            >
              Sign In
            </Button>
          )}

          <button className="lg:hidden p-1 text-foreground" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed inset-0 z-[60] bg-background lg:hidden flex flex-col items-center justify-center p-8 space-y-8"
        >
          <button className="absolute top-6 right-6" onClick={() => setMobileMenuOpen(false)}>
            <X size={32} />
          </button>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-serif italic text-foreground uppercase tracking-widest">About</Link>
          <Link to="/guide" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-serif italic text-foreground uppercase tracking-widest">Guide</Link>
          {user && (
            <Link to={profile?.storeId ? "/dashboard" : "/onboarding"} onClick={() => setMobileMenuOpen(false)} className="text-3xl font-serif italic text-gold uppercase tracking-widest">
              {profile?.storeId ? "Dashboard" : "Open Store"}
            </Link>
          )}
          {!user && (
            <button onClick={() => { handleLogin(); setMobileMenuOpen(false); }} className="text-3xl font-serif italic text-gold uppercase tracking-widest">Sign In</button>
          )}
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="pt-28 md:pt-40 pb-16 md:pb-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-10"
          >
            <div className="space-y-4">
              <span className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] text-gold font-bold">The Luxury Ecosystem</span>
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif leading-[0.9] text-foreground tracking-tighter">
                Boutique <br />
                <span className="italic font-normal text-gold/80">Excellence</span>
              </h1>
              <p className="text-base md:text-xl text-muted-foreground max-w-md font-sans font-light leading-relaxed">
                Step into a world of curated luxury. Discover independent boutiques, artisan designers, and exclusive collections all in one digital destination.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/onboarding" className="wa-button group w-full sm:w-auto">
                Establish Your Boutique <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform ml-1" />
              </Link>
              <button className="px-8 py-4 border border-border text-foreground text-[10px] font-black uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-all w-full sm:w-auto">
                Explore MetaLux
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative aspect-[4/5] md:aspect-[16/10] lg:aspect-[4/5] overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-border"
          >
            <img 
               src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?mxw=1200&q=80" 
               className="absolute inset-0 w-full h-full object-cover dark:opacity-70 dark:grayscale hover:scale-110 transition-transform duration-1000"
               alt="Hero luxury fashion"
            />
            <div className="absolute inset-0 bg-ink/10 dark:bg-black/40" />
            <div className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-10 md:right-10 glass-card p-4 md:p-8 rounded-2xl md:rounded-3xl flex justify-between items-end backdrop-blur-2xl">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gold mb-1 font-bold">Featured Artisans</p>
                <h3 className="text-2xl md:text-4xl font-serif text-ink italic leading-none">The Visionaries</h3>
              </div>
              <button className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all">
                <ArrowRight size={24} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Boutique List */}
      <section className="py-24 md:py-32 px-4 md:px-8 bg-card text-foreground overflow-hidden transition-colors duration-500 shadow-inner">
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-4 text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold/60">Digital Curations</span>
              <h2 className="text-5xl md:text-7xl font-serif tracking-tighter leading-none italic">Active Boutiques</h2>
              <div className="h-1 w-32 bg-gold/30 rounded-full mx-auto md:mx-0" />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-8 py-3 border border-border rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-foreground hover:text-background transition-all">
                All Collections
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {stores.map((store, idx) => (
              <motion.div 
                key={store.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-[450px] md:h-[500px] overflow-hidden rounded-[2.5rem] bg-background border border-border shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <Link to={`/s/${store.slug}`}>
                  <img 
                    src={store.bannerUrl || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?mxw=800&q=80"} 
                    alt={store.name} 
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 opacity-80 dark:opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
                  
                  <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="w-16 h-16 bg-background/80 backdrop-blur-xl rounded-2xl border border-border p-2 flex items-center justify-center shadow-luxury">
                        <img 
                          src={store.logoUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${store.name}`} 
                          alt="Logo" 
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </div>
                      <span className="px-4 py-1.5 bg-gold/10 backdrop-blur-md border border-gold/20 rounded-full text-[9px] font-black uppercase tracking-widest text-gold text-right">
                        {store.category || 'Luxury'}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-3xl md:text-4xl font-serif text-foreground italic leading-none">{store.name}</h3>
                        <p className="text-xs md:text-sm text-foreground/60 line-clamp-2 italic font-sans">
                          {store.description || 'Reserved for the most discerning collections of the modern era.'}
                        </p>
                      </div>
                      <div className="pt-4 flex items-center gap-3 text-gold text-[10px] font-black uppercase tracking-widest group-hover:gap-5 transition-all">
                        Explore Entry <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            
            {/* If empty stores, show placeholder */}
            {stores.length === 0 && (
              <div className="col-span-full py-32 text-center border-2 border-dashed border-border rounded-[3rem] bg-accent/5">
                <ShoppingBag className="mx-auto mb-6 text-gold/20 animate-pulse" size={64} />
                <p className="text-gold/60 font-serif italic text-2xl md:text-3xl max-w-md mx-auto leading-relaxed text-center">The luxury mall is currently curating its collection.</p>
                <div className="flex justify-center">
                  <Link to="/onboarding" className="mt-8 wa-button !inline-flex !rounded-full px-12">Apply to Open</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 md:py-48 px-4 md:px-8 text-center bg-background transition-colors duration-500">
        <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
          <h2 className="text-5xl md:text-8xl font-serif text-foreground italic leading-[0.9] tracking-tighter">
            Elevate your <br className="hidden md:block" /> 
            <span className="text-gold">Artisanal Legacy</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-2xl font-sans font-light max-w-2xl mx-auto leading-relaxed">
            Sankalp MetaLux is more than a platform. It's a sanctuary for high-end boutiques and professional creators.
          </p>
          <div className="pt-6 flex justify-center">
            <Link to="/onboarding" className="wa-button px-16 h-16 md:h-20 text-xs !rounded-full shadow-gold/20 shadow-2xl">
              Establish Your Boutique
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 md:px-8 bg-card border-t border-border transition-colors duration-500 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 md:gap-8">
          <div className="text-2xl font-serif font-black tracking-tighter text-foreground opacity-60">
            SANKALP METALUX<span className="text-gold">.</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
            © 2026 SANKALP METALUX. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 uppercase text-[10px] font-black tracking-[0.2em] text-foreground/40">
            <Link to="/about" className="hover:text-gold transition-colors">About</Link>
            <Link to="/guide" className="hover:text-gold transition-colors">Guide</Link>
            <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
