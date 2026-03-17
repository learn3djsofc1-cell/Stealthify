import { motion } from 'motion/react';
import { KeyRound, Scan, Network } from 'lucide-react';
import clsx from 'clsx';
import { useMemo, memo } from 'react';

const Card = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={clsx(
      "relative overflow-hidden rounded-[2rem] bg-white/[0.04] border border-white/[0.08] p-8 md:p-10 flex flex-col group hover:border-white/[0.14] hover:shadow-[0_8px_40px_rgba(248,23,25,0.06)] transition-all duration-300",
      className
    )}
  >
    {children}
  </motion.div>
);

const IconBox = ({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) => (
  <div className="w-12 h-12 rounded-2xl bg-[#F81719]/10 border border-[#F81719]/20 flex items-center justify-center mb-6 group-hover:bg-[#F81719]/15 transition-colors">
    <Icon className="w-5 h-5 text-[#F81719] stroke-[1.5]" />
  </div>
);

const MatrixRain = memo(() => {
  const columns = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * -5,
    duration: 3 + Math.random() * 4,
    digits: Array.from({ length: 15 }, () => Math.random() > 0.5 ? '1' : '0')
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      {columns.map((col) => (
        <div
          key={col.id}
          className="absolute top-0 flex flex-col text-[10px] font-mono text-[#F81719]/30 leading-tight select-none animate-fall"
          style={{
            left: `${col.x}%`,
            animationDuration: `${col.duration}s`,
            animationDelay: `${col.delay}s`
          }}
        >
          {col.digits.map((digit, j) => (
            <span key={j} style={{ opacity: 1 - j * 0.06 }}>
              {digit}
            </span>
          ))}
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent" />
    </div>
  );
});

const RadarVisualization = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center min-h-[320px]">
       <div className="relative w-[280px] h-[280px] flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/[0.08]" />
          <div className="absolute inset-[18%] rounded-full border border-white/[0.10] border-dashed opacity-50" />
          <div className="absolute inset-0 rounded-full animate-[spin_4s_linear_infinite]">
            <div
              className="w-full h-full rounded-full"
              style={{
                background: 'conic-gradient(from 180deg, transparent 0deg, transparent 240deg, rgba(248, 23, 25, 0.02) 280deg, rgba(248, 23, 25, 0.12) 360deg)'
              }}
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <span className="text-6xl font-bold text-white tracking-tight">100%</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 mt-2 font-medium">Untraceable</span>
          </div>
          <div className="absolute top-[20%] right-[20%] w-1.5 h-1.5 bg-[#F81719] rounded-full shadow-[0_0_8px_rgba(248,23,25,0.8)] animate-pulse" />
       </div>
       <div className="absolute bottom-4 w-full px-4">
          <DataList />
       </div>
    </div>
  );
};

const DataList = () => (
  <div className="flex flex-col gap-2 text-[10px] font-mono text-white/40 w-full max-w-[240px] mx-auto">
    <div className="flex justify-between items-center border-b border-white/[0.06] pb-1.5">
      <span>KEYPAIR_GEN</span>
      <span className="text-emerald-500 flex items-center gap-1.5">
        <span className="w-1 h-1 bg-emerald-500 rounded-full" /> SEALED
      </span>
    </div>
    <div className="flex justify-between items-center border-b border-white/[0.06] pb-1.5">
      <span>IDENTITY_MASK</span>
      <span className="text-emerald-500 flex items-center gap-1.5">
        <span className="w-1 h-1 bg-emerald-500 rounded-full" /> APPLIED
      </span>
    </div>
    <div className="flex justify-between items-center border-b border-white/[0.06] pb-1.5">
      <span>RELAY_TUNNEL</span>
      <span className="text-[#F81719] flex items-center gap-1.5">
        <span className="w-1 h-1 bg-[#F81719] rounded-full" /> ROUTING
      </span>
    </div>
  </div>
);

const PrecisionSection = () => {
  return (
    <section id="features" className="w-full bg-black py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight"
          >
            Built for Invisibility
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            Four integrated privacy primitives that work together to make your on-chain activity completely untraceable while remaining fully verifiable.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-fr">

          <Card className="md:col-span-7 min-h-[380px] flex flex-col md:flex-row items-center justify-between overflow-hidden" delay={0.2}>
            <div className="flex flex-col justify-between h-full w-full md:max-w-[40%] z-10 relative mb-8 md:mb-0">
              <IconBox icon={KeyRound} />
              <div>
                <h3 className="text-3xl font-semibold text-white mb-4 tracking-tight">Ephemeral Wallets</h3>
                <p className="text-white/50 font-light leading-relaxed text-sm">
                  Generate disposable Solana keypairs directly in your browser. No seed phrase servers, no account creation, no trace.
                </p>
              </div>
            </div>
            <div className="relative md:absolute md:right-0 md:top-0 md:bottom-0 w-full md:w-[60%] h-[280px] md:h-auto flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-[#F81719]/[0.03] to-transparent" />
              <RadarVisualization />
            </div>
          </Card>

          <Card className="md:col-span-5 min-h-[380px]" delay={0.3}>
            <div className="flex justify-between items-start w-full mb-auto">
              <IconBox icon={Scan} />
              <div className="flex gap-2 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F81719]" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="mt-auto">
              <h3 className="text-3xl font-semibold text-white mb-4 tracking-tight">Fingerprint Scrambling</h3>
              <p className="text-white/50 font-light leading-relaxed text-sm">
                Every session generates a unique browser fingerprint. Canvas, WebGL, fonts, and hardware profiles are randomized per connection.
              </p>
            </div>
          </Card>

          <Card className="md:col-span-4 min-h-[380px] relative overflow-hidden" delay={0.4}>
             <div className="absolute inset-0 bg-gradient-to-br from-[#F81719]/[0.03] via-transparent to-transparent" />
             <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#F81719]/[0.04] blur-[80px] rounded-full pointer-events-none" />

             <IconBox icon={Network} />

             <div className="mt-auto relative z-10">
              <h3 className="text-3xl font-semibold text-white mb-4 tracking-tight">OpenClaw Relayers</h3>
              <p className="text-white/50 font-light leading-relaxed text-sm">
                Traffic routed through audited, decentralized relay nodes. Each operator is cryptographically verified and independently monitored.
              </p>
            </div>
          </Card>

          <Card className="md:col-span-8 min-h-[380px] flex items-center justify-center relative overflow-hidden" delay={0.5}>
            <MatrixRain />

            <div className="relative z-10 bg-black/90 backdrop-blur-xl border border-white/[0.08] px-12 py-10 rounded-2xl text-center shadow-[0_8px_40px_rgba(248,23,25,0.06)]">
              <div className="text-6xl font-semibold text-white mb-3 tracking-tighter">100%</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-medium">Verifiable Relay Audit</div>
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
};

export default PrecisionSection;
