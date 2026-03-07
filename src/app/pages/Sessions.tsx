import { useNavigate } from 'react-router-dom';
import {
  History,
  Globe,
  Clock,
  Radio,
  ShieldCheck,
} from 'lucide-react';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import Badge from '../components/Badge';

export default function Sessions() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-white">Sessions</h1>
        <p className="mt-1 text-sm text-white/40">View and manage your stealth browsing session history</p>
      </div>

      <Card glow="rgba(168, 85, 247, 0.08)">
        <EmptyState
          icon={<History className="h-7 w-7" />}
          title="No sessions yet"
          description="Your stealth browsing session history will appear here. Launch your first session to get started."
          actionLabel="Launch Session"
          onAction={() => navigate('/app/launch')}
        />
      </Card>

      <div>
        <h2 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">Session Table Preview</h2>
        <Card className="overflow-hidden p-0 opacity-40 pointer-events-none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-4 sm:px-6 py-3.5 text-left text-[11px] font-medium text-white/30 uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <Globe className="h-3 w-3" />
                      dApp URL
                    </div>
                  </th>
                  <th className="px-4 sm:px-6 py-3.5 text-left text-[11px] font-medium text-white/30 uppercase tracking-wider">Status</th>
                  <th className="hidden sm:table-cell px-6 py-3.5 text-left text-[11px] font-medium text-white/30 uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      Duration
                    </div>
                  </th>
                  <th className="hidden md:table-cell px-6 py-3.5 text-left text-[11px] font-medium text-white/30 uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <Radio className="h-3 w-3" />
                      Relayer
                    </div>
                  </th>
                  <th className="hidden lg:table-cell px-6 py-3.5 text-left text-[11px] font-medium text-white/30 uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="h-3 w-3" />
                      Privacy
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { url: 'app.uniswap.org', status: 'active', duration: '—', relayer: '—', privacy: '—' },
                  { url: 'snapshot.org', status: 'ended', duration: '—', relayer: '—', privacy: '—' },
                  { url: 'aave.com', status: 'error', duration: '—', relayer: '—', privacy: '—' },
                ].map((session, i) => (
                  <tr key={i} className="border-b border-white/[0.03] last:border-0">
                    <td className="px-4 sm:px-6 py-4">
                      <span className="text-sm text-white/60 font-mono">{session.url}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <Badge
                        label={session.status === 'active' ? 'Active' : session.status === 'ended' ? 'Ended' : 'Failed'}
                        variant={session.status === 'active' ? 'active' : session.status === 'ended' ? 'inactive' : 'error'}
                        dot
                      />
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 text-sm text-white/40">{session.duration}</td>
                    <td className="hidden md:table-cell px-6 py-4 text-sm text-white/40">{session.relayer}</td>
                    <td className="hidden lg:table-cell px-6 py-4 text-sm text-white/40">{session.privacy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
