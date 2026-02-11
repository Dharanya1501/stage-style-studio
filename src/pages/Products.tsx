import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { products, categories } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();
  const { toast } = useToast();

  const filtered = useMemo(() => {
    return products
      .filter(p => p.type === 'product' || p.type === 'rental')
      .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
      .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [selectedCategory, searchQuery]);

  return (
    <main className="pt-20 min-h-screen">
      {/* Header */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <p className="text-primary tracking-[0.2em] uppercase text-sm mb-2">Our Collection</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Product Catalog</h1>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <p className="text-muted-foreground text-center py-20">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-colors"
                >
                  <Link to={`/products/${product.id}`} className="block">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                  </Link>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.category}</p>
                    <Link to={`/products/${product.id}`}>
                      <h3 className="font-display font-semibold mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                    </Link>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-primary font-bold text-lg">${product.price}</span>
                      {product.rentalPrice && (
                        <span className="text-muted-foreground text-sm">/ ${product.rentalPrice} rental</span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        addToCart(product);
                        toast({ title: 'Added to cart', description: `${product.name} added.` });
                      }}
                      className="w-full py-2 text-sm font-medium border border-primary/30 text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Products;
