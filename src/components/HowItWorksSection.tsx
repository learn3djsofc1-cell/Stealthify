import { motion } from 'motion/react';
import { Search, SlidersHorizontal, Zap } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Select Your Target',
    description: 'Search for any dApp or protocol across supported chains, or paste a URL directly. Veilary indexes thousands of decentralized applications.',
  },
  {
    number: '02',
    icon: SlidersHorizontal,
    title: 'Set Privacy Parameters',
    description: 'Toggle fingerprint randomization and IP cloaking. Choose a verified relay node or let the network auto-assign the fastest available.',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Go Stealth',
    description: 'Your session launches in a sandboxed environment with a unique identity. When you close it, every trace is permanently destroyed.',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="w-full py-32 px-6 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(248,23,25,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(248,23,25,0.02)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_40%,transparent_100%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#F81719] font-medium tracking-widest text-xs uppercase mb-4 block"
          >
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight"
          >
            Three Steps to Vanish
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            From search to stealth in under 10 seconds. No downloads, no extensions, no accounts.
          </motion.p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col md:flex-row items-start gap-8 p-8 md:p-10 rounded-[2rem] bg-white/[0.03] border border-white/[0.06] hover:border-[#F81719]/15 transition-all duration-300 group"
              >
                <div className="flex items-center gap-6 shrink-0">
                  <span className="text-5xl font-bold text-[#F81719]/20 group-hover:text-[#F81719]/40 transition-colors">{step.number}</span>
                  <div className="w-14 h-14 rounded-2xl bg-[#F81719]/10 border border-[#F81719]/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#F81719]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-white/50 font-light leading-relaxed text-lg">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
