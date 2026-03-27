import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-transparent">
      
      <div className="container-solar relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col items-start text-left max-w-2xl">
          <motion.h1 
            className="font-heading text-6xl md:text-8xl lg:text-[7rem] tracking-tighter text-solar-text-primary mb-2 leading-[0.85] font-[950] uppercase italic"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            SOLARIS <br /> LUX.
          </motion.h1>
          
          <motion.h2 
            className="font-heading text-4xl md:text-5xl lg:text-5xl text-solar-text-primary mb-8 font-light tracking-tight"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            L'essentiel redéfini.
          </motion.h2>
          
          <motion.p 
            className="font-sans text-lg md:text-xl text-solar-text-secondary mb-12 font-normal max-w-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Dites au revoir à la complexité. La station de charge sans fil premium qui s'intègre naturellement à votre espace, sans distractions.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/boutique" className="btn-primary rounded-full px-10 py-5 shadow-xl !bg-[#8B9474] !border-[#8B9474] hover:!bg-solar-text-primary transition-colors">
              DÉCOUVRIR L'ESSENTIEL
            </Link>
            <Link to="/technique" className="px-10 py-5 rounded-full border border-solar-glass-border font-heading font-black text-xs tracking-[0.2em] text-solar-text-primary hover:bg-white/50 transition-all uppercase">
              SPÉCIFICATIONS
            </Link>
          </motion.div>
        </div>

        {/* Right Content — Product Image */}
        <motion.div 
          className="relative flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            x: 0,
            y: [0, -15, 0] 
          }}
          transition={{ 
            opacity: { duration: 1 },
            scale: { duration: 1 },
            x: { duration: 1 },
            y: { 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }
          }}
        >
          <img 
            src="/product-v1.png" 
            alt="Solaris Lux Minimalist Edition" 
            className="w-full max-w-lg h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-transform duration-1000 hover:scale-105"
          />
          
          {/* Subtle Reflection Effect */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-black/5 blur-3xl rounded-[100%] pointer-events-none" />
        </motion.div>
      </div>
      
    </section>
  );
}
