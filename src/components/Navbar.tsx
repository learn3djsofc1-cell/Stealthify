import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
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
        className="w-full max-w-6xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-3xl md:rounded-full px-6 py-4 flex flex-col md:flex-row items-center justify-between relative shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      >
        <div className="w-full md:w-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src={logoSrc} alt="Veilary" className="h-7 w-7 object-contain" />
            <span className="text-white font-bold tracking-widest text-sm uppercase">Veilary</span>
          </div>

          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Overview', to: '/' },
            { label: 'Features', to: '/#features' },
            { label: 'Docs', to: '/docs' },
            { label: 'App', to: '/app' },
          ].map((item, index) => (
            <Link 
              key={item.label} 
              to={item.to}
              className={clsx(
                "text-sm font-medium transition-colors hover:text-white",
                index === 0 ? "text-white relative" : "text-white/50"
              )}
            >
              {item.label}
              {index === 0 && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#F81719] rounded-full" />
              )}
            </Link>
          ))}
        </div>

        <Link to="/app" className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-[#F81719] text-white text-xs font-medium hover:bg-[#F81719]/80 transition-colors group">
          Launch App
          <ArrowRight className="w-3 h-3 text-white/60 group-hover:text-white transition-colors" />
        </Link>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full md:hidden overflow-hidden flex flex-col gap-4 pt-4 border-t border-white/[0.08] mt-4"
            >
              {[
                { label: 'Overview', to: '/' },
                { label: 'Features', to: '/#features' },
                { label: 'Docs', to: '/docs' },
                { label: 'App', to: '/app' },
              ].map((item) => (
                <Link 
                  key={item.label} 
                  to={item.to}
                  className="text-white/60 text-sm font-medium py-2 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/app" className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#F81719] text-white text-sm font-medium hover:bg-[#F81719]/80 transition-colors w-full" onClick={() => setIsMobileMenuOpen(false)}>
                Launch App
                <ArrowRight className="w-4 h-4 text-white/60" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;
