import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={twMerge(
        'rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-6',
        hover && 'transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05]',
        className
      )}
    >
      {children}
    </div>
  );
}
