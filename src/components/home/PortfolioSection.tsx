import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { portfolioItems } from '@/data/products';

const PortfolioSection = () => (
  <section id="portfolio" className="py-24">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2 font-medium">Our Work</p>
        <h2 className="font-display text-4xl font-bold text-foreground">Portfolio</h2>
      </div>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {portfolioItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="break-inside-avoid group relative overflow-hidden rounded-lg cursor-pointer"
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
      <div className="text-center mt-12">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3 border border-primary/40 text-foreground font-semibold rounded-md hover:bg-primary/10 transition-colors"
        >
          See Full Gallery <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default PortfolioSection;
