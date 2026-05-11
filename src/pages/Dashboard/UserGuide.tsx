import React from 'react';
import { 
  BookOpen, 
  Store, 
  PlusCircle, 
  Image as ImageIcon, 
  CheckCircle2, 
  HelpCircle,
  ChevronRight,
  LayoutDashboard
} from 'lucide-react';

export default function UserGuide() {
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
    },
    {
      title: "The Artisan's Glossary",
      icon: <HelpCircle className="text-gold" size={24} />,
      content: "• Disclose Offering: Save and publish your new item. • Management Suite: Your product inventory view. • Boutique: Your public-facing storefront. • Frozen/Restricted: Items that are currently hidden but kept in your system."
    }
  ];

  return (
    <div className="max-w-4xl space-y-12 pb-20 transition-colors duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif text-foreground tracking-tight italic">The Artisan's Handbook</h1>
        <p className="text-muted-foreground font-sans text-lg italic">Master the art of digital boutique management with MetaLux.</p>
      </div>

      <div className="grid gap-6 md:gap-8">
        {steps.map((step, index) => (
          <div key={index} className="group bg-card p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-border shadow-sm hover:shadow-xl hover:border-gold/20 transition-all duration-500 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border border-gold/20">
              {step.icon}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gold/40 uppercase tracking-[0.4em]">Section 0{index + 1}</span>
                <div className="h-[1px] w-8 bg-gold/20" />
              </div>
              <h3 className="text-2xl font-serif text-foreground italic">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-sans text-sm md:text-base">
                {step.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-foreground text-background p-8 md:p-16 rounded-[2.5rem] md:rounded-[3.5rem] space-y-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-[100px] -mr-40 -mt-40 group-hover:scale-150 transition-transform duration-1000" />
        <div className="relative z-10 flex items-center gap-4 border-b border-background/10 pb-6">
          <HelpCircle className="text-gold" size={24} />
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">Commonly Asked</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 relative z-10">
          <div className="space-y-3">
            <h4 className="text-gold font-serif italic text-xl md:text-2xl">"How do I share my boutique?"</h4>
            <p className="text-background/60 text-sm md:text-base leading-relaxed">Navigate to 'Settings'. You'll find your unique boutique URL at the top. Share this link on your digital portfolios or physical business cards.</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-gold font-serif italic text-xl md:text-2xl">"Image upload considerations?"</h4>
            <p className="text-background/60 text-sm md:text-base leading-relaxed">Ensure a robust connection. For best results, use high-resolution portraits of your pieces. WEBP format is highly recommended for optimal performance.</p>
          </div>
        </div>

        <div className="pt-6">
          <button className="relative z-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-gold hover:text-white transition-all hover:translate-x-2">
            Contact Boutique Concierge <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
