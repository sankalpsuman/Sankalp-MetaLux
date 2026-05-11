import React, { useEffect, useState } from 'react';
import { useAuth } from '../../App';
import { productService } from '../../services/productService';
import { Product } from '../../types';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Trash2, 
  Edit, 
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  X,
  Upload,
  Loader2,
  Package,
  Layers,
  DollarSign,
  Tag,
  CheckCircle2,
  XCircle,
  ShoppingBag
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '../../components/ui/dialog';
import { toast } from 'sonner';
import { ImageUploader } from '../../components/ImageUploader';

const CATEGORIES = [
  'Fashion',
  'Hair & Beauty',
  'Bikes & Gear',
  'Electronics',
  'Food & Beverage',
  'Professional Services',
  'Home & Living',
  'Other'
];

export default function DashboardProducts() {
  const { profile } = useAuth();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    imageUrl: '',
    inStock: true
  });

  useEffect(() => {
    fetchItems();
  }, [profile]);

  async function fetchItems() {
    if (!profile?.storeId) return;
    const data = await productService.getProductsByStore(profile.storeId);
    setItems(data);
    setLoading(false);
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.storeId) return;
    
    if (!formData.imageUrl) {
      toast.error('Please upload an image representation.');
      return;
    }

    setSubmitting(true);
    try {
      await productService.createProduct({
        storeId: profile.storeId,
        name: formData.name,
        price: Number(formData.price),
        description: formData.description,
        category: formData.category || 'Uncategorized',
        images: [formData.imageUrl],
        inStock: formData.inStock,
        isFeatured: false,
        currency: 'INR'
      });
      
      setIsAdding(false);
      setFormData({ name: '', price: '', description: '', category: '', imageUrl: '', inStock: true });
      fetchItems();
      toast.success(`${formData.name} has been added to your offerings.`);
    } catch (err) {
      toast.error('Failed to add offering. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await productService.deleteProduct(id);
      fetchItems();
      toast.success('Offering removed from inventory.');
    } catch (err) {
      toast.error('Failed to delete offering.');
    }
  };

  return (
    <div className="space-y-10 transition-colors duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-serif text-foreground tracking-tight italic">Elite Management Suite</h1>
          <p className="text-muted-foreground font-sans text-xs md:text-sm uppercase tracking-[0.2em] font-bold">Curate your masterpieces and manage digital inventory</p>
        </div>
        
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger
            render={<Button className="wa-button !py-2 h-12 px-8 rounded-full w-full sm:w-auto shadow-luxury" />}
          >
            <Plus size={18} className="mr-1" /> Add New Disclosure
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] rounded-[2.5rem] p-0 border border-border shadow-2xl bg-background/95 backdrop-blur-xl max-h-[95vh] overflow-hidden flex flex-col">
            <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar">
              <DialogHeader className="mb-10">
                <DialogTitle className="text-4xl md:text-5xl font-serif italic text-foreground tracking-tight">Product Disclosure</DialogTitle>
                <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] font-black mt-2">Define the essence of your creation</p>
              </DialogHeader>
              <form id="product-form" onSubmit={handleCreate} className="space-y-12">
                {/* Basic Details */}
                <div className="space-y-10 text-foreground">
                  <div className="flex items-center gap-4 border-b border-border pb-4">
                    <Package className="text-gold" size={20} />
                    <h3 className="text-[12px] font-black uppercase tracking-[0.3em]">Fundamental Context</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gold italic">Nomenclature</label>
                    <Input 
                      required
                      placeholder="e.g. Hand-Woven Silk Saree, Artisanal Terrace Suite, etc." 
                      value={formData.name} 
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="bg-transparent border-b-2 border-border focus:border-gold rounded-none px-0 text-lg md:text-xl font-serif italic h-14"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gold italic">Valuation (₹)</label>
                      <Input 
                        required
                        type="number"
                        placeholder="0.00" 
                        value={formData.price} 
                        onChange={e => setFormData(p => ({ ...p, price: e.target.value }))}
                        className="bg-transparent border-b-2 border-border focus:border-gold rounded-none px-0 h-12 text-lg font-sans font-black"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gold italic">Boutique Domain</label>
                      <select 
                        required
                        value={formData.category} 
                        onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                        className="w-full bg-transparent border-b-2 border-border focus:border-gold rounded-none px-0 h-12 outline-none text-sm font-sans cursor-pointer text-foreground"
                      >
                        <option value="" disabled className="bg-background">Select Classification</option>
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat} className="bg-background">{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gold italic">The Narrative</label>
                    <textarea 
                      rows={4}
                      required
                      value={formData.description} 
                      onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                      className="w-full bg-transparent border-b-2 border-border focus:border-gold outline-none text-sm md:text-base font-sans font-light leading-relaxed resize-none p-0"
                      placeholder="Narrate the craftsmanship behind this masterpiece..."
                    />
                  </div>
                </div>

                {/* Configuration & Media */}
                <div className="space-y-10">
                  <div className="flex items-center gap-4 border-b border-border pb-4">
                    <Layers className="text-gold" size={20} />
                    <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-foreground">Visuals & State</h3>
                  </div>

                  <ImageUploader 
                    currentImageUrl={formData.imageUrl}
                    onUploadComplete={(url) => setFormData(p => ({ ...p, imageUrl: url }))}
                    onRemove={() => setFormData(p => ({ ...p, imageUrl: '' }))}
                    label="Featured Aesthetic"
                  />

                  <div className="flex items-center justify-between p-6 md:p-8 bg-accent/30 rounded-3xl border border-border group transition-all hover:bg-card">
                    <div className="space-y-2">
                      <p className="text-[12px] font-black uppercase tracking-[0.2em] text-foreground">Availability Pulse</p>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground italic">Determine visibility to the global clientele</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, inStock: !p.inStock }))}
                      className={`
                        relative w-16 h-8 rounded-full p-1.5 transition-all duration-500 shadow-inner
                        ${formData.inStock ? 'bg-gold shadow-gold/20' : 'bg-muted'}
                      `}
                    >
                      <div className={`
                        w-5 h-5 bg-white rounded-full shadow-lg transition-all duration-500 ease-in-out transform
                        ${formData.inStock ? 'translate-x-8 scale-110' : 'translate-x-0 scale-90'}
                      `} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <DialogFooter className="p-8 md:p-12 border-t border-border bg-card/50 flex flex-col md:flex-row gap-4 items-center">
              <Button type="button" variant="ghost" onClick={() => setIsAdding(false)} className="order-2 md:order-1 uppercase text-[10px] tracking-[0.4em] font-black w-full md:w-auto h-14 !rounded-2xl">Dismiss</Button>
              <Button type="submit" form="product-form" disabled={submitting} className="order-1 md:order-2 wa-button !rounded-2xl px-12 h-14 w-full md:w-auto text-xs font-black uppercase tracking-[0.3em] shadow-luxury">
                {submitting ? <Loader2 className="animate-spin" /> : 'Finalize Disclosure'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Bar */}
      <div className="bg-card p-4 md:p-6 rounded-[2rem] border border-border flex flex-col lg:flex-row gap-6 items-center justify-between shadow-sm transition-all hover:shadow-md">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto flex-1">
          <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input placeholder="Trace your curated collection..." className="pl-14 text-xs py-2 h-12 rounded-2xl bg-background border-border focus:border-gold transition-all" />
          </div>
          <Button variant="outline" className="w-full md:w-auto h-12 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border-border hover:bg-gold/10 hover:text-gold transition-all">
            <Filter size={16} className="mr-2" /> All Disciplines
          </Button>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] px-6 py-2 bg-background rounded-full border border-border">
           <span className="text-gold font-black">{items.length}</span> Active Disclosures
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
        {items.map((p) => (
          <div key={p.id} className="group bg-card rounded-[2.5rem] overflow-hidden border border-border shadow-sm hover:shadow-2xl hover:border-gold/30 transition-all duration-700 h-full flex flex-col">
            <div className="aspect-[4/5] relative overflow-hidden bg-muted">
              <img 
                src={p.images[0]} 
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1500ms]"
                alt={p.name} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-x-6 bottom-6 flex items-center gap-3 translate-y-20 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                <Button className="flex-1 bg-background/80 backdrop-blur-md text-foreground text-[10px] font-black uppercase tracking-[0.2em] border border-border h-12 rounded-2xl hover:bg-primary hover:text-primary-foreground transform active:scale-95 transition-all">
                  <Edit size={16} className="mr-2" /> Refine
                </Button>
                <Button 
                  onClick={() => handleDelete(p.id)}
                  className="aspect-square p-0 w-12 flex items-center justify-center bg-rose/10 backdrop-blur-md text-rose h-12 rounded-2xl hover:bg-rose hover:text-white transform active:scale-95 transition-all border border-rose/20"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
              
              {!p.inStock && (
                <div className="absolute top-6 left-6 bg-background/80 backdrop-blur-md text-foreground text-[8px] font-black uppercase tracking-[0.4em] px-4 py-2 rounded-full shadow-2xl border border-border">
                  Private Inventory
                </div>
              )}
            </div>
            
            <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gold" />
                  <span className="text-[9px] uppercase tracking-[0.4em] text-gold font-black">
                    {p.category || 'Luxury Piece'}
                  </span>
                </div>
                <h4 className="text-xl md:text-2xl font-serif text-foreground italic tracking-tight line-clamp-1 py-1">{p.name}</h4>
                <p className="text-xl md:text-2xl font-sans font-black text-foreground">₹ {p.price.toLocaleString()}</p>
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
                 <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full shadow-sm ${p.inStock ? 'bg-green-500 shadow-green-500/50' : 'bg-muted-foreground shadow-muted-foreground/50'}`} />
                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">
                      {p.inStock ? 'Available' : 'Reserved'}
                    </span>
                 </div>
                 <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold hover:bg-gold/5 transition-all duration-300">
                    <ExternalLink size={16} />
                 </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {items.length === 0 && !loading && (
          <div className="col-span-full py-40 text-center space-y-10 border-2 border-dashed border-border rounded-[3rem] bg-accent/5">
             <div className="w-24 h-24 md:w-32 md:h-32 bg-gold/10 rounded-full flex items-center justify-center mx-auto border border-gold/20 relative group hover:scale-110 transition-transform duration-700">
                <ShoppingBag className="text-gold animate-pulse" size={48} />
                <div className="absolute inset-0 bg-gold/10 rounded-full animate-ping opacity-10" />
             </div>
             <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-serif text-foreground italic">A Canvas Awaiting Soul</h3>
                <p className="text-muted-foreground text-sm md:text-base font-sans italic max-w-sm mx-auto leading-relaxed">Your digital atelier awaits its first masterpiece. Begin the journey of creation today.</p>
             </div>
             <Button onClick={() => setIsAdding(true)} className="wa-button !rounded-2xl px-16 h-16 text-sm font-black uppercase tracking-widest shadow-luxury transform hover:scale-105 active:scale-95 transition-all">
                Commence Disclosure <ChevronRight size={20} className="ml-2" />
             </Button>
          </div>
        )}

        {loading && (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] bg-card/50 animate-pulse rounded-[3rem] border border-border" />
          ))
        )}
      </div>
    </div>
  );
}
