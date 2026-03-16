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
    <div ref={ref} className="relative w-full min-h-screen bg-[#FFF6E5] overflow-hidden flex flex-col font-sans selection:bg-black/20">
      <Navbar />
      
      <main className="flex-grow flex flex-col lg:flex-row items-center justify-between relative max-w-7xl mx-auto w-full px-6 pt-24 lg:pt-0 z-10">
        
        <div className="w-full lg:w-1/2 z-20 flex flex-col justify-center lg:pr-12 mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/[0.04] border border-black/[0.06] mb-8 w-fit"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-black/60 tracking-wide">Relay Network Live</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-[4rem] font-semibold text-black leading-[1.05] tracking-tight mb-6"
          >
            Forge Your Path<br />
            Through the<br />
            Anonymous Web.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-black/50 text-base sm:text-lg max-w-xl leading-relaxed mb-8 font-light tracking-wide"
          >
            A privacy-native access layer integrating with OpenClaw for audited, discoverable relayer agents and easy third-party deployments.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link to="/app" className="px-7 py-3.5 bg-black text-white rounded-full font-medium text-sm flex items-center gap-2 hover:bg-black/80 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
              Launch App
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/docs" className="px-7 py-3.5 bg-white border border-black/10 text-black rounded-full font-medium text-sm hover:bg-black/[0.03] hover:border-black/20 transition-all duration-300">
              Documentation
            </Link>
          </motion.div>
        </div>

        <div className="absolute top-0 right-0 w-full h-full lg:w-[60%] lg:h-full pointer-events-none z-0 lg:translate-x-20 opacity-40 lg:opacity-100">
            {isInView && <Scene />}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-black/[0.03] blur-[120px] rounded-full pointer-events-none" />
        </div>

      </main>
    </div>
  );
};

export default Hero;
