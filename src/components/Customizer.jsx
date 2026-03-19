import { useState } from 'react'
import ModelViewer from './ModelViewer'
import { useReveal } from '../hooks/useReveal'

const ENV_PRESETS = [
  { id: 'studio', label: 'Studio Precision', icon: 'fa-solid fa-microchip' },
  { id: 'forest', label: 'Natural Light', icon: 'fa-solid fa-leaf' },
  { id: 'apartment', label: 'Interior Glow', icon: 'fa-solid fa-house' },
  { id: 'city', label: 'Urban Night', icon: 'fa-solid fa-city' }
]

function Customizer() {
  const [ref, visible] = useReveal(0.1)
  const [preset, setPreset] = useState('studio')

  return (
    <section 
      ref={ref} 
      className={`section container reveal ${visible ? 'is-visible' : ''}`}
      style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}
    >
      <div className="customizer-header" style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
        <span className="section-label">Studio Interactif</span>
        <h2 className="section-title">Lodestone <span className="underline-cyan">Pro Viewer</span></h2>
        <p className="section-subtitle">
          Examinez chaque courbe et chaque port. Changez l'environnement pour 
          visualiser le Lodestone dans toutes les conditions.
        </p>
      </div>

      <div className="customizer-layout" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 300px', 
        gap: 'var(--space-8)',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.3)',
        padding: 'var(--space-8)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        {/* 3D Viewer Area */}
        <div className="customizer-viewer-container" style={{ 
          background: '#000', 
          borderRadius: 'var(--radius-lg)', 
          overflow: 'hidden',
          position: 'relative',
          height: '600px'
        }}>
          <ModelViewer
            url="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb" // Note: Ideally a charger model here
            width="100%"
            height="100%"
            environmentPreset={preset}
            enableMouseParallax={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            fadeIn={true}
            showScreenshotButton={true}
          />
        </div>

        {/* Controls Area */}
        <div className="customizer-controls">
          <h3 className="tech-tag" style={{ width: '100%', textAlign: 'center', marginBottom: '1.5rem' }}>Paramètres d'Ambiance</h3>
          
          <div className="preset-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
            {ENV_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPreset(p.id)}
                className={`glass-card preset-button ${preset === p.id ? 'active' : ''}`}
                style={{
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  border: preset === p.id ? '1px solid var(--precision-cyan)' : '1px solid transparent',
                  background: preset === p.id ? 'rgba(0, 210, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                  transition: 'all 0.3s ease',
                  width: '100%'
                }}
              >
                <i className={p.icon} style={{ color: preset === p.id ? 'var(--precision-cyan)' : 'inherit' }}></i>
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{p.label}</span>
              </button>
            ))}
          </div>

          <div className="customizer-info" style={{ marginTop: '2rem', padding: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <p className="text-secondary" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
              <i className="fa-solid fa-circle-info" style={{ marginRight: '0.5rem' }}></i>
              Utilisez la fonction de capture pour enregistrer des images haute résolution du modèle.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Customizer
