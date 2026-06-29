"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function FounderCard({ 
  name, 
  role, 
  roleFull, 
  description, 
  image, 
  reversed = false, 
  accentColor = "var(--accent-primary)" 
}) {
  return (
    <motion.div 
      className={`flex items-center gap-8 group ${reversed ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Image Container */}
      <div className="relative">
        <div 
          className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border border-white/10 p-1.5 bg-black/40 backdrop-blur-md relative z-10"
          style={{ boxShadow: `0 20px 40px -10px ${accentColor}15` }}
        >
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-110 group-hover:scale-100"
          />
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute -inset-3 rounded-2xl border border-dashed opacity-20 pointer-events-none"
          style={{ borderColor: accentColor }}
          animate={{ rotate: reversed ? -360 : 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <div 
          className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border border-white/10 bg-black/80 flex items-center justify-center z-20"
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col gap-2">
        <div className="space-y-0">
          <span 
            className="text-[10px] font-black tracking-[0.5em] uppercase font-heading opacity-50"
            style={{ color: accentColor }}
          >
            {role}
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-[var(--text-primary)] uppercase tracking-tighter font-heading leading-none">
            {name}
          </h3>
        </div>
        
        <div 
          className={`flex flex-col ${reversed ? 'items-end' : 'items-start'} gap-3`}
        >
          <span className="text-[9px] font-bold text-[var(--text-subtle)] tracking-[0.2em] uppercase font-sans border-b border-white/5 pb-1">
            {roleFull}
          </span>
          <p className="text-[11px] text-[var(--text-muted)] max-w-[220px] leading-relaxed italic font-sans">
            "{description}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}
