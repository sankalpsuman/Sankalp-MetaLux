import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Globe, 
  Users, 
  Feather,
  CheckCircle,
  Gem,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function PublicAbout() {
  const values = [
    {
      title: "Effortless Control",
      desc: "We simplify the complex technicalities so you can focus on your craft.",
      icon: <Zap size={20} />
    },
    {
      title: "Inclusive Design",
      desc: "Whether you're a florist or a financial advisor, our UI fits your needs.",
      icon: <Globe size={20} />
    },
    {
      title: "Luxury Aesthetics",
      desc: "A polished interface that reflects the quality of the services you provide.",
      icon: <Feather size={20} />
    }
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-rose/20 transition-colors duration-500">
      <nav className="p-6 md:p-10 sticky top-0 bg-background/80 backdrop-blur-md z-50 border-b border-border/50">
        <Link to="/" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-gold hover:text-foreground transition-all hover:-translate-x-2">
          <ArrowLeft size={16} /> Return to Mall
        </Link>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-32 md:space-y-48 pb-40">
        {/* Hero Section */}
        <div className="space-y-12 text-center max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="w-28 h-28 md:w-36 md:h-36 bg-gold/10 rounded-[3rem] mx-auto flex items-center justify-center border border-gold/20 shadow-luxury"
          >
            <Gem className="text-gold" size={48} />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h1 className="text-6xl md:text-9xl font-serif text-foreground tracking-tighter leading-[0.85] italic">
              The Vision of <br />
              <span className="text-gold">Sankalp MetaLux</span>
            </h1>
            <p className="text-muted-foreground font-sans text-xl md:text-3xl max-w-2xl mx-auto leading-relaxed italic font-light">
              We've curated a sanctuary where high-end boutiques and artisanal services thrive without the noise of traditional e-commerce.
            </p>
          </motion.div>
        </div>

        {/* Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {values.map((v, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-10 md:p-14 bg-card rounded-[3rem] md:rounded-[4rem] border border-border space-y-8 shadow-sm hover:shadow-2xl hover:border-gold/20 transition-all duration-700 group"
            >
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-gold group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 shadow-inner group-hover:shadow-luxury">{v.icon}</div>
              <div className="space-y-4">
                <h3 className="font-serif italic text-3xl text-foreground">{v.title}</h3>
                <p className="text-muted-foreground text-lg font-sans leading-relaxed italic">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* The Problem We Solve */}
        <div className="flex flex-col lg:flex-row gap-20 md:gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex-1 space-y-10"
          >
            <div className="inline-block px-6 py-2 bg-gold/10 rounded-full border border-gold/20 text-[10px] font-black uppercase tracking-[0.4em] text-gold">Commitment to Excellence</div>
            <h2 className="text-5xl md:text-6xl font-serif text-foreground italic leading-[1.1] tracking-tight">Elevating Artisans to the Digital Sovereign</h2>
            <p className="text-muted-foreground text-xl leading-relaxed italic font-light">
              Mainstream platforms often dilute specialized services or high-end goods. Sankalp MetaLux bridges this divide by providing a boutique-first architecture that honors your ambition.
            </p>
            <ul className="space-y-6">
              {[
                "Zero maintenance friction for shop owners",
                "Universal catering for products & services",
                "Visualization-first cataloging approach",
                "Instant, high-conversion storefronts"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-5 text-[10px] font-black uppercase tracking-[0.3em] text-foreground/80">
                  <div className="w-10 h-10 rounded-2xl bg-gold/5 flex items-center justify-center text-gold border border-gold/10 shadow-inner">
                    <CheckCircle size={18} />
                  </div>
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex-1 w-full aspect-square bg-foreground rounded-[5rem] md:rounded-[7rem] relative overflow-hidden group shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop" 
              className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
              alt="Luxury Retail"
            />
            <div className="absolute inset-0 bg-gold/5 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-1000" />
            <div className="absolute inset-x-12 bottom-12 p-10 bg-background/5 backdrop-blur-xl rounded-[3rem] border border-white/10 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
              <p className="text-white text-xs font-black uppercase tracking-[0.4em] italic mb-2">Curated Scene</p>
              <p className="text-white/60 text-lg font-serif italic">"Where artisans find their voice."</p>
            </div>
          </motion.div>
        </div>

        {/* Team/Contact */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="border border-border bg-card p-16 md:p-32 rounded-[5rem] md:rounded-[8rem] text-center space-y-12 shadow-luxury group"
        >
          <div className="w-28 h-28 md:w-36 md:h-36 bg-background rounded-full mx-auto flex items-center justify-center border border-border shadow-2xl group-hover:rotate-12 transition-transform duration-700">
            <Users className="text-gold" size={56} />
          </div>
          <div className="space-y-6 max-w-2xl mx-auto">
            <h3 className="text-4xl md:text-6xl font-serif text-foreground italic leading-tight tracking-tight">Curated by <span className="text-gold">SANKALP METALUX</span></h3>
            <p className="text-muted-foreground text-xl md:text-2xl italic font-sans font-light leading-relaxed">
              Dedicated to empowering the next generation of digital artisans, high-end ateliers, and sovereign service providers.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-12 md:gap-32 pt-12">
             <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gold">Foundation</p>
                <p className="text-4xl font-serif text-foreground italic tracking-tighter">2026</p>
             </div>
             <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gold">Curation</p>
                <p className="text-4xl font-serif text-foreground italic tracking-tighter">Global</p>
             </div>
             <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gold">Mantra</p>
                <p className="text-4xl font-serif text-foreground italic tracking-tighter">Elegance</p>
             </div>
          </div>

          <div className="pt-20">
            <Link to="/onboarding" className="wa-button !rounded-2xl px-20 h-20 text-sm font-black uppercase tracking-[0.4em] shadow-luxury transform hover:scale-105 active:scale-95 transition-all">
              Initialize Your Legacy
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
