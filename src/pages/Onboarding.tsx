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
    category: '',
    whatsapp: '',
    instagram: '',
  });

  if (profile?.storeId) {
    navigate('/dashboard');
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
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-12 rounded-[2.5rem] shadow-2xl space-y-8"
            >
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="text-gold" size={32} />
                </div>
                <h1 className="text-4xl font-serif text-ink tracking-tight">Welcome to Sankalp MetaLux</h1>
                <p className="text-ink/60 font-sans font-light">Let's create your digital boutique. It only takes a minute.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold">Boutique Name</label>
                  <Input 
                    placeholder="e.g. Anshi Collection"
                    className="border-b-2 border-gold/20 focus:border-gold transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold flex items-center gap-2">
                    <Globe size={12} /> Custom URL
                  </label>
                  <div className="flex items-center gap-2 bg-black/5 p-4 rounded-xl">
                    <span className="text-ink/40 text-xs font-mono">sankalp.com/s/</span>
                    <input 
                      placeholder="your-store-slug"
                      className="bg-transparent text-sm font-mono focus:outline-none w-full"
                      value={formData.slug}
                      onChange={handleSlugChange}
                    />
                  </div>
                  <p className="text-[9px] text-ink/40 italic">Lowercase letters, numbers, and hyphens only.</p>
                </div>

                {error && <p className="text-rose text-xs font-medium text-center">{error}</p>}

                <Button 
                  onClick={() => setStep(2)}
                  disabled={!formData.name || !formData.slug}
                  className="w-full wa-button"
                >
                  Next Step <ArrowRight size={14} />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-12 rounded-[2.5rem] shadow-2xl space-y-8"
            >
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-serif text-ink tracking-tight">Contact & Identity</h1>
                <p className="text-ink/60 font-sans font-light">How will customers connect with your brand?</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold flex items-center gap-2">
                    <Phone size={12} /> WhatsApp Number
                  </label>
                  <Input 
                    placeholder="e.g. +91 98765 43210"
                    className="border-b-2 border-gold/20 focus:border-gold transition-all"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold flex items-center gap-2">
                    <Instagram size={12} /> Instagram Handle
                  </label>
                  <div className="flex items-center gap-2 bg-black/5 p-4 rounded-xl">
                    <span className="text-ink/40 text-xs font-mono">@</span>
                    <input 
                      placeholder="yourhandle"
                      className="bg-transparent text-sm font-mono focus:outline-none w-full"
                      value={formData.instagram}
                      onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold">Short Bio</label>
                  <textarea 
                    placeholder="Tell your story..."
                    rows={3}
                    className="w-full bg-transparent border-b-2 border-gold/20 focus:border-gold transition-all text-sm py-2 resize-none outline-none"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                {error && <p className="text-rose text-xs font-medium text-center">{error}</p>}

                <div className="flex gap-4">
                  <Button variant="ghost" onClick={() => setStep(1)} className="flex-1 uppercase text-[10px] tracking-widest font-bold">Back</Button>
                  <Button 
                    onClick={handleSubmit}
                    loading={loading}
                    className="flex-[2] wa-button"
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
              className="glass-card p-12 rounded-[2.5rem] shadow-2xl text-center space-y-8"
            >
              <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mx-auto text-white">
                <CheckCircle2 size={48} />
              </div>
              <div className="space-y-4">
                <h1 className="text-5xl font-serif text-ink tracking-tight">You're Official<span className="text-gold">.</span></h1>
                <p className="text-ink/70 font-sans font-light text-lg">
                  Your boutique <span className="font-bold text-ink italic">"{formData.name}"</span> is now live on Sankalp MetaLux.
                </p>
              </div>
              
              <div className="bg-gold/5 p-6 rounded-2xl border border-gold/20 inline-block">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-2">Your Store URL</p>
                <code className="text-lg font-mono text-ink">sankalp.com/s/{formData.slug}</code>
              </div>

              <div className="pt-8">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="wa-button w-full"
                >
                  Enter Dashboard <ArrowRight size={14} className="ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
