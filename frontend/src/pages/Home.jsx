import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Heart } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1555507036-ab1e4006a2a0?q=80&w=2000&auto=format&fit=crop"
            alt="Bakery Hero"
            className="w-full h-full object-cover object-center brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bakery-dark/80 via-transparent to-transparent"></div>
        </div>

        <div className="container relative z-10 px-6 text-center text-white mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto space-y-8 glass py-12 px-8 rounded-3xl"
          >
            <span className="text-bakery-primary font-semibold tracking-widest uppercase mb-4 block">
              Est. 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-bakery-dark leading-tight drop-shadow-md">
              Freshly Baked <br /> <span className="text-bakery-primary italic font-light">Happiness</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-bakery-dark/80 max-w-xl mx-auto drop-shadow-sm">
              Artisan breads, delicate pastries, and custom cakes made from scratch daily using organic, locally-sourced ingredients.
            </p>
            <div className="pt-8">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-3 bg-bakery-dark text-bakery-light hover:bg-bakery-primary px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                Explore Our Menu <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-bakery-light">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-16">
            <Heart className="text-bakery-accent w-12 h-12 mb-2 opacity-80" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-bakery-dark">Our Specialties</h2>
            <p className="text-bakery-primary max-w-2xl text-lg opacity-80">
              Hand-crafted with love, these are the signature treats that keep our customers coming back for more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Artisan Breads",
                desc: "Slow-fermented sourdoughs and classic baguettes with perfect crusts.",
                img: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=500&auto=format&fit=crop"
              },
              {
                title: "Delicate Pastries",
                desc: "Buttery croissants, Danishes, and tarts that melt in your mouth.",
                img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&auto=format&fit=crop"
              },
              {
                title: "Custom Cakes",
                desc: "Beautifully designed cakes for your most special occasions.",
                img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group relative h-96 rounded-3xl overflow-hidden shadow-lg cursor-pointer"
              >
                <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-bakery-dark/90 via-bakery-dark/40 to-transparent transition-opacity duration-300"></div>
                <div className="absolute bottom-0 inset-x-0 p-8 text-left">
                  <h3 className="text-3xl font-serif font-bold text-bakery-light mb-3">{item.title}</h3>
                  <p className="text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 text-sm">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-24 bg-bakery-dark text-bakery-light relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-serif font-bold text-bakery-accent border-b border-bakery-accent/30 inline-block pb-2">What People Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="glass-dark p-8 rounded-2xl border border-bakery-accent/20">
                <div className="flex text-bakery-accent mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="italic text-bakery-light/80 mb-6 leading-relaxed">
                  "Absolutely the best bakery in town! The croissants are exactly like the ones I had in Paris. The staff is always welcoming and the coffee is perfect."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-bakery-accent/30 rounded-full flex justify-center items-center text-xl font-bold font-serif text-bakery-accent border border-bakery-accent/50">
                    User
                  </div>
                  <div>
                    <h4 className="font-bold">Happy Customer</h4>
                    <span className="text-xs opacity-60">Local Guide</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
