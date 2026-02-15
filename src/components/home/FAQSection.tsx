import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  { q: 'How far in advance should I book?', a: 'We recommend booking at least 4–6 weeks in advance for standard events, and 3–6 months for weddings and large-scale productions.' },
  { q: 'Do you offer setup and teardown services?', a: 'Yes! Our team handles full setup and teardown so you can focus on enjoying your event.' },
  { q: 'Can I customize the decor to match a specific theme?', a: 'Absolutely. We specialize in bespoke, theme-driven designs tailored to your vision and preferences.' },
  { q: 'What areas do you serve?', a: 'We primarily serve the tri-state area but are available for destination events nationwide. Contact us for details.' },
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
