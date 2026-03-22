import { useReveal } from '../hooks/useReveal'

function Sustainability() {
  const [ref, visible] = useReveal()

  return (
    <section id="sustainability" ref={ref} className={`section container reveal ${visible ? 'is-visible' : ''}`}>
      <div className="sustainability-content" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        gap: 'var(--space-12)',
        background: 'var(--surface-1)',
        padding: 'var(--space-10)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)'
      }}>
        <div>
          <span className="section-label">Engagement</span>
          <h2 className="section-title">Conçu pour durer, pas pour durer un instant.</h2>
          <p className="section-subtitle">
            Solaris est fabriqué à partir d'aluminium 100% recyclé et emballé dans des matériaux sans plastique. 
            Nous croyons que la technologie premium doit être responsable.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-6)', marginTop: 'var(--space-8)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)' }}>100%</div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Aluminium Recyclé</div>
            </div>
            <div style={{ textAlign: 'center', borderLeft: '1px solid var(--border-light)', paddingLeft: 'var(--space-6)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)' }}>0%</div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Plastique</div>
            </div>
          </div>
        </div>
        <div style={{
          position: 'relative',
          aspectRatio: '1',
          background: 'rgba(16, 185, 129, 0.05)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ fontSize: '5rem', filter: 'grayscale(0.5)' }}>🌿</div>
        </div>
      </div>
    </section>
  )
}

export default Sustainability
