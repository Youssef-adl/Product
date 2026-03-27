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

      {/* 02 — BrandMantra : Philosophy & Vision */}
      <BrandMantra />

      {/* 03 — Features : The Core Value */}
      <section id="features">
        <Features />
      </section>

      {/* 04 — Gallery : Visual Proof */}
      <section id="gallery">
        <Gallery />
      </section>

      {/* 05 — Engineering : Deep Tech (Bento Core) */}
      <Engineering />

      {/* 06 — Testimonials : Client Trust */}
      <Testimonials />

      {/* 07 — Final CTA : Acquisition Point */}
      <CTA />
    </main>
  );
}
