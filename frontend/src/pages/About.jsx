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
              SweetCrust Bakery began with a simple idea: to bring the authentic taste of European pastries and artisan breads right here to our local community. What started as a small home kitchen operation has grown into a cherished neighborhood staple.
            </p>
            <p className="text-lg text-bakery-primary/80 leading-relaxed">
              Every single day, before the sun even rises, our team of dedicated bakers is hard at work. We believe in the magic of from-scratch baking, using only the finest organic ingredients, real butter, and long-fermentation processes to ensure every bite is perfect.
            </p>
            <div className="pt-6 grid grid-cols-2 gap-8 text-center border-t border-bakery-accent/30">
               <div>
                  <p className="text-4xl font-serif font-bold text-bakery-accent">100%</p>
                  <p className="text-sm text-bakery-dark mt-1">From Scratch</p>
               </div>
               <div>
                  <p className="text-4xl font-serif font-bold text-bakery-accent">Daily</p>
                  <p className="text-sm text-bakery-dark mt-1">Fresh Baking</p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
