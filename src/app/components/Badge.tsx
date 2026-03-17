import { twMerge } from 'tailwind-merge';

type BadgeVariant = 'active' | 'inactive' | 'verified' | 'warning' | 'error';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  active: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  inactive: 'bg-white/[0.05] text-white/60 border-white/[0.12]',
  verified: 'bg-white/[0.08] text-white/70 border-white/[0.15]',
  warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  error: 'bg-red-500/15 text-red-400 border-red-500/30',
};

const dotColors: Record<BadgeVariant, string> = {
  active: 'bg-emerald-500',
  inactive: 'bg-white/50',
  verified: 'bg-white/60',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
};

export default function Badge({ label, variant = 'inactive', dot = false, className }: BadgeProps) {
  return (
    <span
      className={twMerge(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {dot && <span className={twMerge('h-1.5 w-1.5 rounded-full', dotColors[variant])} />}
      {label}
    </span>
  );
}
