import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PageTransition — overlay de chargement initial
 * inspiré de la transition "Load Norris" du site Lando Norris.
 * S'efface après 1.8s avec un effet scale + opacity.
 */
export default function PageTransition() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Durée du splash screen : 1.8s
    const timer = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="page-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            transition: { duration: 0.65, ease: [0.65, 0.05, 0, 1] },
          }}
        >
          {/* Logo / nom du produit */}
          <motion.div
            className="page-overlay-logo"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          >
            Smart<span style={{ color: 'var(--color-coral)', fontStyle: 'italic' }}>Charge</span>
          </motion.div>

          {/* Ligne animée descendante (cue de chargement) */}
          <motion.div
            className="page-overlay-line"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
          />

          {/* Sous-titre */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
            }}
          >
            Chargement en cours…
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
