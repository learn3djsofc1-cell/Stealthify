import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Globe,
  Shield,
  Fingerprint,
  EyeOff,
  Radio,
  Clock,
  Square,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  Copy,
  Check
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { fetchSession, updateSessionStatus, type StealthSession } from '../../lib/api';

function formatDuration(startedAt: string, endedAt?: string | null): string {
  const start = new Date(startedAt).getTime();
  const end = endedAt ? new Date(endedAt).getTime() : Date.now();
  const diff = Math.max(0, Math.floor((end - start) / 1000));
  const hrs = Math.floor(diff / 3600);
  const mins = Math.floor((diff % 3600) / 60);
  const secs = diff % 60;
  if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
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

export default function ActiveSession() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<StealthSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ending, setEnding] = useState(false);
  const [duration, setDuration] = useState('0s');
  const [copied, setCopied] = useState(false);
  const windowRef = useRef<Window | null>(null);

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        const s = await fetchSession(id!);
        setSession(s);
      } catch {
        setError('Session not found');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  useEffect(() => {
    if (!session) return;
    if (session.status !== 'active') {
      setDuration(formatDuration(session.started_at, session.ended_at));
      return;
    }
    const interval = setInterval(() => {
      setDuration(formatDuration(session.started_at));
    }, 1000);
    setDuration(formatDuration(session.started_at));
    return () => clearInterval(interval);
  }, [session]);

  const handleEndSession = useCallback(async () => {
    if (!session || ending) return;
    setEnding(true);
    try {
      const updated = await updateSessionStatus(session.id, 'ended');
      setSession(updated);
      if (windowRef.current && !windowRef.current.closed) {
        windowRef.current.close();
      }
    } catch {
      setError('Failed to end session');
    } finally {
      setEnding(false);
    }
  }, [session, ending]);

  const handleOpenExternal = () => {
    if (!session) return;
    windowRef.current = window.open(session.target_url, `stealth_${session.id}`);
  };

  const handleCopyUrl = async () => {
    if (!session) return;
    await navigator.clipboard.writeText(session.target_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-6 w-6 text-purple-400 animate-spin" />
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="space-y-6">
        <Card glow="rgba(239, 68, 68, 0.1)">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertTriangle className="h-8 w-8 text-red-400 mb-3" />
            <h2 className="text-lg font-medium text-white mb-1">Session Error</h2>
            <p className="text-sm text-white/40 mb-4">{error || 'Session not found'}</p>
            <Button variant="secondary" onClick={() => navigate('/app/sessions')}>
              View All Sessions
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const isActive = session.status === 'active';
  const isEnded = session.status === 'ended';

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/app/sessions')}
          className="rounded-xl bg-white/[0.05] border border-white/[0.08] p-2 hover:bg-white/[0.08] transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-white/60" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg sm:text-xl font-semibold text-white truncate">
              {session.target_title || extractDomain(session.target_url)}
            </h1>
            <Badge
              label={isActive ? 'Active' : isEnded ? 'Ended' : 'Error'}
              variant={isActive ? 'active' : isEnded ? 'inactive' : 'error'}
              dot
            />
          </div>
          <p className="text-xs text-white/30 truncate mt-0.5">{session.target_url}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card glow="rgba(168, 85, 247, 0.1)">
          <div className="flex items-center gap-2 mb-1.5">
            <Clock className="h-3.5 w-3.5 text-purple-400" />
            <span className="text-[10px] text-white/30 uppercase tracking-wider">Duration</span>
          </div>
          <p className="text-sm font-mono text-white">{isActive ? duration : session.ended_at ? formatDuration(session.started_at, session.ended_at) : '—'}</p>
        </Card>
        <Card glow="rgba(16, 185, 129, 0.1)">
          <div className="flex items-center gap-2 mb-1.5">
            <Fingerprint className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-[10px] text-white/30 uppercase tracking-wider">Fingerprint</span>
          </div>
          <p className="text-sm text-white">{session.fingerprint_randomization ? 'Randomized' : 'Off'}</p>
        </Card>
        <Card glow="rgba(59, 130, 246, 0.1)">
          <div className="flex items-center gap-2 mb-1.5">
            <EyeOff className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-[10px] text-white/30 uppercase tracking-wider">IP Cloak</span>
          </div>
          <p className="text-sm text-white">{session.ip_cloaking ? 'Enabled' : 'Off'}</p>
        </Card>
        <Card glow="rgba(245, 158, 11, 0.1)">
          <div className="flex items-center gap-2 mb-1.5">
            <Radio className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-[10px] text-white/30 uppercase tracking-wider">Relayer</span>
          </div>
          <p className="text-sm text-white capitalize">{session.relayer}</p>
        </Card>
      </div>

      {isActive && (
        <Card glow="rgba(168, 85, 247, 0.08)" className="border-purple-500/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-2.5 shrink-0">
                <Shield className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white">Stealth session is active</p>
                <p className="text-xs text-white/30 mt-0.5">Your dApp has been opened in a new browser tab. End session when done.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="secondary"
                onClick={handleOpenExternal}
                icon={<ExternalLink className="h-3.5 w-3.5" />}
                className="text-xs flex-1 sm:flex-initial"
              >
                Reopen Tab
              </Button>
              <Button
                variant="danger"
                onClick={handleEndSession}
                disabled={ending}
                icon={ending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Square className="h-3.5 w-3.5" />}
                className="text-xs flex-1 sm:flex-initial"
              >
                {ending ? 'Ending...' : 'End Session'}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {isEnded && (
        <Card glow="rgba(255, 255, 255, 0.04)">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/[0.05] border border-white/[0.08] p-2.5">
              <CheckCircle2 className="h-5 w-5 text-white/40" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/60">Session ended</p>
              <p className="text-xs text-white/25 mt-0.5">
                Ended at {new Date(session.ended_at!).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      )}

      <Card>
        <h3 className="text-sm font-medium text-white mb-4">Session Details</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
            <span className="text-xs text-white/30">Target URL</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60 font-mono truncate max-w-[200px] sm:max-w-[400px]">{session.target_url}</span>
              <button onClick={handleCopyUrl} className="text-white/20 hover:text-white/50 transition-colors">
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
            <span className="text-xs text-white/30">Session ID</span>
            <span className="text-xs text-white/40 font-mono">{session.id.slice(0, 8)}...{session.id.slice(-4)}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
            <span className="text-xs text-white/30">Started</span>
            <span className="text-xs text-white/50">{new Date(session.started_at).toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
            <span className="text-xs text-white/30">Fingerprint</span>
            <Badge label={session.fingerprint_randomization ? 'Randomized' : 'Disabled'} variant={session.fingerprint_randomization ? 'active' : 'inactive'} />
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
            <span className="text-xs text-white/30">IP Cloaking</span>
            <Badge label={session.ip_cloaking ? 'Enabled' : 'Disabled'} variant={session.ip_cloaking ? 'active' : 'inactive'} />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-xs text-white/30">Relayer</span>
            <Badge label={session.relayer === 'auto' ? 'Auto-select' : session.relayer} variant="inactive" />
          </div>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button
          variant="secondary"
          fullWidth
          onClick={() => navigate('/app/sessions')}
          className="text-xs"
        >
          All Sessions
        </Button>
        <Button
          variant="primary"
          fullWidth
          onClick={() => navigate('/app/launch')}
          icon={<Globe className="h-3.5 w-3.5" />}
          className="text-xs"
        >
          New Session
        </Button>
      </div>
    </div>
  );
}
