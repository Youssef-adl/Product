import { useReveal } from '../hooks/useReveal'

const RevealImage = ({ src, alt, className = "", style = {}, delay = 0 }) => {
  const [ref, visible] = useReveal(0.2)

  return (
    <div 
      ref={ref}
      className={`reveal-image-container ${className} ${visible ? 'is-revealed' : ''}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      <img 
        src={src} 
        alt={alt} 
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1) translateY(0)' : 'scale(1.1) translateY(20px)',
          transition: `all 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
        }}
      />
      
      {/* Technical Scanline Reveal */}
      <div className="reveal-scanline" style={{ transitionDelay: `${delay}ms` }} />
      
      {/* Corner Brackets */}
      <div className="corner-bracket corner-bracket--tl" />
      <div className="corner-bracket corner-bracket--tr" />
      <div className="corner-bracket corner-bracket--bl" />
      <div className="corner-bracket corner-bracket--br" />
    </div>
  )
}

export default RevealImage
