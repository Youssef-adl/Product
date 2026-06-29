"use client";

import React, { useEffect, useState } from 'react';

/**
 * ScrollProgress — Rainbow gradient progress bar with glow
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none">
      <div
        className="scroll-progress-bar"
        style={{
          height: '100%',
          width: `${progress}%`,
        }}
      />
    </div>
  );
}
