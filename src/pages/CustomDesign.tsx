import { motion, AnimatePresence } from 'framer-motion';
import { portfolioItems } from '@/data/products';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';

const steps = [
  { num: '01', title: 'Consultation', desc: 'Share your vision, event details, and preferences in a free consultation call.' },
  { num: '02', title: 'Design Concept', desc: 'We create detailed mood boards and 3D renders of your custom stage design.' },
  { num: '03', title: 'Production', desc: 'Our team crafts every element with premium materials and meticulous attention.' },
  { num: '04', title: 'Setup & Styling', desc: 'We handle complete on-site installation and final styling on event day.' },
];

const CustomDesign = () => {
  const location = useLocation();
  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string } | null>(null);

  return (
    <main className="pt-20 min-h-screen">
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <Link to="/#services" className="inline-flex items-center gap-2 text-primary hover:underline mb-4 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2">Bespoke Creations</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Custom Backdrop & Stage Design</h1>
          <p className="text-muted-foreground max-w-2xl">From intimate celebrations to grand productions — we design and build stage environments that tell your story.</p>
        </div>
      </section>

      {backdropItems.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2">Featured Work</p>
              <h2 className="font-display text-3xl font-bold">Custom Backdrop Gallery</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {backdropItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setLightboxImg({ src: item.image, title: item.title })}
                >
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
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
      )}

      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-16">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <span className="text-5xl font-display font-bold text-primary/20">{step.num}</span>
                <h3 className="font-display text-xl font-semibold mt-2 mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <QuoteForm />

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

export default CustomDesign;
