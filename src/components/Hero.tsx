import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();

    // Particle system
    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1.5; // Larger particles
        this.color = `rgba(0, 195, 255, ${Math.random() * 0.8 + 0.4})`; // Brighter color
        this.vx = (Math.random() - 0.5) * 1.2; // Faster random movement
        this.vy = (Math.random() - 0.5) * 1.2;
      }
      
      update() {
        // Move particles with constant random movement
        this.x += this.vx;
        this.y += this.vy;
        
        // Boundary check with bounce
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particles
    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 8), 180); // More particles
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Animation loop
    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
        
        // Draw connections with brighter colors
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          
          // Calculate distance
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Draw line if particles are close enough - increased connection distance
          if (distance < 150) {
            // Calculate opacity based on distance - brighter connections
            const opacity = (1 - distance / 150) * 0.8;
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 195, 255, ${opacity})`; // Brighter blue
            ctx.lineWidth = 0.8; // Thicker lines
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      setCanvasSize();
      
      // Adjust particle positions
      for (let i = 0; i < particles.length; i++) {
        particles[i].x = Math.random() * canvas.width;
        particles[i].y = Math.random() * canvas.height;
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-dark-900">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ 
          background: 'linear-gradient(135deg, #000c1f 0%, #001940 100%)',
        }}
      />
      
      <div className="absolute inset-0 z-0 opacity-10 hexagon-bg"></div>
      <div className="absolute inset-0 z-0 noise-bg"></div>
      
      <motion.div 
        className="absolute inset-0 z-10 bg-gradient-to-b from-dark-900/80 to-dark-900/40 pointer-events-none"
        style={{ opacity }}
      />
      
      <div className="container mx-auto px-4 md:px-6 z-20 pt-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left"
            style={{ y }}
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block px-3 py-1 rounded-full bg-primary-900/80 text-primary-400 text-xs font-medium mb-4 border border-primary-800"
            >
              Next-Generation Simulation
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4"
            >
              Pioneering the Future of{' '}
              <span className="text-gradient relative">
                Motorsport
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C32.3333 1.16667 149.6 -4.7 299 10.5" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="paint0_linear" x1="1" y1="5.5" x2="299" y2="5.5" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#0073FF" stopOpacity="0"/>
                      <stop offset="0.5" stopColor="#00C3FF"/>
                      <stop offset="1" stopColor="#0073FF" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>{' '}
              <span className="text-gradient-purple">&</span>{' '}
              <span className="text-gradient">Driving Simulation</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm md:text-base text-gray-300 mb-6 max-w-xl mx-auto lg:mx-0"
            >
              Redefining the world of motorsport simulation through cutting-edge technology, 
              expert craftsmanship, and unparalleled attention to detail.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-md bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium text-sm shadow-lg hover:shadow-primary-500/30 transition-all duration-300 btn-glow"
              >
                Get Started
              </motion.a>
              
              <motion.a
                href="#technology"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-md bg-dark-800/80 text-white font-medium text-sm border border-primary-800/30 hover:border-primary-600/50 transition-all duration-300"
              >
                Explore Technology
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
          >
            {/* Elegant car image without 3D effect, larger size */}
            <div className="relative w-full h-[400px] md:h-[450px] rounded-xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <motion.img
                src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                alt="Racing Simulation"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
                  <span className="text-xs text-primary-400 font-medium uppercase tracking-wider">Live Demo</span>
                </div>
                <h3 className="text-base font-bold mb-1">Ultra-Realistic Physics Engine</h3>
                <p className="text-gray-300 text-xs">Experience the most accurate driving simulation on the market</p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-secondary-500/20 blur-2xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-primary-500/20 blur-2xl"></div>
            
            {/* Removed the 99% accuracy rate card */}
            
            <motion.div
              className="absolute -top-4 -left-4 bg-dark-800/90 backdrop-blur-md rounded-lg p-3 shadow-xl border border-primary-800/30"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={{ y: 5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)" }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-secondary-900 flex items-center justify-center">
                  <span className="text-lg font-bold text-secondary-400">10K+</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Pro Drivers</h4>
                  <p className="text-xs text-gray-400">Trust our simulations</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
