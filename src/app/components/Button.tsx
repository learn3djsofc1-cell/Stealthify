import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-[#F81719] text-white hover:bg-[#F81719]/80 shadow-[0_4px_20px_rgba(248,23,25,0.2)]',
  secondary:
    'bg-white/[0.06] text-white border border-white/[0.12] hover:bg-white/[0.10] hover:border-white/[0.18]',
  danger:
    'bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25',
  ghost:
    'bg-transparent text-white/70 hover:text-white hover:bg-white/[0.06]',
};

export default function Button({
  variant = 'primary',
  children,
  icon,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200',
        variants[variant],
        fullWidth && 'w-full',
        disabled && 'opacity-40 pointer-events-none',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
