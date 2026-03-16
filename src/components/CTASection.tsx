import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-[#FFF6E5] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-black/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-8 leading-[1.1]"
        >
          <span className="block text-black">Verifiable</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-black/80 via-black/50 to-black/30">
            Anonymity.
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-black/50 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Redefining the boundaries of digital privacy with RelayForge's 10+ active nodes.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/app" className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-black/80 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            Launch App
          </Link>
          <Link to="/docs" className="px-8 py-4 bg-white text-black rounded-full font-medium border border-black/10 hover:bg-black/[0.03] transition-all duration-300 hover:scale-105 active:scale-95">
            Read Documentation
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
