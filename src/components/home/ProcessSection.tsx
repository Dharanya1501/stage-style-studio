import { motion } from 'framer-motion';
import { MessageSquare, PenTool, Hammer, PartyPopper } from 'lucide-react';

const steps = [
  { icon: MessageSquare, title: 'Consultation', desc: 'We listen to your vision, preferences, and event requirements.' },
  { icon: PenTool, title: 'Concept & Design', desc: 'Our designers create a bespoke concept and mood board for your approval.' },
  { icon: Hammer, title: 'Setup & Styling', desc: 'Our team handles all logistics, setup, and final styling on-site.' },
  { icon: PartyPopper, title: 'Event Day Magic', desc: 'Sit back and enjoy your perfectly styled event — we handle the rest.' },
];

const ProcessSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2 font-medium">How It Works</p>
        <h2 className="font-display text-4xl font-bold text-foreground">Our Process</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connecting line (desktop only) */}
        <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-border" />
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center relative"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-5 relative z-10 bg-background">
              <step.icon className="w-8 h-8 text-primary" />
            </div>
            <span className="text-xs font-medium text-primary tracking-wider uppercase">Step {i + 1}</span>
            <h3 className="font-display text-lg font-semibold mt-1 mb-2 text-foreground">{step.title}</h3>
            <p className="text-muted-foreground text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSection;
