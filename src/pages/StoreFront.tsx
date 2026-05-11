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
      <div className="h-screen flex items-center justify-center bg-cream">
        <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!store) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-cream space-y-6">
        <h1 className="text-4xl font-serif text-ink italic opacity-20 italic">Boutique Not Found</h1>
        <Link to="/" className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold underline">Return to MetaLux</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-cream/30 border-b luxury-border">
        <Link to="/" className="p-2 hover:bg-gold/10 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-ink/60" />
        </Link>
        <div className="flex flex-col items-center">
          <span className="text-[8px] uppercase tracking-[0.4em] text-gold font-bold mb-0.5">Sankalp MetaLux Presents</span>
          <h1 className="text-lg font-serif font-black tracking-tighter text-ink uppercase">{store.name}</h1>
        </div>
        <div className="w-10 h-10" /> {/* Spacer */}
      </header>

      {/* Hero Banner */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <img 
          src={store.bannerUrl || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?mxw=1600&q=80"} 
          alt={store.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full mx-auto p-4 shadow-2xl flex items-center justify-center mb-6">
              <img 
                src={store.logoUrl || `https://ui-avatars.com/api/?name=${store.name}&background=random`} 
                alt="Logo" 
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-cream drop-shadow-lg">{store.name}</h2>
            <p className="text-cream italic font-serif text-xl opacity-90 max-w-xl mx-auto drop-shadow-md">
              {store.description || 'Welcome to our curated digital boutique.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Store Info & Socials */}
      <section className="py-12 px-6 border-b luxury-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-12">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-1">Location</p>
              <p className="text-sm font-sans font-light">International</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-1">Boutique Type</p>
              <p className="text-sm font-sans font-light">{store.category || 'Luxury Fashion'}</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            {store.contact.whatsapp && (
              <a 
                href={`https://wa.me/${store.contact.whatsapp}`} 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center border border-[#25D366]/20 hover:bg-[#25D366] hover:text-white transition-all"
              >
                <MessageCircle size={20} />
              </a>
            )}
            {store.contact.instagram && (
              <a 
                href={`https://instagram.com/${store.contact.instagram}`} 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-[#E1306C]/10 text-[#E1306C] flex items-center justify-center border border-[#E1306C]/20 hover:bg-[#E1306C] hover:text-white transition-all"
              >
                <Instagram size={20} />
              </a>
            )}
            <button className="w-12 h-12 rounded-full bg-ink/5 text-ink flex items-center justify-center border border-ink/10 hover:bg-ink hover:text-white transition-all">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-[1px] flex-1 bg-gold/20" />
          <h3 className="text-4xl font-serif text-ink italic px-6">The Collection</h3>
          <div className="h-[1px] flex-1 bg-gold/20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {products.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="space-y-6 group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-2xl relative">
                <img 
                  src={product.images[0] || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?mxw=800&q=80"} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-white border border-white/30 px-6 py-2 rounded-full bg-black/20">Sold Out</span>
                  </div>
                )}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 transition-transform">
                  <button className="w-12 h-12 rounded-full bg-gold text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
                    <ShoppingBag size={20} />
                  </button>
                </div>
              </div>
              <div className="space-y-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="h-[1px] w-6 bg-gold/30" />
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">{product.category || 'New Arrival'}</p>
                  <span className="h-[1px] w-6 bg-gold/30" />
                </div>
                <h4 className="text-2xl font-serif">{product.name}</h4>
                <p className="text-xl font-sans font-light text-ink/70">₹ {product.price.toLocaleString()}</p>
                
                <div className="pt-4 flex justify-center gap-4">
                  <a 
                    href={`https://wa.me/${store.contact.whatsapp}?text=I am interested in ${product.name}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[10px] font-bold uppercase tracking-widest text-ink hover:text-gold flex items-center gap-2 border-b border-transparent hover:border-gold transition-all"
                  >
                    Inquire via WhatsApp <MessageCircle size={10} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
          
          {products.length === 0 && (
            <div className="col-span-full py-20 text-center border border-dashed border-gold/30 rounded-3xl bg-gold/5">
              <ShoppingBag className="mx-auto mb-4 text-gold/30" size={48} />
              <p className="text-gold font-serif italic text-xl">The boutique is currently curating its collection.</p>
              <p className="text-ink/40 text-xs mt-2 uppercase tracking-widest">Stay tuned for the grand disclosure.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 bg-ink text-cream text-center mt-24">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="w-20 h-20 bg-white/10 rounded-full mx-auto p-4 flex items-center justify-center">
            <img 
              src={store.logoUrl || `https://ui-avatars.com/api/?name=${store.name}&background=random`} 
              alt="Logo" 
              className="w-full h-full object-contain rounded-full opacity-60"
            />
          </div>
          <h2 className="text-4xl font-serif text-gold italic">{store.name}</h2>
          <p className="text-cream/50 max-w-lg mx-auto font-sans font-light leading-relaxed">
            {store.description}
          </p>
          <div className="pt-8 flex justify-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em]">
             <a href="/" className="text-gold hover:text-white transition-all">Sankalp MetaLux</a>
             <a href="#" className="hover:text-gold transition-all">About</a>
             <a href="#" className="hover:text-gold transition-all">Collection</a>
             <a href="#" className="hover:text-gold transition-all">Contact</a>
          </div>
          <div className="pt-20 opacity-30">
            <p className="text-[8px] uppercase tracking-widest font-black">Powered by SANKALP METALUX</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
