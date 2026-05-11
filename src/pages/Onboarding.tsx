import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { storeService } from '../services/storeService';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Store, ArrowRight, CheckCircle2, ShoppingBag, Globe, Phone, Instagram } from 'lucide-react';

export default function Onboarding() {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    category: 'Fashion',
    whatsapp: '',
    instagram: '',
  });

  React.useEffect(() => {
    if (profile?.storeId && step !== 3) {
      navigate('/dashboard');
    }
  }, [profile, step, navigate]);

  if (profile?.storeId && step !== 3) {
    return null;
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setFormData(prev => ({ ...prev, slug: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.slug) {
      setError('Store name and slug are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Check if slug exists (Simplified check for demo)
      const existing = await storeService.getStoreBySlug(formData.slug);
      if (existing) {
        setError('This URL is already taken. Please choose another slug.');
        setLoading(false);
        return;
      }

      await storeService.createStore({
        ownerId: user!.uid,
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        category: formData.category,
        theme: 'minimal',
        contact: {
          whatsapp: formData.whatsapp,
          instagram: formData.instagram,
          email: user!.email || undefined
        }
      });

      await refreshProfile();
      setStep(3); // Success step
    } catch (err) {
      setError('Failed to create store. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 md:p-6 transition-colors duration-500">
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl space-y-8 border border-border"
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="text-gold" size={32} />
                </div>
                <h1 className="text-3xl md:text-4xl font-serif text-foreground tracking-tight">Welcome to MetaLux</h1>
                <p className="text-muted-foreground font-sans font-light text-sm md:text-base">Let's establish your digital boutique. It only takes a minute.</p>
              </div>

              <div className="space-y-6 md:space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">Boutique Name</label>
                  <Input 
                    placeholder="e.g. Anshi Collection"
                    className="border-b-2 border-border focus:border-gold transition-all bg-transparent !rounded-none !px-0"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gold flex items-center gap-2">
                    <Globe size={12} /> Personalized URL
                  </label>
                  <div className="flex items-center gap-2 bg-accent/20 p-4 rounded-xl border border-border">
                    <span className="text-muted-foreground text-xs font-mono">/s/</span>
                    <input 
                      placeholder="your-store-slug"
                      className="bg-transparent text-sm font-mono focus:outline-none w-full text-foreground"
                      value={formData.slug}
                      onChange={handleSlugChange}
                    />
                  </div>
                  <p className="text-[9px] text-muted-foreground italic">Lowercase letters, numbers, and hyphens only.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gold block">Collection Category</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-transparent border-b-2 border-border focus:border-gold transition-all text-sm py-3 outline-none appearance-none cursor-pointer text-foreground"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    >
                      <option value="Fashion" className="bg-background text-foreground">Fashion & Apparel</option>
                      <option value="Beauty" className="bg-background text-foreground">Beauty & Salon</option>
                      <option value="Services" className="bg-background text-foreground">Professional Services</option>
                      <option value="Food" className="bg-background text-foreground">Food & Beverage</option>
                      <option value="Electronics" className="bg-background text-foreground">Electronics & Tech</option>
                      <option value="Other" className="bg-background text-foreground">Other Boutique</option>
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                      <ArrowRight size={14} className="rotate-90" />
                    </div>
                  </div>
                </div>

                {error && <p className="text-rose text-xs font-medium text-center bg-rose/10 py-2 rounded-lg">{error}</p>}

                <Button 
                  onClick={() => setStep(2)}
                  disabled={!formData.name || !formData.slug}
                  className="w-full wa-button h-14 text-xs font-black uppercase tracking-widest !rounded-xl"
                >
                  Continue Expedition <ArrowRight size={14} className="ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl space-y-8 border border-border"
            >
              <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-4xl font-serif text-foreground tracking-tight">Contact & Identity</h1>
                <p className="text-muted-foreground font-sans font-light text-sm md:text-base">How will clients engage with your brand?</p>
              </div>

              <div className="space-y-6 md:space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gold flex items-center gap-2">
                    <Phone size={12} /> WhatsApp Helpline
                  </label>
                  <Input 
                    placeholder="e.g. +91 98765 43210"
                    className="border-b-2 border-border focus:border-gold transition-all bg-transparent !rounded-none !px-0"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gold flex items-center gap-2">
                    <Instagram size={12} /> Social Portfolio
                  </label>
                  <div className="flex items-center gap-2 bg-accent/20 p-4 rounded-xl border border-border">
                    <span className="text-muted-foreground text-xs font-mono">@</span>
                    <input 
                      placeholder="instagram_handle"
                      className="bg-transparent text-sm font-mono focus:outline-none w-full text-foreground"
                      value={formData.instagram}
                      onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">The Story</label>
                  <textarea 
                    placeholder="A brief introduction to your craftsmanship..."
                    rows={3}
                    className="w-full bg-transparent border-b-2 border-border focus:border-gold transition-all text-sm py-2 resize-none outline-none text-foreground"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                {error && <p className="text-rose text-xs font-medium text-center bg-rose/10 py-2 rounded-lg">{error}</p>}

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button variant="outline" onClick={() => setStep(1)} className="order-2 sm:order-1 flex-1 uppercase text-[10px] tracking-widest font-black h-14 !rounded-xl border-border">Back</Button>
                  <Button 
                    onClick={handleSubmit}
                    loading={loading}
                    className="order-1 sm:order-2 flex-[2] wa-button h-14 text-xs font-black uppercase tracking-widest !rounded-xl"
                  >
                    Launch Boutique
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl text-center space-y-10 border border-border"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gold rounded-full flex items-center justify-center mx-auto text-white shadow-2xl shadow-gold/30">
                <CheckCircle2 size={48} />
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-serif text-foreground tracking-tight italic">You're Official<span className="text-gold">.</span></h1>
                <p className="text-muted-foreground font-sans font-light text-base md:text-lg">
                  Your boutique <span className="font-black text-foreground italic">"{formData.name}"</span> has been established on Sankalp MetaLux.
                </p>
              </div>
              
              <div className="bg-gold/5 p-6 md:p-8 rounded-3xl border border-gold/20 inline-block w-full">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-3">Your Digital Signature</p>
                <code className="text-base md:text-lg font-mono text-foreground break-all">sankalpmetlux.com/s/{formData.slug}</code>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="wa-button w-full h-16 text-xs font-black uppercase tracking-widest !rounded-xl shadow-luxury"
                >
                  Enter Master Dashboard <ArrowRight size={14} className="ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
