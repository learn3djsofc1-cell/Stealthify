import { Link } from 'react-router-dom';
import { WifiOff } from 'lucide-react';
import logoSrc from '../assets/logo.png';
import Badge from './components/Badge';

export default function TopBar() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-xl px-4 lg:px-6">
      <Link to="/" className="flex items-center gap-2.5">
        <img src={logoSrc} alt="Stealthify" className="h-6 w-6 object-contain" />
        <span className="text-white font-bold tracking-widest text-xs uppercase">Stealthify</span>
      </Link>

      <div className="flex items-center gap-2 sm:gap-3">
        <Badge label="Offline" variant="inactive" dot className="hidden sm:inline-flex" />
        <div className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] px-2.5 py-1.5">
          <WifiOff className="h-3.5 w-3.5 text-white/30" />
          <span className="text-[11px] text-white/30 hidden sm:block">No Wallet</span>
        </div>
      </div>
    </header>
  );
}
