import { useReveal } from '../hooks/useReveal'

const features = [
  {
    icon: 'fa-solid fa-magnet',
    title: 'Alignement MagSafe Instantané',
    desc: 'L\'aimantation parfaite à chaque fois. Votre iPhone trouve seul sa position optimale.',
  },
  {
    icon: 'fa-solid fa-bolt-lightning',
    title: 'Charge Rapide 15W',
    desc: 'Puissance maximale pour iPhone, gérée par un contrôle thermique intelligent.',
  },
  {
    icon: 'fa-solid fa-lightbulb',
    title: 'Anneau LED Ambiant',
    desc: 'Un indicateur d\'élégance. Un halo personnalisable pour un retour d\'état discret.',
  },
  {
    icon: 'fa-solid fa-bullseye', // or fa-compress
    title: 'Empreinte Minimale',
    desc: 'Un design compact et lesté qui se fond dans votre espace de travail.',
  },
]

function Features() {
  const [ref, visible] = useReveal()

  return (
    <section id="features" aria-labelledby="features-heading" ref={ref} className={`section container reveal${visible ? ' is-visible' : ''}`}>
      <span className="section-label" aria-hidden="true">Fonctionnalités</span>
      <h2 id="features-heading" className="section-title">L'Innovation au<br />Bout des Doigts</h2>
      <p className="section-subtitle">
        Chaque élément est conçu pour une expérience de charge fluide et premium.
      </p>

      <div className="features__grid">
        {features.map((feature, i) => (
          <article
            key={i}
            className="glass-card feature-card"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div className="icon-container" style={{ margin: 0 }}>
                <i className={feature.icon} aria-hidden="true"></i>
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                fontWeight: 500,
              }}>0{i + 1}</span>
            </div>
            <h3 style={{ marginBottom: '0.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{feature.title}</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{feature.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Features
