import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Coffee, Pizza, Cookie } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();

  useEffect(() => {
    // Parse category from URL if present
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1));
    }

    // Fetch from backend
    const fetchMenu = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/menu');
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Using fallback data due to fetch error:", err);
        // Fallback data
        setProducts([
          { id: 1, name: "Cheese Kunafa (Small)", category: "Kunafas", price: 150, description: "Authentic Middle Eastern dessert with a rich cheese filling.", image: "https://images.unsplash.com/photo-1627844642677-8b38cb71900a?w=500&auto=format&fit=crop" },
          { id: 2, name: "Cheese Kunafa (Regular)", category: "Kunafas", price: 170, description: "Classic cheese-filled Kunafa, served warm.", image: "https://images.unsplash.com/photo-1627844642677-8b38cb71900a?w=500&auto=format&fit=crop" },
          { id: 3, name: "Cream Kunafa", category: "Kunafas", price: 240, description: "Velvety cream-filled Kunafa, a local favorite.", image: "https://images.unsplash.com/photo-1634255146522-83569727409f?w=500&auto=format&fit=crop" },
          { id: 4, name: "Nutella Kunafa", category: "Kunafas", price: 260, description: "Kunafa topped with a generous layer of Nutella.", image: "https://images.unsplash.com/photo-1579306194872-64d3b14f71ec?w=500&auto=format&fit=crop" },
          { id: 5, name: "Nutty Kunafa", category: "Kunafas", price: 280, description: "Crunchy Kunafa loaded with assorted nuts.", image: "https://images.unsplash.com/photo-1539136788836-5699e78bab75?w=500&auto=format&fit=crop" },
          { id: 12, name: "Mango Lassi", category: "Beverages", price: 100, description: "Traditional sweet mango yogurt drink.", image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=500&auto=format&fit=crop" }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    // Simulate slight network delay for loader
    setTimeout(() => {
      fetchMenu();
    }, 800);
  }, [location.search]);

  const categories = ['All', 'Kunafas', 'Ice Creams', 'Milkshakes', 'Beverages'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center space-y-4">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-16 h-16 border-4 border-bakery-accent border-t-bakery-dark rounded-full"
        />
        <h2 className="text-2xl font-serif text-bakery-light animate-pulse">Baking in progress...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-5xl font-serif font-bold text-bakery-light mb-4 drop-shadow-sm">Our Menu</h1>
          <p className="text-bakery-light/80 opacity-90 text-lg">
            Discover our wide selection of freshly baked goods, made daily with love and the finest ingredients.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 glass p-4 rounded-2xl shadow-sm border border-bakery-accent/20">
          
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 custom-scrollbar hide-scrollbar-mobile">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all font-medium text-sm border-2 ${
                  activeCategory === cat 
                    ? 'bg-bakery-accent text-white border-bakery-accent shadow-md' 
                    : 'bg-transparent text-bakery-light hover:border-bakery-accent/50 border-transparent hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-bakery-primary/50" size={18} />
            <input
              type="text"
              placeholder="Search treats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 border-transparent focus:bg-white/20 focus:border-bakery-accent outline-none rounded-full transition-all text-sm font-medium text-bakery-light placeholder:text-bakery-light/50"
            />
          </div>
        </div>

        {/* Results */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center">
            <Cookie size={64} className="text-bakery-primary/30 mb-4" />
            <h3 className="text-2xl font-serif text-bakery-light mb-2">No treats found</h3>
            <p className="text-bakery-light/80">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-6 text-bakery-accent hover:underline font-bold"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Menu;
