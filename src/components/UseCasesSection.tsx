import { motion } from 'motion/react';
import { TrendingUp, Repeat, Banknote, Layers } from 'lucide-react';

const useCases = [
  {
    icon: TrendingUp,
    title: 'Private DeFi Trading',
    description: 'Access DEXs, lending pools, and yield protocols without exposing your wallet history or trading patterns to on-chain surveillance.',
  },
  {
    icon: Repeat,
    title: 'Cross-Chain Transfers',
    description: 'Bridge assets across 15+ chains with zero-knowledge proofs. Transaction graphs stay unlinkable and private at every hop.',
  },
  {
    icon: Banknote,
    title: 'Stealth Payments',
    description: 'Send and receive tokens without revealing sender or recipient identity. Stealth addresses ensure complete payment unlinkability.',
  },
  {
    icon: Layers,
    title: 'Protocol Interaction',
    description: 'Mint NFTs, vote in DAOs, and interact with any smart contract through an isolated, fingerprint-free session.',
  },
];

const UseCasesSection = () => {
  return (
    <section className="w-full py-32 px-6 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#F81719]/[0.03] rounded-full blur-[120px] pointer-events-none" />

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
            className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight"
          >
            Privacy Across Every Workflow
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            From trading to governance, Veilary ensures your on-chain footprint stays invisible without sacrificing verifiability.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-[2rem] bg-white/[0.03] border border-white/[0.06] p-8 md:p-10 hover:border-[#F81719]/20 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#F81719]/[0.03] rounded-full blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="w-12 h-12 rounded-2xl bg-[#F81719]/10 border border-[#F81719]/20 flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-[#F81719]" />
                </div>

                <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight">{useCase.title}</h3>
                <p className="text-white/50 font-light leading-relaxed">{useCase.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
