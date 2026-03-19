import { useReveal } from '../hooks/useReveal'

const reviews = [
  {
    name: 'Sarah M.',
    role: 'Tech Reviewer',
    text: 'L\'alignement magnétique est dingue. Ça clipse parfaitement à chaque fois. Le meilleur chargeur que j\'aie possédé.',
  },
  {
    name: 'James K.',
    role: 'Designer',
    text: 'Un design épuré et une charge réellement rapide. L\'anneau LED apporte cette touche de sophistication.',
  },
  {
    name: 'Alex R.',
    role: 'Développeur',
    text: 'Enfin un support qui ne bouge pas d\'un millimètre. La qualité de fabrication est sur une autre planète.',
  },
]

function Testimonials() {
  const [ref, visible] = useReveal()

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" ref={ref} className={`section container reveal${visible ? ' is-visible' : ''}`}>
      <span className="section-label" aria-hidden="true">Avis Clients</span>
      <h2 id="testimonials-heading" className="section-title">Ils l'ont adopté.</h2>
      <div className="aggregate-rating" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        background: 'var(--surface-2)',
        padding: '8px 16px',
        borderRadius: '999px',
        border: '1px solid var(--border-light)',
        marginBottom: '40px'
      }}>
        <div style={{ color: '#f59e0b', display: 'flex', gap: '4px' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <i key={i} className="fa-solid fa-star"></i>
          ))}
        </div>
        <span style={{ fontWeight: 700, fontSize: '1rem' }}>4.9/5</span>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', borderLeft: '1px solid var(--border-light)', paddingLeft: '12px' }}>
          Basé sur 2,847 avis
        </span>
      </div>

      <div className="testimonials__grid" role="list">
        {reviews.map((r, i) => (
          <article
            key={i}
            className="glass-card review-card"
            role="listitem"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {/* Stars */}
            <div aria-hidden="true" style={{ color: '#f59e0b', marginBottom: '16px', display: 'flex', gap: '3px', fontSize: '0.9rem' }}>
              {Array.from({ length: 5 }).map((_, si) => (
                <i key={si} className="fa-solid fa-star"></i>
              ))}
            </div>
            <span className="sr-only">Note de 5 étoiles</span>

            {/* Quote */}
            <p style={{ marginBottom: '20px', fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: '1.7', fontSize: '0.95rem' }}>
              "{r.text}"
            </p>

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="review-card__header" style={{ marginTop: 0, gap: '12px' }}>
                <div className="review-avatar" aria-hidden="true" style={{ fontSize: '1.75rem', color: 'var(--accent)' }}>
                  <i className="fa-solid fa-circle-user"></i>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{r.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{r.role}</div>
                </div>
              </div>
              <span style={{
                fontSize: '9px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#10b981',
                background: 'rgba(16, 185, 129, 0.1)',
                padding: '3px 8px',
                borderRadius: '999px',
              }}>
                <i className="fa-solid fa-circle-check" style={{ marginRight: '4px' }}></i>Vérifié
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
