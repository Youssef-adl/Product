import { useRef, useState, useEffect } from 'react'

const ParallaxImage = ({ src, alt, speed = 0.1, className = "", style = {} }) => {
  const containerRef = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      
      // Calculate how far the element is from the center of the viewport
      const elementCenter = rect.top + rect.height / 2
      const viewportCenter = viewportHeight / 2
      const distance = elementCenter - viewportCenter
      
      setOffset(distance * speed)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div 
      ref={containerRef} 
      className={`parallax-container ${className}`}
      style={{ 
        overflow: 'hidden',
        position: 'relative',
        ...style 
      }}
    >
      <img
        src={src}
        alt={alt}
        className="parallax-image"
        style={{
          width: '100%',
          height: '110%', // Sized larger to allow for movement
          objectFit: 'cover',
          transform: `translateY(${offset}px) scale(1.1)`,
          transition: 'transform 0.1s linear',
          position: 'absolute',
          top: '-5%',
          left: 0
        }}
      />
    </div>
  )
}

export default ParallaxImage
