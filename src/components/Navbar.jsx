import { useState, useEffect } from 'react'
import { useMagnetic } from '../hooks/useMagnetic'

function Navbar() {
  const { ref, x, y } = useMagnetic()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false) // Scrolling down
      } else {
        setIsVisible(true) // Scrolling up
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__container">
        <a href="#" className="navbar__logo" aria-label="Logo Lodestone">
          Lodestone<span>.</span>
        </a>
        
        <ul className="navbar__links" aria-label="Navigation principale" role="menubar">
          <li role="none"><a href="#features" className="navbar__link" role="menuitem">Fonctionnalités</a></li>
          <li role="none"><a href="#specs" className="navbar__link" role="menuitem">Spécs</a></li>
          <li role="none"><a href="#order" className="navbar__link" role="menuitem">Commander</a></li>
        </ul>
        <div className="navbar__sidebar">
          <div className={`navbar__price-tag ${isScrolled ? 'visible' : ''}`}>
            <span className="navbar__price-label">À partir de</span>
            <span className="navbar__price-value">99€</span>
          </div>
          <button 
            ref={ref}
            className="btn btn-primary"
            aria-label="Pré-commander le stand Lodestone"
            onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ 
              padding: '0.6rem 1.5rem', 
              fontSize: '0.75rem',
              transform: `translate(${x}px, ${y}px)`,
              transition: x === 0 ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
            }}
          >
            Pré-commander
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
