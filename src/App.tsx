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
    <div className="bg-black min-h-screen">
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
