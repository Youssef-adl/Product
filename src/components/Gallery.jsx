import { useReveal } from '../hooks/useReveal'
import PixelTransition from './PixelTransition'

const images = [
  { 
    src: '/gallery_1.png', 
    alt: 'Premium Desk Setup',
    spec: 'CHASSIS: 6061-AL'
  },
  { 
    src: '/gallery_2.png', 
    alt: 'Close up of aluminum finish',
    spec: 'FINISH: ANODIZED'
  },
  { 
    src: '/gallery_3.png', 
    alt: 'Magnetic alignment demonstration',
    spec: 'LINK: MAGSAFE-N52'
  },
  { 
    src: '/gallery_4.png', 
    alt: 'Workspace aesthetics',
    spec: 'POWER: 15W QI'
  },
]

function Gallery() {
  const [ref, visible] = useReveal()

  return (
    <section id="gallery" aria-labelledby="gallery-heading" ref={ref} className={`section container reveal${visible ? ' is-visible' : ''}`}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
        <span className="section-label" aria-hidden="true">Galerie</span>
        <h2 id="gallery-heading" className="section-title">L'Élégance en Situation</h2>
        <p className="section-subtitle">
          Découvrez comment le stand Lodestone s'intègre parfaitement à tout environnement de travail premium.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'var(--space-4)',
        width: '100%'
      }}>
        {images.map((img, i) => (
          <div
            key={i}
            className="gallery-item-container"
            style={{
              transitionDelay: `${i * 100}ms`,
            }}
          >
            <PixelTransition
              firstContent={
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              }
              secondContent={
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: "rgba(0, 210, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid var(--precision-cyan)"
                  }}
                >
                  <p style={{ 
                    fontWeight: 900, 
                    fontSize: "1.2rem", 
                    color: "var(--precision-cyan)",
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "2px"
                  }}>
                    {img.spec}
                  </p>
                </div>
              }
              gridSize={10}
              pixelColor='var(--precision-cyan)'
              animationStepDuration={0.4}
              aspectRatio={i === 0 || i === 3 ? '56.25%' : '75%'} // Consistent with 16/9 and 4/3
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Gallery
