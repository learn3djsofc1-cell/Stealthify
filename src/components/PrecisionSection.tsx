import { motion } from 'motion/react';
import { Wallet, Ghost, Bot, Send } from 'lucide-react';
import clsx from 'clsx';
import { useMemo, memo } from 'react';

const Card = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={clsx(
      "relative overflow-hidden rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 p-8 md:p-10 flex flex-col group hover:border-white/10 transition-colors",
      className
    )}
  >
    {children}
  </motion.div>
);

const IconBox = ({ icon: Icon }: { icon: any }) => (
  <div className="w-12 h-12 rounded-2xl bg-[#151515] border border-white/5 flex items-center justify-center mb-6 group-hover:bg-[#202020] transition-colors">
    <Icon className="w-5 h-5 text-purple-400 stroke-[1.5]" />
  </div>
);

const MatrixRain = memo(() => {
  // Generate columns of random binary digits
  const columns = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * -5,
    duration: 3 + Math.random() * 4,
    digits: Array.from({ length: 15 }, () => Math.random() > 0.5 ? '1' : '0')
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
      {columns.map((col) => (
        <div 
          key={col.id}
          className="absolute top-0 flex flex-col text-[10px] font-mono text-purple-500/60 leading-tight select-none animate-fall"
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
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-transparent" />
    </div>
  );
});

const RadarVisualization = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center min-h-[320px]">
       {/* Radar Container */}
       <div className="relative w-[280px] h-[280px] flex items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border border-white/5" />
          
          {/* Inner Dashed Ring */}
          <div className="absolute inset-[18%] rounded-full border border-white/10 border-dashed opacity-50" />
          
          {/* Radar Sweep Gradient */}
          <div className="absolute inset-0 rounded-full animate-[spin_4s_linear_infinite]">
            <div 
              className="w-full h-full rounded-full"
              style={{
                background: 'conic-gradient(from 180deg, transparent 0deg, transparent 240deg, rgba(147, 51, 234, 0.02) 280deg, rgba(147, 51, 234, 0.25) 360deg)'
              }}
            />
          </div>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <span className="text-6xl font-bold text-white/90 tracking-tight drop-shadow-2xl">100%</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mt-2 font-medium">Anonymous</span>
          </div>
          
          {/* Blip */}
          <div className="absolute top-[20%] right-[20%] w-1.5 h-1.5 bg-green-500/50 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
       </div>

       {/* Data List Overlay */}
       <div className="absolute bottom-4 w-full px-4">
          <DataList />
       </div>
    </div>
  );
};

const DataList = () => (
  <div className="flex flex-col gap-2 text-[10px] font-mono text-gray-600 w-full max-w-[240px] mx-auto">
    <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
      <span>WALLET_GEN</span>
      <span className="text-green-500/80 flex items-center gap-1.5">
        <span className="w-1 h-1 bg-green-500 rounded-full" /> COMPLETE
      </span>
    </div>
    <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
      <span>KEYS_CREATED</span>
      <span className="text-green-500/80 flex items-center gap-1.5">
        <span className="w-1 h-1 bg-green-500 rounded-full" /> SECURED
      </span>
    </div>
    <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
      <span>ANON_READY</span>
      <span className="text-purple-500/80 flex items-center gap-1.5">
        <span className="w-1 h-1 bg-purple-500 rounded-full" /> ACTIVE
      </span>
    </div>
  </div>
);

const PrecisionSection = () => {
  return (
    <section className="w-full bg-[#050505] py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight"
          >
            Key Features
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            Stealthify delivers privacy-first dApp access with enterprise-grade auditability by combining anonymous session technology, encrypted session memory, and an OpenClaw-powered relayer ecosystem.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-fr">
          
          {/* Card 1: Anonymous Wallet Creation (Wide) */}
          <Card className="md:col-span-7 min-h-[380px] flex flex-col md:flex-row items-center justify-between overflow-hidden" delay={0.2}>
            <div className="flex flex-col justify-between h-full w-full md:max-w-[40%] z-10 relative mb-8 md:mb-0">
              <IconBox icon={Wallet} />
              <div>
                <h3 className="text-3xl font-medium text-white mb-4 tracking-tight">Anonymous Wallet Creation</h3>
                <p className="text-gray-400 font-light leading-relaxed text-sm">
                  No login, no wallet connect. Wallets are generated instantly and privately in-browser.
                </p>
              </div>
            </div>

            {/* Visualization */}
            <div className="relative md:absolute md:right-0 md:top-0 md:bottom-0 w-full md:w-[60%] h-[280px] md:h-auto flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-purple-900/5 to-transparent" />
              <RadarVisualization />
            </div>
          </Card>

          {/* Card 2: Stealth Browsing (Small) */}
          <Card className="md:col-span-5 min-h-[380px]" delay={0.3}>
            <div className="flex justify-between items-start w-full mb-auto">
              <IconBox icon={Ghost} />
              <div className="flex gap-2 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              </div>
            </div>
            
            <div className="mt-auto">
              <h3 className="text-3xl font-medium text-white mb-4 tracking-tight">Stealth Browsing</h3>
              <p className="text-gray-400 font-light leading-relaxed text-sm">
                Fingerprint-randomized, IP-cloaked, and isolated per dApp session.
              </p>
            </div>
          </Card>

          {/* Card 3: OpenClaw Agents (Small) */}
          <Card className="md:col-span-4 min-h-[380px] relative overflow-hidden" delay={0.4}>
             <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-transparent" />
             
             {/* Purple Light Effect Bottom Right */}
             <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-600/20 blur-[80px] rounded-full pointer-events-none" />
             
             <IconBox icon={Bot} />
             
             <div className="mt-auto relative z-10">
              <h3 className="text-3xl font-medium text-white mb-4 tracking-tight">OpenClaw Agents</h3>
              <p className="text-gray-400 font-light leading-relaxed text-sm">
                One-click deployable relayer agents, verifiable agent manifests, and a registry for trusted relayer operators.
              </p>
            </div>
          </Card>

          {/* Card 4: Transaction Relaying (Wide) */}
          <Card className="md:col-span-8 min-h-[380px] flex items-center justify-center relative overflow-hidden" delay={0.5}>
            <MatrixRain />
            
            <div className="relative z-10 bg-[#050505]/90 backdrop-blur-xl border border-white/10 px-12 py-10 rounded-2xl text-center shadow-2xl">
              <div className="text-6xl font-semibold text-white mb-3 tracking-tighter">100%</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-medium">Auditable Relaying</div>
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
};

export default PrecisionSection;
