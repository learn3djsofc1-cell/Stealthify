import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: string;
  onClick?: () => void;
  overflow?: boolean;
}

export default function Card({ children, className, hover = false, glow, onClick, overflow = false }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        'relative rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-4 sm:p-6',
        !overflow && 'overflow-hidden',
        hover && 'transition-all duration-300 hover:border-white/[0.14] hover:shadow-[0_8px_40px_rgba(248,23,25,0.04)] cursor-pointer',
        className
      )}
    >
      {glow && (
        <div
          className="pointer-events-none absolute inset-0 opacity-40 rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${glow}, transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
