import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Lightbulb, Zap, BarChart3 } from 'lucide-react';

const Innovation: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [200, -50]);

  const features = [
    {
      icon: <Lightbulb className="w-6 h-6 text-primary-400" />,
      title: "Innovative Approach",
      description: "Pioneering new methods and technologies in motorsport simulation"
    },
    {
      icon: <Zap className="w-6 h-6 text-primary-400" />,
      title: "Performance Optimization",
      description: "Maximizing efficiency and accuracy in every simulation"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-primary-400" />,
      title: "Data-Driven Development",
      description: "Using real-world data to inform and improve our simulations"
    }
  ];

  return (
    <section ref={targetRef} className="py-20 bg-dark-800 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 lidar-bg"></div>
      <div className="absolute inset-0 z-0 noise-bg"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary-900/80 text-primary-400 text-sm font-medium mb-4 border border-primary-800"
            >
              Innovation Hub
            </motion.span>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Simulations <span className="text-gradient">Solutions</span> Innovation
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-8"></div>
            <p className="text-gray-300 text-lg leading-relaxed mb-12">
              At OHW Solutions, we're at the forefront of motorsport innovation. Combining cutting-edge technology with unparalleled expertise, we redefine what's possible in motorsport and driving simulation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              <h3 className="text-2xl font-bold mb-6">
                Next-Generation <span className="text-gradient">Simulation</span> Technology
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Our proprietary simulation technology combines advanced physics modeling, real-world data integration, and cutting-edge visualization to create the most authentic racing experience available.
              </p>
              
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="p-2 rounded-lg bg-primary-900/30 mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center text-primary-400 font-medium"
              >
                Discover our innovation process
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.a>
            </motion.div>
            
            <div className="order-1 lg:order-2 relative h-[500px]">
              <motion.div 
                className="absolute top-0 left-0 w-3/4 h-64 rounded-lg overflow-hidden shadow-xl"
                style={{ y: y1 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1504276048855-f3d60e69632f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Racing Simulation Technology"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h4 className="text-lg font-bold">Physics Modeling</h4>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute top-1/4 right-0 w-2/3 h-64 rounded-lg overflow-hidden shadow-xl"
                style={{ y: y2 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1511994476040-27c2f5a9b9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Racing Simulation Technology"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h4 className="text-lg font-bold">Data Visualization</h4>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-0 left-1/4 w-3/4 h-64 rounded-lg overflow-hidden shadow-xl"
                style={{ y: y3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Racing Simulation Technology"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h4 className="text-lg font-bold">Immersive Experience</h4>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Removed the statistics card that was here */}
        </div>
      </div>
    </section>
  );
};

export default Innovation;
