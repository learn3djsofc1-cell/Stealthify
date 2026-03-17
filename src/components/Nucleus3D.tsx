import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Sparkles } from '@react-three/drei';

const FlowRibbon = ({ offset, radius, speed, color, width }: { offset: number; radius: number; speed: number; color: string; width: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 80;
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      const x = Math.cos(t * 2 + offset) * radius * 0.6;
      const y = Math.sin(t * 3 + offset * 0.7) * radius * 0.5;
      const z = Math.sin(t + offset * 1.3) * radius * 0.8;
      points.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(points, true);
    return new THREE.TubeGeometry(curve, 120, width, 6, true);
  }, [offset, radius, width]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * speed * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * speed * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial color={color} transparent opacity={0.12} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
};

const ParticleField = () => {
  const count = 200;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() =>
    Array.from({ length: count }, () => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.5 + Math.random() * 3;
      return {
        baseX: r * Math.sin(phi) * Math.cos(theta),
        baseY: r * Math.sin(phi) * Math.sin(theta),
        baseZ: r * Math.cos(phi),
        speed: 0.2 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        scale: 0.01 + Math.random() * 0.025,
      };
    }), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    particles.forEach((p, i) => {
      const wave = Math.sin(t * p.speed + p.phase) * 0.3;
      dummy.position.set(
        p.baseX + wave * 0.5,
        p.baseY + Math.sin(t * p.speed * 0.7 + p.phase) * 0.4,
        p.baseZ + wave * 0.3
      );
      dummy.scale.setScalar(p.scale * (1 + Math.sin(t * 2 + p.phase) * 0.3));
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#F81719" transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
    </instancedMesh>
  );
};

const VolumetricPlanes = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  const planes = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      rotation: [0, (i / 6) * Math.PI, 0] as [number, number, number],
      scale: 3 + i * 0.3,
      opacity: 0.02 - i * 0.002,
    })), []);

  return (
    <group ref={groupRef}>
      {planes.map((plane, i) => (
        <mesh key={i} rotation={plane.rotation}>
          <planeGeometry args={[plane.scale, plane.scale]} />
          <meshBasicMaterial
            color="#F81719"
            transparent
            opacity={Math.max(0.005, plane.opacity)}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};

const Scene = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <ambientLight intensity={0.1} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#F81719" />
        <pointLight position={[-5, -3, -3]} intensity={0.3} color="#F81719" />

        <FlowRibbon offset={0} radius={3} speed={0.4} color="#F81719" width={0.015} />
        <FlowRibbon offset={2} radius={3.5} speed={0.3} color="#F81719" width={0.01} />
        <FlowRibbon offset={4} radius={2.8} speed={0.5} color="#ffffff" width={0.008} />
        <FlowRibbon offset={1} radius={4} speed={0.25} color="#F81719" width={0.006} />

        <VolumetricPlanes />
        <ParticleField />

        <Sparkles count={40} scale={14} size={1.2} speed={0.12} opacity={0.12} color="#F81719" />
      </Canvas>
    </div>
  );
};

export default Scene;
