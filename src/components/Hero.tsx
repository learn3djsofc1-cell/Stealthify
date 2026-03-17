import { motion, useInView } from 'motion/react';
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { lazy, Suspense, useRef } from 'react';
import Navbar from './Navbar';

const Scene = lazy(() => import('./Nucleus3D'));

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px 0px -200px 0px" });

  return (
    <div ref={ref} className="relative w-full min-h-screen overflow-hidden flex flex-col font-sans selection:bg-[#F81719]/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(248,23,25,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_80%)] pointer-events-none" />

      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center relative max-w-7xl mx-auto w-full px-6 pt-28 pb-16 lg:pt-0 z-10">

        <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0 opacity-30 lg:opacity-60">
          {isInView && (
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          )}
        </div>

        <div className="w-full max-w-4xl z-20 flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.02] tracking-tight mb-8"
          >
            Privacy Layer for
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F81719] to-[#F81719]/60">
              Web3
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/45 text-lg sm:text-xl max-w-2xl leading-relaxed mb-12 font-light"
          >
            Stealth browsing, anonymous wallets, and zero-knowledge proofs. All powered by the OpenClaw relayer network.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link to="/app" className="px-8 py-4 bg-[#F81719] text-white rounded-full font-semibold text-sm flex items-center gap-2.5 hover:bg-[#d91416] transition-all duration-300 shadow-[0_0_30px_rgba(248,23,25,0.25)] hover:shadow-[0_0_40px_rgba(248,23,25,0.4)]">
              Launch App
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/docs" className="px-8 py-4 bg-white/[0.05] border border-white/[0.10] text-white rounded-full font-semibold text-sm hover:bg-white/[0.08] hover:border-white/[0.16] transition-all duration-300">
              Documentation
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="z-20 mt-16 sm:mt-20 px-6"
        >
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-12 lg:gap-16">
            {[
              { icon: Shield, label: 'Zero Logs', value: '0' },
              { icon: Globe, label: 'Chains', value: '15+' },
              { icon: Zap, label: 'Uptime', value: '99.9%' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-[#F81719]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white leading-none">{stat.value}</span>
                  <span className="text-[10px] text-white/35 uppercase tracking-widest">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </main>
    </div>
  );
};

export default Hero;
