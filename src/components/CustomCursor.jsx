"use client";
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useSpring(0, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 50 });

  useEffect(() => {
    const moveMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      );
    };

    window.addEventListener('mousemove', moveMouse);
    return () => window.removeEventListener('mousemove', moveMouse);
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#880808] rounded-full pointer-events-none z-[10000] mix-blend-screen"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
      />
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#B8860B]/50 rounded-full pointer-events-none z-[9999]"
        style={{ 
          x: mouseX, 
          y: mouseY, 
          translateX: '-50%', 
          translateY: '-50%' 
        }}
        animate={{
          scale: isPointer ? 2.5 : 1,
          opacity: isPointer ? 0.3 : 0.6,
          borderColor: isPointer ? '#880808' : '#B8860B',
          borderWidth: isPointer ? '2px' : '1px'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </>
  );
}
