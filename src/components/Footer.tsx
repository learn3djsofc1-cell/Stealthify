import { Link } from 'react-router-dom';
import { Twitter } from 'lucide-react';
import logoSrc from '../assets/logo.png';

const productLinks = [
  { label: 'Launch App', to: '/app' },
  { label: 'Documentation', to: '/docs' },
  { label: 'Stealth Browser', to: '/app/launch' },
  { label: 'Wallet Generator', to: '/app/wallet' },
];

const resourceLinks = [
  { label: 'OpenClaw Protocol', to: '/docs#openclaw' },
  { label: 'Security Audits', to: '/docs#privacy-security' },
  { label: 'Relayer Registry', to: '/app/relayers' },
  { label: 'API Reference', to: '/docs' },
];

const legalLinks = [
  { label: 'Privacy Policy', to: '/docs' },
  { label: 'Terms of Service', to: '/docs' },
  { label: 'Cookie Policy', to: '/docs' },
];

const Footer = () => {
  return (
    <footer className="bg-black relative overflow-hidden border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 py-16 sm:py-20">

          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <img src={logoSrc} alt="Veilary" className="h-8 w-8 object-contain" />
              <span className="text-white font-bold tracking-widest text-sm uppercase">Veilary</span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed mb-8 max-w-xs">
              Privacy-native access layer for Web3. Stealth browsing, anonymous wallets, and zero-knowledge proofs.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/Veilary"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300"
              >
                <Twitter size={16} className="text-white/50" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-5">Product</h4>
            <ul className="space-y-3.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-white/35 hover:text-white transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-5">Resources</h4>
            <ul className="space-y-3.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-white/35 hover:text-white transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-5">Legal</h4>
            <ul className="space-y-3.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-white/35 hover:text-white transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.05] py-10">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-1">Join the Community</h4>
              <p className="text-sm text-white/35">Follow us on X for updates, releases, and privacy research.</p>
            </div>
            <a
              href="https://x.com/Veilary"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#F81719] text-white rounded-full font-semibold text-sm hover:bg-[#d91416] transition-all duration-300 shadow-[0_0_20px_rgba(248,23,25,0.2)] hover:shadow-[0_0_30px_rgba(248,23,25,0.35)] whitespace-nowrap shrink-0"
            >
              Follow @Veilary
            </a>
          </div>
        </div>

        <div className="border-t border-white/[0.05] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-white/30">
            <div className="w-1.5 h-1.5 rounded-full bg-[#F81719] shadow-[0_0_8px_#F81719]" />
            <span>&copy; 2026 Veilary. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-white/20 font-mono tracking-wider uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>All Systems Operational</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
