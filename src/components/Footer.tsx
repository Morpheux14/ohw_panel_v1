import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-5 grid-pattern"></div>
      <div className="absolute inset-0 z-0 noise-bg"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="py-12 border-t border-dark-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h3 className="text-lg font-bold mb-4">OHW Solutions</h3>
              <p className="text-gray-400 mb-6 max-w-md text-xs">
                Pioneering the future of motorsport and driving simulation through cutting-edge technology, 
                expert craftsmanship, and unparalleled attention to detail.
              </p>
            </div>
            
            <div>
              <h4 className="text-base font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">Home</a>
                </li>
                <li>
                  <a href="#services" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">Services</a>
                </li>
                <li>
                  <a href="#technology" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">Technology</a>
                </li>
                <li>
                  <a href="#clients" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">Clients</a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">Contact</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-xs">
                <li className="text-gray-400">
                  30 N Gould ST, STE R, Sheridan, WY 82801, United States
                </li>
                <li className="text-gray-400">
                  +1 (307) 243 4642
                </li>
                <li>
                  <a href="mailto:info@ohwsolutions.com" className="text-primary-400 hover:underline">info@ohwsolutions.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="py-6 border-t border-dark-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs mb-4 md:mb-0">
            &copy; {currentYear} OHW Solutions. All rights reserved.
          </p>
          
          <div className="flex space-x-6 text-xs">
            <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors duration-300">Cookies</a>
          </div>
        </div>
      </div>
      
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg z-50"
        whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 115, 255, 0.3)" }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
};

export default Footer;
