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
    <div className="min-h-screen bg-cream selection:bg-rose/20">
      {/* Simple Nav */}
      <nav className="p-6">
        <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gold hover:text-ink transition-colors">
          <ArrowLeft size={14} /> Return to Mall
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-12 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
             <BookOpen className="text-gold" size={32} />
             <h1 className="text-5xl font-serif text-ink tracking-tight">The Artisan's Handbook</h1>
          </div>
          <p className="text-gray-400 font-sans text-xl italic">Master the art of digital boutique management with Sankalp MetaLux.</p>
        </motion.div>

        <div className="grid gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white p-10 rounded-[3rem] border border-gold/10 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="w-16 h-16 rounded-[1.5rem] bg-gold/5 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-white transition-all duration-500">
                {step.icon}
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-gold/30 uppercase tracking-[0.3em]">Module 0{index + 1}</span>
                  <h3 className="text-2xl font-serif text-ink italic">{step.title}</h3>
                </div>
                <p className="text-gray-500 leading-relaxed font-sans text-base">
                  {step.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-ink text-cream p-16 rounded-[4rem] space-y-8 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[100px] -mr-48 -mt-48" />
          <div className="relative z-10 flex items-center gap-3 border-b border-gold/20 pb-6">
            <HelpCircle className="text-gold" size={24} />
            <h3 className="text-[12px] font-bold uppercase tracking-[0.3em]">Concierge Support</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            <div className="space-y-3">
              <h4 className="text-gold font-serif italic text-xl">"How do I share my shop?"</h4>
              <p className="text-cream/60 text-sm leading-relaxed">Go to your Dashboard settings. You'll see your unique boutique URL. Share this link on your social media or business cards to bring visitors directly to your door.</p>
            </div>
            <div className="space-y-3">
              <h4 className="text-gold font-serif italic text-xl">"Is there a listing fee?"</h4>
              <p className="text-cream/60 text-sm leading-relaxed">Sankalp MetaLux is currently prioritizing artisan growth. Our mission is to provide an elite platform for creators to showcase their work without initial friction.</p>
            </div>
          </div>

          <div className="pt-8 flex justify-center relative z-10">
            <Link to="/onboarding" className="wa-button !rounded-full px-12 group">
              Start Your Journey <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </main>

      <footer className="py-12 border-t border-gold/10 px-6 text-center">
         <p className="text-[10px] font-bold uppercase tracking-widest text-gold opacity-50">© 2026 SANKALP METALUX. ARTISANAL STANDARDS.</p>
      </footer>
    </div>
  );
}
