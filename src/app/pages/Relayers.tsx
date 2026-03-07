import { useState } from 'react';
import {
  Radio,
  Search,
  Plus,
  Signal,
  ShieldCheck,
  Clock,
  Globe,
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import EmptyState from '../components/EmptyState';
import Badge from '../components/Badge';

export default function Relayers() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Relayers</h1>
          <p className="mt-1 text-sm text-white/40">Discover and manage OpenClaw relayer nodes</p>
        </div>
        <Button
          variant="secondary"
          icon={<Plus className="h-4 w-4" />}
          disabled
        >
          Deploy Agent
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            icon={<Search className="h-4 w-4" />}
            placeholder="Search relayers by name, region, or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white/50 hover:bg-white/[0.08] transition-colors">
            All
          </button>
          <button className="rounded-xl border border-white/[0.06] bg-transparent px-4 py-2.5 text-xs text-white/30 hover:bg-white/[0.04] transition-colors">
            Active
          </button>
          <button className="rounded-xl border border-white/[0.06] bg-transparent px-4 py-2.5 text-xs text-white/30 hover:bg-white/[0.04] transition-colors">
            Verified
          </button>
        </div>
      </div>

      <Card>
        <EmptyState
          icon={<Radio className="h-7 w-7" />}
          title="No relayers discovered yet"
          description="Connect to the OpenClaw network to discover available relayer nodes. You can also deploy your own agent."
          actionLabel="Refresh Network"
          onAction={() => {}}
        />
      </Card>

      <div>
        <h2 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">Relayer Node Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-40 pointer-events-none">
          {[
            { name: 'Relay Alpha', region: 'US-East', status: 'Offline' },
            { name: 'Relay Beta', region: 'EU-West', status: 'Offline' },
          ].map((relayer) => (
            <Card key={relayer.name} hover>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-2.5">
                    <Signal className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">{relayer.name}</h3>
                    <p className="text-xs text-white/35 mt-0.5">{relayer.region}</p>
                  </div>
                </div>
                <Badge label={relayer.status} variant="inactive" dot />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-white/[0.02] border border-white/[0.04] px-3 py-2">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Clock className="h-3 w-3 text-white/25" />
                    <span className="text-[10px] text-white/30 uppercase">Uptime</span>
                  </div>
                  <p className="text-xs text-white/50 font-mono">—</p>
                </div>
                <div className="rounded-lg bg-white/[0.02] border border-white/[0.04] px-3 py-2">
                  <div className="flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="h-3 w-3 text-white/25" />
                    <span className="text-[10px] text-white/30 uppercase">Audit</span>
                  </div>
                  <p className="text-xs text-white/50">—</p>
                </div>
                <div className="rounded-lg bg-white/[0.02] border border-white/[0.04] px-3 py-2">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Globe className="h-3 w-3 text-white/25" />
                    <span className="text-[10px] text-white/30 uppercase">Sessions</span>
                  </div>
                  <p className="text-xs text-white/50 font-mono">0</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
