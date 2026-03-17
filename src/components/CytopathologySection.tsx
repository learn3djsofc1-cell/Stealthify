import { useMemo } from 'react';
import { motion } from 'motion/react';

const HexGrid = () => {
  const hexagons = useMemo(() => {
    const items: { x: number; y: number; size: number }[] = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 12; col++) {
        const offsetX = row % 2 === 0 ? 0 : 40;
        items.push({
          x: col * 80 + offsetX,
          y: row * 70,
          size: 30 + Math.random() * 10,
        });
      }
    }
    return items;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.06]">
      <svg className="w-full h-full" viewBox="0 0 960 560">
        {hexagons.map((hex, i) => (
          <polygon
            key={i}
            points={`${hex.x},${hex.y - hex.size} ${hex.x + hex.size * 0.866},${hex.y - hex.size * 0.5} ${hex.x + hex.size * 0.866},${hex.y + hex.size * 0.5} ${hex.x},${hex.y + hex.size} ${hex.x - hex.size * 0.866},${hex.y + hex.size * 0.5} ${hex.x - hex.size * 0.866},${hex.y - hex.size * 0.5}`}
            fill="none"
            stroke="#F81719"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
  );
};

const CytopathologySection = () => {
  return (
    <section className="w-full min-h-screen relative overflow-hidden flex items-center py-24 sm:py-32">
      <HexGrid />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(248,23,25,0.06),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#F81719] font-medium tracking-widest text-xs uppercase mb-5 block"
            >
              Launch Interface
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.05]"
            >
              One Click to
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F81719] to-[#F81719]/50">Privacy</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/45 text-lg max-w-lg font-light leading-relaxed mb-10"
            >
              Paste any dApp URL, configure your privacy layer, and launch a fully isolated stealth session in seconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F81719] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F81719]"></span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                Relay Network Online
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { value: '0', label: 'Wallet Connects', color: 'text-white' },
                { value: '100%', label: 'Untraceable', color: 'text-[#F81719]' },
                { value: '1-Click', label: 'Stealth Launch', color: 'text-white' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 sm:p-8 text-center hover:border-[#F81719]/15 transition-all duration-500"
                >
                  <div className={`text-3xl sm:text-4xl font-bold mb-2 tracking-tight ${stat.color}`}>{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6"
            >
              <div className="flex flex-col gap-3 text-[11px] font-mono text-white/40">
                {[
                  { key: 'KEYPAIR_GEN', status: 'SEALED', statusColor: 'text-emerald-500' },
                  { key: 'IDENTITY_MASK', status: 'APPLIED', statusColor: 'text-emerald-500' },
                  { key: 'RELAY_TUNNEL', status: 'ROUTING', statusColor: 'text-[#F81719]' },
                ].map((item) => (
                  <div key={item.key} className="flex justify-between items-center">
                    <span>{item.key}</span>
                    <span className={`${item.statusColor} flex items-center gap-1.5`}>
                      <span className={`w-1 h-1 rounded-full ${item.statusColor === 'text-emerald-500' ? 'bg-emerald-500' : 'bg-[#F81719]'}`} />
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CytopathologySection;
