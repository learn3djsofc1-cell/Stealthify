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
    'bg-black text-white hover:bg-black/80 shadow-[0_4px_20px_rgba(0,0,0,0.1)]',
  secondary:
    'bg-black/[0.04] text-black border border-black/[0.08] hover:bg-black/[0.08] hover:border-black/[0.12]',
  danger:
    'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20',
  ghost:
    'bg-transparent text-black/50 hover:text-black hover:bg-black/[0.04]',
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
