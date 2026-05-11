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
    <div className="min-h-screen bg-cream selection:bg-rose/20">
      <nav className="p-6">
        <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gold hover:text-ink transition-colors">
          <ArrowLeft size={14} /> Return to Mall
        </Link>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-32 pb-40">
        {/* Hero Section */}
        <div className="space-y-10 text-center max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-24 bg-gold/10 rounded-full mx-auto flex items-center justify-center border border-gold/20"
          >
            <Gem className="text-gold" size={40} />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-6xl md:text-8xl font-serif text-ink tracking-tight leading-[0.9]">
              The Vision of <br />
              <span className="italic text-gold">Sankalp MetaLux</span>
            </h1>
            <p className="text-gray-500 font-sans text-xl max-w-2xl mx-auto leading-relaxed">
              We've created a sanctuary where high-end boutiques and professional services can thrive online without the friction of traditional e-commerce.
            </p>
          </motion.div>
        </div>

        {/* Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((v, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-10 bg-white rounded-[3rem] border border-gold/10 space-y-6 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-gold/5 rounded-2xl flex items-center justify-center text-gold">{v.icon}</div>
              <h3 className="font-serif italic text-2xl text-ink">{v.title}</h3>
              <p className="text-gray-500 text-base font-sans leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* The Problem We Solve */}
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            <div className="inline-block px-4 py-1 bg-gold/10 rounded-full border border-gold/20 text-[10px] font-black uppercase tracking-widest text-gold">Our Commitment</div>
            <h2 className="text-5xl font-serif text-ink italic leading-tight">Elevating Artisans to the Digital Mainstage</h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Standard platforms are often too generic for specialized services or luxury goods. Sankalp MetaLux bridges that gap by providing a boutique-first management suite that scales with your ambition.
            </p>
            <ul className="space-y-4">
              {[
                "Zero maintenance overhead for shop owners",
                "Universal catering for products & services",
                "Image-first cataloging for visual impact",
                "Instant, high-conversion storefronts"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-ink/70">
                  <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <CheckCircle size={14} />
                  </div>
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full aspect-square bg-ink rounded-[5rem] relative overflow-hidden group shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
              alt="Luxury Retail"
            />
            <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
          </motion.div>
        </div>

        {/* Team/Contact */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-gold/10 bg-white p-20 rounded-[5rem] text-center space-y-10 shadow-luxury"
        >
          <div className="w-24 h-24 bg-gold/10 rounded-full mx-auto flex items-center justify-center border border-gold/20">
            <Users className="text-gold" size={40} />
          </div>
          <div className="space-y-4 max-w-2xl mx-auto">
            <h3 className="text-4xl font-serif text-ink italic leading-tight">Crafted by SankalpSMN</h3>
            <p className="text-gray-400 text-lg italic font-sans">
              Dedicated to empowering the next generation of digital artisans, high-end boutiques, and artisanal service providers.
            </p>
          </div>
          
          <div className="flex justify-center gap-12 md:gap-24 pt-8">
             <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">Established</p>
                <p className="text-3xl font-serif text-ink">2026</p>
             </div>
             <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">Reach</p>
                <p className="text-3xl font-serif text-ink">Global</p>
             </div>
             <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">Focus</p>
                <p className="text-3xl font-serif text-ink italic">Quality</p>
             </div>
          </div>

          <div className="pt-10">
            <Link to="/onboarding" className="wa-button !rounded-full px-16">
              Start Your Legacy
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
