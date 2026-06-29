"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useSoundEffects } from '../hooks/useSoundEffects';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { playSound } = useSoundEffects();

  const handleToggle = () => {
    playSound?.('action');
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[var(--surface)] border border-[var(--border-light)] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        {theme === 'dark' ? (
          <motion.div
            key="moon"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="w-6 h-6 text-[var(--accent-secondary)]" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="w-6 h-6 text-[var(--accent-primary)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
