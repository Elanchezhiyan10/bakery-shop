import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = () => {
    const phone = "916369590070"; // Bakery owner's WhatsApp number (with country code)
    let itemsText = cart.map(item => `${item.quantity}x ${item.name} (₹${(item.price * item.quantity).toFixed(2)})`).join('%0A');
    
    let message = `*New Order*%0A%0A*Customer Details:*%0AName: ${formData.name}%0APhone: ${formData.phone}%0AAddress: ${formData.address}%0ANotes: ${formData.notes || 'None'}%0A%0A*Order Details:*%0A${itemsText}%0A%0A*Total: ₹${cartTotal.toFixed(2)}*`;
    
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setSubmitting(true);
    
    try {
      // Send to backend for email notification
      await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          items: cart,
          total: cartTotal
        })
      });
      
      // Also generate WhatsApp message
      handleWhatsApp();
      
      setSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Failed to process order via server, redirecting to WhatsApp only.");
      handleWhatsApp();
      setSuccess(true);
      clearCart();
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass p-10 rounded-3xl shadow-xl text-center max-w-lg border border-bakery-accent/20"
        >
          <div className="flex justify-center mb-6">
            <CheckCircle className="text-green-500 w-24 h-24" />
          </div>
          <h2 className="text-4xl font-serif font-bold text-bakery-light mb-4">Order Confirmed!</h2>
          <p className="text-bakery-light/80 mb-8">
            Thank you for your order, {formData.name}. We've sent your request to our bakery and you should receive a confirmation soon.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-bakery-dark hover:bg-bakery-primary text-bakery-light py-4 rounded-xl font-bold transition-all"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-8 flex items-center gap-4">
          <button 
            onClick={() => navigate('/menu')}
            className="p-2 bg-white/10 text-bakery-light rounded-full hover:bg-bakery-accent/10 transition-colors"
          >
            <ArrowLeft />
          </button>
          <h1 className="text-4xl font-serif font-bold text-bakery-light">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form Section */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="glass p-8 rounded-3xl shadow-sm border border-bakery-accent/20">
              <h2 className="text-2xl font-serif font-bold text-bakery-light mb-6 border-b border-bakery-accent/20 pb-4">Delivery Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-bakery-light/90 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-bakery-accent/30 rounded-xl focus:outline-none focus:border-bakery-accent focus:ring-1 focus:ring-bakery-accent text-bakery-light placeholder:text-bakery-light/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-bakery-light/90 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-bakery-accent/30 rounded-xl focus:outline-none focus:border-bakery-accent focus:ring-1 focus:ring-bakery-accent text-bakery-light placeholder:text-bakery-light/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-bakery-light/90 mb-2">Delivery Address</label>
                  <textarea 
                    name="address" 
                    required
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-bakery-accent/30 rounded-xl focus:outline-none focus:border-bakery-accent focus:ring-1 focus:ring-bakery-accent resize-none text-bakery-light placeholder:text-bakery-light/50"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-bakery-light/90 mb-2">Order Notes (Optional)</label>
                  <textarea 
                    name="notes" 
                    rows="2"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="e.g. Any allergies, special requests..."
                    className="w-full px-4 py-3 bg-white/10 border border-bakery-accent/30 rounded-xl focus:outline-none focus:border-bakery-accent focus:ring-1 focus:ring-bakery-accent resize-none text-bakery-light placeholder:text-bakery-light/50"
                  ></textarea>
                </div>

                <div className="pt-4 mt-6 border-t border-bakery-accent/20">
                  <button 
                    type="submit" 
                    disabled={submitting || cart.length === 0}
                    className="w-full bg-bakery-accent hover:bg-bakery-primary text-white py-4 rounded-xl font-bold text-lg shadow-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {submitting ? 'Processing...' : 'Place Order'}
                  </button>
                  <p className="text-xs text-center text-bakery-light/60 mt-4">
                    By placing an order, you agree to our terms and conditions. You will be redirected to WhatsApp to confirm your order.
                  </p>
                </div>

              </form>
            </div>
          </div>

          {/* Cart Summary Section */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="glass-dark border border-bakery-accent/20 rounded-3xl p-8 sticky top-28 shadow-xl text-bakery-light">
              <h2 className="text-2xl font-serif font-bold text-bakery-accent mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                <ShoppingBag /> Order Summary
              </h2>
              
              {cart.length === 0 ? (
                <div className="text-center py-10 text-white/50">
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center gap-4 border-b border-white/10 pb-4">
                        <div className="flex items-center gap-4">
                          <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover bg-white/10" />
                          <div>
                            <p className="font-bold text-sm line-clamp-1">{item.name}</p>
                            <p className="text-bakery-accent text-xs">{item.quantity} x ₹{item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <p className="font-bold font-serif whitespace-nowrap">₹{(item.quantity * item.price).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                    <div className="flex justify-between text-white/70 text-sm">
                      <span>Subtotal</span>
                      <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/70 text-sm">
                      <span>Delivery</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold font-serif text-bakery-accent pt-2">
                      <span>Total</span>
                      <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
