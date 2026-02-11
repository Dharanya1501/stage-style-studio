import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShoppingBag, Palette, Package } from 'lucide-react';
import { products, testimonials } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    toast({ title: 'Added to cart', description: `${product.name} has been added to your cart.` });
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4 font-medium">Premium Stage Decor</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transform Your <br />
              <span className="text-gradient-gold">Stage Into Art</span>
            </h1>
            <p className="text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Exquisite decor, rentals, and custom designs for weddings, galas, corporate events, and unforgettable celebrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-gold text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity"
              >
                Browse Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/custom-design"
                className="inline-flex items-center gap-2 px-8 py-3 border border-primary/30 text-foreground font-semibold rounded-md hover:bg-primary/10 transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2">What We Offer</p>
            <h2 className="font-display text-4xl font-bold">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShoppingBag, title: 'Physical Products', desc: 'Premium backdrops, lighting, florals, and props for purchase.', link: '/products' },
              { icon: Package, title: 'Rental Services', desc: 'High-end furniture, LED floors, and staging equipment for rent.', link: '/rentals' },
              { icon: Palette, title: 'Custom Designs', desc: 'Bespoke stage concepts tailored to your event vision.', link: '/custom-design' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Link
                  to={item.link}
                  className="block p-8 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors group"
                >
                  <item.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2">Curated Selection</p>
              <h2 className="font-display text-4xl font-bold">Featured Products</h2>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-2 text-primary hover:underline text-sm font-medium">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-colors"
              >
                <Link to={`/products/${product.id}`} className="block">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-display font-semibold mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-primary font-bold text-lg">${product.price}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-3 w-full py-2 text-sm font-medium border border-primary/30 text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/products" className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-gold">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Events Completed' },
              { value: '200+', label: 'Happy Clients' },
              { value: '50+', label: 'Decor Products' },
              { value: '10+', label: 'Years Experience' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-primary-foreground/70 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2">Client Love</p>
            <h2 className="font-display text-4xl font-bold">What They Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-8 bg-card border border-border rounded-lg"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div>
                  <p className="font-display font-semibold">{t.name}</p>
                  <p className="text-muted-foreground text-sm">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready to Create Something <span className="text-gradient-gold">Extraordinary</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Let us bring your vision to life with our premium stage decor solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/custom-design" className="px-8 py-3 bg-gradient-gold text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity">
              Get a Custom Quote
            </Link>
            <Link to="/contact" className="px-8 py-3 border border-primary/30 text-foreground font-semibold rounded-md hover:bg-primary/10 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
