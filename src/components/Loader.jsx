"use client";

import React, { useState, useEffect } from 'react';

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0: init, 1: loading, 2: almost done

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev < 100 ? prev + 1.5 : 100;
        if (next > 30) setPhase(1);
        if (next > 80) setPhase(2);
        return next;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const phaseLabel = [
    'RÉVEIL DU SEIGNEUR SANGUIN',
    'COLLECTE DES RÊVES',
    'ASCENSION ÉTERNELLE',
  ][phase];

  return (
    <div className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden font-sans select-none">

      {/* Cinematic radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(136, 8, 8, 0.08) 0%, transparent 70%)' }} />

      {/* Subtle scanlines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,1) 3px, rgba(255,255,255,1) 4px)' }} />

      {/* TOP-LEFT corner brand */}
      <div className="absolute top-10 left-10 flex items-center gap-3 opacity-30">
        <div className="w-2 h-2 rounded-full bg-[#880808]" />
        <span className="font-black text-[9px] text-white uppercase tracking-[0.5em] italic">Solaris Lux // SANGUINE EDITION</span>
      </div>

      {/* TOP-RIGHT status */}
      <div className="absolute top-10 right-10 opacity-30">
        <span className="font-mono text-[9px] text-white uppercase tracking-[0.3em]">LORD.RISE // v9.9.9</span>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col items-center gap-16">

        {/* LOGO MARK */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-[80px] lg:text-[120px] font-black text-white tracking-[-0.04em] leading-none uppercase italic"
            style={{ fontFamily: 'var(--font-heading, system-ui)' }}>
            SOLARIS
          </h1>
          <span className="text-[11px] font-black text-[#880808] tracking-[1.2em] uppercase">L U X</span>
        </div>

        {/* ANIMATED PROGRESS RING */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 80 80">
            {/* Track */}
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(136, 8, 8, 0.05)" strokeWidth="1.5" />
            {/* Progress arc */}
            <circle
              cx="40" cy="40" r="34"
              fill="none"
              stroke="#880808"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 34}`}
              strokeDashoffset={`${2 * Math.PI * 34 * (1 - progress / 100)}`}
              style={{
                transition: 'stroke-dashoffset 0.3s ease',
                filter: 'drop-shadow(0 0 10px rgba(136, 8, 8, 0.8))'
              }}
            />
          </svg>
          {/* Center percentage */}
          <span className="font-mono text-[14px] font-black text-[#880808] tracking-tight">
            {Math.round(progress)}%
          </span>
        </div>

        {/* PROGRESS BAR */}
        <div className="flex flex-col items-center gap-6 w-80">
          <div className="w-full h-[1px] bg-white/5 relative overflow-hidden rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-[#880808] to-[#B8860B] rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 20px rgba(136, 8, 8, 0.5), 0 0 40px rgba(184, 134, 11, 0.2)'
              }}
            />
          </div>
          <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.6em] italic transition-all duration-700">
            {phaseLabel}
          </p>
        </div>
      </div>

      {/* BOTTOM-RIGHT corner */}
      <div className="absolute bottom-10 right-10 opacity-20">
        <span className="font-mono text-[8px] text-white uppercase tracking-[0.3em]">ETERNAL // BLOOD AND GOLD</span>
      </div>

    </div>
  );
}
