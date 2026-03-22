import React from 'react';
import useReveal from '../hooks/useReveal';

export default function Packaging() {
  const [ref, isVisible] = useReveal(0.2);

  return (
    <section ref={ref} className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div className="layered-grid" style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', gap: '10rem' }}>
           
           <div style={{ flex: 1, position: 'relative' }}>
              <div className="overlap-bg" style={{ transform: 'rotate(10deg)' }}></div>
              <img 
                src="/packaging.png" 
                alt="Solaris Packaging" 
                style={{ 
                  width: '100%', 
                  filter: 'brightness(1.05)',
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 1.5s'
                }} 
              />
           </div>

           <div style={{ flex: 1 }}>
              <span className="bronze-label">SCELLÉ_SOUS_VIDE / UNBOXING</span>
              <h2 style={{ fontSize: '3.5rem', margin: '3rem 0', color: 'var(--c-steel)' }}>L'EXPÉRIENCE<br/><span style={{ color: 'var(--c-ice)' }}>SCRUTÉE</span>.</h2>
              <p style={{ fontSize: '1.125rem', lineHeight: 2, opacity: 0.6 }}>
                L'ouverture d'un Solaris est un rituel. Présenté dans un coffret en carton recyclé haute densité, 
                chaque unité est scellée par un ruban d'authenticité bronze.
              </p>
              <div className="bronze-line" style={{ width: '80px', marginTop: '4rem' }}></div>
           </div>

        </div>
      </div>
    </section>
  );
}
