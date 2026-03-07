import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Rocket,
  Wallet,
  Radio,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const navItems = [
  { to: '/app', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/app/launch', icon: Rocket, label: 'Launch Session' },
  { to: '/app/wallet', icon: Wallet, label: 'Wallet' },
  { to: '/app/relayers', icon: Radio, label: 'Relayers' },
  { to: '/app/sessions', icon: History, label: 'Sessions' },
  { to: '/app/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onMobileClose }: SidebarProps) {
  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onMobileClose}
            className={({ isActive }) =>
              twMerge(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                  : 'text-white/50 hover:text-white hover:bg-white/[0.05]',
                collapsed && 'justify-center px-2'
              )
            }
          >
            <Icon className="h-[18px] w-[18px] shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </div>

      <div className="border-t border-white/[0.06] px-3 py-3">
        <NavLink
          to="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/30 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
        >
          <ArrowLeft className="h-[18px] w-[18px] shrink-0" />
          {!collapsed && <span>Back to Site</span>}
        </NavLink>
      </div>

      <div className="hidden lg:block border-t border-white/[0.06] px-3 py-3">
        <button
          onClick={onToggleCollapse}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-white/30 hover:bg-white/[0.05] hover:text-white/60 transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={twMerge(
          'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/[0.06] bg-[#0A0A0A] transition-all duration-300 lg:relative lg:z-auto',
          collapsed ? 'w-[68px]' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
