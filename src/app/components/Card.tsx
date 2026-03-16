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
        'relative rounded-2xl border border-black/[0.12] bg-white backdrop-blur-sm p-6',
        !overflow && 'overflow-hidden',
        hover && 'transition-all duration-300 hover:border-black/[0.20] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] cursor-pointer',
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
