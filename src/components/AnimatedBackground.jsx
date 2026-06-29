"use client";

import { useEffect, useRef } from 'react'

function AnimatedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    // ── Orbs ──────────────────────────────────────────────
    const orbs = [
      { x: width * 0.15, y: height * 0.2,  r: 450, vx: 0.12, vy: 0.10,  color: [255, 40, 0],    opacity: 0.12 }, // Ferrari Red
      { x: width * 0.85, y: height * 0.15, r: 350, vx: -0.10, vy: 0.14,  color: [200, 0, 0],     opacity: 0.10 }, // Deep Red
      { x: width * 0.75, y: height * 0.75, r: 400, vx: -0.08, vy: -0.12, color: [255, 100, 0],   opacity: 0.08 }, // Orange/Fire
      { x: width * 0.5,  y: height * 1.1,  r: 550, vx: 0.06,  vy: -0.06, color: [150, 0, 0],     opacity: 0.06 }, // Subtle Bottom Glow
    ]

    // ── Particles ─────────────────────────────────────────
    const PARTICLE_COUNT = 30 // Reduced from 80
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2, // Slower movement
      vy: (Math.random() - 0.5) * 0.2 - 0.05,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }))

    // ── Grid Lines (Simplified) ───────────────────────────
    function drawGrid() {
      const spacing = 100 // Increased spacing
      ctx.save()
      ctx.strokeStyle = 'rgba(255, 40, 0, 0.02)'
      ctx.lineWidth = 0.5
      ctx.beginPath()
      for (let x = 0; x < width; x += spacing) {
        ctx.moveTo(x, 0); ctx.lineTo(x, height)
      }
      for (let y = 0; y < height; y += spacing) {
        ctx.moveTo(0, y); ctx.lineTo(width, y)
      }
      ctx.stroke()
      ctx.restore()
    }

    let raf
    let time = 0
    function render() {
      time++
      ctx.clearRect(0, 0, width, height)

      // Grid lines (Static-ish)
      drawGrid()

      // Orbs
      orbs.forEach(orb => {
        orb.x += orb.vx
        orb.y += orb.vy
        if (orb.x < -orb.r) orb.x = width + orb.r
        if (orb.x > width + orb.r) orb.x = -orb.r
        if (orb.y < -orb.r) orb.y = height + orb.r
        if (orb.y > height + orb.r) orb.y = -orb.r

        // Gradient is expensive, limit updates if possible?
        // For now just minimize radius fluctuation
        const pulse = 1.0 
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r * pulse)
        const [r, g, b] = orb.color
        grad.addColorStop(0,   `rgba(${r},${g},${b},${orb.opacity})`)
        grad.addColorStop(1,   `rgba(${r},${g},${b},0)`)
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.r * pulse, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      })

      // Particles
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        p.pulse += 0.01
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0
        
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 200, 200, ${p.opacity})`
        ctx.fill()
      })

      raf = requestAnimationFrame(render)
    }

    render()

    // Resize handling
    const onResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  )
}

export default AnimatedBackground
