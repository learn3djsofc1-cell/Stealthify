import { useNavigate } from 'react-router-dom';
import {
  Activity,
  Radio,
  ShieldCheck,
  Wallet,
  Rocket,
  Eye,
  Clock,
  Zap,
  ArrowRight,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-white/40">Overview of your Stealthify network activity</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          label="Active Sessions"
          value="0"
          icon={<Activity className="h-5 w-5" />}
          trend="No sessions running"
          glow="rgba(168, 85, 247, 0.12)"
          accentColor="#a855f7"
        />
        <StatCard
          label="Relayer Nodes"
          value="0"
          icon={<Radio className="h-5 w-5" />}
          trend="Connect to discover"
          glow="rgba(59, 130, 246, 0.12)"
          accentColor="#3b82f6"
        />
        <StatCard
          label="Privacy Score"
          value="—"
          icon={<ShieldCheck className="h-5 w-5" />}
          trend="Launch a session to score"
          glow="rgba(16, 185, 129, 0.12)"
          accentColor="#10b981"
        />
        <StatCard
          label="Wallet"
          value="None"
          icon={<Wallet className="h-5 w-5" />}
          trend="Create to get started"
          glow="rgba(245, 158, 11, 0.12)"
          accentColor="#f59e0b"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Card tilt hover glow="rgba(168, 85, 247, 0.15)" onClick={() => navigate('/app/launch')}>
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-3 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
              <Rocket className="h-5 w-5 text-purple-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-white">Launch Session</h3>
              <p className="text-xs text-white/40 mt-0.5">Start stealth browsing</p>
            </div>
            <ArrowRight className="h-4 w-4 text-white/20 shrink-0" />
          </div>
        </Card>

        <Card tilt hover glow="rgba(16, 185, 129, 0.15)" onClick={() => navigate('/app/wallet')}>
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <Wallet className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-white">Create Wallet</h3>
              <p className="text-xs text-white/40 mt-0.5">Generate anonymous wallet</p>
            </div>
            <ArrowRight className="h-4 w-4 text-white/20 shrink-0" />
          </div>
        </Card>

        <Card tilt hover glow="rgba(59, 130, 246, 0.15)" onClick={() => navigate('/app/relayers')}>
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
              <Eye className="h-5 w-5 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-white">View Relayers</h3>
              <p className="text-xs text-white/40 mt-0.5">Browse OpenClaw nodes</p>
            </div>
            <ArrowRight className="h-4 w-4 text-white/20 shrink-0" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <Card tilt glow="rgba(255,255,255,0.04)">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-white/30" />
              <h3 className="text-sm font-medium text-white">Recent Activity</h3>
            </div>
            <Button variant="ghost" className="text-xs px-3 py-1.5" onClick={() => navigate('/app/sessions')}>
              View All
            </Button>
          </div>
          <EmptyState
            icon={<Clock className="h-6 w-6" />}
            title="No recent activity"
            description="Your session history will appear here once you launch your first stealth session."
          />
        </Card>

        <Card tilt glow="rgba(255,255,255,0.04)">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-white/30" />
              <h3 className="text-sm font-medium text-white">Network Status</h3>
            </div>
            <Badge label="Offline" variant="inactive" dot />
          </div>
          <div className="space-y-2.5">
            {[
              { name: 'Relay Network', status: 'Disconnected' },
              { name: 'OpenClaw Registry', status: 'Disconnected' },
              { name: 'Session Sandbox', status: 'Idle' },
            ].map(({ name, status }) => (
              <div
                key={name}
                className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.04] px-4 py-3"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full bg-white/10" />
                  <span className="text-sm text-white/50">{name}</span>
                </div>
                <Badge label={status} variant="inactive" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
