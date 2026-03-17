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

const MarqueeRow = ({ items, direction = 'left', speed = 30 }: { items: typeof chains; direction?: 'left' | 'right'; speed?: number }) => {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-2">
      <div
        className={`flex gap-4 w-max ${direction === 'left' ? 'animate-[marquee-left_var(--speed)_linear_infinite]' : 'animate-[marquee-right_var(--speed)_linear_infinite]'}`}
        style={{ '--speed': `${speed}s` } as React.CSSProperties}
      >
        {doubled.map((chain, index) => (
          <div
            key={`${chain.symbol}-${index}`}
            className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#F81719]/20 hover:bg-white/[0.04] transition-all duration-500 shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-[#F81719]/[0.06] border border-[#F81719]/10 flex items-center justify-center">
              <span className="text-[10px] font-bold text-[#F81719] tracking-wider">{chain.symbol.slice(0, 2)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white/80">{chain.name}</span>
              <span className="text-[10px] text-white/30 font-mono">{chain.symbol}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SupportedChainsSection = () => {
  const firstHalf = chains.slice(0, 8);
  const secondHalf = chains.slice(8);

  return (
    <section className="w-full py-32 sm:py-40 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            15+ Chains. One Private Layer.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/45 text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            Stealth access and ephemeral wallet generation across every major L1 and L2 blockchain.
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        <MarqueeRow items={firstHalf} direction="left" speed={35} />
        <MarqueeRow items={secondHalf} direction="right" speed={40} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-white/30"
        >
          New chains integrated continuously. Cross-chain ZK bridging in development.
        </motion.p>
      </div>
    </section>
  );
};

export default SupportedChainsSection;
