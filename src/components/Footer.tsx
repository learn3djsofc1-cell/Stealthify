import React from 'react';
import { Twitter } from 'lucide-react';
import logoSrc from '../assets/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-white/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-white/40 relative z-10">
        <div className="flex items-center gap-4">
          <img src={logoSrc} alt="RelayForge" className="h-6 w-6 object-contain invert" />
          <span className="font-medium text-white/60">&copy; 2026 RelayForge.</span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
          <span>All rights reserved.</span>
        </div>
        
        <div className="flex items-center gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Security</a>
          <a href="https://x.com/RelayForge_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
            <Twitter size={16} />
            <span className="sr-only">X (Twitter)</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
