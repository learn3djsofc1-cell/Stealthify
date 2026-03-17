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
    <section className="w-full py-32 sm:py-40 px-6 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20 sm:mb-24">
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
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Three Steps to Vanish
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/45 text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            From search to stealth in under 10 seconds. No downloads, no extensions, no accounts.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 relative">

          <div className="hidden lg:block absolute top-[72px] left-[calc(33.33%+16px)] right-[calc(33.33%+16px)] h-px">
            <div className="w-full h-full bg-gradient-to-r from-[#F81719]/30 via-[#F81719]/10 to-[#F81719]/30" />
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col items-center text-center"
              >
                <div className="relative mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F81719]/[0.06] border border-[#F81719]/15 flex items-center justify-center group-hover:bg-[#F81719]/[0.12] group-hover:border-[#F81719]/30 transition-all duration-500">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#F81719]" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-black border border-[#F81719]/30 flex items-center justify-center">
                    <span className="text-xs font-bold text-[#F81719]">{step.number}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 tracking-tight">{step.title}</h3>
                <p className="text-white/40 font-light leading-relaxed text-sm sm:text-base max-w-sm">{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="lg:hidden w-px h-12 bg-gradient-to-b from-[#F81719]/20 to-transparent mt-8" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
