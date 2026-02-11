import { motion } from 'framer-motion';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Rentals = () => {
  const rentalItems = products.filter(p => p.rentalPrice);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [showInquiry, setShowInquiry] = useState(false);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Inquiry Sent!', description: 'We\'ll get back to you within 24 hours.' });
    setShowInquiry(false);
  };

  return (
    <main className="pt-20 min-h-screen">
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2">For Your Events</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Rental Services</h1>
          <p className="text-muted-foreground max-w-2xl">Premium decor and equipment available for rent. Perfect for one-time events or when you want the best without the commitment of purchasing.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {rentalItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-colors"
              >
                <Link to={`/products/${item.id}`}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                </Link>
                <div className="p-4">
                  <h3 className="font-display font-semibold mb-1">{item.name}</h3>
                  <p className="text-primary font-bold text-lg mb-1">${item.rentalPrice} <span className="text-muted-foreground text-sm font-normal">/ event</span></p>
                  <p className="text-muted-foreground text-xs mb-3">Purchase: ${item.price}</p>
                  <button
                    onClick={() => {
                      addToCart(item, true);
                      toast({ title: 'Rental added', description: `${item.name} added as rental.` });
                    }}
                    className="w-full py-2 text-sm font-medium border border-primary/30 text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Add Rental to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Terms & Inquiry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="font-display text-2xl font-bold mb-4">Rental Terms</h2>
              <ul className="space-y-3 text-sm text-foreground/70">
                <li>• Minimum rental period: 1 event day</li>
                <li>• Delivery and setup available (additional fee)</li>
                <li>• Security deposit required at booking</li>
                <li>• Items must be returned in original condition</li>
                <li>• Cancellation accepted up to 7 days before event</li>
                <li>• Damage protection plans available</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="font-display text-2xl font-bold mb-4">Request Availability</h2>
              {!showInquiry ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Have specific items or dates in mind?</p>
                  <button onClick={() => setShowInquiry(true)} className="px-6 py-3 bg-gradient-gold text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity">
                    Send Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquiry} className="space-y-4">
                  <input placeholder="Your Name" required className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                  <input type="email" placeholder="Email" required className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                  <input type="date" required className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                  <textarea placeholder="Items you're interested in..." rows={3} className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
                  <button type="submit" className="w-full py-2.5 bg-gradient-gold text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity">
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Rentals;
