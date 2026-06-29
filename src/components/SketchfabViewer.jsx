"use client";

import React from 'react';

const SketchfabViewer = ({ modelId, title = "3D Model" }) => {
  return (
    <div className="sketchfab-embed-wrapper w-full h-full min-h-[400px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-black/20 backdrop-blur-sm group">
      <iframe 
        title={title}
        frameBorder="0" 
        allowFullScreen 
        mozallowfullscreen="true" 
        webkitallowfullscreen="true" 
        allow="autoplay; fullscreen; xr-spatial-tracking" 
        xr-spatial-tracking 
        execution-while-out-of-viewport 
        execution-while-not-rendered 
        web-share 
        src={`https://sketchfab.com/models/${modelId}/embed?autostart=1&dnt=1&ui_theme=dark&transparent=1`}
        className="w-full h-full aspect-video lg:aspect-square"
      ></iframe>
      
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
         <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 inline-flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full animate-pulse" />
            <span className="text-[9px] font-black text-white uppercase tracking-widest">{title} // LIVE RENDER</span>
         </div>
      </div>
    </div>
  );
};

export default SketchfabViewer;
