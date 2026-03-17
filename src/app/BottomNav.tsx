import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Rocket,
  Wallet,
  Radio,
  History,
  Settings,
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const navItems = [
  { to: '/app', icon: LayoutDashboard, label: 'Home', end: true },
  { to: '/app/launch', icon: Rocket, label: 'Launch' },
  { to: '/app/wallet', icon: Wallet, label: 'Wallet' },
  { to: '/app/relayers', icon: Radio, label: 'Relayers' },
  { to: '/app/sessions', icon: History, label: 'Sessions' },
  { to: '/app/settings', icon: Settings, label: 'Settings' },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.08] bg-black/95 backdrop-blur-xl safe-area-bottom">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-1.5 sm:max-w-2xl">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              twMerge(
                'flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 sm:px-4 sm:py-2 text-center transition-all duration-200 min-w-0',
                isActive
                  ? 'text-[#F81719]'
                  : 'text-white/45 hover:text-white/70'
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <Icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
                  {isActive && (
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-[#F81719]" />
                  )}
                </div>
                <span className="text-[10px] sm:text-xs font-medium leading-tight truncate max-w-full">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
