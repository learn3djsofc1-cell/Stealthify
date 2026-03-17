import { motion } from 'motion/react';
import { lazy, Suspense } from 'react';

const Infrastructure3D = lazy(() => import('./Infrastructure3D'));

const badges = [
  'NO LOGS',
  'E2E ENCRYPTED',
  'FINGERPRINT ISOLATED',
  'OPENCLAW AUDITED',
  'GDPR READY',
];

const InfrastructureSection = () => {
  return (
    <section className="w-full py-32 sm:py-40 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#F81719] font-medium tracking-widest text-xs uppercase mb-4 block"
            >
              Infrastructure
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05]"
            >
              Architecture &
              <br />
              Security
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/45 text-lg max-w-md font-light leading-relaxed lg:text-right"
          >
            Modular and cloud-native with options for self-hosted relayer lanes. Session sandboxing, agent orchestration, and encrypted key management.
          </motion.p>
        </div>

        <Suspense fallback={<div className="w-full h-[400px] sm:h-[500px] md:h-[600px]" />}>
          <Infrastructure3D />
        </Suspense>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 border-t border-white/[0.06] pt-8"
        >
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 sm:gap-x-10 md:gap-x-14">
            {badges.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#F81719]" />
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-white/50 uppercase font-mono whitespace-nowrap">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InfrastructureSection;
