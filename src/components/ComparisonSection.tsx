import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { ChevronLeft, ChevronRight, Shield, AlertTriangle, FileText, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

const ComparisonVisuals = memo(({ mode }: { mode: 'public' | 'private' }) => {
  const isPrivate = mode === 'private';
  
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const nodes = Array.from({ length: 12 }).map((_, i) => {
    const x = 10 + seededRandom(i * 13) * 80;
    const y = 15 + seededRandom(i * 29) * 70;
    return { id: i, x, y };
  });

  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="grid-public" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#333" strokeWidth="0.5" />
        </pattern>
        <pattern id="grid-private" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.5" fill="#333" />
        </pattern>
        <filter id="glow-private">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="100" height="100" fill={isPrivate ? '#0a0a0a' : '#1a0000'} />
      <rect width="100" height="100" fill={isPrivate ? 'url(#grid-private)' : 'url(#grid-public)'} opacity={0.3} />

      {nodes.map((node, i) => {
        if (i === nodes.length - 1) return null;
        const next = nodes[i + 1];
        return (
          <line
            key={`line-${i}`}
            x1={node.x}
            y1={node.y}
            x2={next.x}
            y2={next.y}
            stroke={isPrivate ? '#ffffff' : '#F81719'}
            strokeWidth={isPrivate ? 0.2 : 0.5}
            strokeDasharray={isPrivate ? '2 2' : 'none'}
            opacity={isPrivate ? 0.3 : 0.5}
          />
        );
      })}

      {nodes.map((node, i) => (
        <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
          <circle
            r={isPrivate ? 3 : 4}
            fill={isPrivate ? '#0a0a0a' : '#1a0000'}
            stroke={isPrivate ? '#ffffff' : '#F81719'}
            strokeWidth={0.5}
          />
          
          {isPrivate ? (
            <path
              d="M -1.5 -1.5 L 0 0 L 1.5 -2 M 0 2 V 0"
              stroke="#10b981"
              strokeWidth="0.5"
              fill="none"
              filter="url(#glow-private)"
            />
          ) : (
            <text
              x="0"
              y="1"
              fontSize="2.5"
              fill="#F81719"
              textAnchor="middle"
              fontFamily="monospace"
              fontWeight="bold"
            >
              !
            </text>
          )}

          <g transform="translate(5, -2)">
            <rect
              x="-1"
              y="-3"
              width="24"
              height="8"
              rx="1"
              fill={isPrivate ? '#0a0a0a' : '#1a0000'}
              stroke={isPrivate ? '#333' : '#F81719'}
              strokeWidth="0.2"
              opacity={0.8}
            />
            <text x="1" y="0" fontSize="2" fill={isPrivate ? '#aaa' : '#F81719'} fontFamily="monospace">
              {isPrivate ? 'ZK-PROOF: 0x9a...' : `IP: 192.168.1.${10 + i}`}
            </text>
            <text x="1" y="3" fontSize="2" fill={isPrivate ? '#666' : '#F81719'} fontFamily="monospace">
              {isPrivate ? 'IDENTITY: HIDDEN' : `USER: ID-${5000 + i}`}
            </text>
          </g>
        </g>
      ))}

      <g transform="translate(50, 50)">
        <circle r="15" fill={isPrivate ? '#F81719' : '#7f1d1d'} fillOpacity={0.08} filter={isPrivate ? 'url(#glow-private)' : ''} />
        <circle r="12" fill="none" stroke={isPrivate ? '#10b981' : '#F81719'} strokeWidth="0.5" strokeDasharray="4 2" className="animate-spin-slow" />
        
        {isPrivate ? (
          <>
            <path d="M -4 0 L -1 3 L 5 -3" stroke="#10b981" strokeWidth="1.5" fill="none" />
            <text x="0" y="8" fontSize="3" fill="#10b981" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">VERIFIED</text>
          </>
        ) : (
          <>
            <text x="0" y="2" fontSize="8" fill="#F81719" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">!</text>
            <text x="0" y="8" fontSize="3" fill="#F81719" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">EXPOSED</text>
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
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        handleMove(e.clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
       if (isDragging.current) {
         handleMove(e.touches[0].clientX);
       }
    };

    const handleGlobalTouchEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchmove', handleGlobalTouchMove);
    window.addEventListener('touchend', handleGlobalTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [handleMove]);

  return (
    <section className="w-full py-24 bg-black flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className="text-center mb-12 z-10 px-4">
        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
          Verifiable Actions Without Identity
        </h2>
        <p className="text-white/50 text-lg font-light max-w-2xl mx-auto">
          Generate anonymous cryptographic proofs (unlinkable attestations) that a vote, post, or transaction occurred.
        </p>
      </div>

      <div 
        className="relative w-full max-w-5xl aspect-square md:aspect-[16/9] rounded-3xl overflow-hidden border border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.3)] select-none cursor-ew-resize group mx-4"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={() => isDragging.current = true}
      >
        <div className="absolute inset-0 w-full h-full bg-[#0a0a0a]">
          <ComparisonVisuals mode="private" />
          
          <div className="absolute bottom-6 left-6 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 px-4 py-2 rounded-lg z-10 flex items-center gap-2">
            <Shield size={14} className="text-emerald-500" />
            <span className="text-xs font-bold tracking-widest text-emerald-500 uppercase">
              Anonymous Proof
            </span>
          </div>
        </div>

        <div 
          className="absolute inset-0 w-full h-full bg-[#1a0000] border-l border-white/10"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <ComparisonVisuals mode="public" />
          
          <div className="absolute bottom-6 right-6 bg-[#F81719]/10 backdrop-blur-md border border-[#F81719]/20 px-4 py-2 rounded-lg z-10 flex items-center gap-2">
            <AlertTriangle size={14} className="text-[#F81719]" />
            <span className="text-xs font-bold tracking-widest text-[#F81719] uppercase">
              Public Metadata
            </span>
          </div>
        </div>

        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#F81719] rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
             <div className="flex gap-1">
               <ChevronLeft size={16} className="text-white" />
               <ChevronRight size={16} className="text-white" />
             </div>
          </div>
        </div>

      </div>

    </section>
  );
};

export default ComparisonSection;
