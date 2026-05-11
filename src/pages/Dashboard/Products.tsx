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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-serif text-ink tracking-tight">Management Suite</h1>
          <p className="text-gray-400 font-sans text-sm mt-1 uppercase tracking-widest font-bold">Curate your offerings and digital inventory</p>
        </div>
        
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger
            render={<Button className="wa-button !py-2 h-10 px-8 rounded-full" />}
          >
            <Plus size={16} /> Add Offering
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] rounded-[2rem] p-8 border-none shadow-2xl bg-white/95 backdrop-blur-xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-3xl font-serif italic text-ink">Boutique Disclosure</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-8 pt-6">
              {/* Basic Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-gold/10 pb-2">
                  <Package className="text-gold" size={16} />
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink">Basic Details</h3>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold italic">Offering Name</label>
                  <Input 
                    required
                    placeholder="e.g. Signature Haircut, Vintage Saree, or Web Design" 
                    value={formData.name} 
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    className="bg-transparent border-b-2 border-gold/20 focus:border-gold rounded-none px-0"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gold italic">Price / Starting At (₹)</label>
                    <Input 
                      required
                      type="number"
                      placeholder="0.00" 
                      value={formData.price} 
                      onChange={e => setFormData(p => ({ ...p, price: e.target.value }))}
                      className="bg-transparent border-b-2 border-gold/20 focus:border-gold rounded-none px-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gold italic">Category</label>
                    <select 
                      required
                      value={formData.category} 
                      onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                      className="w-full bg-transparent border-b-2 border-gold/20 focus:border-gold rounded-none px-0 h-10 outline-none text-sm font-sans"
                    >
                      <option value="" disabled>Select Category</option>
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold italic">Description</label>
                  <textarea 
                    rows={3}
                    required
                    value={formData.description} 
                    onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                    className="w-full bg-transparent border-b-2 border-gold/20 focus:border-gold outline-none text-sm font-sans resize-none"
                    placeholder="Tell the story behind this offering..."
                  />
                </div>
              </div>

              {/* Configuration & Media */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-gold/10 pb-2">
                  <Layers className="text-gold" size={16} />
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink">Asset & Configuration</h3>
                </div>

                <ImageUploader 
                  currentImageUrl={formData.imageUrl}
                  onUploadComplete={(url) => setFormData(p => ({ ...p, imageUrl: url }))}
                  onRemove={() => setFormData(p => ({ ...p, imageUrl: '' }))}
                  label="Featured Visualization"
                />

                <div className="flex items-center justify-between p-4 bg-gold/5 rounded-2xl border border-gold/10">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-ink">Availability Status</p>
                    <p className="text-[8px] uppercase tracking-widest text-ink/40">Visible to mall visitors</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, inStock: !p.inStock }))}
                    className={`
                      relative w-12 h-6 rounded-full p-1 transition-colors duration-300
                      ${formData.inStock ? 'bg-gold' : 'bg-gray-300'}
                    `}
                  >
                    <div className={`
                      w-4 h-4 bg-white rounded-full transition-transform duration-300
                      ${formData.inStock ? 'translate-x-6' : 'translate-x-0'}
                    `} />
                  </button>
                </div>
              </div>

              <DialogFooter className="pt-6">
                <Button type="button" variant="ghost" onClick={() => setIsAdding(false)} className="uppercase text-[10px] tracking-widest font-black">Cancel</Button>
                <Button type="submit" disabled={submitting} className="wa-button !rounded-full px-10">
                  {submitting ? <Loader2 className="animate-spin" /> : 'Save Offering'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-wrap gap-4 items-center justify-between shadow-sm">
        <div className="flex items-center gap-4 flex-1 min-w-[300px]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <Input placeholder="Search your offerings..." className="pl-10 text-xs py-1 h-9 rounded-full bg-gray-50 border-none" />
          </div>
          <Button variant="outline" className="h-9 rounded-full text-[10px] uppercase tracking-widest font-bold border-gray-200">
            <Filter size={14} className="mr-2" /> All Tiers
          </Button>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
           {items.length} Offerings Disclosure
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map((p) => (
          <div key={p.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="aspect-[3/4] relative overflow-hidden">
              <img 
                src={p.images[0]} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                alt={p.name} 
              />
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2">
                  <Button variant="secondary" className="flex-1 bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest border border-gold/20 h-10 rounded-xl">
                    <Edit size={14} className="mr-2" /> Edit
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => handleDelete(p.id)}
                    className="aspect-square p-0 w-10 flex items-center justify-center bg-rose/10 backdrop-blur-md text-rose h-10 rounded-xl hover:bg-rose hover:text-white transition-all"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
              {!p.inStock && (
                <div className="absolute top-4 right-4 bg-ink/60 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-lg border border-white/10">
                  Currently Frozen
                </div>
              )}
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[8px] uppercase tracking-[0.3em] text-gold font-black px-2 py-0.5 bg-gold/5 rounded-full border border-gold/10">
                    {p.category || 'Offering'}
                  </span>
                  <h4 className="text-sm font-bold text-ink uppercase tracking-tight line-clamp-1 pt-1">{p.name}</h4>
                </div>
                <p className="text-sm font-sans font-bold text-ink">₹ {p.price.toLocaleString()}</p>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                 <div className="flex items-center gap-2">
                    {p.inStock ? 
                      <CheckCircle2 size={12} className="text-green-500" /> : 
                      <XCircle size={12} className="text-gray-300" />
                    }
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                      {p.inStock ? 'Open for Inquiry' : 'Temporarily Restricted'}
                    </span>
                 </div>
                 <button className="text-gray-400 hover:text-gold transition-colors">
                    <ExternalLink size={14} />
                 </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {items.length === 0 && !loading && (
          <div className="col-span-full py-32 text-center space-y-6">
             <div className="w-24 h-24 bg-gold/5 rounded-full flex items-center justify-center mx-auto border-2 border-dashed border-gold/20 relative group">
                <Package className="text-gold/20 group-hover:text-gold/40 transition-colors" size={32} />
                <div className="absolute inset-0 bg-gold/5 rounded-full animate-ping opacity-20" />
             </div>
             <div className="space-y-2">
                <h3 className="text-2xl font-serif text-ink italic">Management Void</h3>
                <p className="text-gray-400 text-sm font-sans italic">Your digital boutique is awaiting its first disclosure.</p>
             </div>
             <Button onClick={() => setIsAdding(true)} className="wa-button !rounded-full px-12 group">
                Disclose First Entry <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
             </Button>
          </div>
        )}

        {loading && (
          [1,2,3,4].map(i => (
            <div key={i} className="aspect-[3/4] bg-gray-100 animate-pulse rounded-[2rem] border border-gray-50" />
          ))
        )}
      </div>
    </div>
  );
}
