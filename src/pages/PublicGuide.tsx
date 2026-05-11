import React from 'react';
import { 
  BookOpen, 
  Store, 
  PlusCircle, 
  Image as ImageIcon, 
  CheckCircle2, 
  HelpCircle,
  ChevronRight,
  LayoutDashboard,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function PublicGuide() {
  const steps = [
    {
      title: "Understanding MetaLux",
      icon: <Store className="text-gold" size={24} />,
      content: "Sankalp MetaLux is a premium digital mall. Your 'Boutique' is your personal space in this mall where you can showcase products or services to visitors. Think of this dashboard as your master control room."
    },
    {
      title: "Navigation & Dashboard",
      icon: <LayoutDashboard className="text-gold" size={24} />,
      content: "Use the sidebar to jump between sections. The 'Overview' gives you a snapshot of your performance, while 'The Collection' is where you manage what you're selling."
    },
    {
      title: "Adding Your Offerings",
      icon: <PlusCircle className="text-gold" size={24} />,
      content: "Go to 'The Collection' and click 'Add Offering'. Whether you offer haircuts, sell bikes, or provide consulting, the form is designed to be universal. Fill in the name, choose a category, and describe your masterpiece."
    },
    {
      title: "Visual Assets (Images)",
      icon: <ImageIcon className="text-gold" size={24} />,
      content: "Images are the heart of luxury. You can upload a file directly or paste a link from the web. Good lighting and clean backgrounds make your offerings stand out. Remember: JPG, PNG, or WEBP are supported."
    },
    {
      title: "Managing Availability",
      icon: <CheckCircle2 className="text-gold" size={24} />,
      content: "If a product is sold out or a service is temporarily unavailable, use the 'Availability Status' toggle. This hides the 'Inquiry' button from visitors without removing the item from your digital shelves."
    }
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-rose/20 transition-colors duration-500">
      {/* Simple Nav */}
      <nav className="p-6 md:p-10 sticky top-0 bg-background/80 backdrop-blur-md z-50 border-b border-border/50">
        <Link to="/" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-gold hover:text-foreground transition-all hover:-translate-x-2">
          <ArrowLeft size={16} /> Return to Mall
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-20 md:space-y-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 text-center md:text-left"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 justify-center md:justify-start">
             <div className="w-16 h-16 rounded-[2rem] bg-gold/10 flex items-center justify-center border border-gold/20 shadow-luxury">
              <BookOpen className="text-gold" size={32} />
             </div>
             <h1 className="text-5xl md:text-7xl font-serif text-foreground tracking-tighter italic">Artisan's Handbook</h1>
          </div>
          <p className="text-muted-foreground font-sans text-xl md:text-2xl italic max-w-2xl mx-auto md:mx-0 leading-relaxed">Master the art of digital boutique management with <span className="text-gold">Sankalp MetaLux</span>.</p>
        </motion.div>

        <div className="grid gap-10 md:gap-16">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-card p-10 md:p-16 rounded-[3rem] md:rounded-[4rem] border border-border shadow-sm hover:shadow-2xl hover:border-gold/20 transition-all duration-700 flex flex-col md:flex-row gap-10 md:gap-16 items-start"
            >
              <div className="w-20 h-20 rounded-[2rem] bg-accent flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-background transition-all duration-700 shadow-inner group-hover:shadow-luxury group-hover:rotate-6">
                {step.icon}
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-gold/40 uppercase tracking-[0.5em]">Module 0{index + 1}</span>
                  <div className="h-[1px] w-12 bg-gold/20" />
                </div>
                <h3 className="text-3xl md:text-4xl font-serif text-foreground italic">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-sans text-lg md:text-xl font-light italic">
                  {step.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-foreground text-background p-10 md:p-24 rounded-[4rem] md:rounded-[6rem] space-y-12 relative overflow-hidden shadow-luxury group"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -mr-64 -mt-64 group-hover:scale-125 transition-transform duration-1000" />
          <div className="relative z-10 flex items-center gap-4 border-b border-background/10 pb-10">
            <HelpCircle className="text-gold" size={32} />
            <h3 className="text-[12px] font-black uppercase tracking-[0.5em] text-gold">Concierge Intelligence</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 relative z-10">
            <div className="space-y-5">
              <h4 className="text-gold font-serif italic text-2xl md:text-3xl">"Sharing your boutique?"</h4>
              <p className="text-background/60 text-lg leading-relaxed italic">Once your disclosure is complete, your unique URL becomes your digital flagship. Distribute this link across your elite social circles and business portfolios.</p>
            </div>
            <div className="space-y-5">
              <h4 className="text-gold font-serif italic text-2xl md:text-3xl">"Artisanship Fees?"</h4>
              <p className="text-background/60 text-lg leading-relaxed italic">Sankalp MetaLux prioritizes pure artisan growth. We offer an uncompromising platform for creators to thrive with absolute elegance and zero friction.</p>
            </div>
          </div>

          <div className="pt-12 flex flex-col md:flex-row items-center justify-center gap-8 relative z-10">
            <Link to="/onboarding" className="wa-button !rounded-2xl px-16 h-16 w-full md:w-auto text-xs font-black uppercase tracking-[0.3em] group shadow-luxury">
              Embark on Onboarding <ChevronRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </main>

      <footer className="py-20 border-t border-border px-6 text-center">
         <p className="text-[10px] font-black uppercase tracking-[0.6em] text-gold opacity-40">© 2026 SANKALP METALUX<br className="sm:hidden" /> / ARTISANAL DIGITAL STANDARDS.</p>
      </footer>
    </div>
  );
}
