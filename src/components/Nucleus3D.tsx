import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Sparkles } from '@react-three/drei';

const GlowingCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);
  const ringCRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.12;
      meshRef.current.rotation.x = Math.sin(t * 0.08) * 0.3;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.08;
      wireRef.current.rotation.z = t * 0.06;
    }
    if (ringARef.current) {
      ringARef.current.rotation.z = t * 0.2;
      ringARef.current.rotation.x = Math.PI / 2;
    }
    if (ringBRef.current) {
      ringBRef.current.rotation.z = -t * 0.15;
      ringBRef.current.rotation.x = Math.PI / 3;
      ringBRef.current.rotation.y = Math.PI / 6;
    }
    if (ringCRef.current) {
      ringCRef.current.rotation.z = t * 0.1;
      ringCRef.current.rotation.x = -Math.PI / 4;
      ringCRef.current.rotation.y = Math.PI / 3;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#0a0a0a"
          emissive="#F81719"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.95}
          flatShading
        />
      </mesh>

      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshBasicMaterial
          color="#F81719"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>

      <mesh ref={ringARef}>
        <torusGeometry args={[2.5, 0.008, 16, 128]} />
        <meshBasicMaterial color="#F81719" transparent opacity={0.25} />
      </mesh>
      <mesh ref={ringBRef}>
        <torusGeometry args={[3.0, 0.006, 16, 128]} />
        <meshBasicMaterial color="#F81719" transparent opacity={0.12} />
      </mesh>
      <mesh ref={ringCRef}>
        <torusGeometry args={[3.5, 0.004, 16, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.06} />
      </mesh>

      <mesh>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial color="#F81719" transparent opacity={0.015} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
};

const VertexGlows = () => {
  const positions = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.2, 0);
    const pos = geo.attributes.position;
    const unique: [number, number, number][] = [];
    const seen = new Set<string>();
    for (let i = 0; i < pos.count; i++) {
      const key = `${pos.getX(i).toFixed(2)},${pos.getY(i).toFixed(2)},${pos.getZ(i).toFixed(2)}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push([pos.getX(i), pos.getY(i), pos.getZ(i)]);
      }
    }
    geo.dispose();
    return unique;
  }, []);

  return (
    <group>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#F81719" toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
};

const OrbitingParticles = () => {
  const count = 40;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      radius: 2 + Math.random() * 2.5,
      speed: 0.1 + Math.random() * 0.15,
      yOffset: (Math.random() - 0.5) * 3,
      phase: Math.random() * Math.PI * 2,
    })), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    particles.forEach((p, i) => {
      const a = p.angle + t * p.speed;
      dummy.position.set(
        Math.cos(a) * p.radius,
        p.yOffset + Math.sin(t * 0.5 + p.phase) * 0.5,
        Math.sin(a) * p.radius
      );
      dummy.scale.setScalar(0.025 + Math.sin(t * 2 + p.phase) * 0.01);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#F81719" transparent opacity={0.6} />
    </instancedMesh>
  );
};

const Scene = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 12], fov: 40 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <ambientLight intensity={0.2} />
        <pointLight position={[8, 8, 8]} intensity={1.5} color="#F81719" />
        <pointLight position={[-8, -6, -4]} intensity={0.5} color="#F81719" />
        <directionalLight position={[0, 5, 5]} intensity={0.2} />

        <GlowingCore />
        <VertexGlows />
        <OrbitingParticles />

        <Sparkles count={50} scale={16} size={1.5} speed={0.15} opacity={0.15} color="#F81719" />
      </Canvas>
    </div>
  );
};

export default Scene;
