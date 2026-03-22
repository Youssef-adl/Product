import React from 'react';

export default function Gallery() {
  return (
    <section className="section bg-[#F5F5F5] py-40 overflow-hidden">
      <div className="container">
        <div className="col-span-12 flex flex-col gap-4 mb-20">
           <span className="title-tech text-[var(--color-racing-yellow)] bg-black px-4 py-1 w-fit text-xs tracking-widest">GALLERY // Hall of Fame</span>
           <h2 className="headline-editorial text-6xl lg:text-9xl text-black">
              L'ESTHÉTIQUE<br/>DU DÉTAIL.
           </h2>
        </div>

        {/* ASYMMETRIC GRID */}
        <div className="col-span-12 flex flex-col gap-10">
          
          {/* ROW 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
            <div className="lg:col-span-2 relative group overflow-hidden h-[500px] border-[4px] border-transparent hover:border-[var(--color-racing-yellow)] transition-all">
               <img src="/gallery_1.png" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105" alt="CNC Machining" />
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex items-end p-12">
                  <span className="title-tech text-[var(--color-racing-yellow)] text-4xl translate-y-20 group-hover:translate-y-0 transition-transform">STRUCTURE CNC ALUMIMIUM</span>
               </div>
            </div>
            <div className="bg-[#0A0A0A] p-12 flex flex-col justify-center gap-6 border-r-[8px] border-[var(--color-racing-yellow)]">
               <span className="title-tech text-[var(--color-racing-yellow)] tracking-widest">ENGINEERING NOTE</span>
               <p className="text-white/60 uppercase text-xs leading-loose tracking-widest">
                  Chaque courbe est calculée pour minimiser la résistance thermique et maximiser l'adhérence magnétique. Un ballet de précision microns-par-microns.
               </p>
            </div>
          </div>

          {/* TECH STRIP */}
          <div className="w-full h-10 bg-[var(--color-racing-yellow)] flex items-center overflow-hidden">
             <div className="whitespace-nowrap animate-marquee flex gap-20">
                {[1,2,3,4,5,6].map(i => (
                  <span key={i} className="title-tech text-black text-sm tracking-[0.5em]">CNC MACHINED ALUMINIUM // SERIES 7075-T6 // 0.01MM TOLERANCE</span>
                ))}
             </div>
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
             <div className="bg-[#1F1F1F] p-12 flex flex-col justify-center gap-6">
                <span className="title-tech text-[var(--color-racing-yellow)] tracking-widest">DATA SPEC</span>
                <div className="flex flex-col gap-4">
                   <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-[10px] text-white/40">MATIÈRE</span>
                      <span className="title-tech text-white text-xs">ALU 7075</span>
                   </div>
                   <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-[10px] text-white/40">POIDS</span>
                      <span className="title-tech text-white text-xs">142G</span>
                   </div>
                </div>
             </div>
             <div className="relative group overflow-hidden h-[400px]">
                <img src="/gallery_2.png" className="w-full h-full object-cover" alt="Coil detail" />
                <div className="absolute inset-0 border-[10px] border-[var(--color-racing-yellow)] opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
             <div className="relative group overflow-hidden h-[400px]">
                <img src="/hero-charger.png" className="w-full h-full object-contain p-10 bg-white" alt="Full view" />
                <div className="absolute inset-0 bg-[rgba(223,255,0,0.1)] opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
