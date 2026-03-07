# Project Overview

Stealthify — A privacy-native Web3 access layer. Landing page + web application for launching stealth browsing sessions, managing anonymous wallets, and connecting to OpenClaw relayer nodes.

## Architecture

- **Frontend**: React 19, TypeScript, Vite 6
- **Routing**: React Router DOM v7 (client-side SPA)
- **3D**: Three.js via @react-three/fiber + @react-three/drei (landing page only)
- **Styling**: Tailwind CSS v4 (via @tailwindcss/vite plugin), tailwind-merge
- **Animation**: Framer Motion (motion)
- **Icons**: Lucide React

## Project Structure

### Landing Page (`/`)
- `src/App.tsx` - Root component with route definitions
- `src/main.tsx` - Entry point with BrowserRouter
- `src/components/` - Landing page sections
  - `Hero.tsx`, `Navbar.tsx`, `Footer.tsx`
  - `PrecisionSection.tsx`, `CytopathologySection.tsx`
  - `ComparisonSection.tsx`, `InfrastructureSection.tsx`
  - `CaseStudySection.tsx`, `CTASection.tsx`
  - `Nucleus3D.tsx`, `Infrastructure3D.tsx` - Three.js visualizations

### Web App (`/app`)
- `src/app/AppLayout.tsx` - Layout shell with sidebar + top bar
- `src/app/Sidebar.tsx` - Navigation sidebar (collapsible desktop, drawer mobile)
- `src/app/TopBar.tsx` - Top header bar with status indicators
- `src/app/pages/` - App pages:
  - `Dashboard.tsx` (`/app`) - Overview with stats, quick actions, network status
  - `LaunchSession.tsx` (`/app/launch`) - Launch stealth browsing sessions
  - `Wallet.tsx` (`/app/wallet`) - Anonymous wallet management
  - `Relayers.tsx` (`/app/relayers`) - OpenClaw relayer node discovery
  - `Sessions.tsx` (`/app/sessions`) - Session history
  - `Settings.tsx` (`/app/settings`) - App preferences and privacy settings
- `src/app/components/` - Reusable UI components:
  - `Card.tsx`, `Button.tsx`, `Badge.tsx`, `EmptyState.tsx`
  - `Toggle.tsx`, `Input.tsx`, `StatCard.tsx`

### Assets
- `src/assets/logo.png` - Stealthify logo (imported in components)
- `public/favicon.png` - Favicon

## Development

- Run: `npm run dev` (starts on port 5000, host 0.0.0.0)
- Build: `npm run build`
- Lint: `npm run lint`

## Environment Variables

- `GEMINI_API_KEY` - Google Gemini AI API key (optional, injected at build time)
- `APP_URL` - The URL where the app is hosted

## Deployment

Configured as a static site deployment. Build command: `npm run build`, public dir: `dist`.
