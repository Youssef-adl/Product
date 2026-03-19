import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const faqs = [
  {
    q: 'Est-ce compatible avec tous les iPhone ?',
    a: 'Compatible avec les iPhone 12 et ultérieurs, avec ou sans coque compatible MagSafe.',
  },
  {
    q: 'Quel chargeur secteur dois-je utiliser ?',
    a: 'Un chargeur USB-C Power Delivery 20W est recommandé pour la charge rapide 15W. (Non inclus).',
  },
  {
    q: 'Puis-je l\'utiliser avec une coque ?',
    a: 'Oui, avec les coques officielles MagSafe Apple ou les coques compatibles MagSafe.',
  },
  {
    q: 'L\'anneau LED reste-t-il allumé ?',
    a: 'Il s\'éteint automatiquement après 15 secondes ou peut être désactivé manuellement.',
  },
  {
    q: 'Quelle est la garantie ?',
    a: 'Garantie constructeur de 2 ans incluse pour tout défaut matériel.',
  },
]

function FAQ() {
  const [open, setOpen] = useState(null)
  const [ref, visible] = useReveal()

  const toggle = (i) => setOpen(open === i ? null : i)

  return (
    <section id="faq" aria-labelledby="faq-heading" ref={ref} className={`section container reveal${visible ? ' is-visible' : ''}`}>
      <span className="section-label" aria-hidden="true">Questions Fréquentes</span>
      <h2 id="faq-heading" className="section-title">Des doutes ?</h2>

      <div className="faq__list">
        {faqs.map((item, i) => (
          <article key={i} className={`faq__item${open === i ? ' is-open' : ''}`}>
            <button
              className="faq__question"
              onClick={() => toggle(i)}
              aria-expanded={open === i}
              aria-controls={`faq-answer-${i}`}
              id={`faq-question-${i}`}
              style={{
                width: '100%', background: 'none', border: 'none',
                textAlign: 'left', cursor: 'pointer', padding: 0,
                color: 'var(--text-primary)', font: 'inherit', fontWeight: 600,
              }}
            >
              <span>{item.q}</span>
              <span
                className="faq__icon"
                aria-hidden="true"
                style={{
                  transition: 'transform 0.3s ease, color 0.2s ease',
                  color: open === i ? 'var(--accent)' : 'var(--text-muted)',
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                }}
              >
                <i className="fa-solid fa-plus"></i>
              </span>
            </button>
            <div
              id={`faq-answer-${i}`}
              className="faq__answer"
              role="region"
              aria-labelledby={`faq-question-${i}`}
            >
              <p style={{ paddingBlock: '12px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>{item.a}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FAQ
