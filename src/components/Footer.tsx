import React from 'react';
import { Twitter } from 'lucide-react';
import logoSrc from '../assets/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-purple-900/20 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-white/40 relative z-10">
        <div className="flex items-center gap-4">
          <img src={logoSrc} alt="Stealthify" className="h-6 w-6 object-contain" />
          <span className="font-medium text-white/60">© 2026 Stealthify.</span>
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]"></div>
          <span>All rights reserved.</span>
        </div>
        
        <div className="flex items-center gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Security</a>
          <a href="https://x.com/StealthifyX" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
            <Twitter size={16} />
            <span className="sr-only">X (Twitter)</span>
          </a>
          <a href="https://t.me/Stealthify" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.944 0A12 12 0 1 0 24 12.056A12.013 12.013 0 0 0 11.944 0Zm5.654 8.22l-1.86 8.77c-.14.636-.504.79-.998.488l-2.835-2.09-1.368 1.317c-.15.152-.28.28-.573.28l.203-2.876 5.234-4.73c.228-.203-.05-.316-.354-.113l-6.47 4.076-2.786-.868c-.607-.19-.618-.607.126-.898l10.882-4.195c.504-.183.944.123.799.84Z" />
            </svg>
            <span className="sr-only">Telegram</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
