import { motion } from 'framer-motion';
import { Heart, Building2, Cake, Flower2, Frame } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  { icon: Heart, title: 'Wedding Decor', desc: 'Romantic and elegant designs for your special day.', link: '/products' },
  { icon: Building2, title: 'Corporate Event Styling', desc: 'Professional setups for galas, launches, and conferences.', link: '/products' },
  { icon: Cake, title: 'Birthday & Private Parties', desc: 'Fun, themed, and luxury celebrations for every age.', link: '/products' },
  { icon: Flower2, title: 'Floral Installations', desc: 'Stunning floral arches, walls, and centerpieces.', link: '/products' },
  { icon: Frame, title: 'Custom Backdrops & Stage Design', desc: 'Bespoke stage concepts tailored to your vision.', link: '/custom-design' },
];

const ServicesSection = () => (
  <section id="services" className="py-24 bg-secondary">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2 font-medium">What We Do</p>
        <h2 className="font-display text-4xl font-bold text-foreground">Our Services</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {services.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={item.link}
              className="flex flex-col items-center text-center p-8 bg-card border border-border rounded-lg hover:border-primary/30 hover:shadow-lg transition-all group h-full"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
