import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';
import logoSrc from '../assets/logo.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl md:rounded-full px-6 py-4 flex flex-col md:flex-row items-center justify-between relative shadow-2xl shadow-purple-900/5"
      >
        <div className="w-full md:w-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoSrc} alt="Stealthify" className="h-7 w-7 object-contain" />
            <span className="text-white font-bold tracking-widest text-sm uppercase">Stealthify</span>
          </div>

          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Overview', 'Features', 'Product', 'Security'].map((item, index) => (
            <a 
              key={item} 
              href="#" 
              className={clsx(
                "text-sm font-medium transition-colors hover:text-white",
                index === 0 ? "text-white relative" : "text-gray-400"
              )}
            >
              {item}
              {index === 0 && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full" />
              )}
            </a>
          ))}
        </div>

        <button className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A1A1A] border border-white/10 text-white text-xs font-medium hover:bg-[#252525] transition-colors group">
          Launch App
          <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors" />
        </button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full md:hidden overflow-hidden flex flex-col gap-4 pt-4 border-t border-white/10 mt-4"
            >
              {['Overview', 'Features', 'Product', 'Security'].map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className="text-gray-300 text-sm font-medium py-2 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1A1A1A] border border-white/10 text-white text-sm font-medium hover:bg-[#252525] transition-colors w-full">
                Launch App
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;
