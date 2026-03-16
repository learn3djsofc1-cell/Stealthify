import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Menu, X, ExternalLink, ChevronRight } from 'lucide-react';

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'stealth-sessions', label: 'Stealth Sessions' },
  { id: 'anonymous-wallet', label: 'Anonymous Wallet' },
  { id: 'openclaw-network', label: 'OpenClaw Network' },
  { id: 'privacy-security', label: 'Privacy & Security' },
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'api-reference', label: 'API Reference' },
];

function useActiveSection() {
  const [active, setActive] = useState('overview');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

function SidebarNav({ active, onSelect }: { active: string; onSelect?: () => void }) {
  return (
    <nav className="space-y-1">
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={onSelect}
          className={`block px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
            active === id
              ? 'bg-black/[0.07] text-black font-medium'
              : 'text-black/50 hover:text-black/70 hover:bg-black/[0.03]'
          }`}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-black/[0.04] border border-black/[0.08] rounded-xl p-4 overflow-x-auto text-sm font-mono text-black/80 leading-relaxed">
      <code>{children}</code>
    </pre>
  );
}

function EndpointBlock({
  method,
  path,
  description,
  body,
  response,
}: {
  method: string;
  path: string;
  description: string;
  body?: string;
  response: string;
}) {
  const methodColor =
    method === 'GET'
      ? 'bg-emerald-500/15 text-emerald-700 border-emerald-500/20'
      : method === 'POST'
        ? 'bg-blue-500/15 text-blue-700 border-blue-500/20'
        : method === 'DELETE'
          ? 'bg-red-500/15 text-red-700 border-red-500/20'
          : 'bg-amber-500/15 text-amber-700 border-amber-500/20';

  return (
    <div className="rounded-xl border border-black/[0.08] overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 bg-black/[0.03] border-b border-black/[0.06]">
        <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${methodColor}`}>
          {method}
        </span>
        <code className="text-sm font-mono text-black/70">{path}</code>
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm text-black/60">{description}</p>
        {body && (
          <div>
            <p className="text-xs font-medium text-black/50 uppercase tracking-wider mb-2">Request Body</p>
            <CodeBlock>{body}</CodeBlock>
          </div>
        )}
        <div>
          <p className="text-xs font-medium text-black/50 uppercase tracking-wider mb-2">Response</p>
          <CodeBlock>{response}</CodeBlock>
        </div>
      </div>
    </div>
  );
}

export default function Documentation() {
  const activeSection = useActiveSection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <div className="bg-[#FFF6E5] min-h-screen font-sans">
      <header className="sticky top-0 z-40 bg-[#FFF6E5]/90 backdrop-blur-md border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
            <div className="h-5 w-px bg-black/10 hidden sm:block" />
            <h1 className="text-sm font-semibold text-black tracking-tight">Documentation</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/app"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded-full text-xs font-medium hover:bg-black/80 transition-colors"
            >
              Launch App
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-black/[0.04] transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden" onClick={closeMobileMenu}>
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          <div
            className="absolute top-16 left-0 right-0 bg-[#FFF6E5] border-b border-black/[0.08] p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarNav active={activeSection} onSelect={closeMobileMenu} />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 xl:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-[11px] font-medium text-black/40 uppercase tracking-wider mb-4 px-3">
                On This Page
              </p>
              <SidebarNav active={activeSection} />
            </div>
          </aside>

          <main className="min-w-0 max-w-3xl">
            <div className="space-y-16">
              <section id="overview">
                <div className="mb-8">
                  <p className="text-xs font-medium text-black/40 uppercase tracking-wider mb-2">Introduction</p>
                  <h2 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight mb-4">Overview</h2>
                  <div className="h-px bg-black/[0.08]" />
                </div>

                <div className="prose-doc space-y-4">
                  <p className="text-black/70 leading-relaxed">
                    RelayForge is a privacy-native Web3 access layer designed for users who require anonymous, untraceable interaction with decentralized applications. It provides three core capabilities: stealth browsing sessions with fingerprint randomization and IP cloaking, anonymous Solana wallet generation compatible with Phantom, and access to the OpenClaw relayer network for verified, decentralized traffic routing.
                  </p>
                  <p className="text-black/70 leading-relaxed">
                    Unlike traditional VPN or proxy solutions, RelayForge operates at the application layer with a purpose-built architecture for Web3 workflows. Every session is cryptographically isolated. Wallet keypairs are generated entirely client-side using Ed25519 elliptic curve cryptography, and private keys are never transmitted to or stored on any server. The relay network is audited and discoverable through the OpenClaw protocol, ensuring transparent verification of node operators.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                    {[
                      { title: 'Stealth Sessions', desc: 'Fingerprint-randomized, IP-cloaked browsing for dApps.' },
                      { title: 'Anonymous Wallet', desc: 'Client-side Solana keypair generation. Phantom-importable.' },
                      { title: 'Relay Network', desc: 'OpenClaw-audited nodes across global regions.' },
                    ].map(({ title, desc }) => (
                      <div
                        key={title}
                        className="rounded-xl border border-black/[0.08] bg-white/60 p-4"
                      >
                        <h4 className="text-sm font-medium text-black mb-1">{title}</h4>
                        <p className="text-xs text-black/50 leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="architecture">
                <div className="mb-8">
                  <p className="text-xs font-medium text-black/40 uppercase tracking-wider mb-2">System Design</p>
                  <h2 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight mb-4">Architecture</h2>
                  <div className="h-px bg-black/[0.08]" />
                </div>

                <div className="space-y-6">
                  <p className="text-black/70 leading-relaxed">
                    RelayForge follows a client-heavy architecture where all sensitive cryptographic operations execute in the user's browser. The server layer is intentionally minimal — it stores only public keys and session metadata, never private keys or browsing content.
                  </p>

                  <h3 className="text-lg font-semibold text-black mt-8">Frontend</h3>
                  <p className="text-black/70 leading-relaxed">
                    The frontend is built with React 19 and TypeScript, bundled by Vite 6. Styling uses Tailwind CSS v4 with a custom warm cream and black theme. Animations are handled by Framer Motion, and the landing page features interactive 3D visualizations rendered with Three.js via React Three Fiber. Client-side routing is managed by React Router DOM v7, ensuring all navigation is instant without full page reloads.
                  </p>

                  <h3 className="text-lg font-semibold text-black mt-8">Backend</h3>
                  <p className="text-black/70 leading-relaxed">
                    The backend is an Express.js server that provides RESTful API endpoints for wallet record management and stealth session tracking. In development, it serves the Vite dev server via middleware. In production, it serves the pre-built static assets. Data is persisted in PostgreSQL with two tables: <code className="px-1.5 py-0.5 bg-black/[0.04] rounded text-sm font-mono">wallets</code> for public key records and <code className="px-1.5 py-0.5 bg-black/[0.04] rounded text-sm font-mono">stealth_sessions</code> for session metadata.
                  </p>

                  <h3 className="text-lg font-semibold text-black mt-8">Technology Stack</h3>
                  <div className="rounded-xl border border-black/[0.08] overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-black/[0.03] border-b border-black/[0.06]">
                          <th className="text-left px-4 py-3 font-medium text-black/60">Layer</th>
                          <th className="text-left px-4 py-3 font-medium text-black/60">Technology</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/[0.04]">
                        {[
                          ['Frontend', 'React 19, TypeScript, Vite 6'],
                          ['Styling', 'Tailwind CSS v4, Framer Motion'],
                          ['3D Rendering', 'Three.js, React Three Fiber, Drei'],
                          ['Backend', 'Express.js, Node.js'],
                          ['Database', 'PostgreSQL'],
                          ['Blockchain', 'Solana (@solana/web3.js, bs58)'],
                          ['Routing', 'React Router DOM v7'],
                          ['Icons', 'Lucide React'],
                          ['Font', 'Outfit (Google Fonts)'],
                        ].map(([layer, tech]) => (
                          <tr key={layer}>
                            <td className="px-4 py-2.5 text-black/70 font-medium">{layer}</td>
                            <td className="px-4 py-2.5 text-black/55">{tech}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section id="stealth-sessions">
                <div className="mb-8">
                  <p className="text-xs font-medium text-black/40 uppercase tracking-wider mb-2">Core Feature</p>
                  <h2 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight mb-4">Stealth Sessions</h2>
                  <div className="h-px bg-black/[0.08]" />
                </div>

                <div className="space-y-6">
                  <p className="text-black/70 leading-relaxed">
                    A stealth session is an isolated browsing environment configured for maximum anonymity when interacting with decentralized applications. Each session applies multiple privacy layers simultaneously to prevent tracking, fingerprinting, and traffic correlation.
                  </p>

                  <h3 className="text-lg font-semibold text-black">Fingerprint Randomization</h3>
                  <p className="text-black/70 leading-relaxed">
                    Every stealth session generates a unique browser fingerprint by randomizing identifying metadata including user agent string, screen resolution, installed fonts, WebGL renderer information, and canvas fingerprint hashes. This prevents cross-session tracking by websites that rely on browser fingerprinting techniques.
                  </p>

                  <h3 className="text-lg font-semibold text-black mt-6">IP Cloaking</h3>
                  <p className="text-black/70 leading-relaxed">
                    When IP cloaking is enabled, all session traffic is routed through the OpenClaw relayer network. The target application sees only the relayer node's IP address, not the user's actual IP. Relay nodes are distributed across multiple geographic regions (US, EU, APAC) to provide low-latency routing regardless of the user's location.
                  </p>

                  <h3 className="text-lg font-semibold text-black mt-6">Session Isolation</h3>
                  <p className="text-black/70 leading-relaxed">
                    Each session operates as a sandboxed environment. Session state, cookies, and local storage are not shared between sessions or with the user's primary browser profile. When a session ends, all associated browsing data is discarded. The RelayForge control panel provides real-time monitoring of active sessions including duration, security status, and connected relay node.
                  </p>

                  <h3 className="text-lg font-semibold text-black mt-6">Session Lifecycle</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    {['Configure', 'Launch', 'Monitor', 'End'].map((step, i) => (
                      <div key={step} className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-black/[0.06] border border-black/[0.10] text-xs font-medium text-black/60">
                          {i + 1}
                        </span>
                        <span className="text-sm text-black/70">{step}</span>
                        {i < 3 && <ChevronRight className="w-3 h-3 text-black/30" />}
                      </div>
                    ))}
                  </div>
                  <p className="text-black/60 text-sm mt-3 leading-relaxed">
                    Users enter a target dApp URL, toggle fingerprint randomization and IP cloaking, select a relay node (or use auto-assignment), and launch the session. The target opens in a managed browser tab while the control panel displays session metrics in real time.
                  </p>
                </div>
              </section>

              <section id="anonymous-wallet">
                <div className="mb-8">
                  <p className="text-xs font-medium text-black/40 uppercase tracking-wider mb-2">Core Feature</p>
                  <h2 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight mb-4">Anonymous Wallet</h2>
                  <div className="h-px bg-black/[0.08]" />
                </div>

                <div className="space-y-6">
                  <p className="text-black/70 leading-relaxed">
                    RelayForge includes a built-in, non-custodial Solana wallet generator. Wallets are created entirely within the user's browser using cryptographically secure random number generation. No accounts, emails, phone numbers, or seed phrase storage on servers is involved.
                  </p>

                  <h3 className="text-lg font-semibold text-black">Key Generation</h3>
                  <p className="text-black/70 leading-relaxed">
                    Wallet keypairs are generated using the Ed25519 elliptic curve algorithm via the <code className="px-1.5 py-0.5 bg-black/[0.04] rounded text-sm font-mono">@solana/web3.js</code> library. The process calls <code className="px-1.5 py-0.5 bg-black/[0.04] rounded text-sm font-mono">Keypair.generate()</code> which internally uses the browser's <code className="px-1.5 py-0.5 bg-black/[0.04] rounded text-sm font-mono">crypto.getRandomValues()</code> for entropy. The public key is encoded in Base58 format, and the private key (full 64-byte secret key) is encoded using the <code className="px-1.5 py-0.5 bg-black/[0.04] rounded text-sm font-mono">bs58</code> library.
                  </p>

                  <CodeBlock>{`import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

const keypair = Keypair.generate();
const publicKey = keypair.publicKey.toBase58();
const privateKey = bs58.encode(keypair.secretKey);`}</CodeBlock>

                  <h3 className="text-lg font-semibold text-black mt-6">Phantom Compatibility</h3>
                  <p className="text-black/70 leading-relaxed">
                    The generated private key uses the full 64-byte secret key format (32 bytes private scalar + 32 bytes public key), encoded in Base58. This is the exact format accepted by Phantom wallet's "Import Private Key" feature. Users can copy the private key from RelayForge and paste it directly into Phantom to import the wallet.
                  </p>

                  <h3 className="text-lg font-semibold text-black mt-6">Security Model</h3>
                  <div className="rounded-xl border border-black/[0.08] bg-white/60 p-5 space-y-3">
                    {[
                      ['Client-Side Only', 'Private keys are generated and displayed in the browser. They are never transmitted over the network or stored on any server.'],
                      ['One-Time Display', 'The private key is shown once during wallet creation. After the user navigates away, the key is no longer accessible through RelayForge.'],
                      ['Public Key Storage', 'Only the public key (wallet address) is stored server-side, linked to an anonymous browser session ID. This record enables wallet status display across page refreshes.'],
                      ['No Identity Linkage', 'The wallet address is unlinkable to the user\'s real identity, IP address, or any other session metadata. No login or account creation is required.'],
                    ].map(([title, desc]) => (
                      <div key={title}>
                        <h4 className="text-sm font-medium text-black">{title}</h4>
                        <p className="text-xs text-black/55 leading-relaxed mt-0.5">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="openclaw-network">
                <div className="mb-8">
                  <p className="text-xs font-medium text-black/40 uppercase tracking-wider mb-2">Infrastructure</p>
                  <h2 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight mb-4">OpenClaw Relayer Network</h2>
                  <div className="h-px bg-black/[0.08]" />
                </div>

                <div className="space-y-6">
                  <p className="text-black/70 leading-relaxed">
                    The OpenClaw protocol provides a decentralized registry of audited relayer nodes that form the backbone of RelayForge's IP cloaking infrastructure. Each node is independently operated, cryptographically verified, and subject to ongoing audits for uptime, performance, and security compliance.
                  </p>

                  <h3 className="text-lg font-semibold text-black">Node Discovery</h3>
                  <p className="text-black/70 leading-relaxed">
                    RelayForge's Relayers page displays all registered nodes with real-time operational metrics. Users can browse available nodes, inspect their geographic region, latency, bandwidth capacity, uptime percentage, and current session load. Nodes are filterable by region and status (online/offline).
                  </p>

                  <h3 className="text-lg font-semibold text-black mt-6">Verification & Auditing</h3>
                  <p className="text-black/70 leading-relaxed">
                    Each node in the OpenClaw registry carries a verification status. Verified nodes have passed security audits confirming that they enforce no-logging policies, use encrypted transport, and meet minimum uptime and bandwidth thresholds. The audit trail is publicly accessible through the OpenClaw registry, allowing users to independently verify node integrity before routing traffic.
                  </p>

                  <h3 className="text-lg font-semibold text-black mt-6">Global Distribution</h3>
                  <p className="text-black/70 leading-relaxed">
                    Relay nodes are deployed across multiple geographic regions to minimize latency and maximize availability. Current network coverage includes nodes in North America (US East, US West), Europe (Netherlands, Germany, UK), and Asia-Pacific (Singapore, Tokyo, Sydney). Auto-assignment selects the lowest-latency node for the user's geographic location.
                  </p>

                  <h3 className="text-lg font-semibold text-black mt-6">Node Metrics</h3>
                  <div className="rounded-xl border border-black/[0.08] overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-black/[0.03] border-b border-black/[0.06]">
                          <th className="text-left px-4 py-3 font-medium text-black/60">Metric</th>
                          <th className="text-left px-4 py-3 font-medium text-black/60">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/[0.04]">
                        {[
                          ['Latency', 'Round-trip time in milliseconds from user to relay node'],
                          ['Bandwidth', 'Maximum throughput capacity in Mbps'],
                          ['Uptime', 'Percentage availability over the trailing 30-day window'],
                          ['Active Sessions', 'Current number of concurrent sessions routed through the node'],
                          ['Stake', 'Amount of collateral staked by the node operator'],
                          ['Verification', 'OpenClaw audit status (Verified / Unverified)'],
                        ].map(([metric, desc]) => (
                          <tr key={metric}>
                            <td className="px-4 py-2.5 text-black/70 font-medium whitespace-nowrap">{metric}</td>
                            <td className="px-4 py-2.5 text-black/55">{desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section id="privacy-security">
                <div className="mb-8">
                  <p className="text-xs font-medium text-black/40 uppercase tracking-wider mb-2">Trust Model</p>
                  <h2 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight mb-4">Privacy & Security</h2>
                  <div className="h-px bg-black/[0.08]" />
                </div>

                <div className="space-y-6">
                  <p className="text-black/70 leading-relaxed">
                    RelayForge is designed with a minimal-trust architecture. The system assumes that servers may be compromised and therefore ensures that no sensitive user data is ever available server-side. Privacy is enforced through cryptographic guarantees, not policy promises.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        title: 'No-Logs Policy',
                        desc: 'The RelayForge server does not log IP addresses, browsing activity, or session content. The only stored data is public wallet addresses and session metadata (target URL, timestamps, status).',
                      },
                      {
                        title: 'End-to-End Encryption',
                        desc: 'All communication between the user\'s browser and relay nodes uses encrypted transport. Session content is never readable by intermediate infrastructure.',
                      },
                      {
                        title: 'In-Browser Cryptography',
                        desc: 'All wallet key generation uses the Web Crypto API (crypto.getRandomValues). Private keys exist only in the browser\'s runtime memory and are discarded when the page is closed.',
                      },
                      {
                        title: 'ZK-Proof Readiness',
                        desc: 'The architecture is designed to support zero-knowledge proof-based identity verification, enabling users to prove eligibility for services without disclosing personal information.',
                      },
                      {
                        title: 'Session Isolation',
                        desc: 'Each stealth session is a sandboxed environment. No cookies, storage, or fingerprint data persists between sessions or leaks to the main browser profile.',
                      },
                      {
                        title: 'Open Audit Trail',
                        desc: 'All relay nodes are registered in the OpenClaw protocol with publicly verifiable audit records. Users can independently validate node security before routing traffic.',
                      },
                    ].map(({ title, desc }) => (
                      <div
                        key={title}
                        className="rounded-xl border border-black/[0.08] bg-white/60 p-4"
                      >
                        <h4 className="text-sm font-medium text-black mb-1.5">{title}</h4>
                        <p className="text-xs text-black/55 leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="getting-started">
                <div className="mb-8">
                  <p className="text-xs font-medium text-black/40 uppercase tracking-wider mb-2">Quick Start</p>
                  <h2 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight mb-4">Getting Started</h2>
                  <div className="h-px bg-black/[0.08]" />
                </div>

                <div className="space-y-8">
                  <p className="text-black/70 leading-relaxed">
                    RelayForge requires no account creation, email verification, or personal information to use. Open the application and begin immediately.
                  </p>

                  {[
                    {
                      step: 1,
                      title: 'Launch a Stealth Session',
                      instructions: [
                        'Navigate to the Launch page from the dashboard or bottom navigation.',
                        'Enter the URL of any decentralized application, or use the built-in search to discover dApps by name.',
                        'Configure privacy settings: toggle fingerprint randomization and IP cloaking on or off.',
                        'Select a relay node from the list or leave it on "Auto" for automatic assignment.',
                        'Click "Launch Session" to open the target dApp in a managed stealth environment.',
                      ],
                    },
                    {
                      step: 2,
                      title: 'Create an Anonymous Wallet',
                      instructions: [
                        'Navigate to the Wallet page.',
                        'Click "Create Solana Wallet" to generate a new Ed25519 keypair in your browser.',
                        'Copy and securely store your private key. It is displayed only once and cannot be recovered.',
                        'To use the wallet externally, open Phantom and select "Import Private Key", then paste the Base58-encoded key.',
                        'The wallet address (public key) is stored server-side for display purposes only. The private key never leaves your browser.',
                      ],
                    },
                    {
                      step: 3,
                      title: 'Browse the Relayer Network',
                      instructions: [
                        'Navigate to the Relayers page.',
                        'Browse available OpenClaw-registered relay nodes with real-time metrics.',
                        'Check each node\'s verification status, latency, uptime, and geographic region.',
                        'Verified nodes have passed OpenClaw security audits and enforce no-logging policies.',
                      ],
                    },
                  ].map(({ step, title, instructions }) => (
                    <div key={step} className="flex gap-4">
                      <div className="shrink-0">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-sm font-semibold">
                          {step}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-black mb-3">{title}</h3>
                        <ol className="space-y-2">
                          {instructions.map((inst, i) => (
                            <li key={i} className="flex gap-2 text-sm text-black/65 leading-relaxed">
                              <span className="text-black/35 shrink-0">{i + 1}.</span>
                              <span>{inst}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="api-reference">
                <div className="mb-8">
                  <p className="text-xs font-medium text-black/40 uppercase tracking-wider mb-2">Developer Reference</p>
                  <h2 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight mb-4">API Reference</h2>
                  <div className="h-px bg-black/[0.08]" />
                </div>

                <div className="space-y-6">
                  <p className="text-black/70 leading-relaxed">
                    RelayForge exposes a RESTful API for wallet management and stealth session operations. All endpoints accept and return JSON. Session identification uses a UUID-v4 browser session ID stored in <code className="px-1.5 py-0.5 bg-black/[0.04] rounded text-sm font-mono">localStorage</code>.
                  </p>

                  <h3 className="text-xl font-semibold text-black mt-8 mb-4">Wallet Endpoints</h3>

                  <div className="space-y-4">
                    <EndpointBlock
                      method="POST"
                      path="/api/wallet"
                      description="Create a new wallet record. Stores only the public key. Returns 409 if a wallet already exists for the given session."
                      body={`{
  "sessionId": "uuid-v4-browser-session-id",
  "publicKey": "Base58-encoded-solana-public-key"
}`}
                      response={`{
  "wallet": {
    "id": 1,
    "public_key": "GHmG...a66v",
    "created_at": "2026-03-16T09:00:00.000Z"
  }
}`}
                    />

                    <EndpointBlock
                      method="GET"
                      path="/api/wallet/:sessionId"
                      description="Retrieve the wallet record for a browser session. Returns null if no wallet exists."
                      response={`{
  "wallet": {
    "id": 1,
    "public_key": "GHmG...a66v",
    "created_at": "2026-03-16T09:00:00.000Z"
  }
}`}
                    />

                    <EndpointBlock
                      method="DELETE"
                      path="/api/wallet/:sessionId"
                      description="Delete the wallet record for a browser session. This removes only the server-side public key record."
                      response={`{
  "success": true
}`}
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-black mt-10 mb-4">Session Endpoints</h3>

                  <div className="space-y-4">
                    <EndpointBlock
                      method="POST"
                      path="/api/sessions"
                      description="Create a new stealth browsing session. The server generates a UUID for the session and stores the configuration."
                      body={`{
  "browserSessionId": "uuid-v4-browser-session-id",
  "targetUrl": "https://app.example.com",
  "targetTitle": "Example dApp",
  "fingerprintRandomization": true,
  "ipCloaking": true,
  "relayer": "auto"
}`}
                      response={`{
  "session": {
    "id": "uuid-v4-session-id",
    "browser_session_id": "...",
    "target_url": "https://app.example.com",
    "target_title": "Example dApp",
    "status": "active",
    "fingerprint_randomization": true,
    "ip_cloaking": true,
    "relayer": "auto",
    "started_at": "2026-03-16T09:00:00.000Z",
    "ended_at": null
  }
}`}
                    />

                    <EndpointBlock
                      method="GET"
                      path="/api/sessions?browserSessionId=:id"
                      description="List all stealth sessions for a browser session, ordered by most recent first."
                      response={`{
  "sessions": [
    {
      "id": "...",
      "target_url": "https://app.example.com",
      "status": "active",
      "started_at": "2026-03-16T09:00:00.000Z",
      ...
    }
  ]
}`}
                    />

                    <EndpointBlock
                      method="GET"
                      path="/api/sessions/:id"
                      description="Retrieve a single stealth session by its UUID. Returns 404 if the session does not exist."
                      response={`{
  "session": {
    "id": "uuid-v4-session-id",
    "target_url": "https://app.example.com",
    "status": "active",
    ...
  }
}`}
                    />

                    <EndpointBlock
                      method="PATCH"
                      path="/api/sessions/:id"
                      description="Update a session's status. Valid status values are 'active', 'ended', and 'error'. Setting status to 'ended' or 'error' also records the ended_at timestamp."
                      body={`{
  "status": "ended"
}`}
                      response={`{
  "session": {
    "id": "uuid-v4-session-id",
    "status": "ended",
    "ended_at": "2026-03-16T10:30:00.000Z",
    ...
  }
}`}
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-black mt-10 mb-4">Search Endpoint</h3>

                  <div className="space-y-4">
                    <EndpointBlock
                      method="GET"
                      path="/api/search?q=:query"
                      description="Search for decentralized applications by name or keyword. Results are returned from a server-side search API. Requires a valid search query parameter."
                      response={`{
  "results": [
    {
      "title": "Example dApp",
      "url": "https://app.example.com",
      "description": "A decentralized application..."
    }
  ]
}`}
                    />
                  </div>
                </div>
              </section>

              <div className="pt-8 border-t border-black/[0.08]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-sm text-black/40">
                    RelayForge Documentation — Last updated March 2026
                  </p>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/"
                      className="text-sm text-black/50 hover:text-black transition-colors"
                    >
                      Home
                    </Link>
                    <span className="text-black/20">|</span>
                    <Link
                      to="/app"
                      className="text-sm text-black/50 hover:text-black transition-colors"
                    >
                      Launch App
                    </Link>
                    <span className="text-black/20">|</span>
                    <a
                      href="https://x.com/RelayForge_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-black/50 hover:text-black transition-colors"
                    >
                      X / Twitter
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
