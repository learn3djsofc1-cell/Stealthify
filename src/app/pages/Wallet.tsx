import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wallet as WalletIcon,
  ShieldCheck,
  UserX,
  Lock,
  Copy,
  Check,
  Eye,
  EyeOff,
  AlertTriangle,
  Trash2,
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import Badge from '../components/Badge';
import { generateSolanaWallet, type GeneratedWallet } from '../../lib/solana';
import { fetchWallet, createWalletRecord, deleteWalletRecord, type WalletData } from '../../lib/api';
import { getSessionId } from '../../lib/session';

type WalletState = 'loading' | 'empty' | 'creating' | 'reveal' | 'active';

export default function Wallet() {
  const navigate = useNavigate();
  const [state, setState] = useState<WalletState>('loading');
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [newWallet, setNewWallet] = useState<GeneratedWallet | null>(null);
  const [acknowledged, setAcknowledged] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadWallet = useCallback(async () => {
    try {
      const sessionId = getSessionId();
      const existing = await fetchWallet(sessionId);
      if (existing) {
        setWallet(existing);
        setState('active');
      } else {
        setState('empty');
      }
    } catch {
      setState('empty');
    }
  }, []);

  useEffect(() => {
    loadWallet();
  }, [loadWallet]);

  const handleGenerate = () => {
    const generated = generateSolanaWallet();
    setNewWallet(generated);
    setState('reveal');
    setAcknowledged(false);
    setShowPrivateKey(false);
    setError(null);
  };

  const handleConfirm = async () => {
    if (!acknowledged || !newWallet) return;
    try {
      const sessionId = getSessionId();
      const saved = await createWalletRecord(sessionId, newWallet.publicKey);
      setWallet(saved);
      setNewWallet(null);
      setState('active');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save wallet');
    }
  };

  const handleCopy = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const sessionId = getSessionId();
      await deleteWalletRecord(sessionId);
      setWallet(null);
      setState('empty');
    } catch {
      setError('Failed to delete wallet');
    } finally {
      setDeleting(false);
    }
  };

  const formatAddress = (addr: string) => {
    if (addr.length <= 12) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-6)}`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (state === 'loading') {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-white">Wallet</h1>
          <p className="mt-1 text-sm text-white/60">Manage your anonymous Solana wallet</p>
        </div>
        <Card>
          <div className="flex items-center justify-center py-12">
            <div className="h-6 w-6 border-2 border-white/[0.10]/30 border-t-[#F81719] rounded-full animate-spin" />
          </div>
        </Card>
      </div>
    );
  }

  if (state === 'reveal' && newWallet) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-white">Wallet Created</h1>
          <p className="mt-1 text-sm text-white/60">Save your private key before continuing — you can import it into Phantom</p>
        </div>

        <Card glow="rgba(245, 158, 11, 0.08)" className="border-amber-500/20">
          <div className="flex items-start gap-3 mb-6">
            <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-2 mt-0.5">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-amber-400">Important</h3>
              <p className="text-xs text-white/55 mt-1 leading-relaxed">
                Your private key will only be shown once. Save it securely — it cannot be recovered.
                Never share your private key with anyone. You can import this key directly into Phantom wallet.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-white/55 mb-2 block">Solana Address (Public Key)</label>
              <div className="flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3">
                <p className="text-sm text-white font-mono flex-1 break-all">{newWallet.publicKey}</p>
                <button
                  onClick={() => handleCopy(newWallet.publicKey, 'address')}
                  className="shrink-0 rounded-lg p-2 text-white/50 hover:text-white/70 hover:bg-white/[0.06] transition-colors"
                >
                  {copiedField === 'address' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-white/55 mb-2 block">Private Key (Phantom-compatible)</label>
              <div className="flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3">
                <p className="text-sm text-white font-mono flex-1 break-all">
                  {showPrivateKey ? newWallet.privateKey : '•'.repeat(44)}
                </p>
                <button
                  onClick={() => setShowPrivateKey(!showPrivateKey)}
                  className="shrink-0 rounded-lg p-2 text-white/50 hover:text-white/70 hover:bg-white/[0.06] transition-colors"
                >
                  {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => handleCopy(newWallet.privateKey, 'privateKey')}
                  className="shrink-0 rounded-lg p-2 text-white/50 hover:text-white/70 hover:bg-white/[0.06] transition-colors"
                >
                  {copiedField === 'privateKey' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                className="sr-only peer"
              />
              <div className="h-5 w-5 rounded-md border-2 border-white/[0.10]/25 bg-white/[0.04] peer-checked:bg-black peer-checked:border-white/[0.10] transition-all flex items-center justify-center">
                {acknowledged && <Check className="h-3 w-3 text-white" />}
              </div>
            </div>
            <span className="text-sm text-white/60 leading-relaxed">
              I have securely saved my private key. I understand that it will not be shown again and cannot be recovered if lost.
            </span>
          </label>
        </Card>

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => { setState('empty'); setNewWallet(null); }}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            disabled={!acknowledged}
            className="flex-1"
          >
            Continue to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (state === 'active' && wallet) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-white">Wallet</h1>
          <p className="mt-1 text-sm text-white/60">Manage your anonymous Solana wallet</p>
        </div>

        <Card glow="rgba(248, 23, 25, 0.02)">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-xl bg-white/[0.06] border border-white/[0.10] p-3">
              <WalletIcon className="h-5 w-5 text-white/70" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-white">Wallet Details</h2>
              <p className="text-xs text-white/50">Your Solana wallet information</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-white/55 mb-1">Wallet Address</p>
                <p className="text-sm text-white font-mono truncate sm:hidden">{formatAddress(wallet.public_key)}</p>
                <p className="text-sm text-white font-mono hidden sm:block break-all">{wallet.public_key}</p>
              </div>
              <button
                onClick={() => handleCopy(wallet.public_key, 'walletAddr')}
                className="shrink-0 ml-3 rounded-lg p-2 text-white/50 hover:text-white/70 hover:bg-white/[0.06] transition-colors"
              >
                {copiedField === 'walletAddr' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3">
                <p className="text-xs text-white/55 mb-1">Network</p>
                <p className="text-sm text-white">Solana</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3">
                <p className="text-xs text-white/55 mb-1">Created</p>
                <p className="text-sm text-white">{formatDate(wallet.created_at)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge label="Solana" variant="active" />
              <Badge label="Anonymous" variant="active" />
              <Badge label="In-Browser" variant="verified" />
            </div>
          </div>
        </Card>

        <div>
          <h2 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">Security Guarantees</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              {
                icon: Lock,
                title: 'In-Browser Only',
                desc: 'Private keys never leave your browser. All cryptographic operations happen locally.',
                glow: 'rgba(248, 23, 25, 0.02)',
              },
              {
                icon: UserX,
                title: 'No Login Required',
                desc: 'No account creation, no email, no phone number. True anonymity from the start.',
                glow: 'rgba(16, 185, 129, 0.06)',
              },
              {
                icon: ShieldCheck,
                title: 'Fully Anonymous',
                desc: 'Wallet address is unlinkable to your identity, IP, or any other session data.',
                glow: 'rgba(59, 130, 246, 0.06)',
              },
            ].map(({ icon: Icon, title, desc, glow }) => (
              <Card key={title} hover glow={glow}>
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-xl bg-white/[0.06] border border-white/[0.10] p-3 mb-3">
                    <Icon className="h-5 w-5 text-white/60" />
                  </div>
                  <h3 className="text-sm font-medium text-white">{title}</h3>
                  <p className="text-xs text-white/50 mt-1.5 leading-relaxed">{desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card glow="rgba(239, 68, 68, 0.04)" className="border-red-500/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-2">
              <Trash2 className="h-4 w-4 text-red-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-500">Delete Wallet</h3>
              <p className="text-xs text-white/50">Remove wallet from this device permanently</p>
            </div>
          </div>
          <Button
            variant="danger"
            icon={<Trash2 className="h-4 w-4" />}
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete Wallet'}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-white">Wallet</h1>
        <p className="mt-1 text-sm text-white/60">Manage your anonymous Solana wallet</p>
      </div>

      <Card glow="rgba(245, 158, 11, 0.06)">
        <EmptyState
          icon={<WalletIcon className="h-7 w-7" />}
          title="No wallet created yet"
          description="Generate an anonymous Solana wallet directly in your browser. No login, no seed phrase storage on servers, no identity linkage. Import directly into Phantom."
          actionLabel="Create Solana Wallet"
          onAction={handleGenerate}
        />
      </Card>

      <div>
        <h2 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">Security Guarantees</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {[
            {
              icon: Lock,
              title: 'In-Browser Only',
              desc: 'Private keys never leave your browser. All cryptographic operations happen locally.',
              glow: 'rgba(248, 23, 25, 0.02)',
            },
            {
              icon: UserX,
              title: 'No Login Required',
              desc: 'No account creation, no email, no phone number. True anonymity from the start.',
              glow: 'rgba(16, 185, 129, 0.06)',
            },
            {
              icon: ShieldCheck,
              title: 'Fully Anonymous',
              desc: 'Wallet address is unlinkable to your identity, IP, or any other session data.',
              glow: 'rgba(59, 130, 246, 0.06)',
            },
          ].map(({ icon: Icon, title, desc, glow }) => (
            <Card key={title} hover glow={glow}>
              <div className="flex flex-col items-center text-center">
                <div className="rounded-xl bg-white/[0.06] border border-white/[0.10] p-3 mb-3">
                  <Icon className="h-5 w-5 text-white/60" />
                </div>
                <h3 className="text-sm font-medium text-white">{title}</h3>
                <p className="text-xs text-white/50 mt-1.5 leading-relaxed">{desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
