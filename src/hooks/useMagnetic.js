import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function useMagnetic() {
  const magneticRef = useRef(null);

  useEffect(() => {
    const el = magneticRef.current;
    if (!el) return;

    const xTo = gsap.to(el, { duration: 1, x: 0, ease: 'elastic.out(1, 0.3)', paused: true });
    const yTo = gsap.to(el, { duration: 1, y: 0, ease: 'elastic.out(1, 0.3)', paused: true });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      const distance = Math.sqrt(x*x + y*y);
      const magnetRadius = width * 1.5; // Dynamic radius based on element size

      if (distance < magnetRadius) {
        // High-end elastic pull
        gsap.to(el, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 1,
          ease: 'power4.out',
          overwrite: 'auto'
        });
      } else {
        handleMouseLeave();
      }
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 1.5,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return magneticRef;
}
