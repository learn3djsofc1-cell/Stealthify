import { motion } from 'motion/react';
import { Users, Server, Shield, Activity } from 'lucide-react';

const stats = [
  { icon: Users, value: '10+', label: 'Active Sessions', color: 'text-[#F81719]' },
  { icon: Server, value: '50+', label: 'Relayer Nodes', color: 'text-[#F81719]' },
  { icon: Shield, value: '99.9%', label: 'Uptime SLA', color: 'text-emerald-500' },
  { icon: Activity, value: '0', label: 'Data Logged', color: 'text-emerald-500' },
];

const audiences = [
  'Privacy-focused Web3 users needing anonymous dApp access.',
  'Protocols and DAOs requiring verifiable audit trails.',
  'Enterprise teams needing private testnets or stealth access.',
  'Relayer operators publishing trusted relayers via OpenClaw.',
];

const CaseStudySection = () => {
  return (
    <section className="py-32 sm:py-40 px-6 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#F81719] font-medium tracking-widest text-xs uppercase mb-4 block"
          >
            Ecosystem Growth
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Built for Real Users
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 mb-16">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8 text-center hover:border-[#F81719]/15 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-white/35 uppercase tracking-wider font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl sm:rounded-3xl p-8 sm:p-12">
            <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-8 tracking-tight">Ideal Users</h3>
            <div className="space-y-5">
              {audiences.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-6 h-6 rounded-full bg-[#F81719]/10 border border-[#F81719]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-[#F81719]">{i + 1}</span>
                  </div>
                  <p className="text-white/45 font-light leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl sm:rounded-3xl p-8 sm:p-12 flex flex-col">
            <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4 tracking-tight">Privacy Score</h3>
            <p className="text-sm text-white/35 mb-8">Comparative Analysis</p>

            <div className="flex-1 flex items-end justify-center gap-12 sm:gap-20 min-h-[250px] pb-4">
              <div className="flex flex-col items-center gap-4 w-24">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">Public VPN</span>
                <div className="w-full h-[60px] bg-white/[0.04] rounded-lg" />
              </div>
              <div className="flex flex-col items-center gap-4 w-24">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#F81719]">Veilary</span>
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: 200 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  className="w-full bg-gradient-to-b from-[#F81719]/60 to-[#F81719] rounded-xl relative shadow-[0_0_40px_-10px_rgba(248,23,25,0.3)]"
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-white/20 rounded-t-xl" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudySection;
