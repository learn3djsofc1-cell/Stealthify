import { motion } from 'motion/react';

const chains = [
  { name: 'Solana', symbol: 'SOL', color: '#9945FF' },
  { name: 'Ethereum', symbol: 'ETH', color: '#627EEA' },
  { name: 'Bitcoin', symbol: 'BTC', color: '#F7931A' },
  { name: 'Polygon', symbol: 'MATIC', color: '#8247E5' },
  { name: 'Arbitrum', symbol: 'ARB', color: '#28A0F0' },
  { name: 'Avalanche', symbol: 'AVAX', color: '#E84142' },
  { name: 'Base', symbol: 'BASE', color: '#0052FF' },
  { name: 'Optimism', symbol: 'OP', color: '#FF0420' },
  { name: 'BNB Chain', symbol: 'BNB', color: '#F0B90B' },
  { name: 'Cosmos', symbol: 'ATOM', color: '#2E3148' },
  { name: 'Sui', symbol: 'SUI', color: '#4DA2FF' },
  { name: 'Aptos', symbol: 'APT', color: '#2DD8A3' },
  { name: 'Near', symbol: 'NEAR', color: '#00C08B' },
  { name: 'Fantom', symbol: 'FTM', color: '#1969FF' },
  { name: 'Tron', symbol: 'TRX', color: '#FF0013' },
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
            Veilary supports stealth access and anonymous wallet generation across all major Layer 1 and Layer 2 blockchains.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {chains.map((chain, index) => (
            <motion.div
              key={chain.symbol}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="group flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.06] transition-all duration-300"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: `${chain.color}30`, border: `1px solid ${chain.color}50` }}
              >
                {chain.symbol.slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{chain.name}</p>
                <p className="text-[10px] text-white/40 font-mono">{chain.symbol}</p>
              </div>
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
            More chains added regularly. Cross-chain ZK bridges coming soon.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SupportedChainsSection;
