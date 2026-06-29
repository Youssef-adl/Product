import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * useTilt hook — Provides a premium 3D tilt interaction with dynamic glare.
 * Inspired by luxury tech branding (Apple/Stripe).
 * 
 * @param {Object} options 
 * @param {number} options.max - Max rotation in degrees (default: 10)
 * @param {number} options.perspective - 3D perspective (default: 1000)
 * @param {number} options.scale - Scale on hover (default: 1.02)
 * @param {boolean} options.glare - Whether to add glare effect (default: true)
 * @param {number} options.glareOpacity - Max glare opacity (default: 0.5)
 */
export default function useTilt(options = {}) {
  const {
    max = 8,
    perspective = 1200,
    scale = 1.02,
    glare = true,
    glareOpacity = 0.4,
    speed = 1.5,
  } = options;

  const tiltRef = useRef(null);
  const glareRef = useRef(null);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;

    // Initialize container styles
    gsap.set(el, { 
      perspective, 
      transformStyle: 'preserve-3d',
      willChange: 'transform'
    });

    let glareEl;
    if (glare) {
      glareEl = document.createElement('div');
      glareEl.className = 'tilt-glare';
      Object.assign(glareEl.style, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 70%)',
        opacity: '0',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: '10',
        mixBlendMode: 'overlay',
      });
      el.appendChild(glareEl);
      glareRef.current = glareEl;
    }

    const handleMouseMove = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      const rotateX = (y - 0.5) * -max;
      const rotateY = (x - 0.5) * max;

      gsap.to(el, {
        rotateX,
        rotateY,
        scale,
        duration: speed,
        ease: 'power3.out',
        overwrite: 'auto'
      });

      if (glareEl) {
        gsap.to(glareEl, {
          x: (x - 0.5) * 100,
          y: (y - 0.5) * 100,
          opacity: glareOpacity,
          duration: speed,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: speed * 1.5,
        ease: 'elastic.out(1, 0.3)',
        overwrite: 'auto'
      });

      if (glareEl) {
        gsap.to(glareEl, {
          opacity: 0,
          duration: speed,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      if (glareEl) el.removeChild(glareEl);
    };
  }, [max, perspective, scale, glare, glareOpacity, speed]);

  return tiltRef;
}
