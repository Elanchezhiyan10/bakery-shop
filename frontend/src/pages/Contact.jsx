import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-bakery-light">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-5xl font-serif font-bold text-bakery-dark mb-4 filter drop-shadow-sm">Get in Touch</h1>
          <p className="text-lg text-bakery-primary/80 leading-relaxed">
            Have a question about an order? Need a custom cake for a special occasion? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 rounded-3xl shadow-md border border-bakery-accent/10"
          >
            <h2 className="text-3xl font-serif font-bold text-bakery-dark mb-8">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-bakery-primary mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-bakery-light/30 border border-bakery-accent/30 rounded-xl focus:outline-none focus:border-bakery-accent focus:ring-1 focus:ring-bakery-accent"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-bakery-primary mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-bakery-light/30 border border-bakery-accent/30 rounded-xl focus:outline-none focus:border-bakery-accent focus:ring-1 focus:ring-bakery-accent"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-bakery-primary mb-2">Message</label>
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
            <div className="bg-bakery-dark p-8 rounded-3xl text-bakery-light shadow-lg">
               <h3 className="text-2xl font-serif font-bold text-bakery-accent mb-6 border-b border-white/10 pb-4">Our Details</h3>
               <div className="space-y-6">
                 <div className="flex items-start gap-4">
                   <MapPin className="text-bakery-accent mt-1" />
                   <div>
                     <p className="font-bold text-lg mb-1">Location</p>
                     <p className="opacity-80">123 Baker Street<br/>Sweet City, NY 10001</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4">
                   <Phone className="text-bakery-accent mt-1" />
                   <div>
                     <p className="font-bold text-lg mb-1">Phone</p>
                     <p className="opacity-80">+1 (555) 123-4567</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4">
                   <Mail className="text-bakery-accent mt-1" />
                   <div>
                     <p className="font-bold text-lg mb-1">Email</p>
                     <p className="opacity-80">hello@sweetcrust.com</p>
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
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3022.617154942959!2d-73.98785868459414!3d40.74844494331006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1628198909848!5m2!1sen!2sus" 
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
