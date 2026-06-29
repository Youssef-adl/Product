"use client";
import { useCallback } from 'react';

// Using unique, high-end cinematic sounds for a premium feel
const SFX = {
  click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', // The "Unique" Click
  hover: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', // The "Unique" Hover
};

export const useSoundEffects = () => {
  const playSound = useCallback((type) => {
    try {
      // Mapping all requests to our two unique sounds
      const soundFile = (type === 'click' || type === 'action') ? SFX.click : SFX.hover;
      
      const audio = new Audio(soundFile);
      audio.volume = 0.12; 
      audio.play().catch(err => {}); 
    } catch (e) {
      console.error("SFX Error:", e);
    }
  }, []);

  return { playSound };
};
