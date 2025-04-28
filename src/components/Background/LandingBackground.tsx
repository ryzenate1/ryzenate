import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Simple function to generate points in a disk shape
function generateDiskPoints(count: number, innerRadius: number, outerRadius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = Math.sqrt(Math.random()) * (outerRadius - innerRadius) + innerRadius; // Distribute points more evenly
    const theta = Math.random() * Math.PI * 2;
    positions[i3] = Math.cos(theta) * radius;
    positions[i3 + 1] = Math.sin(theta) * radius;
    positions[i3 + 2] = (Math.random() - 0.5) * 0.5; // Slight z variation
  }
  return positions;
}

const LandingBackground = () => {
  const pointsRef = useRef<THREE.Points>(null!); // Ref for the points
  const centerRef = useRef<THREE.Mesh>(null!); // Ref for the central sphere

  // Generate points for accretion disk effect
  const diskPoints = useMemo(() => generateDiskPoints(15000, 2.5, 8), []); // count, innerR, outerR

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z -= delta * 0.05; // Rotate the disk
    }
    if (centerRef.current) {
        // Optional: subtle scale pulse for the center
        centerRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  return (
    <group>
      {/* Central "Black Hole" Sphere */}
      <mesh ref={centerRef} position={[0, 0, -1]}>
         <sphereGeometry args={[1, 32, 32]} />
         {/* Very dark, slightly reflective material */}
         <meshStandardMaterial color="#000000" roughness={0.2} metalness={0.1} /> 
      </mesh>

      {/* Accretion Disk Points */}
      <Points ref={pointsRef} positions={diskPoints} stride={3} frustumCulled={false}>
         <PointMaterial
           transparent
           color="#ffa500" // Orange/Yellow color for hot gas
           size={0.035}
           sizeAttenuation={true}
           opacity={0.7}
           depthWrite={false}
           blending={THREE.AdditiveBlending} // Glow effect
         />
      </Points>

       {/* Optional: Add some distant stars using Drei's Stars for context */}
       {/* <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} /> */}
    </group>
  );
};

export default LandingBackground;
