import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from '@/data/products';

const TestimonialsSection = () => (
  <section id="testimonials" className="py-24 bg-secondary">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2 font-medium">Client Love</p>
        <h2 className="font-display text-4xl font-bold text-foreground">What Our Clients Say</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="p-8 bg-card border border-border rounded-lg"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-display font-bold text-primary text-sm">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-display font-semibold text-foreground">{t.name}</p>
                <p className="text-muted-foreground text-sm">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
