import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cpu, Gauge, Cog, Layers, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

const Technology: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Images for the circular carousel
  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1504276048855-f3d60e69632f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Advanced Processing Technology"
    },
    {
      url: "https://images.unsplash.com/photo-1511994476040-27c2f5a9b9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Real-time Physics Simulation"
    },
    {
      url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Custom Engineering Solutions"
    },
    {
      url: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Multi-platform Integration"
    },
    {
      url: "https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Racing Telemetry Systems"
    },
    {
      url: "https://images.unsplash.com/photo-1593108408993-58ee9c7825c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Precision Control Systems"
    },
    {
      url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Advanced Aerodynamics"
    },
    {
      url: "https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Virtual Reality Integration"
    }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoRotate) {
      interval = setInterval(() => {
        setActiveImage((prev) => (prev + 1) % carouselImages.length);
      }, 3000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRotate, carouselImages.length]);

  // Play video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video play failed:", error);
      });
    }
  }, []);

  // Pause auto-rotation when hovering over carousel container
  const handleMouseEnter = () => setAutoRotate(false);
  const handleMouseLeave = () => setAutoRotate(true);

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  // Calculate positions for circular carousel with improved 3D effect
  const getImageStyle = (index: number) => {
    const totalImages = carouselImages.length;
    const angleStep = (2 * Math.PI) / totalImages;
    const radius = 200; // Radius of the circle
    
    // Calculate the angle for this image (with smooth transition)
    const angle = angleStep * ((index - activeImage + totalImages) % totalImages);
    
    // Calculate x and y positions on the circle
    const x = Math.sin(angle) * radius;
    const y = -Math.cos(angle) * radius * 0.3; // Flatten the circle to make it more like an oval
    const z = -Math.cos(angle) * 100; // Add z-axis movement for better 3D effect
    
    // Calculate scale based on position (front items are larger)
    // Images at the front (y > 0) should be larger
    const scale = 0.5 + (y + radius * 0.3) / (2 * radius * 0.3) * 0.5;
    
    // Calculate z-index based on y position
    const zIndex = Math.round(50 + (y + radius * 0.3) / (radius * 0.3) * 50);
    
    // Calculate opacity based on position (front items are more visible)
    const opacity = 0.3 + (y + radius * 0.3) / (radius * 0.3) * 0.7;
    
    // Calculate blur for items in the back
    const blur = Math.max(0, 2 - (y + radius * 0.3) / (radius * 0.15));
    
    return {
      transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`,
      filter: `blur(${blur}px)`,
      zIndex,
      opacity,
      transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
    };
  };

  const techItems = [
    {
      icon: <Cpu className="w-5 h-5 text-primary-400" />,
      title: 'Advanced Processing',
      description: 'State-of-the-art data processing for accurate simulations',
      details: 'Our proprietary algorithms process terabytes of real-world data to create the most accurate digital representations of tracks and vehicles. This allows for unprecedented levels of realism in our simulations.',
      features: [
        'Multi-threaded computation',
        'Cloud-based processing',
        'Real-time data analysis',
        'Machine learning optimization'
      ]
    },
    {
      icon: <Gauge className="w-5 h-5 text-primary-400" />,
      title: 'Real-time Physics',
      description: 'Precise physics calculations for authentic driving feel',
      details: 'Our physics engine calculates thousands of parameters in real-time to deliver the most authentic driving experience. From tire grip to aerodynamics, every aspect is meticulously simulated.',
      features: [
        'Advanced tire models',
        'Realistic suspension dynamics',
        'Accurate aerodynamic simulation',
        'Detailed surface friction modeling'
      ]
    },
    {
      icon: <Cog className="w-5 h-5 text-primary-400" />,
      title: 'Custom Engineering',
      description: 'Tailored solutions for specific racing requirements',
      details: 'We work closely with racing teams and manufacturers to develop custom solutions that meet their specific needs. Our engineering team can adapt our technology to any racing discipline or vehicle type.',
      features: [
        'Bespoke simulation platforms',
        'Custom hardware integration',
        'Specialized training modules',
        'Team-specific data analysis tools'
      ]
    },
    {
      icon: <Layers className="w-5 h-5 text-primary-400" />,
      title: 'Multi-platform Support',
      description: 'Compatible with all major simulation platforms',
      details: 'Our technology seamlessly integrates with all major simulation platforms, ensuring that our clients can use our solutions regardless of their existing infrastructure. We support PC, console, and mobile platforms.',
      features: [
        'Cross-platform compatibility',
        'Cloud synchronization',
        'API integration',
        'Consistent experience across devices'
      ]
    },
  ];

  const tabVariants = {
    inactive: { opacity: 0.7, y: 0 },
    active: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="technology" className="py-16 bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-5 grid-pattern"></div>
      <div className="absolute inset-0 z-0 noise-bg"></div>
      
      <div className="relative z-10 overflow-hidden mb-12">
        {/* Video background with blue fade */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-city-at-night-11748-large.mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-dark-900/80 to-dark-900"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 1, y: 0 }}
              className="inline-block px-3 py-1 rounded-full bg-primary-900/80 text-primary-400 text-xs font-medium mb-3 border border-primary-800"
            >
              Our Technology
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 1, y: 0 }}
              className="text-xl md:text-2xl font-bold mb-3"
            >
              Next-Generation <span className="text-gradient">Simulation</span> Technology
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 1, scaleX: 1 }}
              className="h-1 w-16 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-4"
            ></motion.div>
            
            <motion.p
              initial={{ opacity: 1, y: 0 }}
              className="text-gray-300 text-xs md:text-sm leading-relaxed"
            >
              We are committed to providing our clients with the best resources and technologies available to help them reach their goals. The tools we offer have been carefully selected and developed using the latest technology to support our clients' growth and success.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Improved 3D Circular Image Carousel */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 mb-20">
        <div className="relative h-[500px] flex items-center justify-center perspective">
          <motion.div 
            ref={carouselRef}
            className="relative w-full h-full flex items-center justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ 
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* 3D scene background */}
            <div className="absolute inset-0 bg-gradient-radial from-primary-900/5 to-transparent rounded-full" style={{ width: '600px', height: '600px', left: 'calc(50% - 300px)', top: 'calc(50% - 300px)' }}></div>
            
            {/* Carousel images with improved 3D effect - removed click and hover interactions */}
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className="absolute rounded-xl overflow-hidden shadow-lg border border-primary-800/30 bg-dark-800/50 backdrop-blur-sm"
                style={{
                  width: '280px',
                  height: '180px',
                  transformStyle: 'preserve-3d',
                  ...getImageStyle(index)
                }}
              >
                <div className="relative w-full h-full">
                  <img 
                    src={image.url} 
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/40 to-transparent"></div>
                  
                  {index === activeImage && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></div>
                        <span className="text-xs text-primary-400 font-medium">Featured</span>
                      </div>
                      <h3 className="text-xs font-bold truncate">{image.title}</h3>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Navigation buttons */}
            <button 
              className="absolute left-4 z-50 p-2 rounded-full bg-dark-800/80 backdrop-blur-sm border border-primary-800/30 text-white hover:bg-primary-900/80 transition-colors duration-300"
              onClick={prevImage}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button 
              className="absolute right-4 z-50 p-2 rounded-full bg-dark-800/80 backdrop-blur-sm border border-primary-800/30 text-white hover:bg-primary-900/80 transition-colors duration-300"
              onClick={nextImage}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
          
          {/* Active image info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute -bottom-10 left-0 right-0 text-center"
            >
              <h3 className="text-base font-bold text-primary-400">{carouselImages[activeImage].title}</h3>
              <div className="flex justify-center mt-2 space-x-1">
                {carouselImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeImage ? 'bg-primary-500 w-4' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-3">
            {techItems.map((item, index) => (
              <motion.div
                key={index}
                variants={tabVariants}
                initial="inactive"
                animate={activeTab === index ? "active" : "inactive"}
                onClick={() => setActiveTab(index)}
                className={`bg-dark-800/50 backdrop-blur-sm rounded-lg p-4 border cursor-pointer transition-all duration-300 ${
                  activeTab === index 
                    ? "border-primary-500 shadow-lg shadow-primary-500/10" 
                    : "border-dark-700 hover:border-primary-700"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${activeTab === index ? "bg-primary-900" : "bg-dark-800/80"}`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className={`text-sm font-semibold mb-1 ${activeTab === index ? "text-primary-400" : "text-white"}`}>
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-xs">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8"
          >
            <div className="bg-dark-900/80 backdrop-blur-md rounded-xl overflow-hidden border border-dark-700">
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 to-dark-900/80 z-10"></div>
                <img 
                  src={`https://images.unsplash.com/photo-${activeTab === 0 ? '1504276048855-f3d60e69632f' : activeTab === 1 ? '1511994476040-27c2f5a9b9b1' : activeTab === 2 ? '1568605117036-5fe5e7bab0b7' : '1542281286-9e0a16bb7366'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`} 
                  alt={techItems[activeTab].title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
                    <span className="text-xs text-primary-400 font-medium uppercase tracking-wider">
                      Featured Technology
                    </span>
                  </div>
                  <h3 className="text-base font-bold">{techItems[activeTab].title}</h3>
                </div>
              </div>
              
              <div className="p-5">
                <p className="text-gray-300 mb-5 leading-relaxed text-xs">
                  {techItems[activeTab].details}
                </p>
                
                <h4 className="text-sm font-semibold mb-3">Key Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {techItems[activeTab].features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3 h-3 text-primary-500 mt-0.5" />
                      <span className="text-gray-300 text-xs">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <motion.div className="mt-6">
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-xs font-medium hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-3 h-3" />
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
