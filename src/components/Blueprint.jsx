import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Blueprint = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 150);
    };

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden opacity-30">
      {/* Precision Grid */}
      <div 
        className="absolute inset-0 transition-opacity "
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: isScrolling ? 0.6 : 0.2
        }}
      />

      {/* Crosshair Follower */}
      <motion.div
        className="absolute w-20 h-20 flex items-center justify-center"
        animate={{ x: mousePos.x - 40, y: mousePos.y - 40 }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
      >
        <div className="w-[1px] h-full bg-coral/30 absolute top-0" />
        <div className="w-full h-[1px] bg-coral/30 absolute left-0" />
        <div className="w-2 h-2 border border-coral/50 rounded-full" />
        
        {/* Coordinate Text */}
        <div className="absolute top-0 left-6 whitespace-nowrap">
           <span className="font-mono text-[8px] text-coral font-black uppercase tracking-[0.3em]">
             X:{Math.round(mousePos.x)} Y:{Math.round(mousePos.y)}
           </span>
        </div>
      </motion.div>

      {/* Edge Counters (Industrial Aesthetic) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-20 py-4 opacity-10">
         {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(n => (
           <span key={n} className="font-mono text-[7px] text-text-primary font-bold">{n}% SCALE</span>
         ))}
      </div>

      {/* Floating Blueprint Markers */}
      <div className="absolute inset-0">
        {[
          { x: '10%', y: '15%', label: 'DET_01 / SRC' },
          { x: '85%', y: '10%', label: 'VCC_IN / 15W' },
          { x: '5%', y: '85%', label: 'GND_BUS / SHIELD' },
          { x: '92%', y: '88%', label: 'TX_RX_PROTO' }
        ].map((marker, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            className="absolute flex flex-col gap-1"
            style={{ left: marker.x, top: marker.y }}
          >
            <div className="w-1 h-1 bg-coral rounded-full" />
            <span className="font-mono text-[7px] text-text-muted font-black tracking-tighter uppercase">{marker.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blueprint;
