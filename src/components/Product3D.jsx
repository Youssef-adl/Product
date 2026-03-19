import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Float, useScroll, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

const ChargerModel = () => {
  const scroll = useScroll()
  const groupRef = useRef()
  const ringRef = useRef()
  const coreRef = useRef()
  const baseRef = useRef()

  useFrame((state) => {
    const offset = scroll.offset // 0 to 1
    
    // Exploded View Logic
    // Components drift apart as we scroll
    if (baseRef.current) baseRef.current.position.y = -offset * 4
    if (coreRef.current) coreRef.current.position.y = offset * 0.5
    if (ringRef.current) ringRef.current.position.y = offset * 5
    
    // Rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2 + offset * Math.PI
      groupRef.current.rotation.x = offset * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      {/* Top Magnetic Ring */}
      <mesh ref={ringRef} position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.05, 16, 100]} />
        <meshStandardMaterial color="#00d2ff" emissive="#00d2ff" emissiveIntensity={2} />
      </mesh>

      {/* Center Induction Coil (Simplified) */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.1, 16]} />
        <meshStandardMaterial 
          color="#0f4c81" 
          metalness={0.6}
          roughness={0.2}
          emissive="#00d2ff"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Main Aluminum Base */}
      <mesh ref={baseRef} position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.2, 1.3, 0.3, 16]} />
        <meshStandardMaterial color="#dde5f0" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Internal "Circuitry" Glow */}
      <pointLight position={[0, 0, 0]} color="#00d2ff" intensity={0.8} />
    </group>
  )
}

const Product3D = () => {
  return (
    <div className="product-3d-container" style={{ height: '100%', width: '100%' }}>
      <Canvas dpr={[1, 1.5]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
          <ChargerModel />
        </Float>
      </Canvas>
    </div>
  )
}

export default Product3D
