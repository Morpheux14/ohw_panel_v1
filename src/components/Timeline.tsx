import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const timelineEvents = [
  {
    year: '2008',
    title: 'Foundation of OHW Group',
    description: 'Development of KERS, ERS, and DRS systems for motorsport applications',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    year: '2010',
    title: 'Motorsport Partnerships',
    description: 'Started working with top motorsport teams to develop simulation technology',
    image: 'https://images.unsplash.com/photo-1541447271487-09612b3f49f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    year: '2012',
    title: 'LiDAR Technology',
    description: 'Introduced LiDAR technology for high-precision track development',
    image: 'https://images.unsplash.com/photo-1504276048855-f3d60e69632f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    year: '2015',
    title: 'Electric Racing',
    description: 'Developed the Formula E car model and electric engine simulation',
    image: 'https://images.unsplash.com/photo-1511994476040-27c2f5a9b9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    year: '2020',
    title: 'Expanded Services',
    description: 'Custom racing simulator software and Racing Games Maker platform',
    image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    year: 'Now',
    title: 'Global Collaboration',
    description: 'Collaborating with Formula 1 teams, DTM, WEC, IndyCar, and major automotive companies',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
];

const Timeline: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" ref={containerRef} className="py-20 bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-5 grid-pattern"></div>
      <div className="absolute inset-0 z-0 noise-bg"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary-900/80 text-primary-400 text-sm font-medium mb-4 border border-primary-800"
          >
            Our Journey
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            OHW Solutions <span className="text-gradient">Innovation</span> Timeline
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
            className="max-w-2xl mx-auto text-gray-300 mb-8"
          >
            Explore our journey of innovation and excellence in motorsport simulation technology.
          </motion.p>
        </div>

        <div ref={ref} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-dark-700 z-0"></div>
          
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500 z-0"
            style={{ height: lineHeight }}
          ></motion.div>

          <div className="space-y-24 relative">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center md:items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="w-full md:w-1/2 text-center md:text-right md:pr-12 flex flex-col items-center md:items-end">
                  <div className={`${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <span className="inline-block px-4 py-2 rounded-full bg-primary-900/80 text-primary-400 font-bold mb-4 border border-primary-800">
                      {event.year}
                    </span>
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-400">{event.description}</p>
                  </div>
                </div>
                
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-secondary-500 border-4 border-dark-800 z-10" style={{ top: `${index * 200 + 24}px` }}>
                  <motion.div 
                    className="absolute -inset-1 rounded-full bg-secondary-500/20"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 0, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: index * 0.2
                    }}
                  />
                </div>
                
                <div className="w-full md:w-1/2 md:pl-12">
                  <motion.div 
                    className="glass-card rounded-lg overflow-hidden shadow-lg"
                    whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-48 object-cover"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
