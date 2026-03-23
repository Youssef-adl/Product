import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('solaris-theme') || 'solar';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('solaris-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'solar' ? 'eclipse' : 'solar');
  };

  return (
    <motion.button
      onClick={toggleTheme}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-10 left-10 z-[100] px-6 h-14 bg-glass-bg backdrop-blur-3xl border border-glass-border rounded-2xl flex items-center gap-4 shadow-2xl overflow-hidden group transition-all duration-500"
    >
      {/* GLOW EFFECT */}
      <div className="absolute inset-0 bg-accent-sun/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ y: 15, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -15, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          {theme === 'solar' ? (
            <Sun className="text-accent-sun w-5 h-5" strokeWidth={2.5} />
          ) : (
            <Moon className="text-accent-sun w-5 h-5" strokeWidth={2.5} />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col items-start pr-2">
        <span className="font-sans text-[9px] font-black tracking-[0.2em] text-accent-sun uppercase leading-none">
          Mode
        </span>
        <span className="font-sans text-[11px] font-bold tracking-[0.1em] text-text-primary uppercase leading-tight">
          {theme === 'solar' ? 'Solaire' : 'Éclipse'}
        </span>
      </div>

      {/* RIPPLE EFFECT */}
      <motion.div 
        className="absolute inset-0 bg-accent-sun/10 pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 4, opacity: 0.2 }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
}
