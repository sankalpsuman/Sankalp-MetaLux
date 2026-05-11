import React, { useEffect, useState } from 'react';
import { useAuth } from '../../App';
import { storeService } from '../../services/storeService';
import { Store } from '../../types';
import { motion } from 'motion/react';
import { 
  Building, 
  Palette, 
  MapPin, 
  Link as LinkIcon, 
  Shield, 
  Bell,
  Save,
  Globe,
  Camera,
  Layers,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { toast } from 'sonner';

export default function DashboardSettings() {
  const { profile, refreshProfile } = useAuth();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchStore() {
        if (profile?.storeId) {
            const s = await storeService.getStoreById(profile.storeId);
            setStore(s);
        }
        setLoading(false);
    }
    fetchStore();
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!store) return;
    setSaving(true);
    try {
        await storeService.updateStore(store.id, store);
        await refreshProfile();
        toast.success('Boutique settings updated successfully.');
    } catch (err) {
        console.error(err);
    } finally {
        setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 translate-y-10 animate-pulse">
      <Loader2 className="text-gold animate-spin mb-4" size={32} />
      <p className="text-muted-foreground font-serif italic text-lg uppercase tracking-widest">Initializing Control Suit...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-12 transition-colors duration-500 pb-24">
      <div>
        <h1 className="text-3xl md:text-5xl font-serif text-foreground tracking-tight italic">Identity & Aesthetics</h1>
        <p className="text-muted-foreground font-sans text-xs md:text-sm mt-2 uppercase tracking-[0.3em] font-black italic">Configure how the global audience perceives your brand</p>
      </div>

      <form onSubmit={handleSave} className="space-y-10">
        {/* Profile Card */}
        <section className="bg-card rounded-[2.5rem] md:rounded-[3.5rem] border border-border shadow-sm p-8 md:p-12 space-y-12 hover:shadow-xl transition-all duration-700">
           <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="relative group perspective">
                 <div className="w-32 h-32 md:w-36 md:h-36 rounded-[2.5rem] overflow-hidden border-2 border-gold/20 bg-accent/30 flex items-center justify-center p-4 group-hover:rotate-6 transition-all duration-700 shadow-2xl">
                    <img src={store?.logoUrl || `https://ui-avatars.com/api/?name=${store?.name}&background=random`} className="w-full h-full object-contain rounded-2xl" alt="" />
                 </div>
                 <button className="absolute -bottom-2 -right-2 p-3 bg-foreground text-background rounded-2xl shadow-luxury opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110">
                    <Camera size={18} />
                 </button>
              </div>
              <div className="text-center md:text-left space-y-2">
                 <h3 className="text-3xl md:text-4xl font-serif text-foreground italic">{store?.name}</h3>
                 <div className="flex flex-col md:flex-row items-center gap-3">
                    <span className="text-[10px] text-muted-foreground font-black tracking-[0.4em] uppercase border border-border px-4 py-1.5 rounded-full inline-block">Established MetaLux 2026</span>
                    <div className="hidden md:block h-1 w-8 bg-gold/30 rounded-full" />
                 </div>
              </div>
           </div>

           <div className="grid md:grid-cols-2 gap-10 md:gap-16 pt-12 border-t border-border/50">
              <div className="space-y-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold italic">Boutique Name</label>
                    <Input 
                        value={store?.name || ''} 
                        onChange={e => setStore(s => s ? ({...s, name: e.target.value}) : null)}
                        className="bg-accent/30 border-border focus:border-gold rounded-2xl h-14 text-lg md:text-xl font-serif italic"
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold italic text-indigo-500">Domain Disclosure (Slug)</label>
                    <div className="bg-muted p-4 rounded-2xl flex items-center gap-3 border border-border group">
                        <Globe size={18} className="text-muted-foreground group-hover:rotate-12 transition-transform" />
                        <span className="text-xs font-mono text-muted-foreground uppercase opacity-50">metalux.app/</span>
                        <input disabled value={store?.slug || ''} className="bg-transparent text-sm font-mono outline-none w-full font-black text-foreground" />
                    </div>
                    <p className="text-[9px] text-muted-foreground font-black italic uppercase tracking-widest pl-2 border-l border-gold/50">Restricted: Slugs are immutable after disclosure.</p>
                 </div>
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold italic">Brand Narrative</label>
                 <textarea 
                     rows={6}
                     value={store?.description || ''}
                     onChange={e => setStore(s => s ? ({...s, description: e.target.value}) : null)}
                     className="w-full bg-accent/30 p-6 border-border rounded-[2rem] text-base font-sans italic resize-none outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all leading-relaxed placeholder:text-muted-foreground/30 text-foreground"
                     placeholder="Narrate the philosophy and essence of your brand..."
                 />
              </div>
           </div>
        </section>

        {/* Assets Section */}
        <section className="bg-card rounded-[2.5rem] md:rounded-[3.5rem] border border-border shadow-sm p-8 md:p-12 space-y-10">
           <div className="flex items-center gap-4">
              <ImageIcon size={24} className="text-gold" />
              <h3 className="text-2xl font-serif text-foreground italic border-b border-gold/20 pb-1">Atmospheric Assets</h3>
           </div>
           <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold italic">Boutique Hero Visualization</label>
                    <Input 
                        placeholder="https://images.unsplash.com/your-masterpiece" 
                        value={store?.bannerUrl || ''}
                        onChange={e => setStore(s => s ? ({...s, bannerUrl: e.target.value}) : null)}
                        className="bg-accent/30 border-border focus:border-gold rounded-2xl h-12"
                    />
                </div>
                <div className="aspect-video w-full rounded-[2rem] overflow-hidden bg-muted border border-border relative group">
                    {store?.bannerUrl ? (
                        <img src={store.bannerUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="" />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-3">
                           <ImageIcon size={48} className="opacity-20" />
                           <p className="text-[10px] uppercase tracking-widest italic">Awaiting Hero Disclosure</p>
                        </div>
                    )}
                </div>
              </div>
              <div className="space-y-8">
                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold italic">Aesthetic Curation</label>
                    <div className="grid grid-cols-2 gap-4">
                        {['minimal', 'classic', 'dark', 'gold'].map(t => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setStore(s => s ? ({...s, theme: t as any}) : null)}
                                className={`px-4 py-4 rounded-[1.25rem] text-[10px] uppercase tracking-[0.3em] font-black border-2 transition-all transform active:scale-95 ${
                                    store?.theme === t 
                                    ? 'bg-foreground border-foreground text-background shadow-xl' 
                                    : 'bg-accent/20 border-border text-muted-foreground hover:border-gold/30'
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="p-8 bg-gold/5 rounded-[2rem] border border-gold/10 flex flex-col items-center justify-center text-center space-y-4">
                   <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                    <Layers className="text-gold" size={20} />
                   </div>
                   <div className="space-y-2">
                    <p className="text-[12px] font-black uppercase tracking-[0.3em] text-foreground italic">Adaptive Geometry</p>
                    <p className="text-[10px] text-muted-foreground font-sans italic leading-relaxed">MetaLux intelligently morphs your storefront architecture to resonate with your curated aesthetic choice.</p>
                   </div>
                </div>
              </div>
           </div>
        </section>

        {/* Contact info */}
        <section className="bg-card rounded-[2.5rem] md:rounded-[3.5rem] border border-border shadow-sm p-8 md:p-12 space-y-10">
           <div className="flex items-center gap-4">
              <LinkIcon size={24} className="text-gold" />
              <h3 className="text-2xl font-serif text-foreground italic border-b border-gold/20 pb-1">Communication Vessels</h3>
           </div>
           <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold italic">Concierge WhatsApp</label>
                 <Input 
                    placeholder="+91..."
                    value={store?.contact.whatsapp || ''}
                    onChange={e => setStore(s => s ? ({...s, contact: {...s.contact, whatsapp: e.target.value}}) : null)}
                    className="bg-accent/30 border-border focus:border-gold rounded-2xl h-12 text-foreground"
                 />
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold italic">Instagram Portfolio</label>
                 <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-mono opacity-40">@</span>
                    <Input 
                        placeholder="handle"
                        value={store?.contact.instagram || ''}
                        onChange={e => setStore(s => s ? ({...s, contact: {...s.contact, instagram: e.target.value}}) : null)}
                        className="bg-accent/30 border-border focus:border-gold rounded-2xl h-12 text-foreground pl-8"
                    />
                 </div>
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold italic">Privé Email</label>
                 <Input 
                    type="email"
                    placeholder="contact@brand.com"
                    value={store?.contact.email || ''}
                    onChange={e => setStore(s => s ? ({...s, contact: {...s.contact, email: e.target.value}}) : null)}
                    className="bg-accent/30 border-border focus:border-gold rounded-2xl h-12 text-foreground"
                 />
              </div>
           </div>
        </section>

        <div className="flex flex-col sm:flex-row justify-end gap-6 md:gap-8 pt-6">
           <Button variant="ghost" className="uppercase text-[10px] tracking-[0.5em] font-black h-16 w-full sm:w-auto !rounded-2xl hover:bg-accent/50 text-muted-foreground underline-offset-8 hover:underline">Revoke Changes</Button>
           <Button type="submit" disabled={saving} className="wa-button !rounded-2xl px-16 h-16 w-full sm:w-auto text-xs font-black uppercase tracking-[0.4em] shadow-luxury transform hover:scale-105 active:scale-95 transition-all">
               {saving ? <Loader2 className="animate-spin mr-3" size={18} /> : null}
               {saving ? 'Synchronizing...' : 'Sovereign Save'}
           </Button>
        </div>
      </form>
    </div>
  );
}
