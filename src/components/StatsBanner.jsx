import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const stats = [
  { value: '15W', label: 'Charge Ultra-Rapide' },
  { value: '4.9/5', label: 'Avis Clients' },
  { value: '10K+', label: 'Utilisateurs' },
  { value: 'MFi', label: 'Certification Apple' },
]

function StatsBanner() {
  const [ref, visible] = useReveal()

  const logos = [
    { name: 'Wired', url: '#' },
    { name: 'The Verge', url: '#' },
    { name: '9to5Mac', url: '#' },
    { name: 'TechCrunch', url: '#' },
    { name: 'Forbes', url: '#' }
  ]

  return (
    <div ref={ref} className={`reveal${visible ? ' is-visible' : ''}`} style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--border-light)',
      borderBottom: '1px solid var(--border-light)',
      padding: 'var(--space-6) 0',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="container">
        <div style={{ 
          textAlign: 'center', 
          marginBottom: 'var(--space-6)',
          opacity: 0.6
        }}>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--text-secondary)'
          }}>Ils en parlent</span>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-10)',
          marginBottom: 'var(--space-10)',
          opacity: 0.5,
          filter: 'grayscale(1)'
        }}>
          {logos.map((logo, i) => (
            <span key={i} style={{ 
              fontSize: '1.2rem', 
              fontWeight: 800,
              letterSpacing: '-0.02em',
              transition: 'opacity 0.3s ease'
            }}>
              {logo.name}
            </span>
          ))}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)'
        }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ 
              textAlign: 'center', 
              transitionDelay: `${i * 100}ms` 
            }}>
              <div style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '4px',
                fontFamily: 'var(--font-mono)'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatsBanner
