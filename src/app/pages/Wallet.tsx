import {
  Wallet as WalletIcon,
  ShieldCheck,
  UserX,
  Lock,
  Copy,
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import Badge from '../components/Badge';

export default function Wallet() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-white">Wallet</h1>
        <p className="mt-1 text-sm text-white/40">Manage your anonymous in-browser wallet</p>
      </div>

      <Card tilt glow="rgba(245, 158, 11, 0.08)">
        <EmptyState
          icon={<WalletIcon className="h-7 w-7" />}
          title="No wallet created yet"
          description="Generate an anonymous wallet directly in your browser. No login, no seed phrase storage on servers, no identity linkage."
          actionLabel="Create Anonymous Wallet"
          onAction={() => {}}
        />
      </Card>

      <div>
        <h2 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">Security Guarantees</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {[
            {
              icon: Lock,
              title: 'In-Browser Only',
              desc: 'Private keys never leave your browser. All cryptographic operations happen locally.',
              glow: 'rgba(168, 85, 247, 0.12)',
            },
            {
              icon: UserX,
              title: 'No Login Required',
              desc: 'No account creation, no email, no phone number. True anonymity from the start.',
              glow: 'rgba(16, 185, 129, 0.12)',
            },
            {
              icon: ShieldCheck,
              title: 'Fully Anonymous',
              desc: 'Wallet address is unlinkable to your identity, IP, or any other session data.',
              glow: 'rgba(59, 130, 246, 0.12)',
            },
          ].map(({ icon: Icon, title, desc, glow }) => (
            <Card key={title} tilt hover glow={glow}>
              <div className="flex flex-col items-center text-center">
                <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-3 mb-3 shadow-[0_0_20px_rgba(168,85,247,0.08)]">
                  <Icon className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="text-sm font-medium text-white">{title}</h3>
                <p className="text-xs text-white/35 mt-1.5 leading-relaxed">{desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="opacity-40 pointer-events-none">
        <h2 className="text-sm font-medium text-white mb-4">Wallet Details</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.04] px-4 py-3">
            <div>
              <p className="text-xs text-white/40 mb-1">Wallet Address</p>
              <p className="text-sm text-white font-mono">0x0000...0000</p>
            </div>
            <button className="p-2 text-white/30">
              <Copy className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] px-4 py-3">
              <p className="text-xs text-white/40 mb-1">Balance</p>
              <p className="text-sm text-white font-mono">— ETH</p>
            </div>
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] px-4 py-3">
              <p className="text-xs text-white/40 mb-1">Created</p>
              <p className="text-sm text-white">—</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge label="In-Browser" variant="verified" />
            <Badge label="Anonymous" variant="active" />
            <Badge label="No Login" variant="active" />
          </div>
        </div>
      </Card>
    </div>
  );
}
