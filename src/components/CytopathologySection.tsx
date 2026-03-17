import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Environment } from '@react-three/drei';
import { motion, useInView } from 'motion/react';

const RelayNode = ({ position, scale = 1, speed = 1, mouseFactor = 1 }: { position: [number, number, number], scale?: number, speed?: number, mouseFactor?: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => new THREE.OctahedronGeometry(1, 0), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed;

    if (groupRef.current) {
      const mouseX = (state.pointer.x * window.innerWidth) / 100;
      const mouseY = (state.pointer.y * window.innerHeight) / 100;

      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, position[0] + mouseX * mouseFactor * 0.4, 0.04);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, position[1] + mouseY * mouseFactor * 0.4, 0.04);

      groupRef.current.rotation.y = time * 0.15;
      groupRef.current.rotation.x = time * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#1a1a1a"
          roughness={0.15}
          metalness={0.85}
          clearcoat={0.4}
          clearcoatRoughness={0.1}
          emissive="#F81719"
          emissiveIntensity={0.25}
          flatShading
        />
      </mesh>

      <mesh scale={1.3}>
        <octahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial
          color="#F81719"
          transparent
          opacity={0.1}
          roughness={0}
          metalness={0.9}
          wireframe
        />
      </mesh>
    </group>
  );
};

const NetworkScene = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 12], fov: 35 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <ambientLight intensity={0.25} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#F81719" />
        <pointLight position={[-10, -10, -5]} intensity={0.4} color="#F81719" />
        <spotLight position={[0, 10, 0]} intensity={0.6} angle={0.5} penumbra={1} />

        <RelayNode position={[0, -2.5, 0]} scale={2} speed={0.4} mouseFactor={0.15} />
        <RelayNode position={[-5, 2, -2]} scale={0.8} speed={0.7} mouseFactor={0.35} />
        <RelayNode position={[5, 3, -3]} scale={0.7} speed={0.6} mouseFactor={0.25} />
        <RelayNode position={[-3.5, -1, 2]} scale={0.5} speed={0.8} mouseFactor={0.4} />
        <RelayNode position={[4, -2, 1]} scale={0.6} speed={0.5} mouseFactor={0.35} />
        <RelayNode position={[6, 0, -5]} scale={0.4} speed={0.9} mouseFactor={0.2} />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

const CytopathologySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: false });

  return (
    <section ref={ref} className="w-full min-h-screen bg-black relative overflow-hidden flex flex-col items-center justify-center py-24">

      {isInView && <NetworkScene />}

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-[-10vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#F81719] font-medium tracking-widest text-xs uppercase mb-4 block">
            Launch Interface
          </span>
          <h2 className="text-5xl md:text-7xl font-semibold text-white mb-6 tracking-tight leading-tight">
            One Click to Privacy
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-light leading-relaxed mb-16">
            Paste any dApp URL, configure your privacy layer, and launch a fully isolated stealth session in seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-[2rem] px-8 py-8 md:px-12 gap-8 md:gap-16 shadow-2xl relative z-20 w-full md:w-auto max-w-sm md:max-w-none mx-auto"
        >
          <div className="text-center w-full md:w-auto">
            <div className="text-4xl font-bold text-white mb-1 tracking-tight">0</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">Wallet Connects</div>
          </div>
          <div className="w-full h-px md:w-px md:h-12 bg-white/10" />
          <div className="text-center w-full md:w-auto">
            <div className="text-4xl font-bold text-white mb-1 tracking-tight">100%</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">Untraceable</div>
          </div>
          <div className="w-full h-px md:w-px md:h-12 bg-white/10" />
          <div className="text-center w-full md:w-auto">
            <div className="text-4xl font-bold text-white mb-1 tracking-tight">1-Click</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">Stealth Launch</div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 flex items-center gap-3 z-10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F81719] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F81719]"></span>
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
          Relay Network Online
        </span>
      </div>

    </section>
  );
};

export default CytopathologySection;
