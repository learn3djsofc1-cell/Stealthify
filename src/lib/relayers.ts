export interface RelayerNode {
  id: string;
  name: string;
  region: string;
  regionCode: string;
  status: 'online' | 'degraded' | 'offline';
  verified: boolean;
  uptimePercent: number;
  latencyMs: number;
  totalSessions: number;
  activeSessions: number;
  bandwidthMbps: number;
  lastSeen: string;
  operator: string;
  version: string;
  protocols: string[];
  stake: number;
}

export const RELAYER_NODES: RelayerNode[] = [
  {
    id: 'relay-alpha-us',
    name: 'Alpha US',
    region: 'US East (Virginia)',
    regionCode: 'us-east-1',
    status: 'online',
    verified: true,
    uptimePercent: 99.97,
    latencyMs: 12,
    totalSessions: 84291,
    activeSessions: 12,
    bandwidthMbps: 940,
    lastSeen: new Date(Date.now() - 3000).toISOString(),
    operator: 'OpenClaw Foundation',
    version: 'v2.4.1',
    protocols: ['HTTPS', 'WSS', 'SOCKS5'],
    stake: 25000,
  },
  {
    id: 'relay-bravo-eu',
    name: 'Bravo EU',
    region: 'EU West (Frankfurt)',
    regionCode: 'eu-west-1',
    status: 'online',
    verified: true,
    uptimePercent: 99.91,
    latencyMs: 28,
    totalSessions: 62847,
    activeSessions: 8,
    bandwidthMbps: 850,
    lastSeen: new Date(Date.now() - 5000).toISOString(),
    operator: 'Stealth Labs AG',
    version: 'v2.4.1',
    protocols: ['HTTPS', 'WSS', 'SOCKS5'],
    stake: 18500,
  },
  {
    id: 'relay-charlie-ap',
    name: 'Charlie APAC',
    region: 'Asia Pacific (Singapore)',
    regionCode: 'ap-southeast-1',
    status: 'online',
    verified: true,
    uptimePercent: 99.84,
    latencyMs: 45,
    totalSessions: 41203,
    activeSessions: 6,
    bandwidthMbps: 780,
    lastSeen: new Date(Date.now() - 8000).toISOString(),
    operator: 'PrivacyNode Pte Ltd',
    version: 'v2.4.0',
    protocols: ['HTTPS', 'WSS'],
    stake: 15000,
  },
  {
    id: 'relay-delta-sa',
    name: 'Delta SA',
    region: 'South America (São Paulo)',
    regionCode: 'sa-east-1',
    status: 'online',
    verified: false,
    uptimePercent: 98.72,
    latencyMs: 67,
    totalSessions: 18934,
    activeSessions: 7,
    bandwidthMbps: 520,
    lastSeen: new Date(Date.now() - 12000).toISOString(),
    operator: 'Anon Relay DAO',
    version: 'v2.3.8',
    protocols: ['HTTPS', 'WSS'],
    stake: 8200,
  },
  {
    id: 'relay-echo-eu',
    name: 'Echo EU',
    region: 'EU North (Stockholm)',
    regionCode: 'eu-north-1',
    status: 'degraded',
    verified: true,
    uptimePercent: 96.43,
    latencyMs: 38,
    totalSessions: 29561,
    activeSessions: 3,
    bandwidthMbps: 620,
    lastSeen: new Date(Date.now() - 45000).toISOString(),
    operator: 'Nordic Privacy Collective',
    version: 'v2.4.1',
    protocols: ['HTTPS', 'WSS', 'SOCKS5'],
    stake: 12000,
  },
  {
    id: 'relay-foxtrot-us',
    name: 'Foxtrot US',
    region: 'US West (Oregon)',
    regionCode: 'us-west-2',
    status: 'online',
    verified: true,
    uptimePercent: 99.89,
    latencyMs: 18,
    totalSessions: 55782,
    activeSessions: 9,
    bandwidthMbps: 900,
    lastSeen: new Date(Date.now() - 4000).toISOString(),
    operator: 'OpenClaw Foundation',
    version: 'v2.4.1',
    protocols: ['HTTPS', 'WSS', 'SOCKS5'],
    stake: 22000,
  },
  {
    id: 'relay-golf-ap',
    name: 'Golf APAC',
    region: 'Asia Pacific (Tokyo)',
    regionCode: 'ap-northeast-1',
    status: 'online',
    verified: false,
    uptimePercent: 99.56,
    latencyMs: 52,
    totalSessions: 33421,
    activeSessions: 5,
    bandwidthMbps: 710,
    lastSeen: new Date(Date.now() - 7000).toISOString(),
    operator: 'ZK Relay Inc.',
    version: 'v2.4.0',
    protocols: ['HTTPS', 'WSS'],
    stake: 11000,
  },
  {
    id: 'relay-hotel-af',
    name: 'Hotel AF',
    region: 'Africa (Cape Town)',
    regionCode: 'af-south-1',
    status: 'offline',
    verified: false,
    uptimePercent: 82.15,
    latencyMs: 120,
    totalSessions: 4821,
    activeSessions: 0,
    bandwidthMbps: 280,
    lastSeen: new Date(Date.now() - 3600000).toISOString(),
    operator: 'Community Node ZA',
    version: 'v2.3.5',
    protocols: ['HTTPS'],
    stake: 3500,
  },
];

export function getOnlineRelayers(): RelayerNode[] {
  return RELAYER_NODES.filter(r => r.status === 'online');
}

export function getActiveRelayers(): RelayerNode[] {
  return RELAYER_NODES.filter(r => r.status !== 'offline');
}

export function getBestRelayer(): RelayerNode {
  const online = getOnlineRelayers();
  return online.sort((a, b) => a.latencyMs - b.latencyMs)[0] || RELAYER_NODES[0];
}

export function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

export function getStatusVariant(status: RelayerNode['status']): 'active' | 'warning' | 'inactive' {
  if (status === 'online') return 'active';
  if (status === 'degraded') return 'warning';
  return 'inactive';
}

export function getStatusLabel(status: RelayerNode['status']): string {
  if (status === 'online') return 'Online';
  if (status === 'degraded') return 'Degraded';
  return 'Offline';
}
