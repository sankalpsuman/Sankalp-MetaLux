import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Globe, 
  Users, 
  Feather,
  CheckCircle,
  Gem
} from 'lucide-react';

export default function About() {
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
    <div className="max-w-4xl space-y-20 pb-20">
      {/* Hero Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
           <div className="w-8 h-[2px] bg-gold" />
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">The Vision</span>
        </div>
        <h1 className="text-5xl font-serif text-ink tracking-tight leading-tight">
          Redefining the <span className="italic text-gold">Digital Mall</span> experience for the modern creator.
        </h1>
        <p className="text-gray-500 font-sans text-lg max-w-2xl leading-relaxed">
          Sankalp MetaLux was born out of a simple problem: Shop owners spent more time wrestling with software than serving their customers. We built a sanctuary where high-end boutiques and professional services can thrive online without the friction of traditional e-commerce.
        </p>
      </div>

      {/* Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((v, i) => (
          <div key={i} className="p-8 bg-gold/5 rounded-[2.5rem] border border-gold/10 space-y-4">
            <div className="text-gold">{v.icon}</div>
            <h3 className="font-serif italic text-xl text-ink">{v.title}</h3>
            <p className="text-gray-500 text-sm font-sans leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* The Problem We Solve */}
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-serif text-ink italic leading-tight">Our Commitment to Your Growth</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Standard platforms are too generic. Niche platforms are too expensive. MetaLux bridges that gap by providing a category-agnostic management suite that scales with you. No coding, no template hunting—just logic and elegance.
          </p>
          <ul className="space-y-3">
            {[
              "Zero maintenance overhead",
              "Universal catering for all categories",
              "Image-first cataloging approach",
              "Instant digital storefront deployment"
            ].map((text, i) => (
              <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-ink/70">
                <CheckCircle className="text-gold" size={14} />
                {text}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 w-full aspect-square bg-ink rounded-[4rem] relative overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
            alt="Luxury Retail"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Gem className="text-gold animate-bounce" size={48} />
          </div>
        </div>
      </div>

      {/* Team/Contact */}
      <div className="border-t border-gold/10 pt-12 text-center space-y-6">
        <div className="w-20 h-20 bg-gold/10 rounded-full mx-auto flex items-center justify-center">
          <Users className="text-gold" size={32} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-serif text-ink italic">Crafted by SankalpSMN</h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto italic font-sans">
            A team dedicated to empowering the next generation of digital artisans and high-end service providers.
          </p>
        </div>
        <div className="flex justify-center gap-8 pt-4">
           <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-gold">Founded</p>
              <p className="text-xl font-serif text-ink">2026</p>
           </div>
           <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-gold">Region</p>
              <p className="text-xl font-serif text-ink">Global</p>
           </div>
           <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-gold">Goal</p>
              <p className="text-xl font-serif text-ink">Zero-Friction</p>
           </div>
        </div>
      </div>
    </div>
  );
}
