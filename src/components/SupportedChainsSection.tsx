import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

interface ChainData {
  name: string;
  symbol: string;
  cgId: string;
  localLogo?: string;
}

const chains: ChainData[] = [
  { name: 'Solana', symbol: 'SOL', cgId: 'solana' },
  { name: 'Ethereum', symbol: 'ETH', cgId: 'ethereum' },
  { name: 'Bitcoin', symbol: 'BTC', cgId: 'bitcoin' },
  { name: 'Polygon', symbol: 'MATIC', cgId: 'matic-network' },
  { name: 'Arbitrum', symbol: 'ARB', cgId: 'arbitrum' },
  { name: 'Avalanche', symbol: 'AVAX', cgId: 'avalanche-2' },
  { name: 'Base', symbol: 'BASE', cgId: 'base-protocol' },
  { name: 'Optimism', symbol: 'OP', cgId: 'optimism' },
  { name: 'BNB Chain', symbol: 'BNB', cgId: 'binancecoin' },
  { name: 'Cosmos', symbol: 'ATOM', cgId: 'cosmos' },
  { name: 'Sui', symbol: 'SUI', cgId: 'sui' },
  { name: 'Aptos', symbol: 'APT', cgId: 'aptos', localLogo: '/images/aptos-logo.png' },
  { name: 'Near', symbol: 'NEAR', cgId: 'near' },
  { name: 'Fantom', symbol: 'FTM', cgId: 'fantom' },
  { name: 'Tron', symbol: 'TRX', cgId: 'tron' },
];

const CACHE_KEY = 'veilary_chain_logos';
const CACHE_TTL = 24 * 60 * 60 * 1000;
const API_TIMEOUT = 8000;

function getCachedLogos(): Record<string, string> | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return parsed.logos;
  } catch {
    return null;
  }
}

function setCachedLogos(logos: Record<string, string>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ logos, timestamp: Date.now() }));
  } catch {
  }
}

async function fetchChainLogos(): Promise<Record<string, string>> {
  const ids = chains.map(c => c.cgId).join(',');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&x_cg_demo_api_key=CG-t4bHGmbr6hqGvnfbMggxXvWB`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`CoinGecko API returned ${res.status}`);

    const data = await res.json();
    const logos: Record<string, string> = {};
    for (const coin of data) {
      if (coin.id && coin.image) {
        logos[coin.id] = coin.image;
      }
    }
    return logos;
  } catch {
    clearTimeout(timeout);
    return {};
  }
}

function useChainLogos() {
  const [logos, setLogos] = useState<Record<string, string>>(() => getCachedLogos() || {});
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const cached = getCachedLogos();
    if (cached && Object.keys(cached).length > 0) {
      setLogos(cached);
      return;
    }

    fetchChainLogos().then(result => {
      if (Object.keys(result).length > 0) {
        setCachedLogos(result);
        setLogos(result);
      }
    });
  }, []);

  return logos;
}

const ChainLogo = ({ chain, logoUrl }: { chain: ChainData; logoUrl?: string }) => {
  const [failed, setFailed] = useState(false);
  const src = chain.localLogo || logoUrl;

  if (!src || failed) {
    return (
      <div className="w-8 h-8 rounded-lg bg-[#F81719]/[0.06] border border-[#F81719]/10 flex items-center justify-center">
        <span className="text-[10px] font-bold text-[#F81719] tracking-wider">{chain.symbol.slice(0, 2)}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={chain.name}
      className={`w-8 h-8 rounded-lg object-contain${chain.localLogo ? ' invert brightness-200' : ''}`}
      onError={() => setFailed(true)}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
};

const MarqueeRow = ({ items, logos, direction = 'left', speed = 30 }: { items: ChainData[]; logos: Record<string, string>; direction?: 'left' | 'right'; speed?: number }) => {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-2">
      <div
        className={`flex gap-4 w-max ${direction === 'left' ? 'animate-[marquee-left_var(--speed)_linear_infinite]' : 'animate-[marquee-right_var(--speed)_linear_infinite]'}`}
        style={{ '--speed': `${speed}s` } as React.CSSProperties}
      >
        {doubled.map((chain, index) => (
          <div
            key={`${chain.symbol}-${index}`}
            className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#F81719]/20 hover:bg-white/[0.04] transition-all duration-500 shrink-0"
          >
            <ChainLogo chain={chain} logoUrl={logos[chain.cgId]} />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white/80">{chain.name}</span>
              <span className="text-[10px] text-white/30 font-mono">{chain.symbol}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SupportedChainsSection = () => {
  const logos = useChainLogos();
  const firstHalf = chains.slice(0, 8);
  const secondHalf = chains.slice(8);

  return (
    <section className="w-full py-32 sm:py-40 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#F81719] font-medium tracking-widest text-xs uppercase mb-4 block"
          >
            Supported Chains
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            15+ Chains. One Private Layer.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/45 text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            Stealth access and ephemeral wallet generation across every major L1 and L2 blockchain.
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        <MarqueeRow items={firstHalf} logos={logos} direction="left" speed={35} />
        <MarqueeRow items={secondHalf} logos={logos} direction="right" speed={40} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-white/30"
        >
          New chains integrated continuously. Cross-chain ZK bridging in development.
        </motion.p>
      </div>
    </section>
  );
};

export default SupportedChainsSection;
