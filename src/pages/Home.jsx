import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Heart } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="container relative z-10 px-6 text-center text-white mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto space-y-8 glass-dark py-12 px-8 rounded-3xl"
          >
            <span className="text-bakery-accent font-semibold tracking-widest uppercase mb-4 block">
              Est. 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-bakery-light leading-tight drop-shadow-md">
              Authentic <br /> <span className="text-bakery-accent italic font-light">Kunafa Delights</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-bakery-light/90 max-w-xl mx-auto drop-shadow-sm">
              Melted sweet cheese, crispy golden phyllo dough, and aromatic sugar syrup. The true taste of the Middle East.
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
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-16">
            <Heart className="text-bakery-accent w-12 h-12 mb-2 opacity-80" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-bakery-light">Our Specialties</h2>
            <p className="text-bakery-light/80 max-w-2xl text-lg opacity-80">
              Hand-crafted with love, these are the signature treats that keep our customers coming back for more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Authentic Kunafas",
                desc: "Crispy, golden, and oozing with cheese or cream. The heart of our shop.",
                img: "https://images.unsplash.com/photo-1627844642677-8b38cb71900a?w=500&auto=format&fit=crop",
                link: "/menu?category=kunafas"
              },
              {
                title: "Rich Milkshakes",
                desc: "Thick, creamy, and made with premium ingredients for the perfect treat.",
                img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop",
                link: "/menu?category=milkshakes"
              },
              {
                title: "Premium Beverages",
                desc: "From Mango Lassi to Rose Milk, perfectly paired with our sweets.",
                img: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=500&auto=format&fit=crop",
                link: "/menu?category=beverages"
              }
            ].map((item, idx) => (
              <Link key={idx} to={item.link} className="block">
                <motion.div
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
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-24 text-bakery-light relative overflow-hidden">
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
                  "Absolutely the best kunafa in town! The cheese pull is incredible and the sweetness is perfectly balanced."
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
