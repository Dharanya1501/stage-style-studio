import { motion } from 'framer-motion';
import { Award, Clock, Sparkles, Users } from 'lucide-react';

const reasons = [
  { icon: Sparkles, title: 'Bespoke Designs', desc: 'Every event is uniquely crafted to reflect your personal style and vision.' },
  { icon: Award, title: 'Premium Quality', desc: 'We use only the finest materials and decor elements for a flawless finish.' },
  { icon: Users, title: 'Experienced Team', desc: 'Our seasoned professionals bring creativity and precision to every project.' },
  { icon: Clock, title: 'On-Time Delivery', desc: 'We guarantee timely setup so you can enjoy a stress-free experience.' },
];

const WhyChooseUsSection = () => (
  <section id="why-choose-us" className="py-24 bg-secondary">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2 font-medium">Why Us</p>
        <h2 className="font-display text-4xl font-bold text-foreground">Why Choose Us</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {reasons.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="text-center p-6"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
            <p className="text-muted-foreground text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUsSection;
