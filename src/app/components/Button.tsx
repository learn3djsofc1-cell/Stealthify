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
    'bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.08)]',
  secondary:
    'bg-white/[0.05] text-white border border-white/10 hover:bg-white/[0.1] hover:border-white/20',
  danger:
    'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20',
  ghost:
    'bg-transparent text-white/60 hover:text-white hover:bg-white/[0.05]',
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
