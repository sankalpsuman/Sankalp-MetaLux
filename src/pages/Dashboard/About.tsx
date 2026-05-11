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
    <div className="max-w-4xl space-y-20 md:space-y-32 pb-20 transition-colors duration-500">
      {/* Hero Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="w-12 h-[1px] bg-gold" />
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gold">The Vision</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-serif text-foreground tracking-tight leading-tight italic">
          Redefining the <span className="text-gold">Digital Boutique</span> experience for the modern artisan.
        </h1>
        <p className="text-muted-foreground font-sans text-lg md:text-xl max-w-2xl leading-relaxed italic border-l-2 border-gold/30 pl-8">
          Sankalp MetaLux was born from a singular conviction: Masterpieces deserve a sanctuary, not just a store. We built a digital mall where high-end ateliers and elite professionals thrive without technical compromise.
        </p>
      </div>

      {/* Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {values.map((v, i) => (
          <div key={i} className="p-8 md:p-10 bg-card rounded-[2.5rem] border border-border space-y-6 hover:border-gold/20 hover:shadow-xl transition-all duration-500 group">
            <div className="text-gold w-12 h-12 rounded-2xl bg-gold/5 flex items-center justify-center group-hover:scale-110 transition-transform">{v.icon}</div>
            <div className="space-y-3">
              <h3 className="font-serif italic text-2xl text-foreground">{v.title}</h3>
              <p className="text-muted-foreground text-sm font-sans leading-relaxed">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* The Problem We Solve */}
      <div className="flex flex-col lg:flex-row gap-16 md:gap-24 items-center">
        <div className="flex-1 space-y-8">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground italic leading-tight">Elevating Every Digital Interaction</h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Mainstream platforms are often too rigid, while bespoke alternatives remain prohibitively complex. MetaLux bridges this divide with an architecture that prioritizes logic, elegance, and absolute scalability. 
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            {[
              "Zero maintenance friction",
              "Universal category support",
              "Visual-first discovery",
              "Instant brand deployment"
            ].map((text, i) => (
              <li key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-foreground/80">
                <CheckCircle className="text-gold" size={16} />
                {text}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 w-full aspect-square md:aspect-[4/5] bg-foreground rounded-[3rem] md:rounded-[4rem] relative overflow-hidden group shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
            alt="Luxury Atelier"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Gem className="text-gold animate-pulse" size={64} />
          </div>
        </div>
      </div>

      {/* Team/Contact */}
      <div className="border-t border-border pt-16 md:pt-24 text-center space-y-10">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-card rounded-3xl mx-auto flex items-center justify-center shadow-lg border border-border group hover:rotate-6 transition-transform">
          <Users className="text-gold" size={36} />
        </div>
        <div className="space-y-4">
          <h3 className="text-3xl font-serif text-foreground italic tracking-tight">Curated by <span className="text-gold">SANKALP METALUX</span></h3>
          <p className="text-muted-foreground text-base max-w-lg mx-auto italic font-sans leading-relaxed">
            A collective dedicated to empowering the next generation of digital artisans and high-end service providers.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8">
           <div className="text-center space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">Foundation</p>
              <p className="text-2xl font-serif text-foreground italic">2026</p>
           </div>
           <div className="text-center space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">Reach</p>
              <p className="text-2xl font-serif text-foreground italic">Global</p>
           </div>
           <div className="text-center space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">Philosophy</p>
              <p className="text-2xl font-serif text-foreground italic">Frictionless</p>
           </div>
        </div>
      </div>
    </div>
  );
}
