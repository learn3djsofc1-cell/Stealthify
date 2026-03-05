import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Sphere, Line, Sparkles, Float, Icosahedron } from '@react-three/drei';

const CentralNode = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x += 0.001;
    }
    if (glowRef.current) {
       glowRef.current.scale.setScalar(1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05);
    }
  });

  return (
    <group>
      {/* Core */}
      <Icosahedron args={[1.2, 0]}>
        <meshStandardMaterial 
          color="#6D28D9" 
          emissive="#4C1D95"
          emissiveIntensity={2}
          roughness={0.1}
          metalness={0.8}
          flatShading
        />
      </Icosahedron>
      
      {/* Wireframe Shell */}
      <Icosahedron args={[1.8, 1]} ref={meshRef}>
        <meshBasicMaterial 
          color="#A855F7" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </Icosahedron>

      {/* Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
};

const SatelliteNode = ({ position }: { position: [number, number, number] }) => {
    return (
        <group position={position}>
            <Sphere args={[0.15, 16, 16]}>
                <meshStandardMaterial 
                    color="#E9D5FF" 
                    emissive="#C084FC"
                    emissiveIntensity={2}
                    toneMapped={false}
                />
            </Sphere>
            {/* Connection Line */}
            <Line 
                points={[[0, 0, 0], [-position[0], -position[1], -position[2]]]} 
                color="#A855F7"
                opacity={0.15}
                transparent
                lineWidth={1}
            />
        </group>
    );
};

const DataPacket = ({ start, speed, delay }: { start: [number, number, number], speed: number, delay: number }) => {
    const ref = useRef<THREE.Mesh>(null);
    
    useFrame((state) => {
        if (ref.current) {
            const t = (state.clock.getElapsedTime() * speed + delay) % 1;
            // Lerp from start to center (0,0,0)
            ref.current.position.x = start[0] * (1 - t);
            ref.current.position.y = start[1] * (1 - t);
            ref.current.position.z = start[2] * (1 - t);
            
            // Fade out near center
            const dist = Math.sqrt(ref.current.position.x**2 + ref.current.position.y**2 + ref.current.position.z**2);
            if (dist < 1.2) ref.current.scale.setScalar(0);
            else ref.current.scale.setScalar(1);
        }
    });

    return (
        <mesh ref={ref} position={start}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#FFFFFF" />
        </mesh>
    );
};

const Network = () => {
    const satellites = useMemo(() => {
        const nodes = [];
        for(let i=0; i<12; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const radius = 4.5 + Math.random() * 2.5;
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            nodes.push([x, y, z] as [number, number, number]);
        }
        return nodes;
    }, []);

    return (
        <group>
            <CentralNode />
            {satellites.map((pos, i) => (
                <group key={i}>
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <SatelliteNode position={pos} />
                    </Float>
                    <DataPacket start={pos} speed={0.5 + Math.random() * 0.5} delay={Math.random() * 2} />
                </group>
            ))}
        </group>
    );
};

const Scene = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 14], fov: 35 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#C084FC" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4C1D95" />
        
        <Network />
        
        <Sparkles count={40} scale={12} size={3} speed={0.3} opacity={0.4} color="#A855F7" />
      </Canvas>
    </div>
  );
};

export default Scene;
