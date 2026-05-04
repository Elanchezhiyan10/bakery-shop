import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-5xl font-serif font-bold text-bakery-light mb-4 filter drop-shadow-sm">Get in Touch</h1>
          <p className="text-lg text-bakery-light/80 leading-relaxed">
            Have a question about an order? Need a custom kunafa for a special occasion? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-10 rounded-3xl shadow-md border border-bakery-accent/20"
          >
            <h2 className="text-3xl font-serif font-bold text-bakery-light mb-8">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-bakery-light/90 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-bakery-light/30 border border-bakery-accent/30 rounded-xl focus:outline-none focus:border-bakery-accent focus:ring-1 focus:ring-bakery-accent"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-bakery-light/90 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-bakery-light/30 border border-bakery-accent/30 rounded-xl focus:outline-none focus:border-bakery-accent focus:ring-1 focus:ring-bakery-accent"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-bakery-light/90 mb-2">Message</label>
                <textarea 
                  rows="5"
                  className="w-full px-4 py-3 bg-bakery-light/30 border border-bakery-accent/30 rounded-xl focus:outline-none focus:border-bakery-accent focus:ring-1 focus:ring-bakery-accent resize-none"
                  placeholder="How can we help?"
                ></textarea>
              </div>
              <button 
                type="button" 
                className="w-full bg-bakery-accent hover:bg-bakery-primary text-white py-4 rounded-xl font-bold shadow-md transition-all"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 lg:pl-8"
          >
            <div className="glass-dark p-8 rounded-3xl text-bakery-light shadow-lg border border-bakery-accent/20">
               <h3 className="text-2xl font-serif font-bold text-bakery-accent mb-6 border-b border-white/10 pb-4">Our Details</h3>
               <div className="space-y-6">
                 <div className="flex items-start gap-4">
                   <MapPin className="text-bakery-accent mt-1" />
                    <div>
                      <p className="font-bold text-lg mb-1">Location</p>
                      <p className="opacity-80">Mannivakkam Rd, Krishna Nagar<br/>Urapakkam, Tamil Nadu 600048</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                   <Phone className="text-bakery-accent mt-1" />
                    <div>
                      <p className="font-bold text-lg mb-1">Phone</p>
                      <p className="opacity-80">+91 63695 90070</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                   <Mail className="text-bakery-accent mt-1" />
                   <div>
                     <p className="font-bold text-lg mb-1">Email</p>
                     <p className="opacity-80">hello@kunafaheaven.com</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4">
                   <Clock className="text-bakery-accent mt-1" />
                   <div>
                     <p className="font-bold text-lg mb-1">Hours</p>
                     <p className="opacity-80">Mon-Fri: 7am - 7pm<br/>Sat-Sun: 8am - 8pm</p>
                   </div>
                 </div>
               </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-64 rounded-3xl overflow-hidden shadow-md bg-gray-200">
                <iframe 
                  src="https://www.google.com/maps?q=Kunafa+Heaven,Mannivakkam+Rd,Krishna+Nagar,Urapakkam,Tamil+Nadu+600048&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{border: 0}} 
                  allowFullScreen="" 
                  loading="lazy"
                  title="Map Location"
                ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
