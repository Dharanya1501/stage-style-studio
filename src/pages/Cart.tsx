import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold mb-2">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">Discover our stunning decor collection.</p>
          <Link to="/products" className="px-6 py-3 bg-gradient-gold text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity">
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>

        <h1 className="font-display text-3xl font-bold mb-8">Shopping Cart ({totalItems})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => {
              const price = item.isRental && item.product.rentalPrice ? item.product.rentalPrice : item.product.price;
              return (
                <div key={item.product.id} className="flex gap-4 bg-card border border-border rounded-lg p-4">
                  <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-display font-semibold">{item.product.name}</h3>
                        {item.isRental && <span className="text-xs text-primary">Rental</span>}
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 border border-border rounded-md">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 hover:text-primary transition-colors"><Minus className="w-3 h-3" /></button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 hover:text-primary transition-colors"><Plus className="w-3 h-3" /></button>
                      </div>
                      <p className="text-primary font-bold">${(price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-24">
            <h2 className="font-display text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-primary text-lg">${totalPrice.toLocaleString()}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full py-3 text-center bg-gradient-gold text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
