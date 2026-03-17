import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  Lightformer,
  ContactShadows,
  Html,
  SpotLight
} from '@react-three/drei';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useInView } from 'motion/react';

const GridFloor = () => {
  return (
    <group position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper args={[20, 20, '#F81719', '#1a1a1a']} rotation={[Math.PI / 2, 0, 0]} />
      <mesh>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#F81719" transparent opacity={0.01} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const DataColumn = ({ position, height, label, delay }: { position: [number, number, number]; height: number; label: string; delay: number }) => {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 0.8 + delay) * 0.15;
    }
  });

  return (
    <group ref={ref} position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[0.4, height, 0.4]} />
        <meshStandardMaterial
          color={hovered ? '#F81719' : '#1a1a1a'}
          metalness={0.8}
          roughness={0.2}
          emissive="#F81719"
          emissiveIntensity={hovered ? 0.6 : 0.15}
        />
      </mesh>

      <mesh position={[0, height + 0.15, 0]}>
        <boxGeometry args={[0.5, 0.05, 0.5]} />
        <meshBasicMaterial color="#F81719" transparent opacity={0.5} />
      </mesh>

      <pointLight position={[0, height + 0.3, 0]} color="#F81719" intensity={hovered ? 1 : 0.2} distance={2} />

      {label && (
        <Html position={[0, height + 0.6, 0]} center distanceFactor={8} style={{ pointerEvents: 'none', opacity: hovered ? 1 : 0.5, transition: 'opacity 0.2s' }}>
          <div className="bg-black/80 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[10px] text-white font-mono whitespace-nowrap">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
};

const PulseBeam = ({ start, end }: { start: [number, number, number]; end: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = (state.clock.getElapsedTime() * 0.5) % 1;
      ref.current.position.set(
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t + 0.5,
        start[2] + (end[2] - start[2]) * t
      );
      ref.current.scale.setScalar(t > 0.9 || t < 0.1 ? 0 : 1);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshBasicMaterial color="#F81719" toneMapped={false} />
    </mesh>
  );
};

const InnerScene = () => {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, Math.PI / 6 + state.mouse.x * 0.1, 0.03);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -0.3 + state.mouse.y * 0.05, 0.03);
    }
  });

  const columns = useMemo(() => [
    { pos: [-2.5, -2.5, -1] as [number, number, number], height: 3.5, label: 'Relay Node A', delay: 0 },
    { pos: [-1, -2.5, 0.5] as [number, number, number], height: 4.5, label: 'Session Engine', delay: 1 },
    { pos: [0.5, -2.5, -0.5] as [number, number, number], height: 5, label: 'ZK Prover', delay: 2 },
    { pos: [2, -2.5, 1] as [number, number, number], height: 3.8, label: 'Key Vault', delay: 3 },
    { pos: [3.5, -2.5, -0.3] as [number, number, number], height: 2.8, label: 'Relay Node B', delay: 4 },
  ], []);

  return (
    <>
      <color attach="background" args={['#000000']} />

      <Environment resolution={512}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="rect" intensity={2} position={[10, 0, -10]} scale={10} onUpdate={(self) => self.lookAt(0, 0, 0)} />
          <Lightformer form="rect" intensity={1} position={[-10, 2, -10]} scale={10} onUpdate={(self) => self.lookAt(0, 0, 0)} />
        </group>
      </Environment>

      <ambientLight intensity={0.15} />
      <SpotLight position={[5, 8, 5]} angle={0.4} penumbra={1} intensity={0.8} castShadow color="#ffffff" />
      <pointLight position={[-3, 3, -3]} intensity={0.3} color="#F81719" />

      <group ref={groupRef} scale={isMobile ? 0.5 : 0.85}>
        <GridFloor />

        {columns.map((col, i) => (
          <DataColumn key={i} position={col.pos} height={col.height} label={col.label} delay={col.delay} />
        ))}

        {columns.slice(0, -1).map((col, i) => (
          <PulseBeam key={`beam-${i}`} start={col.pos} end={columns[i + 1].pos} />
        ))}
      </group>

      <ContactShadows position={[0, -3.5, 0]} opacity={0.15} scale={18} blur={3} far={5} />
    </>
  );
};

const Infrastructure3D = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: false });

  return (
    <div ref={ref} className="w-full h-[400px] sm:h-[500px] md:h-[600px] relative z-10">
      {isInView && (
        <Canvas shadows camera={{ position: [0, 2, 10], fov: 40 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }} dpr={[1, 2]}>
          <InnerScene />
        </Canvas>
      )}
    </div>
  );
};

export default Infrastructure3D;
