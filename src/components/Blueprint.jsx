import { useState, useEffect } from 'react'
import HackyText from './HackyText'

function Blueprint() {
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let rafId
    const handleMouse = (e) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        setCoords({ x: e.clientX, y: e.clientY })
        rafId = null
      })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => {
      window.removeEventListener('mousemove', handleMouse)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="blueprint-overlay">
      {/* Corner Tracking Markers */}
      <div className="blueprint-marker" style={{ top: 'var(--space-4)', left: 'var(--space-4)' }}>
        <HackyText text="UNIT_SYS_01" delay={1000} />
      </div>
      <div className="blueprint-marker" style={{ top: 'var(--space-4)', right: 'var(--space-4)' }}>
        <HackyText text="COORD: 34.0522 N" delay={1200} />
      </div>
      <div className="blueprint-marker" style={{ bottom: 'var(--space-4)', left: 'var(--space-4)' }}>
        <HackyText text="PWR_OUTPUT: 15W" delay={1400} />
      </div>
      <div className="blueprint-marker" style={{ bottom: 'var(--space-4)', right: 'var(--space-4)' }}>
        <HackyText text="LON: -118.2437 W" delay={1600} />
      </div>

      {/* Real-time Coordinate Tracker */}
      <div 
        className="blueprint-cursor-tracker"
        style={{ 
          transform: `translate(${coords.x + 15}px, ${coords.y + 15}px)`,
        }}
      >
        <div className="blueprint-cursor-line" />
        <div className="blueprint-cursor-coords">
          X: {coords.x.toString().padStart(4, '0')}<br />
          Y: {coords.y.toString().padStart(4, '0')}
        </div>
      </div>

      {/* Axis Lines */}
      <div className="blueprint-axis blueprint-axis--x" style={{ top: coords.y }} />
      <div className="blueprint-axis blueprint-axis--y" style={{ left: coords.x }} />
      
      {/* Center Target */}
      <div className="blueprint-marker" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.15 }}>
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M70 0V140M0 70H140" stroke="var(--precision-cyan)" strokeWidth="0.5" strokeDasharray="4 4"/>
          <circle cx="70" cy="70" r="20" stroke="var(--precision-cyan)" strokeWidth="0.5"/>
          <circle cx="70" cy="70" r="40" stroke="var(--precision-cyan)" strokeWidth="0.5" opacity="0.5"/>
        </svg>
      </div>
    </div>
  )
}

export default Blueprint
