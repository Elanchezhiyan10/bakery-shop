import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen relative font-sans text-bakery-light bg-bakery-dark">
          <div className="fixed inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=1920&q=80"
              alt="Kunafa Background"
              className="w-full h-full object-cover object-center brightness-[0.4] animate-pan"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-bakery-dark/80 via-bakery-dark/60 to-bakery-dark/90"></div>
          </div>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
          <CartDrawer />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
