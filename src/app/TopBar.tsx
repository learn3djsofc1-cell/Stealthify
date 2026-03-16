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
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-black/[0.06] bg-white/70 backdrop-blur-xl px-4 lg:px-6">
      <Link to="/" className="flex items-center gap-2.5">
        <img src={logoSrc} alt="RelayForge" className="h-6 w-6 object-contain" />
        <span className="text-black font-bold tracking-widest text-xs uppercase">RelayForge</span>
      </Link>

      <div className="flex items-center gap-2 sm:gap-3">
        <Badge label={`${onlineCount} Online`} variant="active" dot className="hidden sm:inline-flex" />
        {walletKey ? (
          <Link
            to="/app/wallet"
            className="flex items-center gap-1.5 rounded-lg bg-black/[0.05] border border-black/[0.08] px-2.5 py-1.5 hover:bg-black/[0.08] transition-colors"
          >
            <Wallet className="h-3.5 w-3.5 text-black/60" />
            <span className="text-[11px] text-black/60 hidden sm:block font-mono">{truncatedKey}</span>
          </Link>
        ) : (
          <Link
            to="/app/wallet"
            className="flex items-center gap-1.5 rounded-lg bg-black/[0.03] border border-black/[0.06] px-2.5 py-1.5 hover:bg-black/[0.06] transition-colors"
          >
            <WifiOff className="h-3.5 w-3.5 text-black/30" />
            <span className="text-[11px] text-black/30 hidden sm:block">No Wallet</span>
          </Link>
        )}
      </div>
    </header>
  );
}
