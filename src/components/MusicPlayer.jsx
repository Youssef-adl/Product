"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.log("Music play blocked. Interaction needed.");
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-10 left-10 z-[5000] flex items-center gap-4">
      <audio 
        ref={audioRef} 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3" // Placeholder for atmospheric track
        loop 
      />
      
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 bg-black/40 backdrop-blur-xl border border-white/5 rounded-full flex items-center justify-center text-white/60 hover:text-[#880808] transition-colors group shadow-2xl"
      >
        {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
        
        {/* Animated Rings when playing */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 border border-[#880808]/40 rounded-full"
            />
          )}
        </AnimatePresence>
      </motion.button>

      <div className="flex flex-col">
        <span className="text-[8px] font-black tracking-[0.4em] text-white/20 uppercase font-heading">Audio Atmos.</span>
        <span className="text-[10px] font-bold text-white/40 font-heading uppercase italic tracking-tight">
          {isPlaying ? 'Sanguine Symphony' : 'Silencieux'}
        </span>
      </div>
    </div>
  );
}
