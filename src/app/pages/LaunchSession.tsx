import { useState } from 'react';
import {
  Globe,
  Rocket,
  Fingerprint,
  EyeOff,
  Shield,
  Info,
  ChevronDown,
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Toggle from '../components/Toggle';
import Badge from '../components/Badge';

export default function LaunchSession() {
  const [url, setUrl] = useState('');
  const [fingerprintRandomization, setFingerprintRandomization] = useState(true);
  const [ipCloaking, setIpCloaking] = useState(true);
  const [relayerDropdownOpen, setRelayerDropdownOpen] = useState(false);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-white">Launch Session</h1>
        <p className="mt-1 text-sm text-white/40">Start a stealth browsing session with full anonymity</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card tilt glow="rgba(168, 85, 247, 0.08)">
            <h2 className="text-sm font-medium text-white mb-4">Target dApp</h2>
            <Input
              icon={<Globe className="h-4 w-4" />}
              placeholder="Paste dApp URL to launch stealth session"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Card>

          <Card tilt glow="rgba(59, 130, 246, 0.08)">
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
                <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-white/10 bg-[#0A0A0A] p-2 shadow-2xl z-10">
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <p className="text-sm text-white/30">No relayers available</p>
                    <p className="text-xs text-white/20 mt-1">Connect to the network to discover relayers</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card tilt glow="rgba(16, 185, 129, 0.08)">
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
            disabled
            icon={<Rocket className="h-4 w-4" />}
            className="py-3.5 text-sm rounded-xl"
          >
            Launch Stealth Session
          </Button>
          <p className="text-xs text-white/25 text-center -mt-4">Connect to the network to launch sessions</p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <Card tilt glow="rgba(168, 85, 247, 0.1)" className="border-purple-500/10">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-4 w-4 text-purple-400" />
              <h3 className="text-sm font-medium text-purple-400">How it works</h3>
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: Globe,
                  title: 'Paste dApp URL',
                  desc: 'Enter the URL of any decentralized application you want to access privately.',
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

          <Card tilt glow="rgba(255,255,255,0.04)">
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
