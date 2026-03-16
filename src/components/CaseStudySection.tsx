import React from 'react';
import { motion } from 'motion/react';

const CaseStudySection: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-[#FFF6E5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-16 relative overflow-hidden border border-black/[0.06] shadow-[0_8px_40px_rgba(0,0,0,0.04)]"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#FFF6E5]/30 via-transparent to-transparent pointer-events-none" />

          <div className="flex flex-col justify-center relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-600 text-xs font-mono tracking-[0.2em] uppercase">
                Ecosystem Growth
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black mb-8 leading-[1.1]">
              Ideal Users
            </h2>

            <ul className="text-lg text-black/50 leading-relaxed mb-12 max-w-md space-y-4 list-disc pl-5">
              <li>Privacy-focused Web3 users needing anonymous dApp access.</li>
              <li>Protocols and DAOs requiring verifiable audit trails.</li>
              <li>Enterprise teams needing private testnets or stealth access.</li>
              <li>Relayer operators publishing trusted relayers via OpenClaw.</li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-12 sm:gap-24 border-t border-black/[0.06] pt-12">
              <div>
                <div className="text-5xl font-semibold text-black tracking-tight mb-2">10+</div>
                <div className="text-sm text-black/40 font-medium uppercase tracking-wide">Active Sessions</div>
              </div>
              <div>
                <div className="text-5xl font-semibold text-black tracking-tight mb-2">50+</div>
                <div className="text-sm text-black/40 font-medium uppercase tracking-wide">Relayer Nodes</div>
              </div>
            </div>
          </div>

          <div className="relative z-10 h-full min-h-[400px]">
            <div className="bg-[#FFF6E5] rounded-3xl p-8 h-full border border-black/[0.06] relative overflow-hidden flex flex-col">
              <div className="mb-auto">
                <h3 className="text-xl font-medium text-black mb-1">Privacy Score</h3>
                <p className="text-sm text-black/40">Comparative Analysis</p>
              </div>

              <div className="flex items-end justify-center gap-8 sm:gap-16 h-[300px] mt-8 px-4 pb-4">
                <div className="flex flex-col items-center gap-4 w-1/3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-black/30">Public VPN</span>
                  <div className="w-full h-[80px] bg-black/[0.04] rounded-t-lg relative group">
                    <div className="absolute inset-0 bg-black/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-lg" />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 w-1/3 h-full justify-end">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-black">RelayForge</span>
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="w-full bg-gradient-to-b from-black/80 to-black rounded-t-xl relative shadow-[0_0_50px_-10px_rgba(0,0,0,0.3)]"
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-t-xl" />
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-white/30" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudySection;
