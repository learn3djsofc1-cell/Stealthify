import { useState, useEffect, useRef, useCallback } from 'react';
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
  RefreshCw,
  Lock,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import Badge from '../components/Badge';
import { fetchSession, updateSessionStatus, type StealthSession } from '../../lib/api';

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
  const [session, setSession] = useState<StealthSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ending, setEnding] = useState(false);
  const [duration, setDuration] = useState('0:00');
  const [viewMode, setViewMode] = useState<'embedded' | 'control'>('embedded');
  const [iframeContentOk, setIframeContentOk] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    fetchSession(id).then(s => {
      if (!cancelled) {
        setSession(s);
        setLoading(false);
      }
    }).catch(() => {
      if (!cancelled) {
        setError('Session not found');
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [id]);

  useEffect(() => {
    if (!session || session.status !== 'active' || viewMode !== 'embedded') return;
    const timer = setTimeout(() => {
      if (!iframeContentOk) {
        setViewMode('control');
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [session, viewMode, iframeContentOk]);

  const handleIframeLoad = useCallback(() => {
    if (!iframeRef.current) return;
    try {
      const doc = iframeRef.current.contentDocument;
      if (doc && doc.body && doc.body.innerHTML.length > 200) {
        setIframeContentOk(true);
      }
    } catch {
      setIframeContentOk(true);
    }
  }, []);

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

  const handleRefresh = () => {
    if (iframeRef.current && session) {
      iframeRef.current.src = session.target_url;
    }
  };

  const isActive = session?.status === 'active';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-6 w-6 text-purple-400 animate-spin" />
          <p className="text-sm text-white/30">Loading session...</p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3 text-center px-4">
          <AlertTriangle className="h-8 w-8 text-red-400" />
          <h2 className="text-lg font-medium text-white">{error || 'Session not found'}</h2>
          <button
            onClick={() => navigate('/app/sessions')}
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
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
            className="rounded-xl bg-white/[0.05] border border-white/[0.08] p-2 hover:bg-white/[0.08] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-white/60" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-white truncate">
                {session.target_title || extractDomain(session.target_url)}
              </h1>
              <Badge label="Ended" variant="inactive" dot />
            </div>
            <p className="text-xs text-white/30 truncate mt-0.5">{session.target_url}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-2xl bg-white/[0.05] border border-white/[0.08] p-4 mb-4">
              <Globe className="h-8 w-8 text-white/20" />
            </div>
            <h2 className="text-base font-medium text-white/60 mb-1">Session ended</h2>
            <p className="text-sm text-white/25 mb-1">
              Duration: {formatDuration(session.started_at, session.ended_at)}
            </p>
            <p className="text-xs text-white/20 mb-6">
              {session.ended_at && new Date(session.ended_at).toLocaleString()}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/app/launch')}
                className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-5 py-2.5 text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                <Globe className="h-4 w-4" />
                New Session
              </button>
              <button
                onClick={() => navigate('/app/sessions')}
                className="inline-flex items-center gap-2 rounded-xl bg-white/[0.05] text-white border border-white/10 px-5 py-2.5 text-sm font-medium hover:bg-white/[0.1] transition-colors"
              >
                All Sessions
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h3 className="text-sm font-medium text-white mb-4">Session Details</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-[10px] text-white/25 uppercase tracking-wider mb-1">Target</p>
              <p className="text-xs text-white/60 font-mono truncate">{extractDomain(session.target_url)}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/25 uppercase tracking-wider mb-1">Fingerprint</p>
              <p className="text-xs text-white/60">{session.fingerprint_randomization ? 'Randomized' : 'Off'}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/25 uppercase tracking-wider mb-1">IP Cloaking</p>
              <p className="text-xs text-white/60">{session.ip_cloaking ? 'Enabled' : 'Off'}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/25 uppercase tracking-wider mb-1">Relayer</p>
              <p className="text-xs text-white/60 capitalize">{session.relayer}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderControlBar = () => (
    <div className="flex items-center gap-2 px-3 py-2 bg-[#0A0A0A] border-b border-white/[0.06] shrink-0">
      <button
        onClick={() => navigate('/app/sessions')}
        className="rounded-lg bg-white/[0.05] p-1.5 hover:bg-white/[0.1] transition-colors"
        title="Back"
      >
        <ArrowLeft className="h-3.5 w-3.5 text-white/50" />
      </button>

      <div className="flex items-center gap-2 flex-1 min-w-0 rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 py-1.5">
        <Lock className="h-3 w-3 text-emerald-400 shrink-0" />
        <span className="text-xs text-white/50 truncate font-mono">{extractDomain(session.target_url)}</span>
        <div className="flex items-center gap-1.5 ml-auto shrink-0">
          {session.fingerprint_randomization && (
            <Fingerprint className="h-3 w-3 text-purple-400" title="Fingerprint randomized" />
          )}
          {session.ip_cloaking && (
            <EyeOff className="h-3 w-3 text-blue-400" title="IP cloaked" />
          )}
          <Shield className="h-3 w-3 text-emerald-400" title="Stealth active" />
        </div>
      </div>

      {viewMode === 'embedded' && (
        <>
          <button
            onClick={handleRefresh}
            className="rounded-lg bg-white/[0.05] p-1.5 hover:bg-white/[0.1] transition-colors"
            title="Refresh"
          >
            <RefreshCw className="h-3.5 w-3.5 text-white/50" />
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="rounded-lg bg-white/[0.05] p-1.5 hover:bg-white/[0.1] transition-colors hidden sm:block"
            title={expanded ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {expanded ? (
              <Minimize2 className="h-3.5 w-3.5 text-white/50" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5 text-white/50" />
            )}
          </button>
        </>
      )}

      <button
        onClick={() => window.open(session.target_url, '_blank')}
        className="rounded-lg bg-white/[0.05] p-1.5 hover:bg-white/[0.1] transition-colors"
        title="Open in new tab"
      >
        <ExternalLink className="h-3.5 w-3.5 text-white/50" />
      </button>

      <div className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] px-2.5 py-1.5 shrink-0">
        <Clock className="h-3 w-3 text-purple-400" />
        <span className="text-xs text-white/50 font-mono tabular-nums">{duration}</span>
      </div>

      <button
        onClick={handleEndSession}
        disabled={ending}
        className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-40 shrink-0"
      >
        {ending ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <Square className="h-3 w-3" />
        )}
        <span className="hidden sm:inline">{ending ? 'Ending...' : 'End'}</span>
      </button>
    </div>
  );

  if (viewMode === 'control') {
    return (
      <div className={`flex flex-col ${expanded ? 'fixed inset-0 z-[100] bg-[#050505]' : '-mx-4 -my-6 lg:-mx-8 lg:-my-8'}`} style={expanded ? undefined : { height: 'calc(100vh - 56px)' }}>
        {renderControlBar()}
        <div className="flex-1 flex items-center justify-center bg-[#050505]">
          <div className="flex flex-col items-center gap-4 text-center px-6 max-w-lg">
            <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
              <Shield className="h-10 w-10 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Stealth Session Active</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              This website cannot be displayed inline. Open it in a new tab to browse — your stealth session continues tracking here.
            </p>
            <div className="grid grid-cols-3 gap-3 w-full mt-2">
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
                <Fingerprint className="h-4 w-4 text-purple-400 mx-auto mb-1.5" />
                <p className="text-[10px] text-white/25 uppercase tracking-wider">Fingerprint</p>
                <p className="text-xs text-white/60 mt-0.5">{session.fingerprint_randomization ? 'Randomized' : 'Off'}</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
                <EyeOff className="h-4 w-4 text-blue-400 mx-auto mb-1.5" />
                <p className="text-[10px] text-white/25 uppercase tracking-wider">IP Cloak</p>
                <p className="text-xs text-white/60 mt-0.5">{session.ip_cloaking ? 'Enabled' : 'Off'}</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
                <Clock className="h-4 w-4 text-emerald-400 mx-auto mb-1.5" />
                <p className="text-[10px] text-white/25 uppercase tracking-wider">Duration</p>
                <p className="text-xs text-white/60 font-mono mt-0.5">{duration}</p>
              </div>
            </div>
            <button
              onClick={() => window.open(session.target_url, '_blank')}
              className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-6 py-3 text-sm font-medium hover:bg-gray-200 transition-colors mt-2 w-full justify-center"
            >
              <ExternalLink className="h-4 w-4" />
              Open {extractDomain(session.target_url)}
            </button>
            <button
              onClick={() => setViewMode('embedded')}
              className="text-xs text-white/25 hover:text-white/40 transition-colors"
            >
              Try embedded view
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${expanded ? 'fixed inset-0 z-[100] bg-[#050505]' : '-mx-4 -my-6 lg:-mx-8 lg:-my-8'}`} style={expanded ? undefined : { height: 'calc(100vh - 56px)' }}>
      {renderControlBar()}
      <div className="flex-1 min-h-0">
        <iframe
          ref={iframeRef}
          src={session.target_url}
          className="w-full h-full border-0 bg-[#0a0a0a]"
          referrerPolicy="no-referrer"
          onLoad={handleIframeLoad}
          onError={() => setViewMode('control')}
          title={session.target_title || extractDomain(session.target_url)}
        />
      </div>
      <div className="shrink-0 flex items-center justify-between px-3 py-1.5 bg-[#0A0A0A] border-t border-white/[0.06]">
        <span className="text-[10px] text-white/20">Stealth session active</span>
        <button
          onClick={() => setViewMode('control')}
          className="inline-flex items-center gap-1.5 rounded-md bg-white/[0.05] border border-white/[0.08] px-2.5 py-1 text-[11px] text-white/40 hover:text-white/60 hover:bg-white/[0.08] transition-all"
        >
          <AlertTriangle className="h-3 w-3" />
          <span>Can't see the site?</span>
        </button>
      </div>
    </div>
  );
}
