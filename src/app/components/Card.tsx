import { type ReactNode, useRef, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  tilt?: boolean;
  glow?: string;
  onClick?: () => void;
}

export default function Card({ children, className, hover = false, tilt = false, glow, onClick }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * 10;
      const rotateY = (x - 0.5) * 10;
      cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      const glowEl = cardRef.current.querySelector<HTMLDivElement>('[data-glow]');
      if (glowEl) {
        glowEl.style.opacity = '0.7';
        glowEl.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, ${glow || 'rgba(159, 85, 255, 0.08)'}, transparent 60%)`;
      }
    });
  }, [tilt, glow]);

  const handleMouseLeave = useCallback(() => {
    if (!tilt || !cardRef.current) return;
    cancelAnimationFrame(rafRef.current);
    cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    const glowEl = cardRef.current.querySelector<HTMLDivElement>('[data-glow]');
    if (glowEl) {
      glowEl.style.opacity = '0';
    }
  }, [tilt]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tilt ? { transition: 'transform 0.2s ease-out', willChange: 'transform' } : undefined}
      className={twMerge(
        'relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-6',
        hover && 'transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05] cursor-pointer',
        className
      )}
    >
      {tilt && (
        <div
          data-glow
          className="pointer-events-none absolute inset-0"
          style={{ opacity: 0, transition: 'opacity 0.3s ease-out' }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
