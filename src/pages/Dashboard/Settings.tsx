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
  Image as ImageIcon
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

  if (loading) return <div>Loading Settings...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-serif text-ink tracking-tight">Identity & Aesthetics</h1>
        <p className="text-gray-400 font-sans text-sm mt-1 uppercase tracking-widest font-bold">Configure how the world perceives your brand</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8 pb-20">
        {/* Profile Card */}
        <section className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-8">
           <div className="flex items-center gap-6">
              <div className="relative group">
                 <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold/20 bg-gray-50 flex items-center justify-center p-2">
                    <img src={store?.logoUrl || `https://ui-avatars.com/api/?name=${store?.name}`} className="w-full h-full object-contain rounded-full" alt="" />
                 </div>
                 <button className="absolute bottom-0 right-0 p-2 bg-ink text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={14} />
                 </button>
              </div>
              <div>
                 <h3 className="text-xl font-serif text-ink">{store?.name}</h3>
                 <p className="text-xs text-gray-400 font-sans tracking-widest uppercase font-bold">Joined Sankalp MetaLux in 2026</p>
              </div>
           </div>

           <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-gray-50">
              <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gold">Store Name</label>
                    <Input 
                        value={store?.name || ''} 
                        onChange={e => setStore(s => s ? ({...s, name: e.target.value}) : null)}
                        className="bg-gray-50 border-none rounded-xl"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gold text-indigo-500">Slug (URL)</label>
                    <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-2 opacity-50">
                        <Globe size={14} className="text-gray-400" />
                        <span className="text-xs font-mono">sankalp.com/s/</span>
                        <input disabled value={store?.slug || ''} className="bg-transparent text-xs font-mono outline-none w-full" />
                    </div>
                    <p className="text-[9px] text-gray-400 font-bold italic uppercase tracking-tighter">Slugs cannot be changed after disclosure.</p>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gold">Boutique Description</label>
                    <textarea 
                        rows={4}
                        value={store?.description || ''}
                        onChange={e => setStore(s => s ? ({...s, description: e.target.value}) : null)}
                        className="w-full bg-gray-50 p-4 border-none rounded-xl text-sm font-sans resize-none outline-none focus:ring-1 focus:ring-gold"
                        placeholder="Tell the story of your brand..."
                    />
                 </div>
              </div>
           </div>
        </section>

        {/* Assets Section */}
        <section className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-6">
           <h3 className="flex items-center gap-2 text-xl font-serif text-ink">
              <ImageIcon size={20} className="text-gold" /> Visual Assets
           </h3>
           <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gold">Banner Image URL</label>
                    <Input 
                        placeholder="https://images.unsplash.com/..." 
                        value={store?.bannerUrl || ''}
                        onChange={e => setStore(s => s ? ({...s, bannerUrl: e.target.value}) : null)}
                        className="bg-gray-50 border-none rounded-xl"
                    />
                </div>
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 relative">
                    {store?.bannerUrl ? (
                        <img src={store.bannerUrl} className="w-full h-full object-cover" alt="" />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                           <ImageIcon size={48} />
                        </div>
                    )}
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gold">Aesthetic Theme</label>
                    <div className="grid grid-cols-2 gap-3">
                        {['minimal', 'classic', 'dark', 'gold'].map(t => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setStore(s => s ? ({...s, theme: t as any}) : null)}
                                className={`px-4 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold border-2 transition-all ${
                                    store?.theme === t ? 'bg-gold border-gold text-white shadow-lg' : 'bg-white border-gray-100 text-gray-400 hover:border-gold/30'
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="p-6 bg-gold/5 rounded-2xl border border-gold/10 flex flex-col items-center justify-center text-center space-y-2">
                   <Layers className="text-gold opacity-40" />
                   <p className="text-[10px] font-bold uppercase tracking-widest text-gold">Dynamic Layouts</p>
                   <p className="text-[9px] text-gray-500 font-sans">Sankalp MetaLux intelligently adapts your storefront layout to match your selection.</p>
                </div>
              </div>
           </div>
        </section>

        {/* Contact info */}
        <section className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-8">
           <h3 className="flex items-center gap-2 text-xl font-serif text-ink">
              <MapPin size={20} className="text-indigo-500" /> Digital Connection
           </h3>
           <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-gold">WhatsApp</label>
                 <Input 
                    value={store?.contact.whatsapp || ''}
                    onChange={e => setStore(s => s ? ({...s, contact: {...s.contact, whatsapp: e.target.value}}) : null)}
                    className="bg-gray-50 border-none rounded-xl"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-gold">Instagram</label>
                 <Input 
                    value={store?.contact.instagram || ''}
                    onChange={e => setStore(s => s ? ({...s, contact: {...s.contact, instagram: e.target.value}}) : null)}
                    className="bg-gray-50 border-none rounded-xl"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-gold">Support Email</label>
                 <Input 
                    value={store?.contact.email || ''}
                    onChange={e => setStore(s => s ? ({...s, contact: {...s.contact, email: e.target.value}}) : null)}
                    className="bg-gray-50 border-none rounded-xl"
                 />
              </div>
           </div>
        </section>

        <div className="flex justify-end gap-4">
           <Button variant="ghost" className="uppercase text-[10px] tracking-widest font-black">Discard Changes</Button>
           <Button type="submit" disabled={saving} className="wa-button !rounded-full px-12">
               {saving ? 'Syncing...' : 'Save Configuration'}
           </Button>
        </div>
      </form>
    </div>
  );
}
