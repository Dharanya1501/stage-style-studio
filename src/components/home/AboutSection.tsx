import { motion } from 'framer-motion';

const AboutSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="aspect-[4/3] rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80"
              alt="Our team styling an event"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2 font-medium">About Us</p>
          <h2 className="font-display text-4xl font-bold mb-6 text-foreground">Creating Unforgettable Moments</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            With over a decade of experience, we specialize in transforming ordinary spaces into extraordinary experiences. Our team of passionate designers brings creativity, meticulous attention to detail, and personalized service to every event we touch.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            From intimate private celebrations to grand corporate galas, we believe every occasion deserves a setting that tells a story — your story, beautifully crafted and flawlessly executed.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: '500+', label: 'Events Styled' },
              { value: '10+', label: 'Years Experience' },
              { value: '200+', label: 'Happy Clients' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
