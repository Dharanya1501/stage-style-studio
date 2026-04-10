import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

const QuoteForm = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    setLoading(true);

    const name = (form.elements.namedItem('from_name') as HTMLInputElement).value;
    const mobile = (form.elements.namedItem('mobile_number') as HTMLInputElement).value;
    const event = (form.elements.namedItem('event_type') as HTMLSelectElement).value;
    const date = (form.elements.namedItem('event_date') as HTMLInputElement).value;
    const budget = (form.elements.namedItem('budget_range') as HTMLSelectElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    const text = `Hello I have a quote request:\nName: ${name}\nMobile: +91${mobile}\nEvent: ${event}\nDate: ${date}\nBudget: ${budget}\nMessage: ${message}`;
    const whatsappUrl = `https://wa.me/917538817674?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, '_blank');

    setSubmitted(true);
    form.reset();
    setLoading(false);
    toast({ title: 'Quote Request Submitted!', description: 'Redirecting you to WhatsApp...' });
  };

  return (
    <section id="quote-form" className="py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2">Get Started</p>
          <h2 className="font-display text-3xl font-bold">Request a Custom Quote</h2>
        </div>
        {submitted ? (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <p className="text-primary text-lg font-semibold mb-2">Thank you!</p>
            <p className="text-muted-foreground">Our design team will contact you within 24 hours.</p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-lg p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="from_name" placeholder="Your Name" required className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
              <div className="flex gap-2">
                <span className="inline-flex items-center px-3 bg-muted border border-border rounded-md text-sm text-foreground whitespace-nowrap">+91</span>
                <input name="mobile_number" type="tel" placeholder="Mobile Number" required pattern="[0-9]{10}" maxLength={10} title="Please enter a valid 10-digit mobile number" className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select name="event_type" required className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
                <option value="">Event Type</option>
                <option>Wedding</option>
                <option>Corporate Event</option>
                <option>Birthday / Party</option>
                <option>Festival / Concert</option>
                <option>Fashion Show</option>
                <option>Other</option>
              </select>
              <input name="event_date" type="date" required className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <select name="budget_range" required className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
              <option value="">Budget Range</option>
              <option>₹5,000 – ₹10,000</option>
              <option>₹10,000 – ₹25,000</option>
              <option>₹25,000 – ₹50,000</option>
              <option>₹50,000 – ₹1,00,000</option>
              <option>₹1,00,000 – ₹2,50,000</option>
              <option>₹2,50,000 and above</option>
            </select>
            <textarea name="message" placeholder="Describe your vision, theme, and any specific requirements..." rows={5} required className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
            <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-gold text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50">
              {loading ? 'Redirecting...' : 'Submit Quote Request'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default QuoteForm;
