'use client';

import PixelTrail from '../../components/PixelTrail';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PixelTrailDemo() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-hidden flex flex-col items-center justify-center">
      {/* Background Pixel Trail */}
      <div className="absolute inset-0 z-0">
        <PixelTrail
          gridSize={60}
          trailSize={0.12}
          maxAge={300}
          interpolate={6}
          color="#d4af37" // Golden color for Solaris Lux
          gooeyFilter={{ id: "demo-goo-filter", strength: 3 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pointer-events-none">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[rgba(136, 8, 8,0.3)] bg-[rgba(136, 8, 8,0.05)] text-[#d4af37] text-sm font-medium tracking-[0.2em] uppercase animate-pulse">
          Premium Component Integration
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-[rgba(255,255,255,0.4)] bg-clip-text text-transparent">
          Pixel Trail
        </h1>
        
        <p className="text-xl md:text-2xl text-[rgba(255,255,255,0.6)] font-light leading-relaxed max-w-2xl mx-auto mb-12">
          Experience fluid, interactive particles that follow your every move. 
          A sophisticated addition to the Solaris Lux design system.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto">
          <Link 
            href="/"
            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold transition-all duration-300 hover:bg-[#d4af37] hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Home
          </Link>
          
          <button 
            className="px-8 py-4 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-white font-medium backdrop-blur-md transition-all duration-300 hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]"
            onClick={() => window.location.reload()}
          >
            Refresh Effect
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-12 left-0 right-0 text-center z-10 pointer-events-none">
        <div className="text-[rgba(255,255,255,0.3)] text-xs uppercase tracking-[0.3em] font-medium">
          Move your cursor to interact
        </div>
      </div>
      
      <style jsx>{`
        main {
          cursor: crosshair;
        }
      `}</style>
    </main>
  );
}
