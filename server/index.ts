import express from 'express';
import cors from 'cors';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS wallets (
      id SERIAL PRIMARY KEY,
      session_id VARCHAR(64) UNIQUE NOT NULL,
      public_key VARCHAR(64) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS stealth_sessions (
      id VARCHAR(36) PRIMARY KEY,
      browser_session_id VARCHAR(64) NOT NULL,
      target_url TEXT NOT NULL,
      target_title TEXT,
      status VARCHAR(16) NOT NULL DEFAULT 'active',
      fingerprint_randomization BOOLEAN NOT NULL DEFAULT true,
      ip_cloaking BOOLEAN NOT NULL DEFAULT true,
      relayer VARCHAR(64) DEFAULT 'auto',
      started_at TIMESTAMP DEFAULT NOW(),
      ended_at TIMESTAMP
    )
  `);
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SOLANA_PUBKEY_REGEX = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

app.post('/api/wallet', async (req, res) => {
  const { sessionId, publicKey } = req.body;
  if (!sessionId || !publicKey) {
    return res.status(400).json({ error: 'sessionId and publicKey are required' });
  }
  if (!UUID_REGEX.test(sessionId)) {
    return res.status(400).json({ error: 'Invalid session ID format' });
  }
  if (!SOLANA_PUBKEY_REGEX.test(publicKey)) {
    return res.status(400).json({ error: 'Invalid Solana public key format' });
  }
  try {
    const existing = await pool.query('SELECT * FROM wallets WHERE session_id = $1', [sessionId]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Wallet already exists for this session' });
    }
    const result = await pool.query(
      'INSERT INTO wallets (session_id, public_key) VALUES ($1, $2) RETURNING id, public_key, created_at',
      [sessionId, publicKey]
    );
    res.json({ wallet: result.rows[0] });
  } catch (err: any) {
    console.error('Error creating wallet:', err);
    res.status(500).json({ error: 'Failed to create wallet' });
  }
});

app.get('/api/wallet/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  try {
    const result = await pool.query('SELECT id, public_key, created_at FROM wallets WHERE session_id = $1', [sessionId]);
    if (result.rows.length === 0) {
      return res.json({ wallet: null });
    }
    res.json({ wallet: result.rows[0] });
  } catch (err: any) {
    console.error('Error fetching wallet:', err);
    res.status(500).json({ error: 'Failed to fetch wallet' });
  }
});

app.delete('/api/wallet/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  try {
    await pool.query('DELETE FROM wallets WHERE session_id = $1', [sessionId]);
    res.json({ success: true });
  } catch (err: any) {
    console.error('Error deleting wallet:', err);
    res.status(500).json({ error: 'Failed to delete wallet' });
  }
});

app.post('/api/sessions', async (req, res) => {
  const { browserSessionId, targetUrl, targetTitle, fingerprintRandomization, ipCloaking, relayer } = req.body;
  if (!browserSessionId || !targetUrl) {
    return res.status(400).json({ error: 'browserSessionId and targetUrl are required' });
  }
  if (!UUID_REGEX.test(browserSessionId)) {
    return res.status(400).json({ error: 'Invalid browser session ID format' });
  }
  try {
    new URL(targetUrl);
  } catch {
    return res.status(400).json({ error: 'Invalid target URL' });
  }
  const id = crypto.randomUUID();
  try {
    const result = await pool.query(
      `INSERT INTO stealth_sessions (id, browser_session_id, target_url, target_title, fingerprint_randomization, ip_cloaking, relayer)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [id, browserSessionId, targetUrl, targetTitle || null, fingerprintRandomization !== false, ipCloaking !== false, relayer || 'auto']
    );
    res.json({ session: result.rows[0] });
  } catch (err: any) {
    console.error('Error creating session:', err);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

app.get('/api/sessions', async (req, res) => {
  const { browserSessionId } = req.query;
  if (!browserSessionId || typeof browserSessionId !== 'string') {
    return res.status(400).json({ error: 'browserSessionId query parameter is required' });
  }
  try {
    const result = await pool.query(
      'SELECT * FROM stealth_sessions WHERE browser_session_id = $1 ORDER BY started_at DESC',
      [browserSessionId]
    );
    res.json({ sessions: result.rows });
  } catch (err: any) {
    console.error('Error fetching sessions:', err);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

app.get('/api/sessions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM stealth_sessions WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json({ session: result.rows[0] });
  } catch (err: any) {
    console.error('Error fetching session:', err);
    res.status(500).json({ error: 'Failed to fetch session' });
  }
});

app.patch('/api/sessions/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status || !['active', 'ended', 'error'].includes(status)) {
    return res.status(400).json({ error: 'Valid status is required (active, ended, error)' });
  }
  try {
    const endedAt = status === 'ended' || status === 'error' ? 'NOW()' : 'NULL';
    const result = await pool.query(
      `UPDATE stealth_sessions SET status = $1, ended_at = ${endedAt} WHERE id = $2 RETURNING *`,
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json({ session: result.rows[0] });
  } catch (err: any) {
    console.error('Error updating session:', err);
    res.status(500).json({ error: 'Failed to update session' });
  }
});

const BLOCKED_HOSTNAMES = new Set([
  'localhost', '127.0.0.1', '0.0.0.0', '[::1]', '169.254.169.254',
  'metadata.google.internal', 'metadata.google', 'metadata',
]);

function isPrivateIP(hostname: string): boolean {
  if (BLOCKED_HOSTNAMES.has(hostname.toLowerCase())) return true;
  const parts = hostname.split('.').map(Number);
  if (parts.length === 4 && parts.every(p => !isNaN(p))) {
    if (parts[0] === 10) return true;
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
    if (parts[0] === 192 && parts[1] === 168) return true;
    if (parts[0] === 127) return true;
    if (parts[0] === 169 && parts[1] === 254) return true;
    if (parts[0] === 0) return true;
  }
  if (hostname.startsWith('[')) return true;
  return false;
}

const proxyRateLimit = new Map<string, { count: number; reset: number }>();

app.get('/api/proxy', async (req, res) => {
  const clientIp = req.ip || 'unknown';
  const now = Date.now();
  const rateEntry = proxyRateLimit.get(clientIp);
  if (rateEntry && rateEntry.reset > now) {
    if (rateEntry.count >= 30) {
      return res.status(429).json({ error: 'Too many proxy requests. Try again later.' });
    }
    rateEntry.count++;
  } else {
    proxyRateLimit.set(clientIp, { count: 1, reset: now + 60000 });
  }

  const { url } = req.query;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL parameter is required' });
  }
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('Invalid protocol');
    }
  } catch {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  if (isPrivateIP(parsedUrl.hostname)) {
    return res.status(403).json({ error: 'Access to internal resources is not allowed' });
  }
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'identity',
      },
      redirect: 'follow',
    });
    const finalUrl = new URL(response.url);
    if (isPrivateIP(finalUrl.hostname)) {
      return res.status(403).json({ error: 'Redirect to internal resource is not allowed' });
    }
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      let html = await response.text();
      const origin = parsedUrl.origin;
      const baseTag = `<base href="${origin}/" target="_self">`;
      if (html.includes('<head>')) {
        html = html.replace('<head>', `<head>${baseTag}`);
      } else if (html.includes('<HEAD>')) {
        html = html.replace('<HEAD>', `<HEAD>${baseTag}`);
      } else if (html.includes('<html')) {
        html = html.replace(/(<html[^>]*>)/i, `$1<head>${baseTag}</head>`);
      } else {
        html = baseTag + html;
      }
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.removeHeader('X-Frame-Options');
      res.removeHeader('Content-Security-Policy');
      res.send(html);
    } else {
      const buffer = Buffer.from(await response.arrayBuffer());
      if (contentType) res.setHeader('Content-Type', contentType);
      const cacheControl = response.headers.get('cache-control');
      if (cacheControl) res.setHeader('Cache-Control', cacheControl);
      res.send(buffer);
    }
  } catch (err: any) {
    console.error('Proxy error:', err.message);
    res.status(502).json({ error: 'Failed to load the target URL' });
  }
});

app.get('/api/embed-check', async (req, res) => {
  const { url } = req.query;
  console.log('[embed-check] Request for:', url);
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ embeddable: 'unknown' });
  }
  try {
    const parsedUrl = new URL(url);
    if (!['http:', 'https:'].includes(parsedUrl.protocol) || isPrivateIP(parsedUrl.hostname)) {
      console.log('[embed-check] Blocked private URL');
      return res.json({ embeddable: 'false' });
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      redirect: 'follow',
      signal: controller.signal,
    });
    clearTimeout(timeout);
    const xfo = response.headers.get('x-frame-options');
    const csp = response.headers.get('content-security-policy');
    const embeddable = !xfo && (!csp || !csp.includes('frame-ancestors'));
    console.log('[embed-check] Result:', embeddable ? 'true' : 'false', 'xfo:', xfo, 'csp:', !!csp);
    res.json({ embeddable: embeddable ? 'true' : 'false' });
  } catch (err: any) {
    console.log('[embed-check] Error:', err.message);
    res.json({ embeddable: 'unknown' });
  }
});

app.get('/api/search', async (req, res) => {
  const { q } = req.query;
  if (!q || typeof q !== 'string' || q.trim().length === 0) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  const apiKey = process.env.SERP_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Search service not configured' });
  }
  try {
    const params = new URLSearchParams({
      api_key: apiKey,
      q: q.trim(),
      engine: 'google',
      num: '8',
    });
    const response = await fetch(`https://serpapi.com/search.json?${params}`);
    if (!response.ok) {
      throw new Error(`Search API returned ${response.status}`);
    }
    const data = await response.json();
    const results = (data.organic_results || []).map((r: any) => ({
      title: r.title,
      link: r.link,
      snippet: r.snippet,
      favicon: r.favicon,
      displayed_link: r.displayed_link,
    }));
    res.json({ results });
  } catch (err: any) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed' });
  }
});

async function startServer() {
  await initDb();

  const PORT = 5000;

  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, '..', 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Production server running on port ${PORT}`);
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Dev server running on port ${PORT}`);
    });
  }
}

startServer().catch(console.error);
