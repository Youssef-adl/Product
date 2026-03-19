import { useMagnetic } from '../hooks/useMagnetic'
import { useMousePosition } from '../hooks/useMousePosition'

function Hero() {
  const magnetic1 = useMagnetic()
  const magnetic2 = useMagnetic()
  const { x, y } = useMousePosition()

  // Subtle Parallax logic (safe window access)
  const parallaxX = typeof window !== 'undefined' ? (x - window.innerWidth / 2) * 0.02 : 0
  const parallaxY = typeof window !== 'undefined' ? (y - window.innerHeight / 2) * 0.02 : 0

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container hero__container">
        
        {/* Left Column: Text, CTAs, Stats */}
        <div className="hero__content-wrapper">
          <div className="hero__content">
            <div className="hero__badge" aria-label="Nouvelle édition de 2026">
              <span className="hero__badge-dot" aria-hidden="true" />
              NOUVELLE ÉDITION — 2026
            </div>

            <h1 id="hero-heading" className="hero__title">
              <span className="hero__title-main">
                Lodestone
              </span>
              <span className="hero__title-sub">
                La Charge Sans Fil, <span className="underline-cyan">Réinventée.</span>
              </span>
            </h1>

            <p className="hero__subtitle">
              Un chargeur sans fil premium pour bureau. Ingénierie de précision 
              en aluminium et alignement magnétique parfait pour une protection optimale.
            </p>
          </div>

          <div className="hero__cta-group">
            <div className="hero__cta">
              <button 
                ref={magnetic1.ref}
                className="btn btn-primary"
                onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ 
                  transform: `translate(${magnetic1.x}px, ${magnetic1.y}px)`,
                  transition: magnetic1.x === 0 ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
                }}
              >
                PRÉ-COMMANDER — 99€
              </button>
              <button 
                ref={magnetic2.ref}
                className="btn btn-ghost"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ 
                  transform: `translate(${magnetic2.x}px, ${magnetic2.y}px)`,
                  transition: magnetic2.x === 0 ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
                }}
              >
                DÉCOUVRIR
              </button>
            </div>

            <div className="hero__stats">
              <div className="hero__stat">
                <div className="hero__stat-value">Gratuite</div>
                <div className="hero__stat-label">LIVRAISON</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-value">2 Ans</div>
                <div className="hero__stat-label">GARANTIE</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-value">30 Jours</div>
                <div className="hero__stat-label">SATISFAIT/REMBOURSÉ</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Media */}
        <div className="hero__media">
          <div className="hero__media-backdrop" />
          <img
            src="/ln4_hero.png"
            alt="Lodestone Branded MagSafe Charger"
            className="hero__image"
            width="800"
            height="800"
            style={{ 
              transform: `translate(${parallaxX}px, ${parallaxY}px)`
            }}
          />
        </div>

      </div>
    </section>
  )
}

export default Hero
