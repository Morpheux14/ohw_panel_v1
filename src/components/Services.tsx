import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, Car, Gamepad2, Radar, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: <Radar className="w-10 h-10 text-primary-400" />,
    title: 'LiDAR Technology',
    description:
      'Providing professional-grade tracks based on new LiDAR technology for all simulation software. Utilizing advanced post-processing Laser Data technology.',
    features: [
      'High-precision track modeling',
      'Accurate terrain mapping',
      'Real-world data integration',
      'Processed LiDAR raw data'
    ]
  },
  {
    icon: <Zap className="w-10 h-10 text-primary-400" />,
    title: 'Features Development',
    description:
      'As a leader in professional simulator development, we offer a range of advanced features and services for creating innovative racing technologies.',
    features: [
      'Custom physics engines',
      'Advanced telemetry systems',
      'Real-time data analysis',
      'Performance optimization tools'
    ]
  },
  {
    icon: <Car className="w-10 h-10 text-primary-400" />,
    title: 'Cars Development',
    description:
      'We develop the most realistic and detailed car models for simulators and game engines with scanned versions and accurate physics based on real data.',
    features: [
      'High-fidelity 3D models',
      'Realistic physics behavior',
      'Custom liveries and textures',
      'Authentic handling characteristics'
    ]
  },
  {
    icon: <Gamepad2 className="w-10 h-10 text-primary-400" />,
    title: 'Racing Games Maker',
    description:
      'We offer the development of high-quality racing games utilizing the latest graphic and physics engines like Unreal Engine, Unity, and custom engines.',
    features: [
      'Cutting-edge graphics',
      'Immersive gameplay mechanics',
      'Multi-platform compatibility',
      'Competitive online features'
    ]
  },
];

const Services: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="services" className="py-20 bg-dark-800 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 lidar-bg"></div>
      <div className="absolute inset-0 z-0 noise-bg"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary-900/80 text-primary-400 text-xs font-medium mb-4 border border-primary-800"
          >
            Our Expertise
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold mb-4"
          >
            Advanced <span className="text-gradient">Simulation</span> Services
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
            className="max-w-2xl mx-auto text-gray-300 text-xs md:text-sm"
          >
            Leveraging cutting-edge technology and industry expertise to deliver unparalleled 
            simulation solutions for the motorsport industry.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-dark-900/50 backdrop-blur-md rounded-xl p-6 shadow-lg border border-dark-700 hover:border-primary-700 transition-all duration-500 group"
            >
              <div className="mb-6 p-3 rounded-lg bg-dark-800/80 inline-block group-hover:bg-primary-900/80 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-base font-semibold mb-3 group-hover:text-primary-400 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6 text-xs">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-primary-500 mr-2 mt-0.5">•</span>
                    <span className="text-gray-300 text-xs">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <motion.a
                href="#contact"
                className="inline-flex items-center text-primary-400 text-xs font-medium group/link"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Learn more
                <ArrowRight className="ml-1 w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-1" />
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
