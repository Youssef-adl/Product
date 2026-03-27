import React, { useState, useEffect } from 'react';

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 2 : 100));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden">
      {/* BACKGROUND DATA STREAM */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
           style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #FFF 2px, #FFF 4px)' }} />
      
      <div className="relative z-10 flex flex-col items-center gap-16">
        <div className="relative">
           {/* SPINNING MONOCOQUE */}
           <div className="w-40 h-40 border-8 border-white/5 border-t-[var(--color-racing-yellow)] rounded-none rotate-45 animate-spin duration-500" />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-[var(--color-racing-yellow)] rotate-45 animate-pulse" />
           </div>
        </div>

        <div className="flex flex-col items-center gap-8 text-center">
           <div className="headline-editorial text-5xl lg:text-7xl text-solar-text-primary tracking-[0.5em] animate-pulse">
              SYS.INIT // LOADING
           </div>
           
           <div className="w-80 h-[2px] bg-white/10 relative">
              <div 
                className="absolute top-0 left-0 h-full bg-[var(--color-racing-yellow)] transition-all duration-300"
                style={{ width: `${progress}%`, boxShadow: '0 0 20px var(--color-racing-yellow)' }}
              />
           </div>

           <div className="title-tech text-[10px] text-[var(--color-racing-yellow)] tracking-[0.8em]">
              ESTABLISHING TELEMETRY LINK... {progress}%
           </div>
        </div>
      </div>

      {/* CORNER DATA */}
      <div className="absolute top-20 left-20 title-tech text-solar-text-muted opacity-50 text-xl tracking-[0.5em]">Solaris // SPEC-R</div>
      <div className="absolute bottom-20 right-20 title-tech text-solar-text-muted opacity-50 text-xl tracking-[0.5em]">EST. 2026 // MONACO</div>
    </div>
  );
}
