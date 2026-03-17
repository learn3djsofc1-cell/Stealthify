import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, WifiOff } from 'lucide-react';
import logoSrc from '../assets/logo.png';
import Badge from './components/Badge';
import { getOnlineRelayers } from '../lib/relayers';
import { fetchWallet } from '../lib/api';
import { getSessionId } from '../lib/session';

export default function TopBar() {
  const onlineCount = getOnlineRelayers().length;
  const [walletKey, setWalletKey] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function checkWallet() {
      try {
        const wallet = await fetchWallet(getSessionId());
        if (mounted) {
          setWalletKey(wallet?.public_key || null);
        }
      } catch {
        if (mounted) setWalletKey(null);
      }
    }
    checkWallet();
    const interval = setInterval(checkWallet, 5000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  const truncatedKey = walletKey
    ? `${walletKey.slice(0, 4)}...${walletKey.slice(-4)}`
    : null;

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-white/[0.08] bg-black/95 backdrop-blur-xl px-4 lg:px-6">
      <Link to="/" className="flex items-center gap-2.5">
        <img src={logoSrc} alt="Veilary" className="h-6 w-6 object-contain" />
        <span className="text-white font-bold tracking-widest text-xs uppercase">Veilary</span>
      </Link>

      <div className="flex items-center gap-2 sm:gap-3">
        <Badge label={`${onlineCount} Online`} variant="active" dot className="hidden sm:inline-flex" />
        {walletKey ? (
          <Link
            to="/app/wallet"
            className="flex items-center gap-1.5 rounded-lg bg-white/[0.06] border border-white/[0.10] px-2.5 py-1.5 hover:bg-white/[0.10] transition-colors"
          >
            <Wallet className="h-3.5 w-3.5 text-white/80" />
            <span className="text-[11px] text-white/70 hidden sm:block font-mono">{truncatedKey}</span>
          </Link>
        ) : (
          <Link
            to="/app/wallet"
            className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] px-2.5 py-1.5 hover:bg-white/[0.08] transition-colors"
          >
            <WifiOff className="h-3.5 w-3.5 text-white/55" />
            <span className="text-[11px] text-white/55 hidden sm:block">No Wallet</span>
          </Link>
        )}
      </div>
    </header>
  );
}
