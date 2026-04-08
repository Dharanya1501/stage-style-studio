import { motion } from 'framer-motion';

const CTASection = () => (
  <section className="relative py-24 overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=80)' }}
    />
    <div className="absolute inset-0 bg-background/80" />
    <div className="relative z-10 container mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
          Let's Create Something <span className="text-gradient-gold">Beautiful Together</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
          Ready to transform your next event into an unforgettable experience? Let's talk.
        </p>
        <a
          href="/custom-design#quote-form"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/custom-design#quote-form';
          }}
          className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-gold text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity text-lg"
        >
          Get a Quote
        </a>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
