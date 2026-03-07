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
