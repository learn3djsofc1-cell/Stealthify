import { motion, useInView } from 'motion/react';
import { ArrowRight, Copy, Check, Download, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Scene from './Nucleus3D';
import Navbar from './Navbar';
import { useRef, useState } from 'react';

const CA = "CCZ82whciPVkMdUj3Uqn4TX76F6BZ7rEstWHUEKwpump";

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px 0px -200px 0px" });
  const [copied, setCopied] = useState(false);

  const copyCA = () => {
    navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div ref={ref} className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col font-sans selection:bg-[#F81719]/20">
      <Navbar />
      
      <main className="flex-grow flex flex-col lg:flex-row items-center justify-between relative max-w-7xl mx-auto w-full px-6 pt-24 lg:pt-0 z-10">
        
        <div className="w-full lg:w-1/2 z-20 flex flex-col justify-center lg:pr-12 mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-8 w-fit"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#F81719] animate-pulse" />
            <span className="text-xs font-medium text-white/60 tracking-wide">Veil Network Live</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-[4rem] font-semibold text-white leading-[1.05] tracking-tight mb-6"
          >
            Disappear Into<br />
            the Decentralized<br />
            Web.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/50 text-base sm:text-lg max-w-xl leading-relaxed mb-8 font-light tracking-wide"
          >
            A privacy-native access layer with stealth browsing, anonymous wallets, and zero-knowledge technology — powered by the OpenClaw relayer network.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link to="/app" className="px-7 py-3.5 bg-[#F81719] text-white rounded-full font-medium text-sm flex items-center gap-2 hover:bg-[#F81719]/80 transition-all duration-300 shadow-[0_4px_20px_rgba(248,23,25,0.3)]">
              Launch App
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/docs" className="px-7 py-3.5 bg-white/[0.06] border border-white/[0.10] text-white rounded-full font-medium text-sm hover:bg-white/[0.10] hover:border-white/[0.18] transition-all duration-300">
              Documentation
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5"
          >
            <a
              href="/Veilary-OS.apk"
              download="Veilary-OS.apk"
              className="inline-flex items-center gap-3 px-5 py-3 bg-white/[0.06] border border-white/[0.10] text-white rounded-xl font-medium text-sm hover:bg-white/[0.10] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.12)] group"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-[#F81719]/20 rounded-lg">
                <Smartphone className="w-4 h-4 text-[#F81719]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/60 uppercase tracking-wider leading-none">Download</span>
                <span className="text-sm font-semibold leading-tight">Veilary OS</span>
              </div>
              <Download className="w-4 h-4 ml-1 text-white/50 group-hover:text-white transition-colors" />
            </a>
            <span className="text-[10px] text-white/35 mt-1.5 block">Android APK v1.0</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6"
          >
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-medium mb-1.5 block">Contract Address</span>
            <button
              onClick={copyCA}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl hover:bg-white/[0.07] hover:border-white/[0.14] transition-all duration-300 group cursor-pointer max-w-full"
            >
              <code className="text-xs sm:text-sm font-mono text-white/70 truncate">{CA}</code>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-white/30 group-hover:text-white/60 transition-colors shrink-0" />
              )}
            </button>
          </motion.div>
        </div>

        <div className="absolute top-0 right-0 w-full h-full lg:w-[60%] lg:h-full pointer-events-none z-0 lg:translate-x-20 opacity-40 lg:opacity-100">
            {isInView && <Scene />}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F81719]/[0.05] blur-[120px] rounded-full pointer-events-none" />
        </div>

      </main>
    </div>
  );
};

export default Hero;
