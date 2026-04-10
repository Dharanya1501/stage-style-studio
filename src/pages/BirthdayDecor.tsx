import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';

const images = [
  { src: '/images/birthday-decor-1.webp', title: 'Creative Birthday Decoration Setup' },
  { src: '/images/birthday-decor-2.webp', title: 'Rainbow Balloon Birthday Stage' },
  { src: '/images/birthday-decor-3.webp', title: 'Unicorn Theme Birthday Party' },
  { src: '/images/birthday-decor-4.webp', title: 'Butterfly Theme Birthday Decor' },
  { src: '/images/birthday-decor-5.webp', title: 'Safari Jungle Birthday Theme' },
  { src: '/images/birthday-decor-6.webp', title: 'Princess Pink Birthday Setup' },
  { src: '/images/birthday-decor-7.webp', title: 'Cocomelon Theme Birthday Party' },
  { src: '/images/birthday-decor-8.webp', title: 'Wild Safari Birthday Celebration' },
  { src: '/images/birthday-decor-9.webp', title: 'Butterfly Garden Birthday' },
  { src: '/images/birthday-decor-10.webp', title: 'Jungle Friends Birthday Stage' },
];

const BirthdayDecor = () => {
  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string } | null>(null);

  return (
    <>
      <main className="pt-20">
        {/* Hero Banner */}
        <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
          <img
            src="/images/birthday-decor-1.webp"
            alt="Birthday Decor Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4"
            >
              Birthday & Party Decor
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-primary-foreground/80 text-lg max-w-2xl"
            >
              Fun, themed, and luxury celebrations crafted for every age and occasion
            </motion.p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <Link
            to="/#services"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>

          {/* Description */}
          <div className="max-w-3xl mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Making Every Birthday Magical</h2>
            <p className="text-muted-foreground leading-relaxed">
              From enchanting first birthday themes to grand milestone celebrations, we create stunning birthday
              decorations that bring your vision to life. Our themed setups include balloon garlands, custom backdrops,
              character cutouts, neon signs, and elaborate stage designs. Whether it's a jungle safari, butterfly garden,
              princess party, or cartoon-themed celebration — every detail is crafted with love and creativity.
            </p>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setLightboxImg(img)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-end">
                  <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-display text-lg font-semibold text-primary-foreground">{img.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <QuoteForm />
      </main>

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
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
              onClick={() => setLightboxImg(null)}
              aria-label="Close"
            >
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
    </>
  );
};

export default BirthdayDecor;
