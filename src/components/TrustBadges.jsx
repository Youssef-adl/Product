import { useReveal } from '../hooks/useReveal'

const badges = [
  { name: 'MFi', description: 'Made for iPhone' },
  { name: 'Qi2', description: 'Next Gen Wireless' },
  { name: 'CE', description: 'European Standard' },
  { name: 'Recycled', description: 'Eco-Friendly' }
]

function TrustBadges() {
  const [ref, visible] = useReveal()

  return (
    <div ref={ref} className={`trust-badges reveal ${visible ? 'is-visible' : ''}`}>
      <div className="container trust-badges__container">
        {badges.map((badge, i) => (
          <div key={i} className="trust-badge">
            <div className="trust-badge__icon">
              {badge.name}
            </div>
            <div className="trust-badge__content">
              <span className="trust-badge__name">{badge.name}</span>
              <span className="trust-badge__desc">{badge.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrustBadges
