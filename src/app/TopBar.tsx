import { Link } from 'react-router-dom';
import { Settings, Wifi, WifiOff } from 'lucide-react';
import logoSrc from '../assets/logo.png';
import Badge from './components/Badge';

interface TopBarProps {
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
}

export default function TopBar({ onMenuToggle, showMenuButton }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-xl px-4 lg:px-6">
      <div className="flex items-center gap-3">
        {showMenuButton && (
          <button
            onClick={onMenuToggle}
            className="rounded-lg p-2 text-white/60 hover:bg-white/[0.05] hover:text-white transition-colors lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
        <Link to="/app" className="flex items-center gap-2.5">
          <img src={logoSrc} alt="Stealthify" className="h-7 w-7 object-contain" />
          <span className="text-white font-bold tracking-widest text-xs uppercase hidden sm:block">Stealthify</span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Badge label="Network Offline" variant="inactive" dot />
        <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 py-1.5">
          <WifiOff className="h-3.5 w-3.5 text-white/30" />
          <span className="text-xs text-white/30">No Wallet</span>
        </div>
        <Link
          to="/app/settings"
          className="rounded-lg p-2 text-white/40 hover:bg-white/[0.05] hover:text-white transition-colors"
        >
          <Settings className="h-[18px] w-[18px]" />
        </Link>
      </div>
    </header>
  );
}
