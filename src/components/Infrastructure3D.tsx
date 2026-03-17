import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  Float,
  Lightformer,
  ContactShadows,
  Html,
  Sphere,
  SpotLight
} from '@react-three/drei';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useInView } from 'motion/react';

const TorusKnotCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1;
      meshRef.current.rotation.x = t * 0.05;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.03);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[0.8, 0.25, 128, 16, 2, 3]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.95}
          roughness={0.05}
          emissive="#F81719"
          emissiveIntensity={0.4}
        />
      </mesh>

      <mesh ref={glowRef}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#F81719" transparent opacity={0.02} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.008, 16, 64]} />
        <meshBasicMaterial color="#F81719" transparent opacity={0.15} />
      </mesh>
    </group>
  );
};

const OrbitingSatellite = ({ angle, radius, speed, label }: { angle: number; radius: number; speed: number; label: string }) => {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() * speed + angle;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 0.5) * 0.5;
    }
  });

  return (
    <group ref={ref} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
        <Sphere args={[0.2, 16, 16]}>
          <meshStandardMaterial
            color={hovered ? '#F81719' : '#1a1a1a'}
            metalness={0.8}
            roughness={0.2}
            emissive="#F81719"
            emissiveIntensity={hovered ? 1 : 0.3}
          />
        </Sphere>

        <Sphere args={[0.35, 16, 16]}>
          <meshBasicMaterial color="#F81719" transparent opacity={0.04} wireframe />
        </Sphere>

        {label && (
          <Html position={[0, -0.5, 0]} center distanceFactor={8} style={{ pointerEvents: 'none', opacity: hovered ? 1 : 0.5, transition: 'opacity 0.2s' }}>
            <div className="bg-black/80 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[10px] text-white font-mono whitespace-nowrap">
              {label}
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
};

const DataParticles = () => {
  const count = 50;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() =>
    Array.from({ length: count }, () => ({
      speed: 0.01 + Math.random() * 0.02,
      offset: Math.random() * Math.PI * 2,
      radius: 1.5 + Math.random() * 3,
      y: (Math.random() - 0.5) * 4
    })), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    particles.forEach((p, i) => {
      const a = t * p.speed + p.offset;
      dummy.position.set(Math.cos(a) * p.radius, p.y + Math.sin(t + p.offset) * 0.3, Math.sin(a) * p.radius);
      dummy.scale.setScalar(0.03);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#F81719" transparent opacity={0.4} />
    </instancedMesh>
  );
};

const InnerScene = () => {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, state.mouse.y * 0.06, 0.04);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.mouse.x * 0.06, 0.04);
    }
  });

  const satellites = useMemo(() => [
    { angle: 0, radius: 2.8, speed: 0.3, label: 'Relay Node A' },
    { angle: Math.PI * 0.4, radius: 3.2, speed: 0.25, label: 'Session Engine' },
    { angle: Math.PI * 0.8, radius: 2.5, speed: 0.35, label: 'Key Vault' },
    { angle: Math.PI * 1.2, radius: 3.0, speed: 0.2, label: 'ZK Prover' },
    { angle: Math.PI * 1.6, radius: 2.7, speed: 0.28, label: 'Relay Node B' },
  ], []);

  return (
    <>
      <color attach="background" args={['#000000']} />

      <Environment resolution={512}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="rect" intensity={3} position={[10, 0, -10]} scale={10} onUpdate={(self) => self.lookAt(0, 0, 0)} />
          <Lightformer form="rect" intensity={1.5} position={[-10, 2, -10]} scale={10} onUpdate={(self) => self.lookAt(0, 0, 0)} />
          <Lightformer form="circle" intensity={1.5} position={[0, 10, 0]} scale={5} onUpdate={(self) => self.lookAt(0, 0, 0)} />
        </group>
      </Environment>

      <ambientLight intensity={0.2} />
      <SpotLight position={[5, 5, 5]} angle={0.5} penumbra={1} intensity={0.8} castShadow color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#F81719" />

      <group ref={groupRef} scale={isMobile ? 0.5 : 1}>
        <TorusKnotCore />
        {satellites.map((sat, i) => (
          <OrbitingSatellite key={i} {...sat} />
        ))}
        <DataParticles />
      </group>

      <ContactShadows position={[0, -3.5, 0]} opacity={0.2} scale={18} blur={2.5} far={4.5} />
    </>
  );
};

const Infrastructure3D = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: false });

  return (
    <div ref={ref} className="w-full h-[400px] sm:h-[500px] md:h-[600px] relative z-10">
      {isInView && (
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 40 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }} dpr={[1, 2]}>
          <InnerScene />
        </Canvas>
      )}
    </div>
  );
};

export default Infrastructure3D;
