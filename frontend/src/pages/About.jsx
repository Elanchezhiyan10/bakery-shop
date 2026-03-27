import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-bakery-light">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1555507036-ab1e4006a2a0?w=800&auto=format&fit=crop" 
              alt="Bakery Interior" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-bakery-dark">Our Story</h1>
            <p className="text-lg text-bakery-primary/80 leading-relaxed">
              Welcome to our bakery, where every bite is a celebration of taste, freshness, and tradition. We take pride in crafting high-quality baked goods using the finest ingredients, ensuring every product is made with care and passion.
            </p>
            <p className="text-lg text-bakery-primary/80 leading-relaxed">
              From freshly baked breads and soft buns to delicious cakes, pastries, and snacks, our goal is to bring joy to your everyday moments. Whether you're celebrating a special occasion or simply craving something sweet, we have something for everyone.
            </p>
            <p className="text-lg text-bakery-primary/80 leading-relaxed">
              Our bakery combines traditional recipes with modern flavors to create a unique experience for our customers. We believe in quality, hygiene, and customer satisfaction, and we strive to deliver the best in every order.
            </p>
            <p className="text-lg text-bakery-primary/80 leading-relaxed">
              With a warm and welcoming atmosphere, we are more than just a bakery — we are a place where memories are made and happiness is shared. Thank you for choosing us and being a part of our journey.
            </p>
            <div className="pt-6 grid grid-cols-3 gap-6 text-center border-t border-bakery-accent/30">
               <div>
                  <p className="text-4xl font-serif font-bold text-bakery-accent">100%</p>
                  <p className="text-sm text-bakery-dark mt-1">Fresh Ingredients</p>
               </div>
               <div>
                  <p className="text-4xl font-serif font-bold text-bakery-accent">Daily</p>
                  <p className="text-sm text-bakery-dark mt-1">Fresh Baking</p>
               </div>
               <div>
                  <p className="text-4xl font-serif font-bold text-bakery-accent">❤️</p>
                  <p className="text-sm text-bakery-dark mt-1">Made with Love</p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
