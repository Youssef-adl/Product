import { useReveal } from '../hooks/useReveal'

function Packaging() {
  const [ref, visible] = useReveal()

  return (
    <section id="packaging" aria-labelledby="packaging-heading" ref={ref} className={`section container reveal${visible ? ' is-visible' : ''}`}>
      <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', padding: 'var(--space-8)' }}>
        <div>
          <span className="section-label" aria-hidden="true">L'Expérience Déballage</span>
          <h2 id="packaging-heading" className="section-title">Présentation<br />Impeccable</h2>
          <p className="text-secondary" style={{ marginBottom: '24px' }}>
            Chaque Lodestone Edition arrive dans un coffret de luxe, conçu pour protéger 
            votre stand tout en offrant un moment de découverte inoubliable.
          </p>
          <ul className="feature-list" style={{ marginBottom: '24px' }}>
            <li className="feature-list__item">
              <div className="icon-container" aria-hidden="true">
                <i className="fa-solid fa-box-open"></i>
              </div>
              <span className="feature-list__text">Coffret rigide avec logo Lodestone gaufré argent</span>
            </li>
            <li className="feature-list__item">
              <div className="icon-container" aria-hidden="true">
                <i className="fa-solid fa-rug"></i>
              </div>
              <span className="feature-list__text">Pochette de voyage en microfibre premium</span>
            </li>
            <li className="feature-list__item">
              <div className="icon-container" aria-hidden="true">
                <i className="fa-solid fa-bolt-lightning"></i>
              </div>
              <span className="feature-list__text">Câble USB-C tressé haute qualité (1.5m)</span>
            </li>
          </ul>
        </div>
        <div style={{ position: 'relative' }}>
          <img 
            src="/premium_packaging_1773671777970.png" 
            alt="Coffret premium noir mat avec logo Lodestone et finition luxueuse" 
            loading="lazy"
            decoding="async"
            width="600"
            height="400"
            style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }} 
          />
          <div className="gallery__glow" aria-hidden="true" style={{ opacity: 0.3 }} />
        </div>
      </div>
    </section>
  )
}

export default Packaging
