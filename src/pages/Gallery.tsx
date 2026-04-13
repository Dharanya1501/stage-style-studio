import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn, LogOut, ArrowLeft } from 'lucide-react';
import { portfolioItems } from '@/data/products';
import { supabase } from '@/integrations/supabase/client';
import { useAdmin } from '@/hooks/useAdmin';
import GalleryUpload from '@/components/GalleryUpload';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

interface GalleryImage {
  id: string;
  image_url: string;
  title: string;
  category: string;
}

const Gallery = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string } | null>(null);
  const [dbImages, setDbImages] = useState<GalleryImage[]>([]);
  const { isAdmin, user } = useAdmin();

  const fetchImages = useCallback(async () => {
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setDbImages(data as GalleryImage[]);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Combine static + DB images
  const allItems = [
    ...dbImages.map((img, i) => ({
      id: img.id,
      image: img.image_url,
      title: img.title,
      category: img.category,
      isDb: true,
    })),
    ...portfolioItems.map(item => ({ ...item, image: item.image, isDb: false })),
  ];

  const allCategories = ['All', ...Array.from(new Set(allItems.map(item => item.category)))];

  const filtered = selectedCategory === 'All'
    ? allItems
    : allItems.filter(item => item.category === selectedCategory);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <main className="pt-20 min-h-screen">
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/#portfolio')} className="mb-4 -ml-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2">Our Work</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Full Gallery</h1>
          <p className="text-muted-foreground max-w-2xl">Browse our complete collection across all service categories.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Admin controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {allCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {isAdmin && <GalleryUpload onUploaded={fetchImages} />}
              {!user ? (
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/admin-login"><LogIn className="w-4 h-4 mr-1" /> Admin</Link>
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-1" /> Logout
                </Button>
              )}
            </div>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="break-inside-avoid group relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setLightboxImg({ src: item.image, title: item.title })}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  style={{ aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '4/3' : '1/1' }}
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-colors duration-300 flex items-end">
                  <div className="p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs font-medium tracking-wider uppercase text-primary-foreground/80">{item.category}</p>
                    <h3 className="font-display text-lg font-semibold text-primary-foreground">{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxImg(null)}
          >
            <button className="absolute top-4 right-4 text-white/80 hover:text-white z-10" onClick={() => setLightboxImg(null)} aria-label="Close">
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightboxImg.src}
              alt={lightboxImg.title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Gallery;
