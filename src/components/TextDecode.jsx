'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function TextDecode({ text, className = "", delay = 0 }) {
  const [displayText, setDisplayText] = useState(text);
  const [isClient, setIsClient] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !isInView || hasAnimated) return;

    let timeout;
    let interval;

    // Optional: Scramble initially before decoding
    const initialScramble = text.split("").map(() => chars[Math.floor(Math.random() * chars.length)]).join("");
    setDisplayText(initialScramble);

    timeout = setTimeout(() => {
      let iterations = 0;
      
      interval = setInterval(() => {
        setDisplayText(prev => 
          text
            .split("")
            .map((letter, index) => {
              if (index < iterations) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iterations >= text.length) {
          clearInterval(interval);
          setHasAnimated(true);
        }
        
        iterations += 1 / 3;
      }, 30);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [isClient, isInView, hasAnimated, delay, text]);

  return (
    <span ref={ref} className={`${className} font-mono inline-block`}>
      {displayText}
    </span>
  );
}
