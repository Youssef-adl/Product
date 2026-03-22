import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-deep pt-40 pb-20 relative overflow-hidden border-t border-gold-sun/10">
      
      {/* WATERMARK SOLARIS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[15vw] text-white/[0.02] pointer-events-none select-none whitespace-nowrap italic">
         SOLARIS LUX
      </div>

      <div className="container-solar relative z-10">
        <div className="grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4 flex flex-col gap-10">
            <Link to="/" className="title-solar text-4xl text-white hover:text-gold-sun transition-colors">
              SOLARIS
            </Link>
            <p className="max-w-xs font-sans text-xs uppercase tracking-[0.2em] leading-loose text-slate-300">
               CONÇU DANS LA LUMIÈRE. FORGÉ PAR DES MAINS EXPERTES. 
               L'ARTEFACT ULTIME POUR L'ÈRE MODERNE.
            </p>
            <div className="flex gap-10">
              {[Instagram, Twitter, Github].map((Icon, i) => (
                <a key={i} href="#" className="text-slate-300 hover:text-gold-sun transition-all">
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-20">
             <div className="flex flex-col gap-10">
                <h4 className="subtitle-silk !text-slate-100">NAVIGATION</h4>
                <div className="flex flex-col gap-6">
                   <Link to="/" className="font-sans text-[11px] tracking-widest text-slate-300 hover:text-white transition-colors">ACCUEIL</Link>
                   <Link to="/boutique" className="font-sans text-[11px] tracking-widest text-slate-300 hover:text-white transition-colors">BOUTIQUE</Link>
                   <Link to="/technique" className="font-sans text-[11px] tracking-widest text-slate-300 hover:text-white transition-colors">TÉLÉMÉTRIE</Link>
                </div>
             </div>

             <div className="flex flex-col gap-10">
                <h4 className="subtitle-silk !text-slate-100">PROTOCOLE</h4>
                <div className="flex flex-col gap-6">
                   <Link to="#" className="font-sans text-[11px] tracking-widest text-slate-300 hover:text-white transition-colors">CONFIDENTIALITÉ</Link>
                   <Link to="#" className="font-sans text-[11px] tracking-widest text-slate-300 hover:text-white transition-colors">TERMES</Link>
                   <Link to="#" className="font-sans text-[11px] tracking-widest text-slate-300 hover:text-white transition-colors">COOKIES</Link>
                </div>
             </div>

             <div className="flex flex-col gap-10">
                <h4 className="subtitle-silk !text-slate-100">MAISON</h4>
                <div className="flex flex-col gap-6">
                   <div className="font-sans text-[11px] tracking-widest text-slate-400">© 2026 SOLARIS LUX</div>
                   <div className="font-sans text-[11px] tracking-widest text-gold-sun font-semibold">DIVISION LUMIÈRE</div>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-40 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
           <span className="font-sans text-[10px] tracking-[0.3em] text-slate-600 uppercase">EST. 2026 // MANUFACTURE CÉLESTE</span>
           <div className="flex items-center gap-3">
              <Sparkles size={14} className="text-gold-sun animate-pulse" />
              <span className="font-sans text-[10px] tracking-[0.3em] text-gold-sun uppercase font-bold">SYSTÈME EN LIGNE</span>
           </div>
        </div>
      </div>
    </footer>
  );
}
