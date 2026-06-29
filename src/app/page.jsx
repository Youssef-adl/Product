"use client";

import dynamic from 'next/dynamic';
import Hero from '../components/Hero';
import { useApp } from '../contexts/AppProvider';
import FullPageScroll from '../components/FullPageScroll';

const BentoShowcase = dynamic(() => import('../components/BentoShowcase'));
const TestimonialsCarousel = dynamic(() => import('../components/TestimonialsCarousel'));
const PricingSection = dynamic(() => import('../components/PricingSection'));
const Gallery = dynamic(() => import('../components/Gallery'));
const VideoSection = dynamic(() => import('../components/VideoSection'));
const BrandMantra = dynamic(() => import('../components/BrandMantra'));
const CTA = dynamic(() => import('../components/CTA'));
const FAQ = dynamic(() => import('../components/FAQ'));
const MarqueeBanner = dynamic(() => import('../components/MarqueeBanner'));

export default function Landing() {
  const { addToCart } = useApp();

  return (
    <FullPageScroll>
      <main className="bg-transparent overflow-x-hidden">
        {/* ═══ CHAPITRE 1: L'EXPOSITION (Hero) ═══ */}
        <Hero />

        {/* ═══ CHAPITRE 2: LA MACHINE (Bento Grid) ═══ */}
        <div className="bg-black/20">
          <BentoShowcase addToCart={addToCart} />
        </div>

        {/* ═══ MARQUEE (Transition) ═══ */}
        <MarqueeBanner />

        {/* ═══ CHAPITRE 3: L'ADN (Storytelling) ═══ */}
        <BrandMantra />

        {/* ═══ CHAPITRE 4: CINÉMATIQUE (Video) ═══ */}
        <VideoSection />

        {/* ═══ CHAPITRE 5: L'ACQUISITION (Pricing & Proof) ═══ */}
        <PricingSection />

        <div className="relative w-full flex flex-col">
          <Gallery />
          <TestimonialsCarousel />
        </div>

        {/* ═══ CHAPITRE 6: L'ENGAGEMENT (FAQ & CTA) ═══ */}
        <div className="relative bg-transparent w-full flex flex-col">
          <FAQ />
          <CTA />
        </div>
      </main>
    </FullPageScroll>
  );
}
