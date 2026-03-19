import { useState, useEffect } from 'react'

const AiHandshake = ({ active, onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("SCANNING_HARDWARE...")

  useEffect(() => {
    if (!active) {
      setProgress(0)
      return
    }

    const phases = [
      "SCANNING_HARDWARE...",
      "CALIBRATING_COILS...",
      "SYNCING_MAGNETS...",
      "HANDSHAKE_COMPLETE."
    ]

    let currentPhase = 0
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        
        const next = prev + 2
        if (next > (currentPhase + 1) * 25) {
          currentPhase++
          setStatus(phases[currentPhase] || phases[phases.length - 1])
        }
        return next
      })
    }, 40)

    return () => clearInterval(interval)
  }, [active, onComplete])

  if (!active && progress === 0) return null

  return (
    <div className="handshake-overlay">
      <div className="handshake-content">
        <div className="handshake-circle">
          <svg viewBox="0 0 100 100">
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke="rgba(0, 210, 255, 0.1)" 
              strokeWidth="2" 
            />
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke="var(--precision-cyan)" 
              strokeWidth="2"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress) / 100}
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
          </svg>
          <div className="handshake-percent">{progress}%</div>
        </div>
        <div className="handshake-status tech-flicker">{status}</div>
      </div>
    </div>
  )
}

export default AiHandshake
