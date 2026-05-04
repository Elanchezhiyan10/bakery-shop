import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-bakery-accent/20 flex flex-col h-full group"
    >
      <div className="relative h-56 overflow-hidden bg-bakery-light/50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-bakery-light/90 backdrop-blur text-bakery-dark text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold text-bakery-light mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-bakery-light/80 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-bakery-accent">₹{product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-bakery-dark hover:bg-bakery-primary text-bakery-light p-3 rounded-xl transition-colors active:scale-95 shadow-md flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
