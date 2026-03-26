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
          { id: 1, name: "Chocolate Truffle Cake", category: "cakes", price: 25, description: "Rich chocolate cake with truffle frosting", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop" },
          { id: 2, name: "Vanilla Bean Cupcake", category: "pastries", price: 4, description: "Classic vanilla cupcake with buttercream", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&auto=format&fit=crop" },
          { id: 3, name: "Sourdough Bread", category: "breads", price: 8, description: "Freshly baked artisan sourdough loaf", image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=500&auto=format&fit=crop" },
          { id: 4, name: "Butter Croissant", category: "pastries", price: 3.5, description: "Flaky, buttery French pastry", image: "https://images.unsplash.com/photo-1555507036-ab1e4006a2a0?w=500&auto=format&fit=crop" },
          { id: 5, name: "Strawberry Shortcake", category: "cakes", price: 30, description: "Light sponge cake with fresh strawberries", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&auto=format&fit=crop" },
          { id: 6, name: "Cinnamon Roll", category: "pastries", price: 4.5, description: "Warm cinnamon roll with cream cheese icing", image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=500&auto=format&fit=crop" },
          { id: 8, name: "Chocolate Chip Cookie", category: "snacks", price: 2, description: "Classic cookie with gooey chocolate chips", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop" },
          { id: 9, name: "Iced Caramel Macchiato", category: "beverages", price: 5.5, description: "Espresso with milk, vanilla, and caramel drizzle", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&auto=format&fit=crop" }
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

  const categories = ['All', 'Cakes', 'Pastries', 'Breads', 'Snacks', 'Beverages'];

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
        <h2 className="text-2xl font-serif text-bakery-dark animate-pulse">Baking in progress...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-bakery-light">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-5xl font-serif font-bold text-bakery-dark mb-4 drop-shadow-sm">Our Menu</h1>
          <p className="text-bakery-primary opacity-80 text-lg">
            Discover our wide selection of freshly baked goods, made daily with love and the finest ingredients.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white p-4 rounded-2xl shadow-sm border border-bakery-accent/10">
          
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 custom-scrollbar hide-scrollbar-mobile">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all font-medium text-sm border-2 ${
                  activeCategory === cat 
                    ? 'bg-bakery-accent text-white border-bakery-accent shadow-md' 
                    : 'bg-transparent text-bakery-dark hover:border-bakery-accent/50 border-transparent hover:bg-bakery-light'
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
              className="w-full pl-12 pr-4 py-3 bg-bakery-light/50 border-2 border-transparent focus:bg-white focus:border-bakery-accent outline-none rounded-full transition-all text-sm font-medium text-bakery-dark placeholder:text-bakery-primary/50"
            />
          </div>
        </div>

        {/* Results */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center">
            <Cookie size={64} className="text-bakery-primary/30 mb-4" />
            <h3 className="text-2xl font-serif text-bakery-dark mb-2">No treats found</h3>
            <p className="text-bakery-primary opacity-80">Try adjusting your filters or search query.</p>
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
