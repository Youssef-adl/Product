import React from 'react';
import useReveal from '../hooks/useReveal';

export default function Testimonials() {
  const [ref, isVisible] = useReveal();

  return (
    <section ref={ref} className="section" style={{ background: 'var(--c-bg)' }}>
      <div className="container">
        <div style={{ position: 'relative', textAlign: 'center' }}>
           <div style={{ fontSize: '20rem', position: 'absolute', top: '-60%', left: '50%', transform: 'translateX(-50%)', opacity: 0.1, color: 'var(--c-ice)', zIndex: 0, fontFamily: 'serif' }}>"</div>
           <p style={{ fontSize: '3rem', maxWidth: '1000px', margin: '0 auto', fontWeight: 300, lineHeight: 1.4, color: 'var(--c-steel)', position: 'relative', zIndex: 5 }}>
             "UN ARTÉFACT D'UNE <span style={{ color: 'var(--c-ice)' }}>PRÉCISION</span> POLAIRE. LE COMPLÉMENT IDÉAL POUR UN BUREAU MINIMALISTE."
           </p>
           <div className="bronze-line" style={{ width: '40px', margin: '5rem auto' }}></div>
           <span className="bronze-label" style={{ letterSpacing: '0.5em', opacity: 0.6 }}>@DESK_COLLECTIVE / NEW YORK</span>
        </div>
      </div>
    </section>
  );
}
