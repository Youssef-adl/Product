import React from 'react';
import Hero from '../components/Hero';
import StatsBanner from '../components/StatsBanner';
import Features from '../components/Features';
import Engineering from '../components/Engineering';
import Specs from '../components/Specs';
import SupplierCard from '../components/SupplierCard';
import Gallery from '../components/Gallery';

export default function MarketplaceHome({ setCurrentPage, addToCart }) {
  return (
    <>
      <Hero />
      <StatsBanner />
      
      <div className="container" style={{ marginTop: '40px' }}>
         <div className="marketplace-grid">
            
            {/* MAIN FEED (Left 9 cols) */}
            <div style={{ gridColumn: 'span 9' }}>
               <Features setCurrentPage={setCurrentPage} addToCart={addToCart} />
               <Gallery />
               <Engineering />
               <Specs />
            </div>

            {/* SIDEBAR (Right 3 cols) */}
            <div style={{ gridColumn: 'span 3' }}>
               <SupplierCard />
               <div className="card" style={{ marginTop: '20px', padding: '20px' }}>
                  <h4 style={{ fontSize: '14px', marginBottom: '15px' }}>Industry Trends</h4>
                  <ul style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                     <li><a href="#" style={{ color: 'var(--c-blue)' }}>Why Solaris is dominating MagSafe B2B...</a></li>
                     <li><a href="#" style={{ color: 'var(--c-blue)' }}>Sustainable Aluminum Sourcing 2026</a></li>
                  </ul>
               </div>
            </div>

         </div>
      </div>
    </>
  );
}
