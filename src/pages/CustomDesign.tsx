import { motion } from 'framer-motion';
import { portfolioItems } from '@/data/products';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const steps = [
  { num: '01', title: 'Consultation', desc: 'Share your vision, event details, and preferences in a free consultation call.' },
  { num: '02', title: 'Design Concept', desc: 'We create detailed mood boards and 3D renders of your custom stage design.' },
  { num: '03', title: 'Production', desc: 'Our team crafts every element with premium materials and meticulous attention.' },
  { num: '04', title: 'Setup & Styling', desc: 'We handle complete on-site installation and final styling on event day.' },
];

const CustomDesign = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Quote Request Sent!', description: 'Our design team will contact you within 48 hours.' });
    setSubmitted(true);
  };

  return (
    <main className="pt-20 min-h-screen">
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2">Bespoke Creations</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Custom Stage Design</h1>
          <p className="text-muted-foreground max-w-2xl">From intimate celebrations to grand productions — we design and build stage environments that tell your story.</p>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
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

      {/* Portfolio */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2">Our Work</p>
            <h2 className="font-display text-3xl font-bold">Portfolio</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[4/3] rounded-lg overflow-hidden"
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <p className="text-primary text-xs uppercase tracking-wider">{item.category}</p>
                    <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                    <p className="text-foreground/70 text-sm">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2">Get Started</p>
            <h2 className="font-display text-3xl font-bold">Request a Custom Quote</h2>
          </div>
          {submitted ? (
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <p className="text-primary text-lg font-semibold mb-2">Thank you!</p>
              <p className="text-muted-foreground">Our design team will contact you within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-lg p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input placeholder="Your Name" required className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                <input type="email" placeholder="Email" required className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select required className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
                  <option value="">Event Type</option>
                  <option>Wedding</option>
                  <option>Corporate Event</option>
                  <option>Birthday / Party</option>
                  <option>Festival / Concert</option>
                  <option>Fashion Show</option>
                  <option>Other</option>
                </select>
                <input type="date" required className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <select required className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
                <option value="">Budget Range</option>
                <option>Under $1,000</option>
                <option>$1,000 - $5,000</option>
                <option>$5,000 - $15,000</option>
                <option>$15,000 - $50,000</option>
                <option>$50,000+</option>
              </select>
              <textarea placeholder="Describe your vision, theme, and any specific requirements..." rows={5} required className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
              <button type="submit" className="w-full py-3 bg-gradient-gold text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity">
                Submit Quote Request
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default CustomDesign;
