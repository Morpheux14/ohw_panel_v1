import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="py-16 bg-dark-800 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 lidar-bg"></div>
      <div className="absolute inset-0 z-0 noise-bg"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary-900/80 text-primary-400 text-xs font-medium mb-4 border border-primary-800"
          >
            Get in Touch
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl font-bold mb-3"
          >
            Contact <span className="text-gradient">Us</span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 w-24 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-6"
          ></motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-300 max-w-2xl mx-auto text-xs md:text-sm"
          >
            Have questions or ready to start your project? Get in touch with our team and we'll get back to you as soon as possible.
          </motion.p>
        </div>

        <div ref={ref} className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="glass-card rounded-xl p-8 card-shadow border border-dark-600"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-dark-800/50 border border-dark-700 hover:border-primary-700 transition-all duration-300">
                <div className="bg-primary-900/80 p-3 rounded-lg mb-4">
                  <MapPin className="w-6 h-6 text-primary-400" />
                </div>
                <h4 className="font-medium mb-2 text-sm">Address</h4>
                <p className="text-gray-400 text-xs">30 N Gould ST, STE R, Sheridan, WY 82801, United States</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-dark-800/50 border border-dark-700 hover:border-primary-700 transition-all duration-300">
                <div className="bg-primary-900/80 p-3 rounded-lg mb-4">
                  <Phone className="w-6 h-6 text-primary-400" />
                </div>
                <h4 className="font-medium mb-2 text-sm">Phone</h4>
                <p className="text-gray-400 text-xs">+1 (307) 243 4642</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-dark-800/50 border border-dark-700 hover:border-primary-700 transition-all duration-300">
                <div className="bg-primary-900/80 p-3 rounded-lg mb-4">
                  <Mail className="w-6 h-6 text-primary-400" />
                </div>
                <h4 className="font-medium mb-2 text-sm">Email</h4>
                <p className="text-gray-400 text-xs">info@ohwsolutions.com</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
