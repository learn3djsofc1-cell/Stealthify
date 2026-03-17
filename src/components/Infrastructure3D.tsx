import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Environment, 
  Float, 
  Lightformer, 
  ContactShadows, 
  Html, 
  RoundedBox,
  MeshTransmissionMaterial,
  Icosahedron,
  Line,
  Sphere,
  SpotLight
} from '@react-three/drei';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useInView } from 'motion/react';

const SecureCore = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      mesh.current.rotation.z = state.clock.getElapsedTime() * 0.05;
    }
    if (glow.current) {
      glow.current.scale.setScalar(1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.02);
    }
  });

  return (
    <group>
      <Icosahedron args={[1, 0]} ref={mesh}>
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9} 
          roughness={0.1} 
          flatShading
        />
      </Icosahedron>

      <Icosahedron args={[1.01, 1]}>
        <meshBasicMaterial 
          color="#F81719" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </Icosahedron>

      <Sphere args={[1.4, 32, 32]}>
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.1}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.1}
          iridescence={0.5}
          roughness={0.1}
          clearcoat={1}
          color="#ffffff"
          resolution={256}
          background={new THREE.Color('#000000')}
        />
      </Sphere>

      <mesh ref={glow}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#F81719" transparent opacity={0.04} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
};

const CloudModule = ({ position, delay = 0, label }: { position: [number, number, number], delay?: number, label?: string }) => {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + delay) * 0.2;
      ref.current.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={ref} position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <RoundedBox args={[0.8, 0.8, 0.8]} radius={0.1} smoothness={4} castShadow receiveShadow>
          <meshStandardMaterial 
            color={hovered ? "#F81719" : "#1a1a1a"} 
            metalness={0.5} 
            roughness={0.2} 
          />
        </RoundedBox>

        <mesh position={[0, 0, 0.41]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color={hovered ? "#10b981" : "#F81719"} />
        </mesh>

        <Line 
          points={[[0, 0, -0.4], [0, 0, -position[2] + 1.4]]}
          color={hovered ? "#F81719" : "#666666"} 
          transparent 
          opacity={0.2} 
          lineWidth={1} 
        />
        
        {label && (
          <Html position={[0, -0.6, 0]} center distanceFactor={8} style={{ pointerEvents: 'none', opacity: hovered ? 1 : 0.6, transition: 'opacity 0.2s' }}>
            <div className="bg-black/80 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[10px] text-white font-mono whitespace-nowrap">
              {label}
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
};

const OrchestrationRing = () => {
  const modules = useMemo(() => {
    return [
      { pos: [3, 0, 0], label: "Relayer Lane A" },
      { pos: [-3, 0.5, 1], label: "Relayer Lane B" },
      { pos: [1.5, 2, -1.5], label: "Session Sandbox" },
      { pos: [-1.5, -2, -1.5], label: "Agent Orch" },
      { pos: [0, 0, 3.5], label: "Key Mgmt" },
    ];
  }, []);

  return (
    <group>
      {modules.map((mod, i) => (
        <CloudModule 
          key={i} 
          position={mod.pos as [number, number, number]} 
          delay={i * 1.5} 
          label={mod.label}
        />
      ))}
    </group>
  );
};

const DataParticles = () => {
  const count = 40;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      speed: 0.02 + Math.random() * 0.02,
      offset: Math.random() * Math.PI * 2,
      radius: 2 + Math.random() * 3,
      y: (Math.random() - 0.5) * 4
    }));
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    
    particles.forEach((p, i) => {
      const angle = t * p.speed + p.offset;
      const x = Math.cos(angle) * p.radius;
      const z = Math.sin(angle) * p.radius;
      
      dummy.position.set(x, p.y + Math.sin(t + p.offset) * 0.5, z);
      dummy.scale.setScalar(0.05);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#F81719" transparent opacity={0.4} />
    </instancedMesh>
  );
};

const Scene = () => {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const targetRotX = state.mouse.y * 0.1;
      const targetRotY = state.mouse.x * 0.1;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    }
  });

  return (
    <>
      <color attach="background" args={['#000000']} />
      
      <Environment resolution={512}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="rect" intensity={4} position={[10, 0, -10]} scale={10} onUpdate={(self) => self.lookAt(0, 0, 0)} />
          <Lightformer form="rect" intensity={2} position={[-10, 2, -10]} scale={10} onUpdate={(self) => self.lookAt(0, 0, 0)} />
          <Lightformer form="circle" intensity={2} position={[0, 10, 0]} scale={5} onUpdate={(self) => self.lookAt(0, 0, 0)} />
        </group>
      </Environment>

      <ambientLight intensity={0.3} />
      <SpotLight position={[5, 5, 5]} angle={0.5} penumbra={1} intensity={1} castShadow color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#F81719" />

      <group ref={groupRef} scale={isMobile ? 0.6 : 1}>
        <SecureCore />
        <OrchestrationRing />
        <DataParticles />
      </group>

      <ContactShadows position={[0, -3.5, 0]} opacity={0.3} scale={20} blur={2.5} far={4.5} />
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
          <Scene />
        </Canvas>
      )}
    </div>
  );
};

export default Infrastructure3D;
