import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { storeService } from '../services/storeService';
import { productService } from '../services/productService';
import { Store, Product } from '../types';
import { motion } from 'motion/react';
import { Instagram, MessageCircle, Share2, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function StoreFront() {
  const { slug } = useParams<{ slug: string }>();
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      const storeData = await storeService.getStoreBySlug(slug);
      if (storeData) {
        setStore(storeData);
        const productsData = await productService.getProductsByStore(storeData.id);
        setProducts(productsData);
      }
      setLoading(false);
    }
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Curating Boutique</p>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background space-y-6 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-serif text-foreground/20 italic">Boutique Not Found</h1>
        <p className="text-muted-foreground font-sans max-w-md">The collection you are looking for may have been retired or moved to a new destination.</p>
        <Link to="/" className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold underline">Return to MetaLux</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-4 md:px-8 py-3 md:py-4 flex justify-between items-center backdrop-blur-md bg-background/50 border-b border-border shadow-sm">
        <Link to="/" className="p-2 hover:bg-gold/10 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-foreground/60" />
        </Link>
        <div className="flex flex-col items-center">
          <span className="text-[8px] uppercase tracking-[0.4em] text-gold font-bold mb-0.5">Sankalp MetaLux Presents</span>
          <h1 className="text-base md:text-lg font-serif font-black tracking-tighter text-foreground uppercase">{store.name}</h1>
        </div>
        <div className="w-10 h-10" /> {/* Spacer */}
      </header>

      {/* Hero Banner */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <img 
          src={store.bannerUrl || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?mxw=1600&q=80"} 
          alt={store.name} 
          className="w-full h-full object-cover dark:opacity-60 dark:grayscale hover:scale-105 transition-transform duration-[2000ms]"
        />
        <div className="absolute inset-0 bg-ink/20 dark:bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="w-24 h-24 md:w-40 md:h-40 bg-white dark:bg-card rounded-full mx-auto p-4 md:p-6 shadow-2xl flex items-center justify-center mb-6 border-2 border-gold/20">
              <img 
                src={store.logoUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${store.name}`} 
                alt="Logo" 
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <h2 className="text-4xl md:text-7xl lg:text-9xl font-serif text-white drop-shadow-luxury italic tracking-tight">{store.name}</h2>
            <p className="text-white/90 italic font-serif text-lg md:text-2xl max-w-2xl mx-auto drop-shadow-md leading-relaxed">
              {store.description || 'Welcome to our curated digital boutique.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Store Info & Socials */}
      <section className="py-12 md:py-16 px-4 md:px-8 border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-2">Location</p>
              <p className="text-sm md:text-base font-sans font-light text-muted-foreground">{store.address || 'International'}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-2">Boutique Category</p>
              <p className="text-sm md:text-base font-sans font-light text-muted-foreground">{store.category || 'Luxury Collections'}</p>
            </div>
          </div>
          
          <div className="flex gap-4 md:gap-6">
            {store.contact.whatsapp && (
              <a 
                href={`https://wa.me/${store.contact.whatsapp.replace(/\D/g, '')}`} 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center border border-[#25D366]/20 hover:bg-[#25D366] hover:text-white transition-all shadow-lg hover:shadow-[#25D366]/20"
              >
                <MessageCircle size={24} />
              </a>
            )}
            {store.contact.instagram && (
              <a 
                href={`https://instagram.com/${store.contact.instagram.replace('@', '')}`} 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#E1306C]/10 text-[#E1306C] flex items-center justify-center border border-[#E1306C]/20 hover:bg-[#E1306C] hover:text-white transition-all shadow-lg hover:shadow-[#E1306C]/20"
              >
                <Instagram size={24} />
              </a>
            )}
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: store.name,
                    text: store.description,
                    url: window.location.href,
                  }).catch(console.error);
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  import('sonner').then(({ toast }) => toast.success('Link copied to clipboard'));
                }
              }}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-foreground/5 text-foreground flex items-center justify-center border border-border hover:bg-foreground hover:text-background transition-all shadow-sm"
            >
              <Share2 size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-6 md:gap-8 mb-20 md:mb-28">
          <div className="h-[1px] flex-1 bg-border" />
          <div className="text-center">
            <span className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] text-gold font-bold mb-2 block">Curated Selection</span>
            <h3 className="text-4xl md:text-6xl font-serif text-foreground italic">The Collection</h3>
          </div>
          <div className="h-[1px] flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-16 md:gap-y-24">
          {products.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6 group cursor-pointer"
            >
              <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-[2rem] relative bg-card shadow-lg hover:shadow-2xl transition-all duration-500 border border-border">
                <img 
                  src={product.images[0] || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?mxw=800&q=80"} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms] dark:opacity-80"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-[10px] md:text-[12px] uppercase font-black tracking-[0.5em] text-foreground border-2 border-foreground/30 px-8 py-3 rounded-full bg-background/20">Sold Out</span>
                  </div>
                )}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <button className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gold text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 shadow-gold/30">
                    <ShoppingBag size={24} />
                  </button>
                </div>
              </div>
              <div className="space-y-3 text-center px-4">
                <div className="flex items-center justify-center gap-3">
                  <span className="h-[1px] w-8 bg-gold/30" />
                  <p className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] text-gold font-bold">{product.category || 'Luxury Piece'}</p>
                  <span className="h-[1px] w-8 bg-gold/30" />
                </div>
                <h4 className="text-2xl md:text-3xl font-serif text-foreground tracking-tight italic">{product.name}</h4>
                <p className="text-xl md:text-2xl font-sans font-light text-muted-foreground">₹ {product.price.toLocaleString()}</p>
                
                {store.contact.whatsapp && (
                  <div className="pt-4 flex justify-center">
                    <a 
                      href={`https://wa.me/${store.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Greetings! I am highly interested in the ${product.name} from your boutique ${store.name}. Is it available?`)}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-[10px] md:text-[12px] font-black uppercase tracking-widest text-foreground hover:text-gold flex items-center gap-2 border-b-2 border-transparent hover:border-gold transition-all py-1"
                    >
                      Inquire via Private WhatsApp <MessageCircle size={14} />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          
          {products.length === 0 && (
            <div className="col-span-full py-32 text-center border-2 border-dashed border-gold/30 rounded-[3rem] bg-gold/5">
              <ShoppingBag className="mx-auto mb-6 text-gold/20 animate-pulse" size={64} />
              <p className="text-gold font-serif italic text-2xl md:text-3xl lg:text-4xl max-w-lg mx-auto leading-relaxed">The boutique is currently curating its upcoming collection.</p>
              <p className="text-muted-foreground text-sm mt-4 uppercase tracking-[0.3em] font-light">Stay tuned for the grand disclosure.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 md:py-32 px-4 md:px-8 bg-card text-foreground text-center border-t border-border">
        <div className="max-w-4xl mx-auto space-y-10 md:space-y-12">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-background rounded-full mx-auto p-5 md:p-6 flex items-center justify-center border-2 border-border shadow-xl">
            <img 
              src={store.logoUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${store.name}`} 
              alt="Logo" 
              className="w-full h-full object-contain rounded-full opacity-80"
            />
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-gold italic tracking-tight">{store.name}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-sans font-light leading-relaxed text-lg md:text-xl">
            {store.description}
          </p>
          <div className="pt-10 flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em]">
             <a href="/" className="text-gold hover:text-foreground transition-all hover:-translate-y-1 duration-300">Sankalp MetaLux</a>
             {store.contact.instagram && (
               <a 
                 href={`https://instagram.com/${store.contact.instagram.replace('@', '')}`} 
                 target="_blank" 
                 rel="noreferrer"
                 className="hover:text-gold transition-all hover:-translate-y-1 duration-300"
               >
                 Instagram
               </a>
             )}
             {store.contact.whatsapp && (
               <a 
                 href={`https://wa.me/${store.contact.whatsapp.replace(/\D/g, '')}`} 
                 target="_blank" 
                 rel="noreferrer"
                 className="hover:text-gold transition-all hover:-translate-y-1 duration-300"
               >
                 WhatsApp
               </a>
             )}
          </div>
          <div className="pt-24 opacity-30">
            <p className="text-[8px] md:text-[10px] uppercase font-black tracking-[0.5em] text-foreground">A Digital Sanctuary by SANKALP METALUX</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
