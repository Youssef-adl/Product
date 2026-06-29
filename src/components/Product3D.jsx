"use client";

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Float, useScroll, ScrollControls, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/**
 * ChargerModel — Optimized for "Silk White" aesthetic
 */
const ChargerModel = () => {
  const scroll = useScroll()
  const groupRef = useRef()
  const ringRef = useRef()
  const coreRef = useRef()
  const baseRef = useRef()

  useFrame((state) => {
    const offset = scroll.offset // 0 to 1
    
    // Premium Exploded View Logic
    if (baseRef.current) baseRef.current.position.y = -offset * 3
    if (coreRef.current) coreRef.current.position.y = offset * 0.2
    if (ringRef.current) ringRef.current.position.y = offset * 4
    
    // Smooth Rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15 + offset * Math.PI
    }
  })

  return (
    <group ref={groupRef}>
      {/* Top Magnetic Ring — Glass/Titanium feel */}
      <mesh ref={ringRef} position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.04, 32, 100]} />
        <meshStandardMaterial 
          color="#E2C044" 
          metalness={1} 
          roughness={0.1} 
          emissive="#E2C044" 
          emissiveIntensity={0.2} 
        />
      </mesh>

      {/* Center Induction Coil — Refined Metallic */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.08, 32]} />
        <meshStandardMaterial 
          color="#1D1D1F" 
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Main Base — Brushed Aluminum/White Ceramic */}
      <mesh ref={baseRef} position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.2, 1.25, 0.25, 32]} />
        <meshStandardMaterial 
          color="#F5F5F7" 
          metalness={0.2} 
          roughness={0.05} 
        />
      </mesh>
      
      {/* Subtle Warm Hardware Glow */}
      <pointLight position={[0, 0.2, 0]} color="#E2C044" intensity={0.4} />
    </group>
  )
}

const Product3D = () => {
  return (
    <div className="product-3d-container relative w-full h-full" style={{ minHeight: '400px' }}>
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={40} />
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#E2C044" />
        
        <ScrollControls pages={1} damping={0.1}>
          <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.1}>
            <ChargerModel />
          </Float>
        </ScrollControls>
      </Canvas>
    </div>
  )
}

export default Product3D
