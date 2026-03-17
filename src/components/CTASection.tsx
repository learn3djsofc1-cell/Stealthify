import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-32 sm:py-40 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(248,23,25,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl sm:rounded-[2rem] p-10 sm:p-16 lg:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F81719]/[0.03] via-transparent to-transparent pointer-events-none" />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.05] relative z-10"
          >
            <span className="text-white">Verifiable</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F81719] via-[#F81719]/80 to-[#F81719]/40">
              Anonymity.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-lg sm:text-xl text-white/40 max-w-xl mx-auto mb-12 leading-relaxed relative z-10"
          >
            Redefining the boundaries of digital privacy with Veilary's 10+ active nodes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10"
          >
            <Link to="/app" className="px-8 py-4 bg-[#F81719] text-white rounded-full font-semibold text-sm flex items-center gap-2.5 hover:bg-[#d91416] transition-all duration-300 shadow-[0_0_30px_rgba(248,23,25,0.25)] hover:shadow-[0_0_40px_rgba(248,23,25,0.4)]">
              Launch App
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/docs" className="px-8 py-4 bg-white/[0.05] text-white rounded-full font-semibold text-sm border border-white/[0.10] hover:bg-white/[0.08] hover:border-white/[0.16] transition-all duration-300">
              Read Documentation
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
