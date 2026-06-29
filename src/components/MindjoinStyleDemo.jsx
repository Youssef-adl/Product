'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowRight, Cpu, Network, Zap } from 'lucide-react';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const COUNTER_DURATION = 1.5;

const AnimatedBar = ({ color, index }) => {
  const [mounted, setMounted] = useState(false);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    setConfig({
      height: 30 + Math.random() * 70,
      duration: 1 + Math.random(),
    });
    setMounted(true);
  }, []);

  if (!mounted || !config) return <div className="flex-1 relative" />;

  return (
    <div 
      className="flex-1 relative"
      style={{ 
        height: `${config.height}%`,
        animation: `float-bar ${config.duration}s infinite alternate ${index * 0.05}s`
      }}
    >
      <div className="absolute inset-0" style={{ backgroundColor: color }} />
      <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }} />
    </div>
  );
};

export default function MindjoinStyleDemo() {
  const [counters, setCounters] = useState([0, 0, 0]);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // --- ANIMATIONS ---
    let ctx = gsap.context(() => {
      // 1. Hero Parallax & Fade
      gsap.to('.hero-bg', {
        y: '20%',
        filter: 'brightness(0.05) contrast(1.2) saturate(1.2)',
        scrollTrigger: {
          trigger: '#hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
      gsap.to('.hero-ui', {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: '#hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // 2. Text Reveal Section
      gsap.fromTo('.main-text-line', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: '#text-section',
            start: 'top 70%',
          }
        }
      );
      gsap.fromTo('.main-text-p',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, delay: 0.6, ease: 'power3.out',
          scrollTrigger: {
            trigger: '#text-section',
            start: 'top 70%',
          }
        }
      );

      // 3. Solutions Section
      const cards = gsap.utils.toArray('.solution-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 150, rotateX: -10 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: 'expo.out',
            scrollTrigger: {
              trigger: '#solutions-section',
              start: 'top 75%',
            },
            delay: i * 0.2
          }
        );

        // Animate counter when card enters
        ScrollTrigger.create({
          trigger: card,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            const obj = { val: 0 };
            const target = i === 0 ? 99 : i === 1 ? 100 : 98;
            gsap.to(obj, {
              val: target,
              duration: COUNTER_DURATION,
              delay: i * 0.2,
              onUpdate: () => {
                setCounters(prev => {
                  const newCounters = [...prev];
                  newCounters[i] = Math.floor(obj.val);
                  return newCounters;
                });
              }
            });
          }
        });
      });

      // Floating animation for cards (infinite)
      gsap.to('.solution-card', {
        y: '-=15',
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: 'sine.inOut',
        stagger: 0.4
      });

      // 4. Return Hero / Background Color Change
      gsap.to('.app-container', {
        backgroundColor: '#030305',
        scrollTrigger: {
          trigger: '#footer-section',
          start: 'top 80%',
          end: 'bottom bottom',
          scrub: true,
        }
      });

      // 5. Footer Content
      gsap.fromTo('.footer-content',
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'expo.out',
          scrollTrigger: {
            trigger: '#footer-section',
            start: 'top 60%',
          }
        }
      );
      
      gsap.fromTo('.giant-logo',
        { scale: 0.9, opacity: 0, y: 50 },
        { scale: 1, opacity: 0.03, y: 0, duration: 2.5, ease: 'power3.out',
          scrollTrigger: {
            trigger: '#footer-section',
            start: 'top 60%',
          }
        }
      );

    });

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@1,400;1,600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        .font-space { font-family: 'Space Grotesk', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes float-bar {
          0% { height: 10%; opacity: 0.2; }
          100% { height: 90%; opacity: 0.8; }
        }
        @keyframes glitch {
          0% { opacity: 1; transform: translate(0); }
          20% { opacity: 0.8; transform: translate(-2px, 1px); }
          40% { opacity: 1; transform: translate(2px, -1px); }
          60% { opacity: 0.9; transform: translate(-1px, 2px); }
          80% { opacity: 1; transform: translate(1px, -2px); }
          100% { opacity: 1; transform: translate(0); }
        }
        .glitch-text { display: inline-block; animation: glitch 0.3s infinite; }
        
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.05;
          pointer-events: none;
        }
        .text-gradient {
          background: linear-gradient(180deg, #ffffff 0%, #a0a0a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .card-glass {
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255,255,255,0.1);
        }
      `}} />

      <div className="app-container relative w-full bg-[#000000] text-white font-inter selection:bg-amber-500/30 overflow-x-hidden">
        
        {/* Global Noise Overlay */}
        <div className="fixed inset-0 z-[100] mix-blend-overlay bg-noise" />

        {/* --- SECTION 1: HERO --- */}
        <section id="hero-section" className="relative w-full h-screen overflow-hidden">
          <div 
            className="hero-bg absolute inset-0 bg-cover bg-center h-[120%]"
            style={{
              backgroundImage: 'url("/solaris_lux_hero.png")',
              filter: 'brightness(0.35) contrast(1.2) saturate(1.2)',
              top: '-10%'
            }}
          >
            {/* Tech Grid Overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'linear-gradient(rgba(197, 160, 89, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(197, 160, 89, 0.2) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/50 to-[#000000] opacity-80 z-10 pointer-events-none" />
          
          {/* Overlay UI */}
          <div className="hero-ui absolute inset-0 z-20 pointer-events-none flex flex-col justify-between">
            {/* Top Nav */}
            <div className="w-full px-8 py-8 flex justify-between items-center">
              <div className="font-space font-bold text-2xl text-white">S</div>
              <div className="font-space font-bold tracking-[0.5em] text-white">SOLARIS LUX</div>
              <div className="font-mono text-[10px] tracking-widest border border-white/20 px-6 py-2 rounded-full text-white bg-white/5 backdrop-blur-sm pointer-events-auto cursor-pointer hover:bg-white/10 transition">CONTACT US</div>
            </div>
            
            {/* Labels */}
            <div className="w-full px-8 flex justify-between items-center opacity-70">
              <div className="-rotate-90 font-mono text-[10px] tracking-[0.4em] text-white">SOLAIRE</div>
              <div className="font-mono text-[10px] tracking-[0.4em] text-white opacity-20">DESIGN</div>
              <div className="rotate-90 font-mono text-[10px] tracking-[0.4em] text-white">AUTONOMIE</div>
            </div>
            
            {/* Bottom Tagline */}
            <div className="w-full text-center pb-12">
              <div className="font-mono text-[10px] tracking-[0.4em] text-white/60 uppercase">L'ÉNERGIE SOLAIRE DANS VOTRE POCHE.</div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: TRANSITION & MAIN TEXT --- */}
        <section id="text-section" className="relative w-full min-h-[120vh] bg-black flex flex-col items-center justify-center z-20 py-20 overflow-hidden">
          
          {/* Hacker Terminal Grid Background */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:40px_40px]" />
            
            <div className="flex gap-20 md:gap-40 relative z-10 w-full justify-center opacity-40">
              {[0, 1, 2].map((col) => (
                <div key={col} className="flex flex-col gap-4 text-white relative h-[100vh] overflow-hidden w-20">
                  {/* Moving chevron column */}
                  <div className="flex flex-col items-center absolute w-full top-0" style={{ animation: `scanline ${3 + col * 0.8}s linear infinite` }}>
                    {[...Array(15)].map((_, i) => (
                      <div key={i} className="text-white/80 font-mono text-2xl rotate-90 my-2 drop-shadow-[0_0_8px_#fff]">
                        {">>>"}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-30 max-w-6xl px-6 w-full text-center">
            <div className="font-mono text-4xl md:text-6xl font-bold tracking-tight uppercase leading-[1.2] text-white">
              {["SOLARIS LUX DÉFINIT", "LE FUTUR DE LA", "RECHARGE NOMADE"].map((line, i) => (
                <div key={i} className="overflow-hidden py-2 perspective-1000">
                  <div className="main-text-line opacity-0 translate-y-full glitch-text" style={{ animationDelay: `${i * 0.15}s` }}>
                    {line}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-20 flex justify-end w-full pr-8 md:pr-0">
              <p className="main-text-p font-mono text-xs md:text-sm text-white/70 max-w-sm text-left leading-relaxed opacity-0 border-l border-white/20 pl-4">
                Le fer de lance de la gamme Solaris Lux. Une batterie externe solaire ultra-compacte avec recharge sans fil Qi 15W intégrée.
              </p>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: SOLUTIONS --- */}
        <section id="solutions-section" className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center z-30 py-32 px-6">
          <h2 className="font-space text-[10px] font-bold tracking-[1.5em] text-white/30 mb-24 uppercase relative text-center w-full">
            <span className="hidden md:inline-block absolute left-[20%] top-1/2 w-16 h-[1px] bg-white/20"></span>
            Gamme Premium
            <span className="hidden md:inline-block absolute right-[20%] top-1/2 w-16 h-[1px] bg-white/20"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1400px] w-full perspective-1000">
            {[
              { num: '01', title: 'SMARTCHARGE V1', color: '#C5A059', icon: Zap, desc: 'Batterie solaire ultra-compacte 10,000 mAh avec recharge sans fil Qi 15W.', image: '/product-v1.png' },
              { num: '02', title: 'CÂBLE PRECISION', color: '#B8860B', icon: Network, desc: 'Câble haute performance en fibre d’aramide pour une durabilité extrême.', image: '/product-cable.png' },
              { num: '03', title: 'SUPPORT STASIS', color: '#DAA520', icon: Cpu, desc: 'Support minimaliste en aluminium aéronautique avec base nano-succion.', image: '/product-stasis.png' },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div 
                  key={i} 
                  className="solution-card card-glass rounded-2xl p-10 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 cursor-pointer pointer-events-auto"
                >
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 rounded-tl-2xl"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 rounded-tr-2xl"></div>
                  
                  {/* Hover Gradient Glow */}
                  <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                       style={{ background: `linear-gradient(135deg, transparent, ${card.color}22)` }} />

                  {/* Product Image Preview */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none overflow-hidden flex items-center justify-center">
                    <img src={card.image} alt={card.title} className="w-[120%] h-[120%] object-contain grayscale scale-110 group-hover:scale-100 transition-transform duration-1000" />
                  </div>

                  {/* Bar Graph Animation Container */}
                  <div className="absolute bottom-0 left-0 right-0 h-48 flex items-end gap-[1px] px-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_90%,_#fff_100%)] bg-[length:100%_20px]" />
                    {[...Array(24)].map((_, j) => (
                      <AnimatedBar key={j} color={card.color} index={j} />
                    ))}
                  </div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-12">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500" style={{ color: card.color }}>
                            <Icon size={18} />
                          </div>
                          <span className="font-space text-xl font-bold text-white/80">
                            {card.num}
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-[10px] font-mono tracking-widest text-white/30 mb-1">CAPACITY</div>
                          <div className="font-space font-bold text-lg" style={{ color: card.color, textShadow: `0 0 15px ${card.color}66` }}>
                            {counters[i]}%
                          </div>
                        </div>
                      </div>
                      <h3 className="font-space text-3xl font-bold tracking-tight text-white mb-4">
                        {card.title}
                      </h3>
                    </div>
                    <p className="font-inter text-sm text-white/40 leading-relaxed font-light">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- SECTION 4: RETURN HERO & FOOTER --- */}
        <section id="footer-section" className="relative w-full min-h-[120vh] flex flex-col items-center justify-end pb-20 z-40 bg-transparent overflow-hidden">
          
          {/* Giant Logo Background */}
          <div className="giant-logo absolute top-[20%] w-full flex items-center justify-center opacity-0 overflow-hidden pointer-events-none select-none">
            <h1 className="font-space text-[25vw] md:text-[20vw] font-bold tracking-tighter text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.05)' }}>
              SOLARIS LUX
            </h1>
          </div>

          <div className="footer-content relative z-10 w-full max-w-[1400px] px-10 flex flex-col lg:flex-row justify-between items-end gap-20">
            <div className="text-left">
              <h2 className="text-6xl md:text-[7.5rem] tracking-tighter leading-[0.85]">
                <span className="font-space font-bold text-white block">WHERE</span>
                <span className="font-playfair italic text-white/40 block ml-8 md:ml-16">DESIGN</span>
                <span className="font-space font-bold text-white block">MEETS SOLAR</span>
                <span className="font-playfair italic block ml-12 md:ml-24" style={{ color: '#C5A059', textShadow: '0 0 30px rgba(197,160,89,0.3)' }}>POWER.</span>
              </h2>
            </div>

            <button className="group relative flex items-center gap-12 px-14 py-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-md overflow-hidden pointer-events-auto transition-all duration-500 hover:border-[#C5A059]/50">
              <div className="absolute inset-0 bg-gradient-to-r from-[#C5A059] to-[#B8860B] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <div className="absolute -inset-1 border-2 border-[#C5A059] rounded-full scale-[1.05] opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" style={{ filter: 'blur(4px)' }} />
              
              <span className="font-space font-bold tracking-[0.4em] uppercase text-sm relative z-10 text-white group-hover:text-[#C5A059] transition-colors">CONTACT US</span>
              
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-black group-hover:bg-[#C5A059] transition-colors relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_30px_rgba(197,160,89,0.6)]">
                <ArrowRight size={24} className="group-hover:translate-x-1 group-hover:-rotate-45 transition-transform duration-300" />
              </div>
            </button>
          </div>
          
          {/* Footer Bottom Info */}
          <div className="footer-content absolute bottom-12 w-full px-12 flex justify-between items-center text-[10px] font-mono tracking-widest text-white/20 uppercase">
            <div className="flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] shadow-[0_0_10px_#C5A059] animate-pulse"></span>
              <span>System Online</span>
            </div>
            <span>© 2026 Solaris Lux Systems</span>
          </div>
        </section>

      </div>
    </>
  );
}
