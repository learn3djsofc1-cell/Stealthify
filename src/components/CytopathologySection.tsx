import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Environment } from '@react-three/drei';
import { motion, useInView } from 'motion/react';

const Node = ({ position, scale = 1, speed = 1, mouseFactor = 1 }: { position: [number, number, number], scale?: number, speed?: number, mouseFactor?: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 1);
    return geo;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed;
    
    if (groupRef.current) {
      const mouseX = (state.pointer.x * window.innerWidth) / 100;
      const mouseY = (state.pointer.y * window.innerHeight) / 100;
      
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, position[0] + mouseX * mouseFactor * 0.5, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, position[1] + mouseY * mouseFactor * 0.5, 0.05);
      
      groupRef.current.rotation.y = time * 0.2;
      groupRef.current.rotation.x = time * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh ref={coreRef} geometry={geometry}>
        <meshPhysicalMaterial
          color="#1a1a1a"
          roughness={0.2}
          metalness={0.8}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
          emissive="#F81719"
          emissiveIntensity={0.3}
          flatShading={true}
        />
      </mesh>

      <mesh scale={1.4}>
        <icosahedronGeometry args={[1, 2]} />
        <meshPhysicalMaterial
          color="#F81719"
          transparent
          opacity={0.15}
          roughness={0}
          metalness={0.9}
          transmission={0} 
          wireframe={true}
        />
      </mesh>
    </group>
  );
};

const NetworkScene = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 12], fov: 35 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#F81719" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#F81719" />
        <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.5} penumbra={1} />
        
        <Node position={[0, -2.5, 0]} scale={2.2} speed={0.5} mouseFactor={0.2} />
        <Node position={[-5, 2, -2]} scale={0.9} speed={0.8} mouseFactor={0.4} />
        <Node position={[5, 3, -3]} scale={0.8} speed={0.7} mouseFactor={0.3} />
        <Node position={[-3.5, -1, 2]} scale={0.6} speed={0.9} mouseFactor={0.5} />
        <Node position={[4, -2, 1]} scale={0.7} speed={0.6} mouseFactor={0.4} />
        <Node position={[6, 0, -5]} scale={0.5} speed={1.0} mouseFactor={0.2} />

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
            Veilary Launch Interface
          </span>
          <h2 className="text-5xl md:text-7xl font-semibold text-white mb-6 tracking-tight leading-tight">
            The Product
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-light leading-relaxed mb-16">
            A simple browser tool to access any dApp privately: paste a URL, launch a stealth session, and choose relayer preferences.
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
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">Anonymous</div>
          </div>
          <div className="w-full h-px md:w-px md:h-12 bg-white/10" />
          <div className="text-center w-full md:w-auto">
            <div className="text-4xl font-bold text-white mb-1 tracking-tight">1-Click</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">Launch</div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 flex items-center gap-3 z-10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F81719] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F81719]"></span>
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
          Veil Network Active
        </span>
      </div>

    </section>
  );
};

export default CytopathologySection;
