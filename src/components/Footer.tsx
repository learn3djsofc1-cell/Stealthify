import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter } from 'lucide-react';
import logoSrc from '../assets/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black relative overflow-hidden border-t border-white/[0.06]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-[#F81719]/10 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-white/40 relative z-10">
        <div className="flex items-center gap-4">
          <img src={logoSrc} alt="Veilary" className="h-6 w-6 object-contain" />
          <span className="font-medium text-white/60">&copy; 2026 Veilary.</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#F81719] shadow-[0_0_10px_#F81719]"></div>
          <span>All rights reserved.</span>
        </div>
        
        <div className="flex items-center gap-8">
          <Link to="/docs" className="hover:text-white transition-colors">Docs</Link>
          <Link to="/app" className="hover:text-white transition-colors">App</Link>
          <Link to="/docs#privacy-security" className="hover:text-white transition-colors">Security</Link>
          <a href="https://x.com/Veilary" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
            <Twitter size={16} />
            <span className="sr-only">X (Twitter)</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
