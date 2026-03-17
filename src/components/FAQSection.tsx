import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What is Veilary?',
    answer: 'Veilary is a complete privacy ecosystem for Web3 that enables anonymous interaction with decentralized applications through stealth browsing sessions, anonymous Solana wallet generation, and zero-knowledge technology. It operates through the OpenClaw relayer network for verified, decentralized traffic routing.',
  },
  {
    question: 'How does Veilary protect my privacy?',
    answer: 'Veilary uses fingerprint randomization to prevent browser tracking, IP cloaking through relay nodes, session isolation to prevent cross-contamination, and zero-knowledge proofs for verifiable anonymity. All wallet keys are generated client-side and never stored on servers.',
  },
  {
    question: 'What blockchains does Veilary support?',
    answer: 'Veilary supports 15+ blockchains including Solana, Ethereum, Bitcoin, Polygon, Arbitrum, and more. Cross-chain privacy transfers are facilitated through our zero-knowledge bridge technology, ensuring your transaction graph remains unlinkable across chains.',
  },
  {
    question: 'Is Veilary free to use?',
    answer: 'Veilary offers free access to core privacy features including stealth browsing and anonymous wallet generation. Advanced features like cross-chain bridges may have minimal network fees to cover relay node operational costs.',
  },
  {
    question: 'Can I import my Veilary wallet into Phantom?',
    answer: 'Yes. Veilary generates standard Solana keypairs using Ed25519 cryptography. The private key is output in the exact Base58 format that Phantom wallet accepts for import. Simply copy the private key and use Phantom\'s "Import Private Key" feature.',
  },
  {
    question: 'Does Veilary store my private keys?',
    answer: 'No. Private keys are generated entirely in your browser using cryptographically secure random number generation. They are displayed once during wallet creation and never transmitted to or stored on any server. Only the public key (wallet address) is stored for display purposes.',
  },
  {
    question: 'What is the OpenClaw relayer network?',
    answer: 'OpenClaw is a decentralized protocol that provides a registry of audited relayer nodes. These nodes route your traffic to mask your IP address. Each node is independently operated, cryptographically verified, and subject to ongoing audits for uptime, performance, and security compliance.',
  },
  {
    question: 'How is Veilary different from a VPN?',
    answer: 'Unlike VPNs which only mask your IP, Veilary operates at the application layer with purpose-built privacy for Web3 workflows. It randomizes browser fingerprints, isolates each session cryptographically, generates anonymous wallets, and provides zero-knowledge proofs. These are capabilities no VPN offers.',
  },
];

const FAQItem = ({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) => {
  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-lg font-medium text-white group-hover:text-[#F81719] transition-colors pr-8">{question}</span>
        <ChevronDown className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#F81719]' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-white/50 font-light leading-relaxed pb-6">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full py-32 px-6 bg-black relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#F81719] font-medium tracking-widest text-xs uppercase mb-4 block"
          >
            FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/[0.03] border border-white/[0.06] rounded-[2rem] px-8 md:px-10"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
