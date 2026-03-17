import { motion } from 'motion/react';

const chains = [
  { name: 'Solana', symbol: 'SOL' },
  { name: 'Ethereum', symbol: 'ETH' },
  { name: 'Bitcoin', symbol: 'BTC' },
  { name: 'Polygon', symbol: 'MATIC' },
  { name: 'Arbitrum', symbol: 'ARB' },
  { name: 'Avalanche', symbol: 'AVAX' },
  { name: 'Base', symbol: 'BASE' },
  { name: 'Optimism', symbol: 'OP' },
  { name: 'BNB Chain', symbol: 'BNB' },
  { name: 'Cosmos', symbol: 'ATOM' },
  { name: 'Sui', symbol: 'SUI' },
  { name: 'Aptos', symbol: 'APT' },
  { name: 'Near', symbol: 'NEAR' },
  { name: 'Fantom', symbol: 'FTM' },
  { name: 'Tron', symbol: 'TRX' },
];

const SupportedChainsSection = () => {
  return (
    <section className="w-full py-32 px-6 bg-black relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#F81719]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#F81719] font-medium tracking-widest text-xs uppercase mb-4 block"
          >
            Supported Chains
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight"
          >
            15+ Chains. One Private Layer.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            Stealth access and ephemeral wallet generation across every major L1 and L2 blockchain.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {chains.map((chain, index) => (
            <motion.div
              key={chain.symbol}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="group px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.06] transition-all duration-300"
            >
              <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{chain.name}</span>
              <span className="text-xs text-white/35 font-mono ml-2">{chain.symbol}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-white/35">
            New chains integrated continuously. Cross-chain ZK bridging in development.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SupportedChainsSection;
