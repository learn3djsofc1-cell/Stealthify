import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8 leading-[1.1]"
        >
          <span className="block text-white">Verifiable</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E9D5FF] via-[#C084FC] to-[#9333EA]">
            Anonymity.
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Redefining the boundaries of digital privacy with Stealthify's 10+ active nodes.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/app" className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Launch App
          </Link>
          <Link to="/app" className="px-8 py-4 bg-white/5 text-white rounded-full font-medium border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm">
            Read Documentation
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
