import { useEffect } from 'react';
import Lenis from 'lenis';

export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    
    // Initialize Lenis for cinematic smooth scrolling (Apple-grade feel)
    const lenis = new Lenis({
      duration: 0.8,                 // Faster momentum termination (was 1.2)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.0,
      smoothTouch: true,
      touchMultiplier: 2.0,          // snappier touch response
      infinite: false,
      wheelMultiplier: 1.0,          // standard wheel scroll multiplier
    });

    // Connect to requestAnimationFrame loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Store lenis instance on window for external access
    window.__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [enabled]);
}
