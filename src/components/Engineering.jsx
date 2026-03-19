import { Suspense } from 'react'
import { useReveal } from '../hooks/useReveal'
import CircularText from './CircularText'
import '../EngineeringStyles.css'

function Engineering() {
  const [ref, visible] = useReveal(0.1)

  return (
    <section id="engineering" aria-labelledby="eng-heading" ref={ref} className={`section container reveal ${visible ? ' is-visible' : ''}`}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)', position: 'relative' }}>
        <span className="section-label">Engineering</span>
        <h2 id="eng-heading" className="section-title">Design Interne <span className="underline-cyan">Précis</span></h2>
        <p className="section-subtitle">
          Explorez l'architecture sophistiquée du Lodestone. Un modèle de précision industrielle 
          et de performance magnétique.
        </p>
        
        {/* Circular Text Badge */}
        <div className="eng-circular-badge">
          <CircularText 
            text="LODESTONE*PRECISION*ENGINEERING*" 
            spinDuration={15} 
            className="eng-circular-text"
          />
        </div>
      </div>

      <div className="product-3d-wrapper" style={{ height: '700px', cursor: 'default' }}>
        <div className="product-3d-hint">Modèle Haute Fidélité via Sketchfab</div>
        <Suspense fallback={<div className="loading-3d">Chargement du modèle...</div>}>
          <div className="sketchfab-container">
            <iframe 
              title="Wireless fast charging station" 
              frameBorder="0" 
              allowFullScreen 
              mozallowfullscreen="true" 
              webkitallowfullscreen="true" 
              allow="autoplay; fullscreen; xr-spatial-tracking" 
              xr-spatial-tracking="true" 
              execution-while-out-of-viewport="true" 
              execution-while-not-rendered="true" 
              web-share="true" 
              src="https://sketchfab.com/models/5ab40a3f728242559672bf3aaaefd85e/embed?autostart=1&preload=1&ui_theme=dark"
              className="sketchfab-iframe"
            ></iframe>
          </div>
        </Suspense>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: 'var(--space-6)', 
        marginTop: 'var(--space-8)' 
      }}>
        <div className="glass-card p-6 engineering-card">
          <div className="tech-tag">Module 01</div>
          <h3 className="text-accent mb-2">Transmittance Optimale</h3>
          <p className="text-sm text-secondary">Bobines de cuivre de grade aéronautique pour une efficacité énergétique maximale de 98%.</p>
        </div>
        <div className="glass-card p-6 engineering-card">
          <div className="tech-tag">Module 02</div>
          <h3 className="text-accent mb-2">Force Magnétique N52</h3>
          <p className="text-sm text-secondary">Alignement magnétique passif auto-calibré pour une stabilité absolue de votre appareil.</p>
        </div>
        <div className="glass-card p-6 engineering-card">
          <div className="tech-tag">Module 03</div>
          <h3 className="text-accent mb-2">Cryogestion 4.0</h3>
          <p className="text-sm text-secondary">Système de dissipation passive par convection air-métal évitant toute surchauffe.</p>
        </div>
      </div>
    </section>
  )
}

export default Engineering
