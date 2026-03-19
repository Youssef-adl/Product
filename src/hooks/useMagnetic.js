import { useState, useEffect, useRef } from 'react'

export function useMagnetic() {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const requestRef = useRef()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e) => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
      
      requestRef.current = requestAnimationFrame(() => {
        const { clientX, clientY } = e
        const { left, top, width, height } = el.getBoundingClientRect()
        
        const centerX = left + width / 2
        const centerY = top + height / 2
        
        const distanceX = clientX - centerX
        const distanceY = clientY - centerY

        // If mouse is within a certain range (e.g. 100px)
        const range = 100
        if (Math.abs(distanceX) < range && Math.abs(distanceY) < range) {
          setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 })
        } else {
          setPosition({ x: 0, y: 0 })
        }
      })
    }

    const handleMouseLeave = () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
      setPosition({ x: 0, y: 0 })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [])

  return { ref, x: position.x, y: position.y }
}
