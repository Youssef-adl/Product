import Hero from '../components/Hero';
import StatsSection from '../components/Stats';
import MarqueeTicker from '../components/MarqueeTicker';
import Gallery from '../components/Gallery';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Engineering from '../components/Engineering';
import BrandMantra from '../components/BrandMantra';
import Specs from '../components/Specs';
import Testimonials from '../components/Testimonials';
import Packaging from '../components/Packaging';
import CTA from '../components/CTA';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';
import TrustBar from '../components/TrustBar';
import ScrollProgress from '../components/ScrollProgress';

export default function Landing() {
  return (
    <main className="bg-transparent">
      {/* 00 — Utilities */}
      <ScrollProgress />

      {/* 01 — Hero : High Intensity Entrance */}
      <Hero />

      {/* 02 — Stats : Dynamic Proof */}
      <StatsSection />

      {/* 03 — TrustBar — partenaires & crédibilité */}
      <TrustBar />

      {/* 04 — MarqueeTicker */}
      <MarqueeTicker />

      {/* 05 — Gallery — viewer 3D interactif */}
      <section id="gallery">
        <Gallery />
      </section>

      {/* 06 — Features */}
      <section id="features">
        <Features />
      </section>

      {/* 07 — HowItWorks */}
      <HowItWorks />

      {/* 08 — Engineering */}
      <Engineering />

      {/* 09 — BrandMantra */}
      <BrandMantra />

      {/* 10 — Specs */}
      <Specs />

      {/* 11 — Testimonials */}
      <Testimonials />

      {/* 12 — Packaging */}
      <Packaging />

      {/* 13 — CTA */}
      <CTA />

      {/* 14 — FAQ */}
      <FAQ />

      {/* 15 — Newsletter */}
      <Newsletter />
    </main>
  );
}
