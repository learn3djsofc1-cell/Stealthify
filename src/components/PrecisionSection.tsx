import { motion } from 'motion/react';
import { KeyRound, Scan, Network, ShieldCheck } from 'lucide-react';
import { useMemo, memo } from 'react';

const GridLines = memo(() => {
  const lines = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: (i / 20) * 100,
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.04] pointer-events-none">
      {lines.map((line) => (
        <div
          key={line.id}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#F81719] to-transparent"
          style={{ left: `${line.x}%` }}
        />
      ))}
    </div>
  );
});

const features = [
  {
    icon: KeyRound,
    title: 'Ephemeral Wallets',
    description: 'Generate disposable Solana keypairs directly in your browser. No seed phrase servers, no account creation, no trace.',
    stat: '0',
    statLabel: 'Data Stored',
    span: 'lg:col-span-7',
    accent: true,
  },
  {
    icon: Scan,
    title: 'Fingerprint Scrambling',
    description: 'Every session generates a unique browser fingerprint. Canvas, WebGL, fonts, and hardware profiles are randomized per connection.',
    stat: '100%',
    statLabel: 'Randomized',
    span: 'lg:col-span-5',
    accent: false,
  },
  {
    icon: Network,
    title: 'VeilRelay Nodes',
    description: 'Traffic routed through audited, decentralized relay nodes. Each operator is cryptographically verified and independently monitored.',
    stat: '50+',
    statLabel: 'Active Nodes',
    span: 'lg:col-span-5',
    accent: false,
  },
  {
    icon: ShieldCheck,
    title: 'Zero-Knowledge Proofs',
    description: 'Verify actions cryptographically without revealing identity. Unlinkable attestations prove participation without exposing the participant.',
    stat: 'ZK',
    statLabel: 'Verified',
    span: 'lg:col-span-7',
    accent: true,
  },
];

const PrecisionSection = () => {
  return (
    <section id="features" className="w-full py-32 sm:py-40 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#F81719] font-medium tracking-widest text-xs uppercase mb-4 block"
            >
              Core Primitives
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05]"
            >
              Built for
              <br />
              Invisibility
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/45 text-lg max-w-md font-light leading-relaxed lg:text-right"
          >
            Four integrated privacy primitives that work together to make your on-chain activity completely untraceable.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`${feature.span} group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/[0.06] p-7 sm:p-10 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] hover:border-[#F81719]/15 hover:bg-white/[0.04] transition-all duration-500`}
              >
                {feature.accent && <GridLines />}

                <div className="flex items-start justify-between mb-auto">
                  <div className="w-14 h-14 rounded-2xl bg-[#F81719]/[0.08] border border-[#F81719]/15 flex items-center justify-center group-hover:bg-[#F81719]/[0.12] group-hover:border-[#F81719]/25 transition-all duration-500">
                    <Icon className="w-6 h-6 text-[#F81719]" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl sm:text-4xl font-bold text-white/90 tracking-tight">{feature.stat}</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">{feature.statLabel}</div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-white/40 font-light leading-relaxed text-sm sm:text-base">{feature.description}</p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F81719]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PrecisionSection;
