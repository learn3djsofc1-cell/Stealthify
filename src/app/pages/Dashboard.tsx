import { useState, useEffect } from 'react';
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
  Globe,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import { fetchWallet, fetchSessions, type WalletData, type StealthSession } from '../../lib/api';
import { getSessionId } from '../../lib/session';
import { getOnlineRelayers, RELAYER_NODES, formatNumber } from '../../lib/relayers';

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [walletLoaded, setWalletLoaded] = useState(false);
  const [sessions, setSessions] = useState<StealthSession[]>([]);
  const [sessionsLoaded, setSessionsLoaded] = useState(false);

  useEffect(() => {
    const sessionId = getSessionId();
    async function loadWallet() {
      try {
        const w = await fetchWallet(sessionId);
        setWallet(w);
      } catch {
      } finally {
        setWalletLoaded(true);
      }
    }
    async function loadSessions() {
      try {
        const s = await fetchSessions(sessionId);
        setSessions(s);
      } catch {
      } finally {
        setSessionsLoaded(true);
      }
    }
    loadWallet();
    loadSessions();
  }, []);

  const formatAddress = (addr: string) => `${addr.slice(0, 4)}...${addr.slice(-4)}`;

  const activeSessions = sessions.filter(s => s.status === 'active');
  const totalSessions = sessions.length;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-white/40">Overview of your Stealthify network activity</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          label="Active Sessions"
          value={sessionsLoaded ? String(activeSessions.length) : '...'}
          icon={<Activity className="h-5 w-5" />}
          trend={activeSessions.length > 0 ? `${activeSessions.length} running now` : 'No sessions running'}
          glow="rgba(168, 85, 247, 0.12)"
          accentColor="#a855f7"
        />
        <StatCard
          label="Total Sessions"
          value={sessionsLoaded ? String(totalSessions) : '...'}
          icon={<Radio className="h-5 w-5" />}
          trend={totalSessions > 0 ? `${totalSessions} launched` : 'Launch your first'}
          glow="rgba(59, 130, 246, 0.12)"
          accentColor="#3b82f6"
        />
        <StatCard
          label="Privacy Score"
          value={totalSessions > 0 ? '100' : '—'}
          icon={<ShieldCheck className="h-5 w-5" />}
          trend={totalSessions > 0 ? 'Full anonymity' : 'Launch a session to score'}
          glow="rgba(16, 185, 129, 0.12)"
          accentColor="#10b981"
        />
        <StatCard
          label="Wallet"
          value={walletLoaded ? (wallet ? formatAddress(wallet.public_key) : 'None') : '...'}
          icon={<Wallet className="h-5 w-5" />}
          trend={wallet ? 'Connected' : 'Create to get started'}
          glow="rgba(245, 158, 11, 0.12)"
          accentColor="#f59e0b"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Card hover glow="rgba(168, 85, 247, 0.15)" onClick={() => navigate('/app/launch')}>
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-3">
              <Rocket className="h-5 w-5 text-purple-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-white">Launch Session</h3>
              <p className="text-xs text-white/40 mt-0.5">Start stealth browsing</p>
            </div>
            <ArrowRight className="h-4 w-4 text-white/20 shrink-0" />
          </div>
        </Card>

        <Card hover glow="rgba(16, 185, 129, 0.15)" onClick={() => navigate('/app/wallet')}>
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3">
              <Wallet className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-white">{wallet ? 'View Wallet' : 'Create Wallet'}</h3>
              <p className="text-xs text-white/40 mt-0.5">{wallet ? 'Manage BNB Chain wallet' : 'Generate anonymous wallet'}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-white/20 shrink-0" />
          </div>
        </Card>

        <Card hover glow="rgba(59, 130, 246, 0.15)" onClick={() => navigate('/app/relayers')}>
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3">
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
        <Card glow="rgba(255,255,255,0.04)">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-white/30" />
              <h3 className="text-sm font-medium text-white">Recent Activity</h3>
            </div>
            <Button variant="ghost" className="text-xs px-3 py-1.5" onClick={() => navigate('/app/sessions')}>
              View All
            </Button>
          </div>
          {sessions.length === 0 ? (
            <EmptyState
              icon={<Clock className="h-6 w-6" />}
              title="No recent activity"
              description="Your session history will appear here once you launch your first stealth session."
            />
          ) : (
            <div className="space-y-2">
              {sessions.slice(0, 5).map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/[0.04] px-4 py-3 hover:bg-white/[0.04] cursor-pointer transition-colors"
                  onClick={() => navigate(`/app/session/${s.id}`)}
                >
                  <Globe className="h-4 w-4 text-white/20 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/60 truncate">{s.target_title || extractDomain(s.target_url)}</p>
                    <p className="text-xs text-white/20 font-mono truncate">{extractDomain(s.target_url)}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      label={s.status === 'active' ? 'Active' : s.status === 'ended' ? 'Ended' : 'Error'}
                      variant={s.status === 'active' ? 'active' : s.status === 'ended' ? 'inactive' : 'error'}
                      dot
                    />
                    <span className="text-[10px] text-white/20 hidden sm:block">{timeAgo(s.started_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card glow="rgba(255,255,255,0.04)">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-white/30" />
              <h3 className="text-sm font-medium text-white">Network Status</h3>
            </div>
            <Badge label={`${getOnlineRelayers().length} Online`} variant="active" dot />
          </div>
          <div className="space-y-2.5">
            <div
              className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.04] px-4 py-3"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-sm text-white/50">Relay Network</span>
              </div>
              <Badge label={`${getOnlineRelayers().length}/${RELAYER_NODES.length} nodes`} variant="active" />
            </div>
            <div
              className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.04] px-4 py-3"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-sm text-white/50">OpenClaw Registry</span>
              </div>
              <Badge label="Connected" variant="active" />
            </div>
            <div
              className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.04] px-4 py-3"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-sm text-white/50">Active Sessions</span>
              </div>
              <Badge label={formatNumber(RELAYER_NODES.reduce((s, r) => s + r.activeSessions, 0))} variant="active" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
