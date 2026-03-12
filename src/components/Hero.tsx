import { motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Scene from './Nucleus3D';
import Navbar from './Navbar';
import { useRef } from 'react';

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px 0px -200px 0px" });

  return (
    <div ref={ref} className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col font-sans selection:bg-purple-500/30">
      <Navbar />
      
      <main className="flex-grow flex flex-col lg:flex-row items-center justify-between relative max-w-7xl mx-auto w-full px-6 pt-24 lg:pt-0 z-10">
        
        <div className="w-full lg:w-1/2 z-20 flex flex-col justify-center lg:pr-12 mt-12 lg:mt-0">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-[4rem] font-medium text-white leading-[1.05] tracking-tight mb-6"
          >
            The Verifiable,<br />
            Anonymous Internet<br />
            for Web3.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed mb-8 font-light tracking-wide"
          >
            A privacy-native access layer integrating with OpenClaw for audited, discoverable relayer agents and easy third-party deployments.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link to="/app" className="px-6 py-3 bg-white text-black rounded-full font-medium text-xs flex items-center gap-2 hover:bg-gray-200 transition-colors duration-300">
              Launch App
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/app" className="px-6 py-3 bg-[#1A1A1A] border border-white/10 text-white rounded-full font-medium text-xs hover:bg-[#252525] hover:border-white/20 transition-all duration-300">
              Start Building →
            </Link>
          </motion.div>
        </div>

        <div className="absolute top-0 right-0 w-full h-full lg:w-[60%] lg:h-full pointer-events-none z-0 lg:translate-x-20 opacity-40 lg:opacity-100">
            {isInView && <Scene />}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        </div>

      </main>
    </div>
  );
};

export default Hero;
