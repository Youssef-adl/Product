import TextPressure from './TextPressure'
import { useReveal } from '../hooks/useReveal'

function BrandMantra() {
  const [ref, visible] = useReveal(0.2)

  return (
    <section 
      ref={ref} 
      className={`section container reveal ${visible ? 'is-visible' : ''}`}
      style={{ 
        minHeight: '400px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: 'var(--space-20) 0'
      }}
    >
      <div style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
        <TextPressure
          text="LODESTONE"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="var(--precision-cyan)"
          minFontSize={48}
        />
      </div>
      <p className="section-subtitle" style={{ marginTop: 'var(--space-8)', maxWidth: '600px', textAlign: 'center' }}>
        Plus qu'une interface. Une expérience de charge redéfinie par la précision et l'innovation constante.
      </p>
    </section>
  )
}

export default BrandMantra
