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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

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
    try {
      const session = await createSession({
        browserSessionId: getSessionId(),
        targetUrl: selectedUrl,
        targetTitle: selectedTitle || undefined,
        fingerprintRandomization,
        ipCloaking,
      });
      window.open(selectedUrl, `stealth_${session.id}`);
      navigate(`/app/session/${session.id}`);
    } catch (err: any) {
      setLaunchError(err.message || 'Failed to launch session');
    } finally {
      setLaunching(false);
    }
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
        <h1 className="text-xl sm:text-2xl font-semibold text-white">Launch Session</h1>
        <p className="mt-1 text-sm text-white/40">Start a stealth browsing session with full anonymity</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div ref={searchRef} className="relative" style={showResults ? { zIndex: 30 } : undefined}>
            <Card glow="rgba(168, 85, 247, 0.06)" overflow>
              <h2 className="text-sm font-medium text-white mb-4">Target dApp</h2>
              <div className="relative">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-all duration-200 focus-within:border-purple-500/40 focus-within:bg-white/[0.06]">
                  <Search className="h-4 w-4 text-white/30 shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => handleQueryChange(e.target.value)}
                    onFocus={() => results.length > 0 && setShowResults(true)}
                    placeholder="Search for dApps, protocols, or paste a URL..."
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none min-w-0"
                  />
                  {searching && <Loader2 className="h-4 w-4 text-purple-400 animate-spin shrink-0" />}
                  {query && !searching && (
                    <button onClick={handleClearSearch} className="text-white/30 hover:text-white/60 transition-colors shrink-0">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {showResults && (
                  <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-white/10 bg-[#0A0A0A] shadow-2xl z-50 max-h-80 overflow-y-auto">
                    {searching ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-5 w-5 text-purple-400 animate-spin" />
                        <span className="ml-2 text-sm text-white/30">Searching...</span>
                      </div>
                    ) : results.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                        <p className="text-sm text-white/30">No results found</p>
                        <p className="text-xs text-white/20 mt-1">Try a different search term</p>
                      </div>
                    ) : (
                      <div className="p-2">
                        {results.map((result, i) => (
                          <button
                            key={i}
                            onClick={() => handleSelectResult(result)}
                            className="w-full text-left rounded-lg px-3 py-2.5 hover:bg-white/[0.06] transition-colors group"
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
                                <Globe className="h-4 w-4 text-white/20 mt-0.5 shrink-0" />
                              )}
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-white/80 truncate group-hover:text-white transition-colors">{result.title}</p>
                                <p className="text-xs text-purple-400/60 truncate mt-0.5">{result.displayed_link || extractDomain(result.link)}</p>
                                {result.snippet && (
                                  <p className="text-xs text-white/25 mt-1 line-clamp-2 leading-relaxed">{result.snippet}</p>
                                )}
                              </div>
                              <ExternalLink className="h-3.5 w-3.5 text-white/10 group-hover:text-white/30 mt-0.5 shrink-0 transition-colors" />
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {selectedUrl && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-purple-500/10 border border-purple-500/20 px-3 py-2">
                  <Globe className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                  <span className="text-xs text-purple-300 truncate">{selectedUrl}</span>
                  <button onClick={handleClearSearch} className="ml-auto text-purple-400/50 hover:text-purple-400 transition-colors shrink-0">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </Card>
          </div>

          <div ref={dropdownRef} className="relative" style={relayerDropdownOpen ? { zIndex: 30 } : undefined}>
            <Card glow="rgba(59, 130, 246, 0.06)" overflow>
              <h2 className="text-sm font-medium text-white mb-4">Relayer Preference</h2>
              <div className="relative">
                <button
                  onClick={() => setRelayerDropdownOpen(!relayerDropdownOpen)}
                  className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm transition-all duration-200 hover:border-white/20"
                >
                  <span className="text-white/40">Auto-select best relayer</span>
                  <ChevronDown className={`h-4 w-4 text-white/30 transition-transform duration-200 ${relayerDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {relayerDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-white/10 bg-[#0A0A0A] p-2 shadow-2xl z-50">
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <p className="text-sm text-white/30">No relayers available</p>
                      <p className="text-xs text-white/20 mt-1">Connect to the network to discover relayers</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <Card glow="rgba(16, 185, 129, 0.06)">
            <h2 className="text-sm font-medium text-white mb-5">Session Configuration</h2>
            <div className="space-y-5">
              <Toggle
                checked={fingerprintRandomization}
                onChange={setFingerprintRandomization}
                label="Fingerprint Randomization"
                description="Randomize browser fingerprint data to prevent tracking across sessions"
              />
              <div className="border-t border-white/[0.04]" />
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
            <p className="text-xs text-red-400 text-center -mt-4">{launchError}</p>
          )}
          {!selectedUrl && !launchError && (
            <p className="text-xs text-white/25 text-center -mt-4">Search and select a dApp to launch</p>
          )}
        </div>

        <div className="space-y-4 sm:space-y-6">
          <Card glow="rgba(168, 85, 247, 0.08)" className="border-purple-500/10">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-4 w-4 text-purple-400" />
              <h3 className="text-sm font-medium text-purple-400">How it works</h3>
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
                  <div className="mt-0.5 rounded-lg bg-purple-500/10 p-1.5 h-fit">
                    <Icon className="h-3.5 w-3.5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/70">{title}</p>
                    <p className="text-xs text-white/35 mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-medium text-white mb-3">Session Defaults</h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40">Fingerprint</span>
                <Badge label={fingerprintRandomization ? 'Randomized' : 'Off'} variant={fingerprintRandomization ? 'active' : 'inactive'} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40">IP Cloaking</span>
                <Badge label={ipCloaking ? 'Enabled' : 'Off'} variant={ipCloaking ? 'active' : 'inactive'} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40">Relayer</span>
                <Badge label="Auto" variant="inactive" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
