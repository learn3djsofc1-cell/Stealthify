import { motion } from 'motion/react';
import { TrendingUp, Repeat, Banknote, Layers } from 'lucide-react';

const useCases = [
  {
    icon: TrendingUp,
    title: 'Private DeFi Trading',
    description: 'Access DEXs, lending pools, and yield protocols without exposing your wallet history or trading patterns to on-chain surveillance.',
    tag: 'DeFi',
  },
  {
    icon: Repeat,
    title: 'Cross-Chain Transfers',
    description: 'Bridge assets across 15+ chains with zero-knowledge proofs. Transaction graphs stay unlinkable and private at every hop.',
    tag: 'Bridges',
  },
  {
    icon: Banknote,
    title: 'Stealth Payments',
    description: 'Send and receive tokens without revealing sender or recipient identity. Stealth addresses ensure complete payment unlinkability.',
    tag: 'Payments',
  },
  {
    icon: Layers,
    title: 'Protocol Interaction',
    description: 'Mint NFTs, vote in DAOs, and interact with any smart contract through an isolated, fingerprint-free session.',
    tag: 'Protocols',
  },
];

const UseCasesSection = () => {
  return (
    <section id="use-cases" className="w-full py-32 sm:py-40 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#F81719] font-medium tracking-widest text-xs uppercase mb-4 block"
          >
            Use Cases
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Privacy Across Every Workflow
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/45 text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            From trading to governance, Veilary ensures your on-chain footprint stays invisible without sacrificing verifiability.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/[0.06] p-8 sm:p-10 hover:border-[#F81719]/15 hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F81719]/[0.03] rounded-full blur-[60px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#F81719]/[0.08] border border-[#F81719]/15 flex items-center justify-center group-hover:bg-[#F81719]/[0.12] transition-colors duration-500">
                    <Icon className="w-5 h-5 text-[#F81719]" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/[0.04]">{useCase.tag}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 tracking-tight">{useCase.title}</h3>
                <p className="text-white/40 font-light leading-relaxed text-sm sm:text-base">{useCase.description}</p>

                <div className="mt-6 flex items-center gap-2 text-[#F81719]/60 group-hover:text-[#F81719] transition-colors duration-300 text-xs font-medium">
                  <span>Learn more</span>
                  <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
