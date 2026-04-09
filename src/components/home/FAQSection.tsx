import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  { q: 'How far in advance should I book?', a: 'You can book our services anytime—even a day before your event. We strive to accommodate last-minute requests based on availability, while advance booking is recommended for better planning and customization.' },
  { q: 'Do you offer setup and teardown services?', a: 'Yes! Our team handles full setup and teardown so you can focus on enjoying your event.' },
  { q: 'Can I customize the decor to match a specific theme?', a: 'Absolutely. We specialize in bespoke, theme-driven designs tailored to your vision and preferences.' },
  { q: 'What areas do you serve?', a: 'We provide our services all over Tamil Nadu. Contact us for more details and availability in your location.' },
  { q: 'Do you offer rental services?', a: 'Yes, we offer a wide range of rental items including furniture, lighting, backdrops, and staging equipment.' },
];

const FAQSection = () => (
  <section id="faq" className="py-24">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="text-center mb-16">
        <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2 font-medium">Questions</p>
        <h2 className="font-display text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-6 bg-card">
            <AccordionTrigger className="font-display text-left font-semibold text-foreground hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
