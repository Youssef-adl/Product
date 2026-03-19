import { useReveal } from '../hooks/useReveal'

const steps = [
  {
    num: '01',
    title: 'Positionnez',
    desc: 'Laissez la base lestée du Lodestone trouver son équilibre sur votre bureau.',
    icon: 'fa-solid fa-location-dot',
  },
  {
    num: '02',
    title: 'Clipsez',
    desc: 'Les aimants s\'alignent en un instant. Plus de tâtonnements.',
    icon: 'fa-solid fa-magnet',
  },
  {
    num: '03',
    title: 'Chargez',
    desc: 'La charge rapide 15W s\'enclenche immédiatement.',
    icon: 'fa-solid fa-bolt-lightning',
  },
]

function HowItWorks() {
  const [ref, visible] = useReveal()

  return (
    <section id="howitworks" aria-labelledby="how-it-works-heading" ref={ref} className={`section container reveal${visible ? ' is-visible' : ''}`}>
      <span className="section-label" aria-hidden="true">Utilisation</span>
      <h2 id="how-it-works-heading" className="section-title">Aussi Simple<br />Que Magique</h2>
      <p className="section-subtitle">
        L'expérience utilisateur repensée pour être la plus intuitive possible.
      </p>

      <div className="steps__grid">
        {steps.map((s, i) => (
          <article key={i} className="step">
            <div className="step-number" aria-hidden="true">{s.num}</div>
            <div className="icon-container" style={{ marginBottom: '16px', marginLeft: 0 }}>
              <i className={s.icon} aria-hidden="true"></i>
            </div>
            <h3 style={{ marginBottom: '8px' }}>{s.title}</h3>
            <p className="text-secondary" style={{ fontSize: '0.9rem' }}>{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks
