import React from 'react';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import MarqueeTicker from '../components/MarqueeTicker';
import Stats from '../components/Stats';
import Engineering from '../components/Engineering';
import Specs from '../components/Specs';
import CTA from '../components/CTA';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';

export default function Landing() {
  return (
    <main className="bg-transparent">
      <Hero />
      <TrustBar />
      {/* Marquee ticker — inspiré du défilé Lando Norris */}
      <MarqueeTicker />
      <Engineering />
      <Specs />
      <Stats />
      <CTA />
      <FAQ />
      <Newsletter />
    </main>
  );
}
