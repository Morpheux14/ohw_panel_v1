import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Clients: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const logos = [
    { name: 'Ferrari', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Ferrari-Logo.svg/800px-Ferrari-Logo.svg.png' },
    { name: 'Mercedes', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/800px-Mercedes-Logo.svg.png' },
    { name: 'Red Bull Racing', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Red_Bull_Racing_logo.svg/800px-Red_Bull_Racing_logo.svg.png' },
    { name: 'McLaren', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/McLaren_Racing_logo.svg/800px-McLaren_Racing_logo.svg.png' },
    { name: 'Aston Martin', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Aston_Martin_Logo.svg/800px-Aston_Martin_Logo.svg.png' },
    { name: 'Alpine', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Alpine_F1_Team_Logo.svg/800px-Alpine_F1_Team_Logo.svg.png' },
    { name: 'Williams', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Williams_Racing_2020_logo.svg/800px-Williams_Racing_2020_logo.svg.png' },
    { name: 'AlphaTauri', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Scuderia_AlphaTauri_Logo.svg/800px-Scuderia_AlphaTauri_Logo.svg.png' },
    { name: 'Haas F1', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Haas_F1_Team_logo.svg/800px-Haas_F1_Team_logo.svg.png' },
  ];

  // Create two sets of logos for continuous animation
  const doubledLogos = [...logos, ...logos];

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="clients" className="py-16 bg-dark-800 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 circuit-bg"></div>
      <div className="absolute inset-0 z-0 noise-bg"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-3 py-1 rounded-full bg-primary-900/80 text-primary-400 text-xs font-medium mb-3 border border-primary-800"
          >
            Trusted Partners
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl font-bold mb-3"
          >
            Trusted by <span className="text-gradient">Leading Organizations</span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 w-16 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-4"
          ></motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto text-gray-300 text-xs md:text-sm"
          >
            We're proud to collaborate with the world's most prestigious motorsport teams and organizations.
          </motion.p>
        </div>

        {/* Continuous scrolling logos */}
        <div ref={ref} className="relative overflow-hidden mb-16">
          <div className="flex items-center justify-center">
            <motion.div
              className="flex space-x-8 py-4"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {doubledLogos.map((logo, index) => (
                <div
                  key={index}
                  className="bg-dark-900/50 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center h-24 w-40 border border-dark-700 hover:border-primary-700 transition-all duration-300 group flex-shrink-0"
                >
                  <img
                    src={logo.logo}
                    alt={logo.name}
                    className="max-h-12 max-w-full opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats section */}
        <motion.div
          variants={statsVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="bg-dark-900/50 backdrop-blur-md rounded-xl p-8 border border-primary-800/30 shadow-xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold mb-2">
              Join <span className="text-gradient">10,000+</span> Professionals
            </h3>
            <p className="text-gray-300 text-xs">
              Who trust our simulation technology for their racing needs
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">10K+</div>
              <p className="text-gray-400 text-xs">Professional Drivers</p>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">50+</div>
              <p className="text-gray-400 text-xs">Racing Teams</p>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">200+</div>
              <p className="text-gray-400 text-xs">Tracks Modeled</p>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">99%</div>
              <p className="text-gray-400 text-xs">Accuracy Rate</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
