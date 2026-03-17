import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Sphere, Line, Sparkles, Float } from '@react-three/drei';

const ShieldCore = () => {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.15;
      outerRef.current.rotation.z = t * 0.08;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.1;
      innerRef.current.rotation.x = t * 0.05;
    }
    if (pulseRef.current) {
      pulseRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.06);
    }
  });

  return (
    <group>
      <mesh ref={innerRef}>
        <dodecahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#1a1a1a"
          emissive="#F81719"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.9}
          flatShading
        />
      </mesh>

      <mesh ref={outerRef}>
        <dodecahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial
          color="#F81719"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      <mesh>
        <torusGeometry args={[2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#F81719" transparent opacity={0.15} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <torusGeometry args={[2.3, 0.01, 16, 100]} />
        <meshBasicMaterial color="#F81719" transparent opacity={0.08} />
      </mesh>

      <mesh ref={pulseRef}>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial color="#F81719" transparent opacity={0.025} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
};

const OrbitalNode = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      <Sphere args={[0.1, 16, 16]}>
        <meshStandardMaterial
          color="#F81719"
          emissive="#F81719"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </Sphere>
      <Line
        points={[[0, 0, 0], [-position[0], -position[1], -position[2]]]}
        color="#F81719"
        opacity={0.06}
        transparent
        lineWidth={0.5}
      />
    </group>
  );
};

const DataStream = ({ start, speed, delay }: { start: [number, number, number], speed: number, delay: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = (state.clock.getElapsedTime() * speed + delay) % 1;
      ref.current.position.x = start[0] * (1 - t);
      ref.current.position.y = start[1] * (1 - t);
      ref.current.position.z = start[2] * (1 - t);
      const dist = Math.sqrt(ref.current.position.x ** 2 + ref.current.position.y ** 2 + ref.current.position.z ** 2);
      ref.current.scale.setScalar(dist < 1.5 ? 0 : 1);
    }
  });

  return (
    <mesh ref={ref} position={start}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#F81719" />
    </mesh>
  );
};

const Network = () => {
  const satellites = useMemo(() => {
    const nodes: [number, number, number][] = [];
    for (let i = 0; i < 10; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 4 + Math.random() * 2.5;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      nodes.push([x, y, z]);
    }
    return nodes;
  }, []);

  return (
    <group>
      <ShieldCore />
      {satellites.map((pos, i) => (
        <group key={i}>
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
            <OrbitalNode position={pos} />
          </Float>
          <DataStream start={pos} speed={0.3 + Math.random() * 0.4} delay={Math.random() * 2} />
        </group>
      ))}
    </group>
  );
};

const Scene = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 14], fov: 35 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#F81719" />
        <pointLight position={[-10, -10, -5]} intensity={0.4} color="#F81719" />
        <directionalLight position={[0, 5, 5]} intensity={0.3} />

        <Network />

        <Sparkles count={30} scale={14} size={2} speed={0.2} opacity={0.2} color="#F81719" />
      </Canvas>
    </div>
  );
};

export default Scene;
