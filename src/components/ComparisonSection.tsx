import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { ChevronLeft, ChevronRight, Shield, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

const ComparisonVisuals = memo(({ mode }: { mode: 'public' | 'private' }) => {
  const isPrivate = mode === 'private';

  const seededRandom = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const nodes = Array.from({ length: 8 }).map((_, i) => {
    const x = 12 + seededRandom(i * 13) * 76;
    const y = 15 + seededRandom(i * 29) * 70;
    return { id: i, x, y };
  });

  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      <rect width="100" height="100" fill={isPrivate ? '#050505' : '#0a0000'} />

      <defs>
        <filter id={`glow-${mode}`}>
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {nodes.map((node, i) => {
        if (i === nodes.length - 1) return null;
        const next = nodes[i + 1];
        return (
          <line
            key={`line-${i}`}
            x1={node.x} y1={node.y} x2={next.x} y2={next.y}
            stroke={isPrivate ? '#ffffff' : '#F81719'}
            strokeWidth={isPrivate ? 0.15 : 0.4}
            strokeDasharray={isPrivate ? '1.5 2' : 'none'}
            opacity={isPrivate ? 0.15 : 0.35}
          />
        );
      })}

      {nodes.map((node, i) => (
        <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
          <circle r={isPrivate ? 2.5 : 3} fill="none" stroke={isPrivate ? '#10b981' : '#F81719'} strokeWidth={0.4} opacity={0.6} />
          <circle r={1} fill={isPrivate ? '#10b981' : '#F81719'} opacity={0.5} />
          <g transform="translate(5, -2)">
            <rect x="-1" y="-3" width="22" height="7" rx="1" fill={isPrivate ? '#0a0a0a' : '#1a0000'} stroke={isPrivate ? '#333' : '#F81719'} strokeWidth="0.15" opacity={0.9} />
            <text x="1" y="-0.5" fontSize="1.8" fill={isPrivate ? '#888' : '#F81719'} fontFamily="monospace">
              {isPrivate ? 'ZK-PROOF: 0x9a...' : `IP: 192.168.1.${10 + i}`}
            </text>
            <text x="1" y="2.5" fontSize="1.8" fill={isPrivate ? '#555' : '#F81719'} fontFamily="monospace">
              {isPrivate ? 'IDENTITY: HIDDEN' : `USER: ID-${5000 + i}`}
            </text>
          </g>
        </g>
      ))}

      <g transform="translate(50, 50)">
        <circle r="12" fill={isPrivate ? '#10b981' : '#F81719'} fillOpacity={0.05} filter={`url(#glow-${mode})`} />
        {isPrivate ? (
          <>
            <path d="M -3 0 L -0.5 2.5 L 4 -2.5" stroke="#10b981" strokeWidth="1.2" fill="none" />
            <text x="0" y="7" fontSize="2.5" fill="#10b981" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">VERIFIED</text>
          </>
        ) : (
          <>
            <text x="0" y="2" fontSize="7" fill="#F81719" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">!</text>
            <text x="0" y="7" fontSize="2.5" fill="#F81719" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">EXPOSED</text>
          </>
        )}
      </g>
    </svg>
  );
});

const ComparisonSection = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setSliderPosition((x / rect.width) * 100);
    }
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (isDragging.current) handleMove(e.clientX); };
    const onUp = () => { isDragging.current = false; };
    const onTouchMove = (e: TouchEvent) => { if (isDragging.current) handleMove(e.touches[0].clientX); };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [handleMove]);

  return (
    <section className="w-full py-32 sm:py-40 flex flex-col items-center justify-center relative overflow-hidden px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="text-center mb-14 z-10 max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#F81719] font-medium tracking-widest text-xs uppercase mb-4 block"
        >
          Compare
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
        >
          Verifiable Without Identity
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/45 text-lg font-light leading-relaxed"
        >
          Generate anonymous cryptographic proofs that a vote, post, or transaction occurred.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-5xl aspect-[4/3] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.08] select-none cursor-ew-resize group"
        style={{ touchAction: 'none' }}
        ref={containerRef}
        onMouseDown={() => { isDragging.current = true; }}
        onTouchStart={() => { isDragging.current = true; }}
      >
        <div className="absolute inset-0 w-full h-full">
          <ComparisonVisuals mode="private" />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg z-10 flex items-center gap-2">
            <Shield size={12} className="text-emerald-500" />
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-emerald-500 uppercase">Anonymous Proof</span>
          </div>
        </div>

        <div
          className="absolute inset-0 w-full h-full"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <ComparisonVisuals mode="public" />
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[#F81719]/10 backdrop-blur-md border border-[#F81719]/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg z-10 flex items-center gap-2">
            <AlertTriangle size={12} className="text-[#F81719]" />
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#F81719] uppercase">Public Metadata</span>
          </div>
        </div>

        <div
          className="absolute top-0 bottom-0 w-px bg-white/80 cursor-ew-resize z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-[#F81719] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(248,23,25,0.4)] transform transition-transform group-hover:scale-110">
            <div className="flex gap-0.5">
              <ChevronLeft size={14} className="text-white" />
              <ChevronRight size={14} className="text-white" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ComparisonSection;
