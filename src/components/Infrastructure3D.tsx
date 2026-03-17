import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  Float,
  Lightformer,
  ContactShadows,
  Html,
  RoundedBox,
  Line,
  Sphere,
  SpotLight
} from '@react-three/drei';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useInView } from 'motion/react';

const CoreHub = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.08;
      mesh.current.rotation.x = t * 0.04;
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.15;
    }
  });

  return (
    <group>
      <mesh ref={mesh}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
          flatShading
        />
      </mesh>

      <mesh>
        <octahedronGeometry args={[0.82, 1]} />
        <meshBasicMaterial
          color="#F81719"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      <mesh ref={ring}>
        <torusGeometry args={[1.2, 0.02, 16, 64]} />
        <meshBasicMaterial color="#F81719" transparent opacity={0.2} />
      </mesh>

      <Sphere args={[1.5, 32, 32]}>
        <meshBasicMaterial color="#F81719" transparent opacity={0.02} blending={THREE.AdditiveBlending} depthWrite={false} />
      </Sphere>
    </group>
  );
};

const ModuleBox = ({ position, delay = 0, label }: { position: [number, number, number], delay?: number, label?: string }) => {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + delay) * 0.15;
      ref.current.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={ref} position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.15}>
        <RoundedBox args={[0.7, 0.7, 0.7]} radius={0.08} smoothness={4} castShadow receiveShadow>
          <meshStandardMaterial
            color={hovered ? "#F81719" : "#1a1a1a"}
            metalness={0.6}
            roughness={0.2}
          />
        </RoundedBox>

        <mesh position={[0, 0, 0.36]}>
          <circleGeometry args={[0.08, 32]} />
          <meshBasicMaterial color={hovered ? "#10b981" : "#F81719"} />
        </mesh>

        <Line
          points={[[0, 0, -0.35], [0, 0, -position[2] + 1.2]]}
          color={hovered ? "#F81719" : "#444444"}
          transparent
          opacity={0.15}
          lineWidth={1}
        />

        {label && (
          <Html position={[0, -0.55, 0]} center distanceFactor={8} style={{ pointerEvents: 'none', opacity: hovered ? 1 : 0.5, transition: 'opacity 0.2s' }}>
            <div className="bg-black/80 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[10px] text-white font-mono whitespace-nowrap">
              {label}
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
};

const ModuleRing = () => {
  const modules = useMemo(() => [
    { pos: [2.8, 0, 0.5], label: "Relay Node A" },
    { pos: [-2.8, 0.3, 0.8], label: "Relay Node B" },
    { pos: [1.2, 1.8, -1.2], label: "Session Engine" },
    { pos: [-1.2, -1.8, -1.2], label: "Key Vault" },
    { pos: [0, 0.5, 3], label: "ZK Prover" },
  ], []);

  return (
    <group>
      {modules.map((mod, i) => (
        <ModuleBox
          key={i}
          position={mod.pos as [number, number, number]}
          delay={i * 1.2}
          label={mod.label}
        />
      ))}
    </group>
  );
};

const Particles = () => {
  const count = 35;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      speed: 0.015 + Math.random() * 0.02,
      offset: Math.random() * Math.PI * 2,
      radius: 1.8 + Math.random() * 2.5,
      y: (Math.random() - 0.5) * 3.5
    }));
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      const angle = t * p.speed + p.offset;
      dummy.position.set(Math.cos(angle) * p.radius, p.y + Math.sin(t + p.offset) * 0.4, Math.sin(angle) * p.radius);
      dummy.scale.setScalar(0.04);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#F81719" transparent opacity={0.35} />
    </instancedMesh>
  );
};

const InnerScene = () => {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, state.mouse.y * 0.08, 0.04);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.mouse.x * 0.08, 0.04);
    }
  });

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

      <ambientLight intensity={0.25} />
      <SpotLight position={[5, 5, 5]} angle={0.5} penumbra={1} intensity={0.8} castShadow color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#F81719" />

      <group ref={groupRef} scale={isMobile ? 0.55 : 1}>
        <CoreHub />
        <ModuleRing />
        <Particles />
      </group>

      <ContactShadows position={[0, -3.5, 0]} opacity={0.25} scale={18} blur={2.5} far={4.5} />
    </>
  );
};

const Infrastructure3D = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: false });

  return (
    <div ref={ref} className="w-full h-[500px] md:h-[600px] relative z-10">
      {isInView && (
        <Canvas shadows camera={{ position: [0, 0, 12], fov: 35 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }} dpr={[1, 2]}>
          <InnerScene />
        </Canvas>
      )}
    </div>
  );
};

export default Infrastructure3D;
