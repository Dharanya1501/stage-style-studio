import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const related = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 3);

  if (!product) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl mb-4">Product not found</h1>
          <Link to="/products" className="text-primary hover:underline">Back to Products</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-square rounded-lg overflow-hidden bg-card border border-border">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{product.category}</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-primary font-bold text-3xl">${product.price}</span>
                {product.rentalPrice && (
                  <span className="text-muted-foreground">/ ${product.rentalPrice} per event rental</span>
                )}
              </div>
            </div>

            <p className="text-foreground/70 leading-relaxed">{product.description}</p>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => {
                  addToCart(product);
                  toast({ title: 'Added to cart', description: `${product.name} added.` });
                }}
                className="px-8 py-3 bg-gradient-gold text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity"
              >
                Add to Cart — ${product.price}
              </button>
              {product.rentalPrice && (
                <button
                  onClick={() => {
                    addToCart(product, true);
                    toast({ title: 'Rental added', description: `${product.name} added as rental.` });
                  }}
                  className="px-8 py-3 border border-primary/30 text-foreground font-semibold rounded-md hover:bg-primary/10 transition-colors"
                >
                  Rent — ${product.rentalPrice}/event
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map(p => (
                <Link key={p.id} to={`/products/${p.id}`} className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-semibold group-hover:text-primary transition-colors">{p.name}</h3>
                    <p className="text-primary font-bold">${p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;
