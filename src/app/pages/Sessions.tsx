import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  History,
  Globe,
  Clock,
  Radio,
  ShieldCheck,
  Loader2,
  ExternalLink,
  Trash2,
} from 'lucide-react';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { fetchSessions, updateSessionStatus, type RelaySession } from '../../lib/api';
import { getSessionId } from '../../lib/session';

function formatDuration(startedAt: string, endedAt: string | null): string {
  const start = new Date(startedAt).getTime();
  const end = endedAt ? new Date(endedAt).getTime() : Date.now();
  const diff = Math.max(0, Math.floor((end - start) / 1000));
  const hrs = Math.floor(diff / 3600);
  const mins = Math.floor((diff % 3600) / 60);
  const secs = diff % 60;
  if (hrs > 0) return `${hrs}h ${mins}m`;
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
}

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

export default function Sessions() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<RelaySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [endingId, setEndingId] = useState<string | null>(null);

  const loadSessions = async () => {
    try {
      const data = await fetchSessions(getSessionId());
      setSessions(data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
    const interval = setInterval(loadSessions, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleEndSession = async (id: string) => {
    setEndingId(id);
    try {
      await updateSessionStatus(id, 'ended');
      await loadSessions();
    } catch {
    } finally {
      setEndingId(null);
    }
  };

  const activeSessions = sessions.filter(s => s.status === 'active');
  const pastSessions = sessions.filter(s => s.status !== 'active');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-6 w-6 text-black/40 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-black">Sessions</h1>
          <p className="mt-1 text-sm text-black/40">View and manage your stealth browsing sessions</p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate('/app/launch')}
          className="text-xs"
        >
          New Session
        </Button>
      </div>

      {sessions.length === 0 ? (
        <Card glow="rgba(0, 0, 0, 0.03)">
          <EmptyState
            icon={<History className="h-7 w-7" />}
            title="No sessions yet"
            description="Your stealth browsing session history will appear here. Launch your first session to get started."
            actionLabel="Launch Session"
            onAction={() => navigate('/app/launch')}
          />
        </Card>
      ) : (
        <>
          {activeSessions.length > 0 && (
            <div>
              <h2 className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Sessions ({activeSessions.length})
              </h2>
              <div className="space-y-3">
                {activeSessions.map((session) => (
                  <Card key={session.id} glow="rgba(16, 185, 129, 0.06)" hover onClick={() => navigate(`/app/session/${session.id}`)}>
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-2.5 shrink-0">
                        <Globe className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-black truncate">
                            {session.target_title || extractDomain(session.target_url)}
                          </p>
                          <Badge label="Active" variant="active" dot />
                        </div>
                        <p className="text-xs text-black/30 mt-0.5 truncate font-mono">{extractDomain(session.target_url)}</p>
                      </div>
                      <div className="hidden sm:flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <p className="text-xs text-black/30">Duration</p>
                          <p className="text-xs text-black/50 font-mono">{formatDuration(session.started_at, null)}</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEndSession(session.id); }}
                          disabled={endingId === session.id}
                          className="rounded-lg bg-red-500/10 border border-red-500/20 p-2 hover:bg-red-500/20 transition-colors disabled:opacity-40"
                        >
                          {endingId === session.id ? (
                            <Loader2 className="h-3.5 w-3.5 text-red-500 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5 text-red-500" />
                          )}
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {pastSessions.length > 0 && (
            <div>
              <h2 className="text-xs font-medium text-black/30 uppercase tracking-wider mb-3">
                Past Sessions ({pastSessions.length})
              </h2>
              <Card className="overflow-hidden p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-black/[0.06]">
                        <th className="px-4 sm:px-6 py-3.5 text-left text-[11px] font-medium text-black/30 uppercase tracking-wider">
                          <div className="flex items-center gap-1.5">
                            <Globe className="h-3 w-3" />
                            Target
                          </div>
                        </th>
                        <th className="px-4 sm:px-6 py-3.5 text-left text-[11px] font-medium text-black/30 uppercase tracking-wider">Status</th>
                        <th className="hidden sm:table-cell px-6 py-3.5 text-left text-[11px] font-medium text-black/30 uppercase tracking-wider">
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3 w-3" />
                            Duration
                          </div>
                        </th>
                        <th className="hidden md:table-cell px-6 py-3.5 text-left text-[11px] font-medium text-black/30 uppercase tracking-wider">
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck className="h-3 w-3" />
                            Privacy
                          </div>
                        </th>
                        <th className="px-4 sm:px-6 py-3.5 text-right text-[11px] font-medium text-black/30 uppercase tracking-wider">When</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pastSessions.map((session) => (
                        <tr
                          key={session.id}
                          className="border-b border-black/[0.03] last:border-0 hover:bg-black/[0.02] cursor-pointer transition-colors"
                          onClick={() => navigate(`/app/session/${session.id}`)}
                        >
                          <td className="px-4 sm:px-6 py-4">
                            <div>
                              <p className="text-sm text-black/60 truncate max-w-[200px]">
                                {session.target_title || extractDomain(session.target_url)}
                              </p>
                              <p className="text-xs text-black/25 font-mono truncate max-w-[200px]">{extractDomain(session.target_url)}</p>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <Badge
                              label={session.status === 'ended' ? 'Ended' : 'Error'}
                              variant={session.status === 'ended' ? 'inactive' : 'error'}
                              dot
                            />
                          </td>
                          <td className="hidden sm:table-cell px-6 py-4 text-sm text-black/40 font-mono">
                            {formatDuration(session.started_at, session.ended_at)}
                          </td>
                          <td className="hidden md:table-cell px-6 py-4">
                            <div className="flex items-center gap-1.5">
                              {session.fingerprint_randomization && (
                                <Badge label="FP" variant="active" className="text-[10px] px-1.5 py-0.5" />
                              )}
                              {session.ip_cloaking && (
                                <Badge label="IP" variant="active" className="text-[10px] px-1.5 py-0.5" />
                              )}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-right">
                            <span className="text-xs text-black/30">{timeAgo(session.started_at)}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
}
