import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  PerspectiveCamera, 
  Environment, 
  ContactShadows,
  PresentationControls
} from '@react-three/drei';
import * as THREE from 'three';

function SmartChargeModel({ decomposition = 0, ...props }) {
  const group = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t / 4) / 8;
      group.current.rotation.x = Math.cos(t / 4) / 10;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Top Cover (Solar Panel Holder) */}
      <mesh position={[0, 0.4 + (decomposition * 0.8), 0]}>
        <boxGeometry args={[2.5, 0.1, 4.5]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
        
        {/* Solar Panel Texture (Placeholder) */}
        <mesh position={[0, 0.06, 0]}>
          <planeGeometry args={[2.3, 4.3]} />
          <meshStandardMaterial color="#000" metalness={0.5} roughness={0.4} />
        </mesh>
      </mesh>

      {/* Internal Battery Block */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 0.6, 4.4]} />
        <meshStandardMaterial 
          color="#111" 
          metalness={0.9} 
          roughness={0.1} 
        />
        <pointLight color="#ffd700" intensity={1} distance={3} />
      </mesh>

      {/* Bottom Base (Qi Coil) */}
      <group position={[0, -0.4 - (decomposition * 0.8), 0]}>
        <mesh>
          <boxGeometry args={[2.5, 0.1, 4.5]} />
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Qi Coil visual */}
        <mesh position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.8, 0.02, 16, 64]} />
          <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={5} />
        </mesh>
      </group>

      {/* Accents */}
      <mesh position={[0, 0, 2.26]}>
        <planeGeometry args={[0.5, 0.2]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

export default function ProductCanvas({ decomposition = 0 }) {
  return (
    <div className="w-full h-[500px] lg:h-[700px] cursor-grab active:cursor-grabbing relative bg-transparent">
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center text-accent-primary/50 font-mono text-[10px] tracking-widest uppercase">
          Initialisation 3D...
        </div>
      }>
        <Canvas 
          shadows 
          dpr={[1, 1.5]} 
          camera={{ position: [0, 5, 12], fov: 25 }}
          gl={{ antialias: true, alpha: true }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, 5, -10]} intensity={0.5} />
          <spotLight position={[0, 10, 0]} intensity={2} angle={0.3} penumbra={1} castShadow />
          
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <SmartChargeModel decomposition={decomposition} scale={1} />
            </Float>
          </PresentationControls>
          
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.4} 
            scale={15} 
            blur={2} 
            far={4.5} 
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
