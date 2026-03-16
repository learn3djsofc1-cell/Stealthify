import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe,
  Rocket,
  Fingerprint,
  EyeOff,
  Shield,
  Info,
  ChevronDown,
  Search,
  ExternalLink,
  Loader2,
  X,
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Toggle from '../components/Toggle';
import Badge from '../components/Badge';
import { searchDapps, createSession, type SearchResult } from '../../lib/api';
import { getSessionId } from '../../lib/session';
import {
  RELAYER_NODES,
  getActiveRelayers,
  getStatusVariant,
  getStatusLabel,
  type RelayerNode,
} from '../../lib/relayers';

export default function LaunchSession() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedUrl, setSelectedUrl] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [launching, setLaunching] = useState(false);
  const [launchError, setLaunchError] = useState('');
  const [fingerprintRandomization, setFingerprintRandomization] = useState(true);
  const [ipCloaking, setIpCloaking] = useState(true);
  const [relayerDropdownOpen, setRelayerDropdownOpen] = useState(false);
  const [selectedRelayer, setSelectedRelayer] = useState<string>('auto');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!relayerDropdownOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setRelayerDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [relayerDropdownOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }
    setSearching(true);
    setShowResults(true);
    try {
      const data = await searchDapps(q);
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setSearching(false);
    }
  }, []);

  const isValidUrl = (str: string): boolean => {
    try {
      const url = new URL(str);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setLaunchError('');
    if (isValidUrl(value.trim())) {
      setSelectedUrl(value.trim());
      setSelectedTitle('');
      setShowResults(false);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      return;
    }
    setSelectedUrl('');
    setSelectedTitle('');
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => handleSearch(value), 500);
  };

  const handleSelectResult = (result: SearchResult) => {
    setSelectedUrl(result.link);
    setSelectedTitle(result.title);
    setQuery(result.title);
    setShowResults(false);
    setLaunchError('');
  };

  const handleClearSearch = () => {
    setQuery('');
    setSelectedUrl('');
    setSelectedTitle('');
    setResults([]);
    setShowResults(false);
    setLaunchError('');
  };

  const handleLaunch = async () => {
    if (!selectedUrl || launching) return;
    setLaunching(true);
    setLaunchError('');

    let sessionId: string | null = null;
    try {
      const session = await createSession({
        browserSessionId: getSessionId(),
        targetUrl: selectedUrl,
        targetTitle: selectedTitle || undefined,
        fingerprintRandomization,
        ipCloaking,
      });
      sessionId = session.id;
    } catch (err: unknown) {
      setLaunchError(err instanceof Error ? err.message : 'Failed to launch session');
      setLaunching(false);
      return;
    }

    window.open(selectedUrl, '_blank');
    setLaunching(false);
    navigate(`/app/session/${sessionId}`);
  };

  const extractDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-black">Launch Session</h1>
        <p className="mt-1 text-sm text-black/60">Start a stealth browsing session with full anonymity</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div ref={searchRef} className="relative" style={showResults ? { zIndex: 30 } : undefined}>
            <Card glow="rgba(0, 0, 0, 0.03)" overflow>
              <h2 className="text-sm font-medium text-black mb-4">Target dApp</h2>
              <div className="relative">
                <div className="flex items-center gap-3 rounded-xl border border-black/[0.12] bg-white px-4 py-3 transition-all duration-200 focus-within:border-black/25 focus-within:bg-white">
                  <Search className="h-4 w-4 text-black/50 shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => handleQueryChange(e.target.value)}
                    onFocus={() => results.length > 0 && setShowResults(true)}
                    placeholder="Search for dApps, protocols, or paste a URL..."
                    className="flex-1 bg-transparent text-sm text-black placeholder:text-black/45 outline-none min-w-0"
                  />
                  {searching && <Loader2 className="h-4 w-4 text-black/60 animate-spin shrink-0" />}
                  {query && !searching && (
                    <button onClick={handleClearSearch} className="text-black/50 hover:text-black/70 transition-colors shrink-0">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {showResults && (
                  <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-black/[0.12] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.1)] z-50 max-h-80 overflow-y-auto">
                    {searching ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-5 w-5 text-black/50 animate-spin" />
                        <span className="ml-2 text-sm text-black/50">Searching...</span>
                      </div>
                    ) : results.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                        <p className="text-sm text-black/50">No results found</p>
                        <p className="text-xs text-black/40 mt-1">Try a different search term</p>
                      </div>
                    ) : (
                      <div className="p-2">
                        {results.map((result, i) => (
                          <button
                            key={i}
                            onClick={() => handleSelectResult(result)}
                            className="w-full text-left rounded-lg px-3 py-2.5 hover:bg-black/[0.05] transition-colors group"
                          >
                            <div className="flex items-start gap-3">
                              {result.favicon ? (
                                <img
                                  src={result.favicon}
                                  alt=""
                                  className="h-4 w-4 rounded mt-0.5 shrink-0"
                                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                />
                              ) : (
                                <Globe className="h-4 w-4 text-black/40 mt-0.5 shrink-0" />
                              )}
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-black/80 truncate group-hover:text-black transition-colors">{result.title}</p>
                                <p className="text-xs text-black/50 truncate mt-0.5">{result.displayed_link || extractDomain(result.link)}</p>
                                {result.snippet && (
                                  <p className="text-xs text-black/45 mt-1 line-clamp-2 leading-relaxed">{result.snippet}</p>
                                )}
                              </div>
                              <ExternalLink className="h-3.5 w-3.5 text-black/40 group-hover:text-black/60 mt-0.5 shrink-0 transition-colors" />
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {selectedUrl && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-black/[0.05] border border-black/[0.12] px-3 py-2">
                  <Globe className="h-3.5 w-3.5 text-black/60 shrink-0" />
                  <span className="text-xs text-black/60 truncate">{selectedUrl}</span>
                  <button onClick={handleClearSearch} className="ml-auto text-black/50 hover:text-black/70 transition-colors shrink-0">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </Card>
          </div>

          <div ref={dropdownRef} className="relative" style={relayerDropdownOpen ? { zIndex: 30 } : undefined}>
            <Card glow="rgba(59, 130, 246, 0.04)" overflow>
              <h2 className="text-sm font-medium text-black mb-4">Relayer Preference</h2>
              <div className="relative">
                <button
                  onClick={() => setRelayerDropdownOpen(!relayerDropdownOpen)}
                  className="flex w-full items-center justify-between rounded-xl border border-black/[0.12] bg-white px-4 py-3 text-sm transition-all duration-200 hover:border-black/[0.20]"
                >
                  <span className="text-black/60">
                    {selectedRelayer === 'auto'
                      ? 'Auto-select best relayer'
                      : RELAYER_NODES.find(r => r.id === selectedRelayer)?.name || 'Auto-select best relayer'}
                  </span>
                  <div className="flex items-center gap-2">
                    {selectedRelayer !== 'auto' && (() => {
                      const r = RELAYER_NODES.find(n => n.id === selectedRelayer);
                      return r ? (
                        <Badge label={getStatusLabel(r.status)} variant={getStatusVariant(r.status)} dot />
                      ) : null;
                    })()}
                    <ChevronDown className={`h-4 w-4 text-black/50 transition-transform duration-200 ${relayerDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                {relayerDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-black/[0.12] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.1)] z-50 max-h-80 overflow-y-auto">
                    <div className="p-2">
                      <button
                        onClick={() => { setSelectedRelayer('auto'); setRelayerDropdownOpen(false); }}
                        className={`w-full text-left rounded-lg px-3 py-2.5 transition-colors ${selectedRelayer === 'auto' ? 'bg-black/[0.06] border border-black/[0.12]' : 'hover:bg-black/[0.05] border border-transparent'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-black/80">Auto-select best relayer</p>
                            <p className="text-xs text-black/50 mt-0.5">Lowest latency, highest uptime</p>
                          </div>
                          {selectedRelayer === 'auto' && <div className="h-2 w-2 rounded-full bg-black" />}
                        </div>
                      </button>
                      <div className="h-px bg-black/[0.08] my-1" />
                      {getActiveRelayers().map((relayer) => (
                        <button
                          key={relayer.id}
                          onClick={() => { setSelectedRelayer(relayer.id); setRelayerDropdownOpen(false); }}
                          className={`w-full text-left rounded-lg px-3 py-2.5 transition-colors ${selectedRelayer === relayer.id ? 'bg-black/[0.06] border border-black/[0.12]' : 'hover:bg-black/[0.05] border border-transparent'}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-sm text-black/80">{relayer.name}</p>
                                <Badge label={getStatusLabel(relayer.status)} variant={getStatusVariant(relayer.status)} dot />
                                {relayer.verified && <Badge label="Verified" variant="verified" />}
                              </div>
                              <div className="flex items-center gap-3 mt-0.5">
                                <span className="text-xs text-black/50">{relayer.region}</span>
                                <span className="text-xs text-black/40 font-mono">{relayer.latencyMs}ms</span>
                                <span className="text-xs text-black/40">{relayer.uptimePercent.toFixed(1)}%</span>
                              </div>
                            </div>
                            {selectedRelayer === relayer.id && <div className="h-2 w-2 rounded-full bg-black shrink-0" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <Card glow="rgba(16, 185, 129, 0.04)">
            <h2 className="text-sm font-medium text-black mb-5">Session Configuration</h2>
            <div className="space-y-5">
              <Toggle
                checked={fingerprintRandomization}
                onChange={setFingerprintRandomization}
                label="Fingerprint Randomization"
                description="Randomize browser fingerprint data to prevent tracking across sessions"
              />
              <div className="border-t border-black/[0.08]" />
              <Toggle
                checked={ipCloaking}
                onChange={setIpCloaking}
                label="IP Cloaking"
                description="Route traffic through encrypted relayer nodes to mask your IP address"
              />
            </div>
          </Card>

          <Button
            variant="primary"
            fullWidth
            disabled={!selectedUrl || launching}
            onClick={handleLaunch}
            icon={launching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4" />}
            className="py-3.5 text-sm rounded-xl"
          >
            {launching ? 'Launching...' : 'Launch Stealth Session'}
          </Button>
          {launchError && (
            <p className="text-xs text-red-500 text-center -mt-4">{launchError}</p>
          )}
          {!selectedUrl && !launchError && (
            <p className="text-xs text-black/45 text-center -mt-4">Search and select a dApp to launch</p>
          )}
        </div>

        <div className="space-y-4 sm:space-y-6">
          <Card glow="rgba(0, 0, 0, 0.03)" className="border-black/[0.12]">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-4 w-4 text-black/60" />
              <h3 className="text-sm font-medium text-black/70">How it works</h3>
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: Search,
                  title: 'Search dApps',
                  desc: 'Search for any decentralized application or protocol you want to access privately.',
                },
                {
                  icon: Fingerprint,
                  title: 'Fingerprint Isolation',
                  desc: 'Your browser fingerprint is randomized, making each session completely unique.',
                },
                {
                  icon: EyeOff,
                  title: 'IP Cloaking',
                  desc: 'Traffic is routed through encrypted relayer nodes. Your real IP is never exposed.',
                },
                {
                  icon: Shield,
                  title: 'Verified Anonymity',
                  desc: 'Generate ZK-proofs for actions without revealing your identity.',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-3">
                  <div className="mt-0.5 rounded-lg bg-black/[0.05] p-1.5 h-fit">
                    <Icon className="h-3.5 w-3.5 text-black/60" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-black/70">{title}</p>
                    <p className="text-xs text-black/50 mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-medium text-black mb-3">Session Defaults</h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-black/55">Fingerprint</span>
                <Badge label={fingerprintRandomization ? 'Randomized' : 'Off'} variant={fingerprintRandomization ? 'active' : 'inactive'} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-black/55">IP Cloaking</span>
                <Badge label={ipCloaking ? 'Enabled' : 'Off'} variant={ipCloaking ? 'active' : 'inactive'} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-black/55">Relayer</span>
                <Badge
                  label={selectedRelayer === 'auto' ? 'Auto' : RELAYER_NODES.find(r => r.id === selectedRelayer)?.name || 'Auto'}
                  variant={selectedRelayer === 'auto' ? 'inactive' : 'active'}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
