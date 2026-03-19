import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

function Newsletter() {
  const [ref, visible] = useReveal()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 5000)
      setEmail('')
    }
  }

  return (
    <section id="newsletter" aria-labelledby="newsletter-heading" ref={ref} className={`section container reveal${visible ? ' is-visible' : ''}`}>
      <div className="glass-card" style={{
        textAlign: 'center',
        padding: 'clamp(var(--space-5), 8vw, var(--space-8))',
        background: 'linear-gradient(135deg, rgba(15, 76, 129, 0.05) 0%, rgba(0, 210, 255, 0.05) 100%)',
        borderColor: 'rgba(15, 76, 129, 0.1)'
      }}>
        <div className="icon-container" style={{ margin: '0 auto var(--space-4)', width: '64px', height: '64px', fontSize: '1.75rem' }}>
          <i className="fa-regular fa-envelope"></i>
        </div>
        <h2 id="newsletter-heading" className="section-title" style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>Rejoignez le Cercle</h2>
        <p className="text-secondary" style={{ maxWidth: '500px', margin: '0 auto var(--space-6)', fontSize: '1.1rem' }}>
          Inscrivez-vous pour recevoir nos offres exclusives, les nouveautés produits et des conseils d'experts.
        </p>

        {subscribed ? (
          <div className="animate-fade-up" style={{ color: '#10b981', fontWeight: '600', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-md)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-circle-check"></i>
            Inscription confirmée !
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            gap: 'var(--space-3)',
            maxWidth: '500px',
            margin: '0 auto',
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse e-mail"
              required
              className="form-input"
              style={{
                flex: '1 1 250px',
                background: 'white',
                border: '1px solid var(--border-medium)',
                boxShadow: 'var(--shadow-sm)'
              }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: '0 0 auto', padding: '0.8rem 2rem' }}
            >
              S'inscrire
            </button>
          </form>
        )}
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 'var(--space-4)' }}>
          En vous inscrivant, vous acceptez notre politique de confidentialité.
        </p>
      </div>
    </section>
  )
}

export default Newsletter
