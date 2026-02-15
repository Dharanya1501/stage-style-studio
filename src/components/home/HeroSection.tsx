import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80)' }}
    />
    <div className="absolute inset-0 bg-background/60" />
    <div className="relative z-10 container mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4 font-medium">Luxury Event Decor</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight text-foreground">
          Transforming Moments into <br />
          <span className="text-gradient-gold">Magical Experiences</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Luxury Event Decor for Weddings, Corporate Events & Private Celebrations
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-gold text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity"
          >
            View Portfolio
          </Link>
          <Link
            to="/custom-design"
            className="inline-flex items-center gap-2 px-8 py-3 border border-primary/40 text-foreground font-semibold rounded-md hover:bg-primary/10 transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
