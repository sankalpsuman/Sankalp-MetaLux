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
    <div className="max-w-4xl space-y-12 pb-20">
      <div className="space-y-4">
        <h1 className="text-4xl font-serif text-ink tracking-tight">The Artisan's Handbook</h1>
        <p className="text-gray-400 font-sans text-lg italic">Master the art of digital boutique management with MetaLux.</p>
      </div>

      <div className="grid gap-8">
        {steps.map((step, index) => (
          <div key={index} className="group bg-white p-8 rounded-[2rem] border border-gold/10 shadow-sm hover:shadow-xl transition-all duration-500 flex gap-6 items-start">
            <div className="w-12 h-12 rounded-2xl bg-gold/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
              {step.icon}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-gold/30 uppercase tracking-[0.3em]">Step 0{index + 1}</span>
                <h3 className="text-xl font-serif text-ink italic">{step.title}</h3>
              </div>
              <p className="text-gray-500 leading-relaxed font-sans text-sm">
                {step.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-ink text-cream p-12 rounded-[3rem] space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10 flex items-center gap-3 border-b border-gold/20 pb-4">
          <HelpCircle className="text-gold" size={20} />
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Commonly Asked</h3>
        </div>
        
        <div className="space-y-8 relative z-10">
          <div className="space-y-2">
            <h4 className="text-gold font-serif italic text-lg">"How do I share my shop?"</h4>
            <p className="text-cream/60 text-sm">Go to 'Settings'. You'll see your unique boutique URL. Share this link on your social media or business cards.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-gold font-serif italic text-lg">"The image uploader failed?"</h4>
            <p className="text-cream/60 text-sm">Check your internet connection or try pasting a direct image link from sites like Unsplash as a secondary option.</p>
          </div>
        </div>

        <button className="relative z-10 mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gold hover:text-white transition-colors">
          Contact Concierge <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
