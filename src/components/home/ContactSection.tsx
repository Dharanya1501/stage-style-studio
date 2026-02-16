import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection = () => (
  <section id="contact" className="py-24 bg-secondary">
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
          { icon: Phone, label: 'Call Us', value: '9611519412', href: 'tel:9611519412' },
          { icon: Mail, label: 'Email Us', value: 'Kovaicartoonentertainers@gmail.com', href: 'mailto:Kovaicartoonentertainers@gmail.com' },
          { icon: MapPin, label: 'Visit Us', value: 'Kavundampalyam office, Coimbatore 641030', href: 'https://maps.google.com/?q=Kavundampalyam+Coimbatore+641030' },
        ].map(item => (
          <div key={item.label} className="flex flex-col items-center text-center p-8 bg-card border border-border rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2 text-lg">{item.label}</h3>
            {item.href ? (
              <a href={item.href} className="text-primary font-medium text-sm break-all hover:underline">{item.value}</a>
            ) : (
              <p className="text-muted-foreground text-sm">{item.value}</p>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ContactSection;
