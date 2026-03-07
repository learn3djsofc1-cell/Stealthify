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
