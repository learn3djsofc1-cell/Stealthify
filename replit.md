# Project Overview

Stealthify — A privacy-native Web3 access layer. Landing page + web application for launching stealth browsing sessions, managing anonymous Solana wallets, and connecting to OpenClaw relayer nodes.

## Architecture

- **Frontend**: React 19, TypeScript, Vite 6
- **Backend**: Express.js server (serves Vite in dev, static files in prod)
- **Database**: PostgreSQL (Replit built-in)
- **Blockchain**: Solana via @solana/web3.js (client-side keypair generation)
- **Routing**: React Router DOM v7 (client-side SPA)
- **3D**: Three.js via @react-three/fiber + @react-three/drei (landing page only)
- **Styling**: Tailwind CSS v4 (via @tailwindcss/vite plugin), tailwind-merge
- **Animation**: Framer Motion (motion)
- **Icons**: Lucide React

## Project Structure

### Server (`server/`)
- `server/index.ts` - Express server with Vite middleware (dev) or static serving (prod)
  - `POST /api/wallet` - Create wallet record (stores public key only)
  - `GET /api/wallet/:sessionId` - Fetch wallet by session ID
  - `DELETE /api/wallet/:sessionId` - Delete wallet record
  - `GET /api/search?q=` - Search dApps/protocols via server-side search API
  - `POST /api/sessions` - Create stealth browsing session
  - `GET /api/sessions?browserSessionId=` - List sessions for browser session
  - `GET /api/sessions/:id` - Fetch single session by ID
  - `PATCH /api/sessions/:id` - Update session status (active/ended/error)

### Landing Page (`/`)
- `src/App.tsx` - Root component with route definitions
- `src/main.tsx` - Entry point with BrowserRouter + Buffer polyfill
- `src/components/` - Landing page sections
  - `Hero.tsx`, `Navbar.tsx`, `Footer.tsx`
  - `PrecisionSection.tsx`, `CytopathologySection.tsx`
  - `ComparisonSection.tsx`, `InfrastructureSection.tsx`
  - `CaseStudySection.tsx`, `CTASection.tsx`
  - `Nucleus3D.tsx`, `Infrastructure3D.tsx` - Three.js visualizations

### Web App (`/app`)
- `src/app/AppLayout.tsx` - Layout shell with top bar + bottom nav
- `src/app/BottomNav.tsx` - Bottom navigation bar (both mobile and desktop)
- `src/app/TopBar.tsx` - Top header bar with status indicators
- `src/app/pages/` - App pages:
  - `Dashboard.tsx` (`/app`) - Overview with live stats, quick actions, recent activity, network status
  - `LaunchSession.tsx` (`/app/launch`) - Search/paste dApp URL, configure privacy, launch session
  - `ActiveSession.tsx` (`/app/session/:id`) - Session control panel (opens target in managed popup window)
  - `Wallet.tsx` (`/app/wallet`) - Solana wallet creation and management
  - `Relayers.tsx` (`/app/relayers`) - OpenClaw relayer node discovery
  - `Sessions.tsx` (`/app/sessions`) - Session history with active/past sections
  - `Settings.tsx` (`/app/settings`) - App preferences and privacy settings
- `src/app/components/` - Reusable UI components:
  - `Card.tsx`, `Button.tsx`, `Badge.tsx`, `EmptyState.tsx`
  - `Toggle.tsx`, `Input.tsx`, `StatCard.tsx`

### Shared Libraries (`src/lib/`)
- `src/lib/solana.ts` - Solana keypair generation (client-side only)
- `src/lib/api.ts` - API client for wallet CRUD + session CRUD + search
- `src/lib/session.ts` - Browser session ID management (localStorage)

### Assets
- `src/assets/logo.png` - Stealthify logo (imported in components)
- `public/favicon.png` - Favicon

## Database Schema

### wallets
- `id` SERIAL PRIMARY KEY
- `session_id` VARCHAR(64) UNIQUE NOT NULL — browser session identifier
- `public_key` VARCHAR(64) NOT NULL — Solana public key
- `created_at` TIMESTAMP DEFAULT NOW()

Note: Private keys are generated client-side and never stored server-side.

### stealth_sessions
- `id` VARCHAR(36) PRIMARY KEY — UUID generated server-side
- `browser_session_id` VARCHAR(64) NOT NULL — links to browser session
- `target_url` TEXT NOT NULL — target dApp URL
- `target_title` TEXT — display title for the target
- `status` VARCHAR(16) NOT NULL DEFAULT 'active' — active/ended/error
- `fingerprint_randomization` BOOLEAN NOT NULL DEFAULT true
- `ip_cloaking` BOOLEAN NOT NULL DEFAULT true
- `relayer` VARCHAR(64) DEFAULT 'auto'
- `started_at` TIMESTAMP DEFAULT NOW()
- `ended_at` TIMESTAMP — set when session is ended

## Development

- Run: `npm run dev` (starts Express + Vite on port 5000)
- Build: `npm run build` (Vite build to `dist/`)
- Lint: `npm run lint`

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string (auto-set by Replit)
- `SERP_API_KEY` - Search API key for dApp discovery (server-side only, never exposed to client)
- `GEMINI_API_KEY` - Google Gemini AI API key (optional, injected at build time)

## Deployment

Backend server deployment. Build command: `npm run build`, run command: `npm run start`.
