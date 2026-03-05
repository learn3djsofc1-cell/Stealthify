import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { ChevronLeft, ChevronRight, Shield, AlertTriangle, FileText, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

// SVG Pattern for the comparison
const ComparisonVisuals = memo(({ mode }: { mode: 'public' | 'private' }) => {
  const isPrivate = mode === 'private';
  
  // Deterministic random for consistent rendering
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

      {/* Background */}
      <rect width="100" height="100" fill={isPrivate ? '#0f0518' : '#0a0a0a'} />
      <rect width="100" height="100" fill={isPrivate ? 'url(#grid-private)' : 'url(#grid-public)'} opacity={0.3} />

      {/* Connections */}
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
            stroke={isPrivate ? '#8b5cf6' : '#ef4444'}
            strokeWidth={isPrivate ? 0.2 : 0.5}
            strokeDasharray={isPrivate ? '2 2' : 'none'}
            opacity={isPrivate ? 0.4 : 0.6}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
          {/* Node Shape */}
          <circle
            r={isPrivate ? 3 : 4}
            fill={isPrivate ? '#1e1b4b' : '#2a0a0a'}
            stroke={isPrivate ? '#8b5cf6' : '#ef4444'}
            strokeWidth={0.5}
          />
          
          {/* Icon/Content */}
          {isPrivate ? (
            <path
              d="M -1.5 -1.5 L 0 0 L 1.5 -2 M 0 2 V 0"
              stroke="#a78bfa"
              strokeWidth="0.5"
              fill="none"
              filter="url(#glow-private)"
            />
          ) : (
            <text
              x="0"
              y="1"
              fontSize="2.5"
              fill="#fca5a5"
              textAnchor="middle"
              fontFamily="monospace"
              fontWeight="bold"
            >
              !
            </text>
          )}

          {/* Data Labels */}
          <g transform="translate(5, -2)">
            <rect
              x="-1"
              y="-3"
              width="24"
              height="8"
              rx="1"
              fill={isPrivate ? '#1e1b4b' : '#2a0a0a'}
              stroke={isPrivate ? '#4c1d95' : '#7f1d1d'}
              strokeWidth="0.2"
              opacity={0.8}
            />
            <text x="1" y="0" fontSize="2" fill={isPrivate ? '#a78bfa' : '#fca5a5'} fontFamily="monospace">
              {isPrivate ? 'ZK-PROOF: 0x9a...' : `IP: 192.168.1.${10 + i}`}
            </text>
            <text x="1" y="3" fontSize="2" fill={isPrivate ? '#6b7280' : '#ef4444'} fontFamily="monospace">
              {isPrivate ? 'IDENTITY: HIDDEN' : `USER: ID-${5000 + i}`}
            </text>
          </g>
        </g>
      ))}

      {/* Central Status */}
      <g transform="translate(50, 50)">
        <circle r="15" fill={isPrivate ? '#581c87' : '#7f1d1d'} fillOpacity={0.2} filter={isPrivate ? 'url(#glow-private)' : ''} />
        <circle r="12" fill="none" stroke={isPrivate ? '#a78bfa' : '#ef4444'} strokeWidth="0.5" strokeDasharray="4 2" className="animate-spin-slow" />
        
        {isPrivate ? (
          <>
            <path d="M -4 0 L -1 3 L 5 -3" stroke="#fff" strokeWidth="1.5" fill="none" />
            <text x="0" y="8" fontSize="3" fill="#fff" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">VERIFIED</text>
          </>
        ) : (
          <>
            <text x="0" y="2" fontSize="8" fill="#fff" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">!</text>
            <text x="0" y="8" fontSize="3" fill="#fff" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">EXPOSED</text>
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
    <section className="w-full py-24 bg-[#020202] flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Header */}
      <div className="text-center mb-12 z-10 px-4">
        <h2 className="text-4xl md:text-5xl font-medium text-white mb-4 tracking-tight">
          Verifiable Actions Without Identity
        </h2>
        <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
          Generate anonymous cryptographic proofs (unlinkable attestations) that a vote, post, or transaction occurred.
        </p>
      </div>

      {/* Comparison Card */}
      <div 
        className="relative w-full max-w-5xl aspect-square md:aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl select-none cursor-ew-resize group mx-4"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={() => isDragging.current = true}
      >
        {/* Layer 1: Anonymous Proof (Background/Revealed) */}
        {/* Visible when slider moves Right (wiping away the top layer) */}
        <div className="absolute inset-0 w-full h-full bg-[#0f0518]">
          <ComparisonVisuals mode="private" />
          
          {/* Label */}
          <div className="absolute bottom-6 left-6 bg-purple-900/40 backdrop-blur-md border border-purple-500/30 px-4 py-2 rounded-lg z-10 flex items-center gap-2">
            <Shield size={14} className="text-purple-300" />
            <span className="text-xs font-bold tracking-widest text-purple-200 uppercase">
              Anonymous Proof
            </span>
          </div>
        </div>

        {/* Layer 2: Public Metadata (Foreground/Hidden) */}
        {/* Clipped from the left as slider moves right */}
        <div 
          className="absolute inset-0 w-full h-full bg-[#0a0a0a] border-l border-white/20"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <ComparisonVisuals mode="public" />
          
          {/* Label */}
          <div className="absolute bottom-6 right-6 bg-red-900/20 backdrop-blur-md border border-red-500/20 px-4 py-2 rounded-lg z-10 flex items-center gap-2">
            <AlertTriangle size={14} className="text-red-400" />
            <span className="text-xs font-bold tracking-widest text-red-400 uppercase">
              Public Metadata
            </span>
          </div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
             <div className="flex gap-1">
               <ChevronLeft size={16} className="text-black" />
               <ChevronRight size={16} className="text-black" />
             </div>
          </div>
        </div>

      </div>

    </section>
  );
};

export default ComparisonSection;
