import { Routes, Route, Navigate } from 'react-router-dom';
import Hero from './components/Hero';
import PrecisionSection from './components/PrecisionSection';
import CytopathologySection from './components/CytopathologySection';
import ComparisonSection from './components/ComparisonSection';
import InfrastructureSection from './components/InfrastructureSection';
import CaseStudySection from './components/CaseStudySection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import AppLayout from './app/AppLayout';
import Dashboard from './app/pages/Dashboard';
import LaunchSession from './app/pages/LaunchSession';
import Wallet from './app/pages/Wallet';
import Relayers from './app/pages/Relayers';
import Sessions from './app/pages/Sessions';
import Settings from './app/pages/Settings';

function LandingPage() {
  return (
    <div className="bg-[#050505] min-h-screen">
      <Hero />
      <PrecisionSection />
      <CytopathologySection />
      <InfrastructureSection />
      <ComparisonSection />
      <CaseStudySection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="launch" element={<LaunchSession />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="relayers" element={<Relayers />} />
        <Route path="sessions" element={<Sessions />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/app" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
