import React, { useRef, useMemo } from 'react';
import { useFrame, extend, Object3DNode } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';
import { shaderMaterial } from '@react-three/drei';

// --- GLSL Shader Code ---
const vertexShader = `
  uniform float uTime;
  uniform float uSize;
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vNoise;

  float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  void main() {
    vColor = aColor;
    vec3 pos = position;
    float noise = rand(pos.xy + uTime * 0.1) * 0.5 - 0.25;
    vNoise = noise;
    pos.x += noise * 5.0;
    pos.z += rand(pos.yz + uTime * 0.05) * 2.0 - 1.0;

    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = aSize * uSize * (1.0 / -viewPosition.z);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec3 vColor;
  varying float vNoise;

  void main() {
    float distanceToCenter = length(gl_PointCoord - vec2(0.5));
    float strength = 1.0 - smoothstep(0.4, 0.5, distanceToCenter);
    float flicker = sin(uTime * 5.0 + vNoise * 20.0) * 0.1 + 0.9;
    gl_FragColor = vec4(vColor * flicker, strength * flicker);
  }
`;

// --- Shader Material Definition ---
const NebulaMaterial = shaderMaterial(
  { uTime: 0, uSize: 0.5 },
  vertexShader,
  fragmentShader,
  (material) => {
    if (material) {
      material.blending = THREE.AdditiveBlending;
      material.depthWrite = false;
      material.transparent = true;
      material.vertexColors = true;
    }
  }
);

extend({ NebulaMaterial });

// --- TypeScript extension for JSX ---
declare module '@react-three/fiber' {
  interface ThreeElements {
    nebulaMaterial: Object3DNode<InstanceType<typeof NebulaMaterial>, typeof THREE.ShaderMaterial> & {
      uTime?: number;
      uSize?: number;
    };
  }
}

// --- Component ---
const SpaceBackground = () => {
  const starsRef = useRef<THREE.Points>(null!);
  const nebulaRef = useRef<THREE.Points>(null!);
  // Corrected the type definition in the declare module block above
  const nebulaMaterialRef = useRef<InstanceType<typeof NebulaMaterial>>(null!);

  const nebulaGeometry = useMemo(() => {
    const noise3D = createNoise3D();
    const count = 10000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const baseColor1 = new THREE.Color('#2a004a');
    const baseColor2 = new THREE.Color('#004a4a');
    const tempColor = new THREE.Color();
    const radius = 40;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      let x, y, z, noiseFactor;
      do {
        x = (Math.random() - 0.5) * radius * 2;
        y = (Math.random() - 0.5) * radius * 1;
        z = (Math.random() - 0.5) * radius * 2;
        noiseFactor = (noise3D(x * 0.1, y * 0.2, z * 0.1) + 1) * 0.5;
      } while (Math.random() > noiseFactor * 0.8 + 0.1);

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z - radius * 0.5;

      const colorNoise = (noise3D(x * 0.05, y * 0.1, z * 0.05) + 1) * 0.5;
      tempColor.lerpColors(baseColor1, baseColor2, colorNoise);
      colors[i3] = tempColor.r;
      colors[i3 + 1] = tempColor.g;
      colors[i3 + 2] = tempColor.b;

      sizes[i] = (noise3D(x * 0.2, y * 0.2, z * 0.2) + 1) * 0.5 * 15 + 5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    return geometry;
  }, []);

  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.x += delta * 0.005;
      starsRef.current.rotation.y += delta * 0.01;
    }
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y += delta * 0.008;
      nebulaRef.current.rotation.z += delta * 0.004;
    }
    if (nebulaMaterialRef.current) {
      nebulaMaterialRef.current.uniforms.uTime.value += delta * 0.5;
    }
  });

  const starsProps = {
    ref: starsRef,
    radius: 200,
    depth: 100,
    count: 8000,
    factor: 5,
    saturation: 0,
    fade: true,
    speed: 0.3,
  };

  return (
    <>
      <Stars {...starsProps} />
      <points ref={nebulaRef} geometry={nebulaGeometry}>
        <nebulaMaterial ref={nebulaMaterialRef} attach="material" uSize={0.5} />
      </points>
    </>
  );
};

export default SpaceBackground;