import { useNavigate } from 'react-router-dom';
import {
  Activity,
  Radio,
  ShieldCheck,
  Wallet,
  Rocket,
  Eye,
  Clock,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-white/40">Overview of your Stealthify network activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Sessions"
          value="0"
          icon={<Activity className="h-5 w-5" />}
          trend="No sessions running"
        />
        <StatCard
          label="Relayer Nodes"
          value="0"
          icon={<Radio className="h-5 w-5" />}
          trend="Connect to discover"
        />
        <StatCard
          label="Privacy Score"
          value="—"
          icon={<ShieldCheck className="h-5 w-5" />}
          trend="Launch a session to score"
        />
        <StatCard
          label="Wallet Status"
          value="None"
          icon={<Wallet className="h-5 w-5" />}
          trend="Create to get started"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card hover className="cursor-pointer" onClick={() => navigate('/app/launch')}>
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-3">
              <Rocket className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">Launch Session</h3>
              <p className="text-xs text-white/40 mt-0.5">Start a stealth browsing session</p>
            </div>
          </div>
        </Card>

        <Card hover className="cursor-pointer" onClick={() => navigate('/app/wallet')}>
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3">
              <Wallet className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">Create Wallet</h3>
              <p className="text-xs text-white/40 mt-0.5">Generate an anonymous wallet</p>
            </div>
          </div>
        </Card>

        <Card hover className="cursor-pointer" onClick={() => navigate('/app/relayers')}>
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3">
              <Eye className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">View Relayers</h3>
              <p className="text-xs text-white/40 mt-0.5">Browse OpenClaw relayer nodes</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white">Recent Activity</h3>
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

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white">Network Status</h3>
            <Badge label="Offline" variant="inactive" dot />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.04] px-4 py-3">
              <span className="text-sm text-white/50">Relay Network</span>
              <Badge label="Disconnected" variant="inactive" />
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.04] px-4 py-3">
              <span className="text-sm text-white/50">OpenClaw Registry</span>
              <Badge label="Disconnected" variant="inactive" />
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.04] px-4 py-3">
              <span className="text-sm text-white/50">Session Sandbox</span>
              <Badge label="Idle" variant="inactive" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
