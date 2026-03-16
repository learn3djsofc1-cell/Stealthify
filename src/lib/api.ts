const API_BASE = '/api';

export interface WalletData {
  id: number;
  public_key: string;
  created_at: string;
}

export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  favicon?: string;
  displayed_link?: string;
}

export async function fetchWallet(sessionId: string): Promise<WalletData | null> {
  const res = await fetch(`${API_BASE}/wallet/${sessionId}`);
  if (!res.ok) throw new Error('Failed to fetch wallet');
  const data = await res.json();
  return data.wallet;
}

export async function createWalletRecord(sessionId: string, publicKey: string): Promise<WalletData> {
  const res = await fetch(`${API_BASE}/wallet`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, publicKey }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create wallet');
  }
  const data = await res.json();
  return data.wallet;
}

export async function deleteWalletRecord(sessionId: string): Promise<void> {
  const res = await fetch(`${API_BASE}/wallet/${sessionId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete wallet');
}

export async function searchDapps(query: string): Promise<SearchResult[]> {
  const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Search failed');
  const data = await res.json();
  return data.results;
}

export interface RelaySession {
  id: string;
  browser_session_id: string;
  target_url: string;
  target_title: string | null;
  status: 'active' | 'ended' | 'error';
  fingerprint_randomization: boolean;
  ip_cloaking: boolean;
  relayer: string;
  started_at: string;
  ended_at: string | null;
}

export async function createSession(params: {
  browserSessionId: string;
  targetUrl: string;
  targetTitle?: string;
  fingerprintRandomization: boolean;
  ipCloaking: boolean;
  relayer?: string;
}): Promise<RelaySession> {
  const res = await fetch(`${API_BASE}/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create session');
  }
  const data = await res.json();
  return data.session;
}

export async function fetchSessions(browserSessionId: string): Promise<RelaySession[]> {
  const res = await fetch(`${API_BASE}/sessions?browserSessionId=${encodeURIComponent(browserSessionId)}`);
  if (!res.ok) throw new Error('Failed to fetch sessions');
  const data = await res.json();
  return data.sessions;
}

export async function fetchSession(id: string): Promise<RelaySession> {
  const res = await fetch(`${API_BASE}/sessions/${id}`);
  if (!res.ok) throw new Error('Failed to fetch session');
  const data = await res.json();
  return data.session;
}

export async function updateSessionStatus(id: string, status: 'active' | 'ended' | 'error'): Promise<RelaySession> {
  const res = await fetch(`${API_BASE}/sessions/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update session');
  const data = await res.json();
  return data.session;
}
