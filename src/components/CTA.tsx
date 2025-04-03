import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';

const CTA: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.5]);

  return (
    <section ref={containerRef} className="py-20 bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900/30"></div>
      <div className="absolute inset-0 z-0 opacity-20 lidar-bg"></div>
      <div className="absolute inset-0 z-0 noise-bg"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary-500/10 blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-secondary-500/10 blur-3xl"
          animate={{ 
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          style={{ y, opacity }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-10 md:p-16 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-secondary-900/20 z-0"></div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary-900/80 text-primary-400 text-sm font-medium mb-6 border border-primary-800">
                  Ready to Start?
                </span>
                
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Ready to <span className="text-gradient">Accelerate</span> Your Simulation?
                </h2>
                
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  Take your motorsport simulation to the next level with OHW Solutions. Our cutting-edge technology and expert team are ready to help you achieve your goals.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-md bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium text-lg shadow-xl hover:shadow-primary-500/30 transition-all duration-300 btn-glow flex items-center justify-center"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.a>
                
                <motion.a
                  href="#services"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-md bg-dark-800/80 text-white font-medium text-lg border border-primary-800/30 hover:border-primary-600/50 transition-all duration-300 flex items-center justify-center"
                >
                  Explore Services
                </motion.a>
              </motion.div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border border-primary-500/20 opacity-50"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full border border-secondary-500/20 opacity-50"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
