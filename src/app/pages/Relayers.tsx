import { useState, useMemo } from 'react';
import {
  Search,
  Signal,
  ShieldCheck,
  Clock,
  Globe,
  Activity,
  Zap,
  Users,
  CheckCircle2,
  Gauge,
  Wifi,
} from 'lucide-react';
import Card from '../components/Card';
import Input from '../components/Input';
import Badge from '../components/Badge';
import {
  RELAYER_NODES,
  formatNumber,
  getStatusVariant,
  getStatusLabel,
  getOnlineRelayers,
  type RelayerNode,
} from '../../lib/relayers';

type FilterMode = 'all' | 'online' | 'verified';

export default function Relayers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterMode>('all');

  const filteredRelayers = useMemo(() => {
    let nodes = [...RELAYER_NODES];

    if (filter === 'online') {
      nodes = nodes.filter(r => r.status === 'online');
    } else if (filter === 'verified') {
      nodes = nodes.filter(r => r.verified);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      nodes = nodes.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.region.toLowerCase().includes(q) ||
        r.operator.toLowerCase().includes(q) ||
        r.regionCode.toLowerCase().includes(q)
      );
    }

    return nodes.sort((a, b) => {
      if (a.status === 'online' && b.status !== 'online') return -1;
      if (a.status !== 'online' && b.status === 'online') return 1;
      return a.latencyMs - b.latencyMs;
    });
  }, [searchQuery, filter]);

  const onlineCount = getOnlineRelayers().length;
  const totalSessions = RELAYER_NODES.reduce((sum, r) => sum + r.activeSessions, 0);
  const avgLatency = onlineCount > 0
    ? Math.round(getOnlineRelayers().reduce((sum, r) => sum + r.latencyMs, 0) / onlineCount)
    : 0;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-black">Relayers</h1>
        <p className="mt-1 text-sm text-black/60">Discover and manage OpenClaw relayer nodes</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card>
          <div className="flex items-center gap-2 mb-2">
            <Signal className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-[10px] text-black/45 uppercase tracking-wider">Online</span>
          </div>
          <p className="text-xl font-semibold text-black">{onlineCount}<span className="text-sm text-black/50 font-normal ml-1">/ {RELAYER_NODES.length}</span></p>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-3.5 w-3.5 text-black/60" />
            <span className="text-[10px] text-black/45 uppercase tracking-wider">Active</span>
          </div>
          <p className="text-xl font-semibold text-black">{formatNumber(totalSessions)}<span className="text-sm text-black/50 font-normal ml-1">sessions</span></p>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="h-3.5 w-3.5 text-blue-500" />
            <span className="text-[10px] text-black/45 uppercase tracking-wider">Avg Latency</span>
          </div>
          <p className="text-xl font-semibold text-black">{avgLatency}<span className="text-sm text-black/50 font-normal ml-1">ms</span></p>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-[10px] text-black/45 uppercase tracking-wider">Verified</span>
          </div>
          <p className="text-xl font-semibold text-black">{RELAYER_NODES.filter(r => r.verified).length}<span className="text-sm text-black/50 font-normal ml-1">nodes</span></p>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1">
          <Input
            icon={<Search className="h-4 w-4" />}
            placeholder="Search relayers by name, region, or operator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'online', 'verified'] as FilterMode[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-xl border px-4 py-2.5 text-xs transition-colors ${
                filter === f
                  ? 'border-black/[0.12] bg-black/[0.06] text-black/70'
                  : 'border-black/[0.10] bg-transparent text-black/50 hover:bg-black/[0.05]'
              }`}
            >
              {f === 'all' ? 'All' : f === 'online' ? 'Online' : 'Verified'}
            </button>
          ))}
        </div>
      </div>

      {filteredRelayers.length === 0 ? (
        <Card glow="rgba(59, 130, 246, 0.04)">
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Signal className="h-7 w-7 text-black/40 mb-3" />
            <p className="text-sm text-black/55">No relayers match your search</p>
            <p className="text-xs text-black/40 mt-1">Try adjusting your filters or search term</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {filteredRelayers.map((relayer) => (
            <RelayerCard key={relayer.id} relayer={relayer} />
          ))}
        </div>
      )}
    </div>
  );
}

function RelayerCard({ relayer }: { relayer: RelayerNode }) {
  const statusVariant = getStatusVariant(relayer.status);
  const statusLabel = getStatusLabel(relayer.status);
  const isOnline = relayer.status === 'online';
  const isDegraded = relayer.status === 'degraded';

  return (
    <Card hover glow={isOnline ? 'rgba(16, 185, 129, 0.04)' : isDegraded ? 'rgba(245, 158, 11, 0.04)' : undefined}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`rounded-xl p-2.5 border ${
            isOnline
              ? 'bg-emerald-500/10 border-emerald-500/20'
              : isDegraded
                ? 'bg-amber-500/10 border-amber-500/20'
                : 'bg-black/[0.05] border-black/[0.10]'
          }`}>
            <Signal className={`h-4 w-4 ${
              isOnline ? 'text-emerald-500' : isDegraded ? 'text-amber-500' : 'text-black/35'
            }`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-black">{relayer.name}</h3>
              {relayer.verified && (
                <CheckCircle2 className="h-3.5 w-3.5 text-black/55" />
              )}
            </div>
            <p className="text-xs text-black/50 mt-0.5">{relayer.region}</p>
          </div>
        </div>
        <Badge label={statusLabel} variant={statusVariant} dot />
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
        <div className="rounded-lg bg-black/[0.04] border border-black/[0.08] px-3 py-2">
          <div className="flex items-center gap-1.5 mb-1">
            <Clock className="h-3 w-3 text-black/45" />
            <span className="text-[10px] text-black/50 uppercase">Uptime</span>
          </div>
          <p className={`text-xs font-mono ${relayer.uptimePercent >= 99 ? 'text-emerald-600' : relayer.uptimePercent >= 95 ? 'text-amber-600' : 'text-red-500'}`}>
            {relayer.uptimePercent.toFixed(2)}%
          </p>
        </div>
        <div className="rounded-lg bg-black/[0.04] border border-black/[0.08] px-3 py-2">
          <div className="flex items-center gap-1.5 mb-1">
            <Activity className="h-3 w-3 text-black/45" />
            <span className="text-[10px] text-black/50 uppercase">Latency</span>
          </div>
          <p className={`text-xs font-mono ${relayer.latencyMs <= 20 ? 'text-emerald-600' : relayer.latencyMs <= 50 ? 'text-blue-500' : 'text-amber-600'}`}>
            {relayer.latencyMs}ms
          </p>
        </div>
        <div className="rounded-lg bg-black/[0.04] border border-black/[0.08] px-3 py-2">
          <div className="flex items-center gap-1.5 mb-1">
            <Globe className="h-3 w-3 text-black/45" />
            <span className="text-[10px] text-black/50 uppercase">Sessions</span>
          </div>
          <p className="text-xs text-black/60 font-mono">{formatNumber(relayer.totalSessions)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-black/[0.08]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Wifi className="h-3 w-3 text-black/40" />
            <span className="text-[10px] text-black/45">{relayer.bandwidthMbps} Mbps</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="h-3 w-3 text-black/40" />
            <span className="text-[10px] text-black/45">{relayer.activeSessions} active</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {relayer.protocols.map((p) => (
            <span key={p} className="text-[9px] text-black/40 bg-black/[0.04] border border-black/[0.08] rounded px-1.5 py-0.5">{p}</span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/[0.08]">
        <span className="text-[10px] text-black/40">Operator: {relayer.operator}</span>
        <span className="text-[10px] text-black/40 font-mono">{relayer.version}</span>
      </div>
    </Card>
  );
}
