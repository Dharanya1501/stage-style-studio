import { motion } from 'framer-motion';
import { Award, Heart, Users, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <main className="pt-20 min-h-screen">
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2">Our Story</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold">About Luxe Stage</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800" alt="Our team at work" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <h2 className="font-display text-3xl font-bold">Crafting Unforgettable Experiences Since 2014</h2>
              <p className="text-foreground/70 leading-relaxed">
                Luxe Stage was born from a passion for transforming ordinary spaces into extraordinary experiences. What started as a small decor studio has grown into a full-service stage design company serving clients across the country.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                Our team of designers, craftspeople, and event specialists work together to bring your vision to life — whether it's an intimate celebration or a grand-scale production.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-16">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Sparkles, title: 'Premium Quality', desc: 'Only the finest materials and craftsmanship in every piece.' },
              { icon: Heart, title: 'Passionate Team', desc: 'Designers who genuinely love creating beautiful spaces.' },
              { icon: Users, title: 'Client-First', desc: 'Your vision drives everything we do, from concept to execution.' },
              { icon: Award, title: 'Award-Winning', desc: 'Recognized for excellence in event design and staging.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-16">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: 'Alexandra Rivera', role: 'Creative Director', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
              { name: 'Marcus Chen', role: 'Lead Designer', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
              { name: 'Priya Sharma', role: 'Production Manager', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400' },
            ].map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="aspect-square rounded-full overflow-hidden w-40 mx-auto mb-4 border-2 border-primary/20">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-display font-semibold">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
