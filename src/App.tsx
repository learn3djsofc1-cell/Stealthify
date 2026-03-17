import { Routes, Route, Navigate } from 'react-router-dom';
import Hero from './components/Hero';
import PrecisionSection from './components/PrecisionSection';
import CytopathologySection from './components/CytopathologySection';
import ComparisonSection from './components/ComparisonSection';
import InfrastructureSection from './components/InfrastructureSection';
import CaseStudySection from './components/CaseStudySection';
import UseCasesSection from './components/UseCasesSection';
import HowItWorksSection from './components/HowItWorksSection';
import FAQSection from './components/FAQSection';
import SupportedChainsSection from './components/SupportedChainsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import Documentation from './pages/Documentation';
import AppLayout from './app/AppLayout';
import Dashboard from './app/pages/Dashboard';
import LaunchSession from './app/pages/LaunchSession';
import Wallet from './app/pages/Wallet';
import Relayers from './app/pages/Relayers';
import Sessions from './app/pages/Sessions';
import ActiveSession from './app/pages/ActiveSession';
import Settings from './app/pages/Settings';

function LandingPage() {
  return (
    <div id="top" className="min-h-screen relative bg-[#050505]">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_60%_at_50%_0%,rgba(248,23,25,0.07),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_50%,rgba(248,23,25,0.04),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_80%,rgba(248,23,25,0.05),transparent_60%)]" />
      </div>
      <div className="relative z-10">
        <Hero />
        <PrecisionSection />
        <CytopathologySection />
        <UseCasesSection />
        <SupportedChainsSection />
        <HowItWorksSection />
        <InfrastructureSection />
        <ComparisonSection />
        <CaseStudySection />
        <FAQSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/docs" element={<Documentation />} />
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="launch" element={<LaunchSession />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="relayers" element={<Relayers />} />
        <Route path="sessions" element={<Sessions />} />
        <Route path="session/:id" element={<ActiveSession />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/app" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
