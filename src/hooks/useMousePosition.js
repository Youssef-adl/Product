import { useState, useEffect, useRef } from 'react'

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const requestRef = useRef()

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
      requestRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY })
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [])

  return position
}
