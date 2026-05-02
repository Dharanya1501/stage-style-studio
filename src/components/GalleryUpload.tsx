import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Upload, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Must mirror the Full Gallery section order (excluding "All").
export const GALLERY_CATEGORIES = [
  'Wedding',
  'Engagement',
  'Haldi',
  'Birthday',
  'Custom Backdrop',
  'Baby Shower',
  'Naming Ceremony',
  'Others',
];

interface GalleryUploadProps {
  onUploaded: () => void;
}

const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1] || '');
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const GalleryUpload = ({ onUploaded }: GalleryUploadProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [generatingTitle, setGeneratingTitle] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const generateTitle = async (selectedFile: File, selectedCategory: string) => {
    try {
      setGeneratingTitle(true);
      const imageBase64 = await fileToBase64(selectedFile);
      const { data, error } = await supabase.functions.invoke('generate-image-title', {
        body: { imageBase64, mimeType: selectedFile.type, category: selectedCategory },
      });
      if (error) throw error;
      if (data?.title) {
        setTitle(data.title);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Could not generate title';
      toast({ title: 'Auto-title failed', description: msg, variant: 'destructive' });
    } finally {
      setGeneratingTitle(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    if (!title) {
      await generateTitle(f, category);
    }
  };

  const handleCategoryChange = async (value: string) => {
    setCategory(value);
    if (file && !title) {
      await generateTitle(file, value);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    if (!category) {
      toast({ title: 'Please select a category', variant: 'destructive' });
      return;
    }
    setUploading(true);

    const ext = file.name.split('.').pop();
    const path = `${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage.from('gallery').upload(path, file);
    if (uploadError) {
      toast({ title: 'Upload failed', description: uploadError.message, variant: 'destructive' });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(path);

    const { error: dbError } = await supabase.from('gallery_images').insert({
      image_url: urlData.publicUrl,
      title: title || 'Untitled',
      category,
    });

    if (dbError) {
      toast({ title: 'Save failed', description: dbError.message, variant: 'destructive' });
    } else {
      toast({ title: 'Image added to gallery!' });
      onUploaded();
      setOpen(false);
      setTitle('');
      setCategory('');
      setFile(null);
      setPreview(null);
    }
    setUploading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Plus className="w-5 h-5" /> Add Image
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Gallery Image</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div
            className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => fileRef.current?.click()}
          >
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-md object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Upload className="w-8 h-8" />
                <p className="text-sm">Click to select an image</p>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>

          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select category (required)" />
            </SelectTrigger>
            <SelectContent>
              {GALLERY_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <label className="text-xs text-muted-foreground">Title (auto-generated, editable)</label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={!file || generatingTitle}
                onClick={() => file && generateTitle(file, category)}
                className="h-7 px-2 text-xs"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                {generatingTitle ? 'Generating…' : 'Regenerate'}
              </Button>
            </div>
            <Input
              placeholder={generatingTitle ? 'Generating title…' : 'e.g. Elegant White Wedding Setup'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <Button onClick={handleUpload} disabled={!file || !category || uploading} className="w-full">
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryUpload;
