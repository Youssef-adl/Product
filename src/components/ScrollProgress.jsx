import React, { useEffect, useState } from 'react';

/**
 * ScrollProgress — fine coral/gold bar at very top of viewport
 * fills from 0 → 100% as user scrolls down the page.
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
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[2px] pointer-events-none">
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(to right, #E85D4E, #FFB347)',
          transition: 'width 0.05s linear',
          boxShadow: '0 0 6px rgba(232, 93, 78, 0.5)',
        }}
      />
    </div>
  );
}
