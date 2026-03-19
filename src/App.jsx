import { useState, useEffect } from 'react'
import Loader from './components/Loader.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import StatsBanner from './components/StatsBanner.jsx'
import Gallery from './components/Gallery.jsx'
import Features from './components/Features.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Engineering from './components/Engineering.jsx'
import BrandMantra from './components/BrandMantra.jsx'
import Specs from './components/Specs.jsx'
import Testimonials from './components/Testimonials.jsx'
import CompatibilityChecker from './components/CompatibilityChecker.jsx'
import TrustBadges from './components/TrustBadges.jsx'
import Sustainability from './components/Sustainability.jsx'
import Packaging from './components/Packaging.jsx'
import CTA from './components/CTA.jsx'
import FAQ from './components/FAQ.jsx'
import Newsletter from './components/Newsletter.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function App() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      setScrollProgress(scrolled)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <Loader />
      <a href="#main-content" className="sr-only focus-visible:not-sr">Aller au contenu principal</a>

      {/* Scroll Progress Indicator */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

      {/* Subtle background texture */}
      <div className="noise-overlay" />
      <div className="grid-bg" />

      <Navbar />
      <main id="main-content">
        <Hero />
        <StatsBanner />
        <TrustBadges />
        <Gallery />
        <Features />
        <HowItWorks />
        <Engineering />
        <BrandMantra />
        <Specs />
        <Testimonials />
        <CompatibilityChecker />
        <Sustainability />
        <Packaging />
        <CTA />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

export default App
