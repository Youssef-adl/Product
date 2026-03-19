import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

function CTA() {
  const [ref, visible] = useReveal()
  const [step, setStep] = useState('review') // review, shipping, payment, success
  const [qty, setQty] = useState(1)
  const [bundle, setBundle] = useState('single') // single, pack-duo, bundle-pro
  
  const PRICES = {
    single: 99,
    'pack-duo': 179,
    'bundle-pro': 119
  }

  const currentPrice = PRICES[bundle] * (bundle === 'single' ? qty : 1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    card: '',
    expiry: '',
    cvc: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const renderStepIndicator = () => {
    const steps = [
      { id: 'review', label: 'Panier' },
      { id: 'shipping', label: 'Livraison' },
      { id: 'payment', label: 'Paiement' }
    ]

    return (
      <div className="checkout-steps">
        {steps.map((s, index) => {
          let status = ''
          if (step === s.id) status = 'checkout-step--active'
          else if (steps.findIndex(x => x.id === step) > index) status = 'checkout-step--completed'
          
          return (
            <div key={s.id} className={`checkout-step ${status}`}>
              <div className="step-dot" />
              <span className="step-label">{s.label}</span>
            </div>
          )
        })}
      </div>
    )
  }

  const renderStep = () => {
    switch (step) {
      case 'review':
        return (
          <>
            <span className="section-label" aria-hidden="true">Offre Premium</span>
            <h2 className="section-title">Votre Configuration</h2>
            
            <div className="bundle-selector" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div 
                className={`bundle-option ${bundle === 'single' ? 'active' : ''}`} 
                onClick={() => { setBundle('single'); setQty(1); }}
                style={{
                  padding: '16px', borderRadius: '12px', border: `2px solid ${bundle === 'single' ? 'var(--accent)' : 'var(--border-light)'}`,
                  textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s ease', background: bundle === 'single' ? 'rgba(15, 76, 129, 0.03)' : 'transparent'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span>Lodestone Solo</span>
                  <span>99€</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Le stand premium en aluminium brossé.</div>
              </div>

              <div 
                className={`bundle-option ${bundle === 'pack-duo' ? 'active' : ''}`} 
                onClick={() => setBundle('pack-duo')}
                style={{
                  padding: '16px', borderRadius: '12px', border: `2px solid ${bundle === 'pack-duo' ? 'var(--accent)' : 'var(--border-light)'}`,
                  textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s ease', background: bundle === 'pack-duo' ? 'rgba(15, 76, 129, 0.03)' : 'transparent'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span>Pack Duo (Bureau + Nuit)</span>
                  <span>179€ <span style={{ color: '#10b981', fontSize: '0.7rem' }}>-10%</span></span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Deux stands pour un setup complet.</div>
              </div>

              <div 
                className={`bundle-option ${bundle === 'bundle-pro' ? 'active' : ''}`} 
                onClick={() => setBundle('bundle-pro')}
                style={{
                  padding: '16px', borderRadius: '12px', border: `2px solid ${bundle === 'bundle-pro' ? 'var(--accent)' : 'var(--border-light)'}`,
                  textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s ease', background: bundle === 'bundle-pro' ? 'rgba(15, 76, 129, 0.03)' : 'transparent'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span>Bundle Pro</span>
                  <span>119€</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Stand + Câble tressé ultra-long (3m).</div>
              </div>
            </div>

            <div className="checkout-summary">
              {bundle === 'single' && (
                <div className="summary-row" style={{ alignItems: 'center' }}>
                  <span style={{ fontWeight: 600 }}>Quantité</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="qty-btn">-</button>
                    <span style={{ fontWeight: 700 }}>{qty}</span>
                    <button onClick={() => setQty(q => q + 1)} className="qty-btn">+</button>
                  </div>
                </div>
              )}
              <div className="summary-row">
                <span>Livraison Prioritaire</span>
                <span style={{ color: '#10b981', fontWeight: '600' }}>OFFERTE</span>
              </div>
              <div className="summary-row--total" style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '16px', marginTop: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span style={{ fontWeight: 600 }}>Total TTC</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600 }}>Ou 3x {(currentPrice / 3).toFixed(2)}€ sans frais</span>
                </div>
                <span style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.5rem' }}>
                  {currentPrice}€
                </span>
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: '24px' }} onClick={() => setStep('shipping')}>
              Valider ma commande
            </button>
          </>
        )
      case 'shipping':
        return (
          <>
            <h2 className="section-title" style={{ fontSize: 'var(--text-2xl)' }}>Informations de Livraison</h2>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Nom Complet</label>
                <input type="text" name="name" className="form-input" placeholder="Youssef ..." value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" name="email" className="form-input" placeholder="youssef@example.com" value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="form-group--full">
                <label className="form-label">Adresse</label>
                <input type="text" name="address" className="form-input" placeholder="123 Rue de la Paix" value={formData.address} onChange={handleInputChange} />
              </div>
              <div className="form-group--full">
                <label className="form-label">Ville</label>
                <input type="text" name="city" className="form-input" placeholder="Paris" value={formData.city} onChange={handleInputChange} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setStep('review')}>Retour</button>
              <button className="btn btn-primary" style={{ flex: 2 }} onClick={() => setStep('payment')}>Passage au Paiement</button>
            </div>
          </>
        )
      case 'payment':
        return (
          <>
            <h2 className="section-title" style={{ fontSize: 'var(--text-2xl)' }}>Paiement Sécurisé</h2>
            <div className="form-group">
              <label className="form-label">Numéro de Carte</label>
              <div style={{ position: 'relative' }}>
                <input type="text" name="card" className="form-input" placeholder="0000 0000 0000 0000" value={formData.card} onChange={handleInputChange} />
                <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '8px', opacity: 0.5 }}>
                  <i className="fa-brands fa-cc-visa"></i>
                  <i className="fa-brands fa-cc-mastercard"></i>
                </div>
              </div>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Expiration</label>
                <input type="text" name="expiry" className="form-input" placeholder="MM/YY" value={formData.expiry} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label className="form-label">CVC</label>
                <input type="text" name="cvc" className="form-input" placeholder="123" value={formData.cvc} onChange={handleInputChange} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setStep('shipping')}>Retour</button>
              <button className="btn btn-primary" style={{ flex: 2 }} onClick={() => setStep('success')}>Payer {currentPrice}€ / Commander</button>
            </div>
            <p style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '16px' }}>
              <i className="fa-solid fa-lock" style={{ marginRight: '6px' }}></i>
              Paiement crypté SSL 256-bit
            </p>
          </>
        )
      case 'success':
        return (
          <div className="animate-fade-up">
            <i className="fa-solid fa-circle-check success-icon"></i>
            <h2 className="section-title" style={{ fontSize: 'var(--text-3xl)' }}>Commande Confirmée !</h2>
            <p className="text-secondary" style={{ lineHeight: '1.6', marginBottom: '24px' }}>
              Merci <strong style={{ color: 'var(--text-primary)' }}>{formData.name}</strong> ! Votre stand <strong style={{ color: 'var(--text-primary)' }}>Lodestone</strong> est réservé.<br />
              Un e-mail de confirmation a été envoyé à <span style={{ color: 'var(--accent)', fontWeight: '600' }}>{formData.email}</span>.
            </p>
            <button className="btn btn-primary" style={{ padding: '0.8rem 2.5rem' }} onClick={() => { setStep('review'); setFormData({ name: '', email: '', address: '', city: '', card: '', expiry: '', cvc: '' }); }}>
              RETOUR À L'ACCUEIL
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section id="order" aria-labelledby="cta-heading" ref={ref} className={`section container reveal${visible ? ' is-visible' : ''}`}>
      <div className="glass-card" style={{ maxWidth: '600px', marginInline: 'auto', textAlign: 'center', padding: 'var(--space-8)', minHeight: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {step !== 'success' && renderStepIndicator()}
        {renderStep()}
      </div>
    </section>
  )
}

export default CTA
