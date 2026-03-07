# Project Overview

A React + TypeScript + Vite landing page for a cytopathology / medical AI product. Uses Three.js (via @react-three/fiber and @react-three/drei) for 3D visualizations, Tailwind CSS v4 for styling, and Framer Motion for animations.

## Architecture

- **Frontend**: React 19, TypeScript, Vite 6
- **3D**: Three.js via @react-three/fiber + @react-three/drei
- **Styling**: Tailwind CSS v4 (via @tailwindcss/vite plugin)
- **Animation**: Framer Motion (motion)
- **Icons**: Lucide React

## Project Structure

- `src/App.tsx` - Root component, assembles all sections
- `src/components/` - Individual page sections and UI components
  - `Hero.tsx` - Hero section
  - `PrecisionSection.tsx`
  - `CytopathologySection.tsx`
  - `ComparisonSection.tsx`
  - `InfrastructureSection.tsx`
  - `CaseStudySection.tsx`
  - `CTASection.tsx`
  - `Footer.tsx`
  - `Navbar.tsx`
  - `Nucleus3D.tsx` - Three.js nucleus visualization
  - `Infrastructure3D.tsx` - Three.js infrastructure visualization
- `src/main.tsx` - Entry point
- `src/index.css` - Global styles
- `index.html` - HTML entry point
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration

## Development

- Run: `npm run dev` (starts on port 5000, host 0.0.0.0)
- Build: `npm run build`
- Lint: `npm run lint`

## Environment Variables

- `GEMINI_API_KEY` - Google Gemini AI API key (optional, injected at build time)
- `APP_URL` - The URL where the app is hosted

## Deployment

Configured as a static site deployment. Build command: `npm run build`, public dir: `dist`.
