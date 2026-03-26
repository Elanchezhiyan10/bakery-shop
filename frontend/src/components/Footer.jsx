import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bakery-dark text-bakery-light py-12 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-serif font-bold text-bakery-accent border-b-2 border-bakery-accent inline-block pb-1">SweetCrust</h3>
          <p className="text-sm opacity-80 max-w-xs leading-relaxed">
            Crafting pure happiness using the finest ingredients. Every crust brings an unforgettable sweet memory to your taste buds.
          </p>
          <div className="flex space-x-4 pt-2">
            <span className="hover:text-bakery-accent cursor-pointer transition-colors font-bold">Fb</span>
            <span className="hover:text-bakery-accent cursor-pointer transition-colors font-bold">Ig</span>
            <span className="hover:text-bakery-accent cursor-pointer transition-colors font-bold">Tw</span>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-lg text-bakery-light/90">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href="/" className="hover:text-bakery-accent transition-colors">Home</a></li>
            <li><a href="/menu" className="hover:text-bakery-accent transition-colors">Menu</a></li>
            <li><a href="/about" className="hover:text-bakery-accent transition-colors">About Us</a></li>
            <li><a href="/contact" className="hover:text-bakery-accent transition-colors">Contact</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-lg text-bakery-light/90">Categories</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href="/menu?category=cakes" className="hover:text-bakery-accent transition-colors">Cakes</a></li>
            <li><a href="/menu?category=pastries" className="hover:text-bakery-accent transition-colors">Pastries</a></li>
            <li><a href="/menu?category=breads" className="hover:text-bakery-accent transition-colors">Artisan Breads</a></li>
            <li><a href="/menu?category=snacks" className="hover:text-bakery-accent transition-colors">Snacks</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-lg text-bakery-light/90">Contact Us</h4>
          <div className="space-y-3 text-sm opacity-80">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-bakery-accent shrink-0 mt-0.5" />
              <span>123 Baker Street, Sweet City, NY 10001</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-bakery-accent shrink-0" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-bakery-accent shrink-0" />
              <span>hello@sweetcrust.com</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm opacity-60">
        <p>&copy; {new Date().getFullYear()} SweetCrust Bakery. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
