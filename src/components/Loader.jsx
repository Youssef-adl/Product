import { useState, useEffect } from 'react'
import HackyText from './HackyText'

const BOOT_LOGS = [
  "INITIALIZING_QUANTUM_CORE...",
  "LOADING_VECTORS_CALIBRATION...",
  "ESTABLISHING_MAGSAFE_LINK...",
  "REPLICATING_STITCH_MATRICES...",
  "SYNCING_PRECISION_CLOCK...",
  "READY_FOR_DEPLOYMENT."
]

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isFading, setIsFading] = useState(false)
  const [logIndex, setLogIndex] = useState(0)

  useEffect(() => {
    // Scroll through technical logs
    const logInterval = setInterval(() => {
      setLogIndex(prev => (prev < BOOT_LOGS.length - 1 ? prev + 1 : prev))
    }, 150)

    // Complete loader sequence
    const timer = setTimeout(() => {
      setIsFading(true)
      setTimeout(() => setIsLoading(false), 800)
    }, 1200)

    return () => {
      clearInterval(logInterval)
      clearTimeout(timer)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div 
      className={`loader-container ${isFading ? 'fade-out' : ''}`}
      style={{
        background: 'linear-gradient(135deg, #0f4c81 0%, #153e63 100%)',
        color: 'var(--precision-cyan)',
        fontFamily: 'var(--font-mono)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="loader-content" style={{ textAlign: 'center', width: '300px' }}>
        <div style={{ fontSize: '32px', fontWeight: '800', marginBottom: '30px', letterSpacing: '-0.02em' }}>
          LODESTONE
        </div>
        
        <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.6, marginBottom: '10px' }}>
          Chargement de l'expérience
        </div>

        <div className="loader-progress-bar" style={{ 
          width: '100%', 
          height: '2px', 
          background: 'rgba(0, 210, 255, 0.1)', 
          marginTop: '20px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            left: 0, top: 0,
            height: '100%',
            width: `${((logIndex + 1) / BOOT_LOGS.length) * 100}%`,
            background: 'var(--precision-cyan)',
            transition: 'width 0.2s ease-out',
            boxShadow: '0 0 10px var(--precision-cyan)'
          }} />
        </div>
      </div>
    </div>
  )
}

export default Loader
