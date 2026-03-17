import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

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

const FAQItem = ({ question, answer, isOpen, onToggle, index }: { question: string; answer: string; isOpen: boolean; onToggle: () => void; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-white/[0.05] last:border-0"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 sm:py-7 text-left group"
      >
        <span className="text-base sm:text-lg font-medium text-white/80 group-hover:text-white transition-colors pr-8 leading-snug">{question}</span>
        <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'border-[#F81719]/30 bg-[#F81719]/10' : 'border-white/10 bg-white/[0.03]'}`}>
          {isOpen ? (
            <Minus className="w-3.5 h-3.5 text-[#F81719]" />
          ) : (
            <Plus className="w-3.5 h-3.5 text-white/40" />
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-white/40 font-light leading-relaxed pb-7 text-sm sm:text-base pr-12">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="w-full py-32 sm:py-40 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
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
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]"
            >
              Frequently
              <br />
              Asked
              <br />
              Questions
            </motion.h2>
          </div>

          <div>
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                index={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
