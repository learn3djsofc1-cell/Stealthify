import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Globe,
  Shield,
  Fingerprint,
  EyeOff,
  Clock,
  Square,
  ExternalLink,
  AlertTriangle,
  Loader2,
  ArrowLeft,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import Badge from '../components/Badge';
import Card from '../components/Card';
import { fetchSession, updateSessionStatus, type RelaySession } from '../../lib/api';

function formatDuration(startedAt: string, endedAt?: string | null): string {
  const start = new Date(startedAt).getTime();
  const end = endedAt ? new Date(endedAt).getTime() : Date.now();
  const diff = Math.max(0, Math.floor((end - start) / 1000));
  const hrs = Math.floor(diff / 3600);
  const mins = Math.floor((diff % 3600) / 60);
  const secs = diff % 60;
  if (hrs > 0) return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  return `${mins}:${String(secs).padStart(2, '0')}`;
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
  const [session, setSession] = useState<RelaySession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ending, setEnding] = useState(false);
  const [duration, setDuration] = useState('0:00');
  const [tabOpened, setTabOpened] = useState(false);

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
    } catch {
      setError('Failed to end session');
    } finally {
      setEnding(false);
    }
  }, [session, ending]);

  const handleOpenTab = useCallback(() => {
    if (session) {
      window.open(session.target_url, '_blank');
      setTabOpened(true);
    }
  }, [session]);

  const isActive = session?.status === 'active';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-6 w-6 text-black/50 animate-spin" />
          <p className="text-sm text-black/50">Loading session...</p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3 text-center px-4">
          <AlertTriangle className="h-8 w-8 text-red-500" />
          <h2 className="text-lg font-medium text-black">{error || 'Session not found'}</h2>
          <button
            onClick={() => navigate('/app/sessions')}
            className="text-sm text-black/60 hover:text-black transition-colors"
          >
            Back to Sessions
          </button>
        </div>
      </div>
    );
  }

  if (!isActive) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/app/sessions')}
            className="rounded-xl bg-black/[0.05] border border-black/[0.10] p-2 hover:bg-black/[0.08] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-black/60" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-black truncate">
                {session.target_title || extractDomain(session.target_url)}
              </h1>
              <Badge label="Ended" variant="inactive" dot />
            </div>
            <p className="text-xs text-black/50 truncate mt-0.5">{session.target_url}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-black/[0.10] bg-white p-6">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-2xl bg-black/[0.05] border border-black/[0.10] p-4 mb-4">
              <Globe className="h-8 w-8 text-black/35" />
            </div>
            <h2 className="text-base font-medium text-black/70 mb-1">Session ended</h2>
            <p className="text-sm text-black/50 mb-1">
              Duration: {formatDuration(session.started_at, session.ended_at)}
            </p>
            <p className="text-xs text-black/40 mb-6">
              {session.ended_at && new Date(session.ended_at).toLocaleString()}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/app/launch')}
                className="inline-flex items-center gap-2 rounded-xl bg-black text-white px-5 py-2.5 text-sm font-medium hover:bg-black/80 transition-colors"
              >
                <Globe className="h-4 w-4" />
                New Session
              </button>
              <button
                onClick={() => navigate('/app/sessions')}
                className="inline-flex items-center gap-2 rounded-xl bg-black/[0.06] text-black border border-black/[0.12] px-5 py-2.5 text-sm font-medium hover:bg-black/[0.10] transition-colors"
              >
                All Sessions
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-black/[0.10] bg-white p-6">
          <h3 className="text-sm font-medium text-black mb-4">Session Details</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-[10px] text-black/45 uppercase tracking-wider mb-1">Target</p>
              <p className="text-xs text-black/60 font-mono truncate">{extractDomain(session.target_url)}</p>
            </div>
            <div>
              <p className="text-[10px] text-black/45 uppercase tracking-wider mb-1">Fingerprint</p>
              <p className="text-xs text-black/60">{session.fingerprint_randomization ? 'Randomized' : 'Off'}</p>
            </div>
            <div>
              <p className="text-[10px] text-black/45 uppercase tracking-wider mb-1">IP Cloaking</p>
              <p className="text-xs text-black/60">{session.ip_cloaking ? 'Enabled' : 'Off'}</p>
            </div>
            <div>
              <p className="text-[10px] text-black/45 uppercase tracking-wider mb-1">Relayer</p>
              <p className="text-xs text-black/60 capitalize">{session.relayer}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/app/sessions')}
          className="rounded-xl bg-black/[0.05] border border-black/[0.10] p-2 hover:bg-black/[0.08] transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-black/60" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-black truncate">
              {session.target_title || extractDomain(session.target_url)}
            </h1>
            <Badge label="Active" variant="active" dot />
          </div>
          <p className="text-xs text-black/50 truncate mt-0.5">{session.target_url}</p>
        </div>
      </div>

      <Card glow="rgba(0, 0, 0, 0.03)">
        <div className="flex flex-col items-center py-6">
          <div className={`rounded-2xl p-4 mb-4 border ${tabOpened ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-black/[0.05] border-black/[0.12]'}`}>
            {tabOpened ? (
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            ) : (
              <Globe className="h-10 w-10 text-black/50" />
            )}
          </div>

          <h2 className="text-base font-medium text-black mb-1">
            {tabOpened ? 'dApp running in stealth tab' : 'Stealth session ready'}
          </h2>
          <p className="text-sm text-black/50 mb-4 text-center max-w-sm">
            {tabOpened
              ? 'Your target dApp is running in a separate tab. Return here to manage or end the session.'
              : 'Open the target dApp in a new tab to start browsing privately.'}
          </p>

          <div className="flex items-center gap-2 rounded-xl bg-black/[0.05] border border-black/[0.10] px-4 py-2.5 mb-6 max-w-md w-full">
            <Lock className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span className="text-sm text-black/60 truncate font-mono">{extractDomain(session.target_url)}</span>
            <div className="flex items-center gap-2 ml-auto shrink-0">
              {session.fingerprint_randomization && (
                <span title="Fingerprint randomized"><Fingerprint className="h-3.5 w-3.5 text-black/50" /></span>
              )}
              {session.ip_cloaking && (
                <span title="IP cloaked"><EyeOff className="h-3.5 w-3.5 text-blue-500" /></span>
              )}
              <span title="Stealth active"><Shield className="h-3.5 w-3.5 text-emerald-500" /></span>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <button
              onClick={handleOpenTab}
              className="inline-flex items-center gap-2 rounded-xl bg-black text-white px-5 py-2.5 text-sm font-medium hover:bg-black/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              {tabOpened ? 'Open Again' : 'Open dApp'}
            </button>
            <button
              onClick={handleEndSession}
              disabled={ending}
              className="inline-flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-5 py-2.5 text-sm font-medium text-red-500 hover:bg-red-500/20 transition-colors disabled:opacity-40"
            >
              {ending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Square className="h-4 w-4" />
              )}
              {ending ? 'Ending...' : 'End Session'}
            </button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <div className="text-center py-2">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Clock className="h-3.5 w-3.5 text-black/50" />
              <span className="text-[10px] text-black/45 uppercase tracking-wider">Duration</span>
            </div>
            <p className="text-lg font-mono font-semibold text-black tabular-nums">{duration}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center py-2">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Fingerprint className="h-3.5 w-3.5 text-black/50" />
              <span className="text-[10px] text-black/45 uppercase tracking-wider">Fingerprint</span>
            </div>
            <p className="text-sm font-medium text-black">{session.fingerprint_randomization ? 'Randomized' : 'Off'}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center py-2">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <EyeOff className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-[10px] text-black/45 uppercase tracking-wider">IP Cloak</span>
            </div>
            <p className="text-sm font-medium text-black">{session.ip_cloaking ? 'Enabled' : 'Off'}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center py-2">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Shield className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-[10px] text-black/45 uppercase tracking-wider">Relayer</span>
            </div>
            <p className="text-sm font-medium text-black capitalize">{session.relayer}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
