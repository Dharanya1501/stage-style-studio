import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection = () => (
  <section className="py-24 bg-secondary">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2 font-medium">Get in Touch</p>
        <h2 className="font-display text-4xl font-bold text-foreground">Contact Us</h2>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
      >
        {[
          { icon: Phone, label: 'Call Us', value: '+1 (555) 123-4567' },
          { icon: Mail, label: 'Email Us', value: 'hello@luxestage.com' },
          { icon: MapPin, label: 'Visit Us', value: '123 Design Ave, New York' },
        ].map(item => (
          <div key={item.label} className="flex flex-col items-center text-center p-6 bg-card border border-border rounded-lg">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1">{item.label}</h3>
            <p className="text-muted-foreground text-sm">{item.value}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ContactSection;
