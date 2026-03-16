import { useState } from 'react';
import {
  Settings as SettingsIcon,
  Shield,
  Wifi,
  Wrench,
  Trash2,
} from 'lucide-react';
import Card from '../components/Card';
import Toggle from '../components/Toggle';
import Button from '../components/Button';

export default function Settings() {
  const [defaultFingerprint, setDefaultFingerprint] = useState(true);
  const [defaultIpCloaking, setDefaultIpCloaking] = useState(true);
  const [autoRelayer, setAutoRelayer] = useState(true);
  const [gdprMode, setGdprMode] = useState(false);
  const [autoConnect, setAutoConnect] = useState(false);
  const [devMode, setDevMode] = useState(false);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-black">Settings</h1>
        <p className="mt-1 text-sm text-black/40">Configure your RelayForge preferences</p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <Card glow="rgba(0,0,0,0.02)">
          <div className="flex items-center gap-3 mb-5">
            <div className="rounded-lg bg-black/[0.03] border border-black/[0.06] p-2">
              <SettingsIcon className="h-4 w-4 text-black/40" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-black">General</h2>
              <p className="text-xs text-black/35">Basic application preferences</p>
            </div>
          </div>
          <div className="space-y-5">
            <Toggle
              checked={true}
              onChange={() => {}}
              label="Light Theme"
              description="RelayForge uses a warm cream theme by default"
              disabled
            />
            <div className="border-t border-black/[0.04]" />
            <Toggle
              checked={autoConnect}
              onChange={setAutoConnect}
              label="Auto-connect on Launch"
              description="Automatically connect to the relay network when opening the app"
            />
          </div>
        </Card>

        <Card glow="rgba(0, 0, 0, 0.03)">
          <div className="flex items-center gap-3 mb-5">
            <div className="rounded-lg bg-black/[0.04] border border-black/[0.06] p-2">
              <Shield className="h-4 w-4 text-black/50" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-black">Privacy</h2>
              <p className="text-xs text-black/35">Default privacy settings for new sessions</p>
            </div>
          </div>
          <div className="space-y-5">
            <Toggle
              checked={defaultFingerprint}
              onChange={setDefaultFingerprint}
              label="Default Fingerprint Randomization"
              description="Automatically enable fingerprint randomization for all new sessions"
            />
            <div className="border-t border-black/[0.04]" />
            <Toggle
              checked={defaultIpCloaking}
              onChange={setDefaultIpCloaking}
              label="Default IP Cloaking"
              description="Automatically enable IP cloaking for all new sessions"
            />
            <div className="border-t border-black/[0.04]" />
            <Toggle
              checked={gdprMode}
              onChange={setGdprMode}
              label="GDPR Compliance Mode"
              description="Enable stricter data handling to comply with GDPR regulations"
            />
          </div>
        </Card>

        <Card glow="rgba(59, 130, 246, 0.04)">
          <div className="flex items-center gap-3 mb-5">
            <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-2">
              <Wifi className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-black">Network</h2>
              <p className="text-xs text-black/35">Relay network and connection settings</p>
            </div>
          </div>
          <div className="space-y-5">
            <Toggle
              checked={autoRelayer}
              onChange={setAutoRelayer}
              label="Auto-select Relayer"
              description="Automatically choose the best available relayer based on latency and trust score"
            />
          </div>
        </Card>

        <Card glow="rgba(0,0,0,0.02)">
          <div className="flex items-center gap-3 mb-5">
            <div className="rounded-lg bg-black/[0.03] border border-black/[0.06] p-2">
              <Wrench className="h-4 w-4 text-black/40" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-black">Advanced</h2>
              <p className="text-xs text-black/35">Developer and advanced settings</p>
            </div>
          </div>
          <div className="space-y-5">
            <Toggle
              checked={devMode}
              onChange={setDevMode}
              label="Developer Mode"
              description="Show additional debugging info and raw cryptographic outputs"
            />
          </div>
        </Card>

        <Card glow="rgba(239, 68, 68, 0.04)" className="border-red-500/10">
          <div className="flex items-center gap-3 mb-5">
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-2">
              <Trash2 className="h-4 w-4 text-red-500" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-red-500">Danger Zone</h2>
              <p className="text-xs text-black/35">Irreversible actions</p>
            </div>
          </div>
          <p className="text-sm text-black/40 mb-4">
            This will permanently delete your local wallet, session history, and all stored preferences. This action cannot be undone.
          </p>
          <Button variant="danger" icon={<Trash2 className="h-4 w-4" />}>
            Clear All Data
          </Button>
        </Card>
      </div>
    </div>
  );
}
