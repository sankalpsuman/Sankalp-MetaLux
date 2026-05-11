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
  Loader2
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

export default function DashboardProducts() {
  const { profile } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
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
    fetchProducts();
  }, [profile]);

  async function fetchProducts() {
    if (!profile?.storeId) return;
    const data = await productService.getProductsByStore(profile.storeId);
    setProducts(data);
    setLoading(false);
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.storeId) return;
    
    setSubmitting(true);
    try {
      await productService.createProduct({
        storeId: profile.storeId,
        name: formData.name,
        price: Number(formData.price),
        description: formData.description,
        category: formData.category,
        images: [formData.imageUrl], // Simple single image for now
        inStock: formData.inStock,
        isFeatured: false,
        currency: 'INR'
      });
      
      setIsAdding(false);
      setFormData({ name: '', price: '', description: '', category: '', imageUrl: '', inStock: true });
      fetchProducts();
      toast.success(`${formData.name} has been added to your collection.`);
    } catch (err) {
      toast.error('Failed to add product. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await productService.deleteProduct(id);
      fetchProducts();
      toast.success('Product removed from inventory.');
    } catch (err) {
      toast.error('Failed to delete product.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-serif text-ink tracking-tight">The Collection</h1>
          <p className="text-gray-400 font-sans text-sm mt-1 uppercase tracking-widest font-bold">Manage your boutique's luxury inventory</p>
        </div>
        
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            <Button className="wa-button !py-2 h-10 px-8 rounded-full">
              <Plus size={16} /> New Addition
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-[2rem] p-8 border-none shadow-2xl glass-card">
            <DialogHeader>
              <DialogTitle className="text-3xl font-serif italic text-ink">Boutique Addition</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-6 pt-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gold italic">Product Name</label>
                <Input 
                  required
                  placeholder="e.g. Vintage Silk Saree" 
                  value={formData.name} 
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  className="bg-transparent border-b-2 border-gold/20 focus:border-gold rounded-none px-0"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold italic">Price (₹)</label>
                  <Input 
                    required
                    type="number"
                    placeholder="25000" 
                    value={formData.price} 
                    onChange={e => setFormData(p => ({ ...p, price: e.target.value }))}
                    className="bg-transparent border-b-2 border-gold/20 focus:border-gold rounded-none px-0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold italic">Category</label>
                  <Input 
                    placeholder="Saree" 
                    value={formData.category} 
                    onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                    className="bg-transparent border-b-2 border-gold/20 focus:border-gold rounded-none px-0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gold italic">Image URL</label>
                <div className="flex gap-2">
                  <Input 
                    required
                    placeholder="https://images.unsplash.com/..." 
                    value={formData.imageUrl} 
                    onChange={e => setFormData(p => ({ ...p, imageUrl: e.target.value }))}
                    className="bg-transparent border-b-2 border-gold/20 focus:border-gold rounded-none px-0 flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gold italic">Description</label>
                <textarea 
                  rows={2}
                  value={formData.description} 
                  onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                  className="w-full bg-transparent border-b-2 border-gold/20 focus:border-gold outline-none text-sm font-sans"
                  placeholder="The story behind this piece..."
                />
              </div>
              <DialogFooter className="pt-6">
                <Button type="button" variant="ghost" onClick={() => setIsAdding(false)} className="uppercase text-[10px] tracking-widest font-black">Cancel</Button>
                <Button type="submit" disabled={submitting} className="wa-button !rounded-full px-10">
                  {submitting ? <Loader2 className="animate-spin" /> : 'Disclose Product'}
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
            <Input placeholder="Filter inventory..." className="pl-10 text-xs py-1 h-9 rounded-full bg-gray-50 border-none" />
          </div>
          <Button variant="outline" className="h-9 rounded-full text-[10px] uppercase tracking-widest font-bold border-gray-200">
            <Filter size={14} className="mr-2" /> Categories
          </Button>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
           Showing {products.length} Items
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((p) => (
          <div key={p.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="aspect-[3/4] relative overflow-hidden">
              <img 
                src={p.images[0] || "https://images.unsplash.com/photo-1539109132314-d11930d82d13?mxw=800&q=80"} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                alt="" 
              />
              <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button variant="secondary" size="icon" className="rounded-full h-10 w-10 hover:bg-gold hover:text-white transition-colors">
                  <Edit size={16} />
                </Button>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  onClick={() => handleDelete(p.id)}
                  className="rounded-full h-10 w-10 hover:bg-rose hover:text-white transition-colors"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
              {!p.inStock && (
                <div className="absolute top-4 right-4 bg-rose text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-lg">
                  Out of Stock
                </div>
              )}
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-gold font-black mb-1">{p.category || 'Luxury Item'}</p>
                  <h4 className="text-sm font-bold text-ink uppercase tracking-tight line-clamp-1">{p.name}</h4>
                </div>
                <p className="text-sm font-sans font-bold text-ink">₹ {p.price.toLocaleString()}</p>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                 <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${p.inStock ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{p.inStock ? 'Available' : 'Inventory Locked'}</span>
                 </div>
                 <button className="text-gray-400 hover:text-gold transition-colors">
                    <ExternalLink size={14} />
                 </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {products.length === 0 && !loading && (
          <div className="col-span-full py-32 text-center space-y-6">
             <div className="w-24 h-24 bg-gold/5 rounded-full flex items-center justify-center mx-auto border-2 border-dashed border-gold/20">
                <Plus className="text-gold/40" size={32} />
             </div>
             <div className="space-y-2">
                <h3 className="text-2xl font-serif text-ink italic">Empty Boutique</h3>
                <p className="text-gray-400 text-sm font-sans">Begin your journey by adding your first masterpiece.</p>
             </div>
             <Button onClick={() => setIsAdding(true)} className="wa-button !rounded-full px-12">Disclose First Product</Button>
          </div>
        )}

        {loading && (
          [1,2,3,4].map(i => (
            <div key={i} className="aspect-[3/4] bg-gray-100 animate-pulse rounded-3xl" />
          ))
        )}
      </div>
    </div>
  );
}
