import React from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={() => setIsCartOpen(false)}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 right-0 w-full md:w-96 bg-bakery-light shadow-2xl z-50 flex flex-col"
          >
            <div className="p-5 flex items-center justify-between border-b border-bakery-accent/20 bg-white">
              <h2 className="text-xl font-serif font-bold text-bakery-dark flex items-center gap-2">
                <ShoppingBag /> Your Cart
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-bakery-accent/10 rounded-full transition-colors text-bakery-primary"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 scroll-smooth custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-bakery-primary/60 space-y-4">
                  <ShoppingBag size={64} className="opacity-20" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/menu');
                    }}
                    className="text-bakery-accent font-semibold hover:underline"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={item.id}
                      className="flex gap-4 p-3 bg-white rounded-xl shadow-sm border border-bakery-accent/10 relative group"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg bg-bakery-light/50"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-serif font-bold text-bakery-dark line-clamp-1">{item.name}</h3>
                          <p className="text-sm text-bakery-accent font-medium">₹{item.price.toFixed(2)}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 bg-bakery-light rounded-lg p-1 border border-bakery-accent/10">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-white rounded hover:text-bakery-accent transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-white rounded hover:text-bakery-accent transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          
                          <p className="font-bold text-bakery-dark">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="absolute -top-2 -right-2 bg-white text-red-500 shadow-md p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                      >
                        <X size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-bakery-accent/20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center mb-4 text-lg">
                  <span className="text-bakery-primary">Subtotal</span>
                  <span className="font-bold text-bakery-dark text-xl">₹{cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-bakery-primary/60 mb-6 text-center">Taxes and shipping calculated at checkout</p>
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-bakery-accent hover:bg-bakery-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex justify-center items-center gap-2"
                >
                  Proceed to Checkout <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
