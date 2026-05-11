import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cloudinaryService } from '../services/cloudinaryService';
import { toast } from 'sonner';

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
  onRemove: () => void;
  currentImageUrl?: string;
  label?: string;
  folder?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onUploadComplete, 
  onRemove, 
  currentImageUrl, 
  label = "Upload Image",
  folder = "products"
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Only JPG, PNG and WEBP formats are allowed.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB.');
      return;
    }

    try {
      setIsUploading(true);
      setProgress(0);
      const response = await cloudinaryService.uploadImage(file, folder, (p) => {
        setProgress(p);
      });
      onUploadComplete(response.secure_url);
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message);
      // Automatically switch to manual if it's a configuration error
      if (error.message.includes('not configured')) {
        setIsManual(true);
      }
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  const handleManualSubmit = () => {
    if (manualUrl.trim()) {
      onUploadComplete(manualUrl.trim());
      setIsManual(false);
      setManualUrl('');
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gold italic">{label}</label>
        {!currentImageUrl && !isUploading && (
          <button 
            type="button"
            onClick={() => setIsManual(!isManual)}
            className="text-[8px] font-bold uppercase tracking-widest text-gold/60 hover:text-gold transition-colors"
          >
            {isManual ? 'Use Uploader' : 'Paste URL Instead'}
          </button>
        )}
      </div>

      {isManual ? (
        <div className="space-y-2 p-4 bg-gold/5 rounded-2xl border border-gold/20">
          <input 
            type="url"
            placeholder="https://images.unsplash.com/photo-..."
            className="w-full bg-transparent border-b border-gold/30 focus:border-gold outline-none py-2 text-xs font-sans"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
          />
          <div className="flex justify-end gap-2 mt-2">
            <button 
              type="button" 
              onClick={() => setIsManual(false)}
              className="px-3 py-1 text-[8px] font-black uppercase tracking-widest text-gold/60"
            >
              Cancel
            </button>
            <button 
              type="button" 
              onClick={handleManualSubmit}
              className="px-3 py-1 bg-gold text-white rounded-full text-[8px] font-black uppercase tracking-widest"
            >
              Apply URL
            </button>
          </div>
        </div>
      ) : currentImageUrl ? (
        <div className="relative group aspect-video rounded-xl overflow-hidden border border-gold/20 shadow-sm">
          <img 
            src={currentImageUrl} 
            alt="Preview" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <button 
              type="button"
              onClick={triggerUpload}
              className="p-2 bg-white rounded-full text-ink hover:bg-gold hover:text-white transition-all transform scale-90 group-hover:scale-100"
              title="Replace Image"
            >
              <Upload size={18} />
            </button>
            <button 
              type="button"
              onClick={onRemove}
              className="p-2 bg-white rounded-full text-rose hover:bg-rose hover:text-white transition-all transform scale-90 group-hover:scale-100"
              title="Remove Image"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={triggerUpload}
          className={`
            border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 cursor-pointer transition-all
            ${isUploading ? 'border-gold bg-gold/5' : 'border-gold/20 hover:border-gold hover:bg-gold/5'}
          `}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Loader2 className="animate-spin text-gold" size={32} />
                <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-gold">
                  {progress}%
                </span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gold">Uploading Masterpiece...</p>
              <div className="w-32 h-1 bg-gold/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gold transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-gold/40">
              <div className="w-12 h-12 rounded-full bg-gold/5 flex items-center justify-center mb-2">
                <ImageIcon size={24} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest">Disclose Visual Asset</p>
              <p className="text-[8px] uppercase tracking-widest opacity-60 italic">JPG, PNG or WEBP (Max 5MB)</p>
            </div>
          )}
        </div>
      )}
      
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden" 
        accept="image/jpeg,image/png,image/webp"
      />
    </div>
  );
};
