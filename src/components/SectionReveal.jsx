"use client";

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * SectionReveal — Wraps any section/component with a scroll-triggered animation.
 * 
 * @param {string} variant - Animation style: 'fade', 'slide-up', 'slide-left', 'slide-right', 'scale', 'clip-up', 'split'
 * @param {number} delay - Optional delay in seconds
 * @param {number} duration - Animation duration in seconds (default 0.9)
 * @param {string} className - Extra classes for the wrapper
 */

const variants = {
  'fade': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'slide-up': {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  'scale': {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
  'clip-up': {
    hidden: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
    visible: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 },
  },
  'skew-up': {
    hidden: { opacity: 0, y: 80, skewY: 4 },
    visible: { opacity: 1, y: 0, skewY: 0 },
  },
};

export default function SectionReveal({
  children,
  variant = 'slide-up',
  delay = 0,
  duration = 0.9,
  className = '',
  once = true,
  margin = "-10%",
}) {
  const selected = variants[variant] || variants['slide-up'];

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={selected}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
