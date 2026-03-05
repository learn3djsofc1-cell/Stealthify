/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from './components/Hero';
import PrecisionSection from './components/PrecisionSection';
import CytopathologySection from './components/CytopathologySection';
import ComparisonSection from './components/ComparisonSection';
import InfrastructureSection from './components/InfrastructureSection';
import CaseStudySection from './components/CaseStudySection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function App() {
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
