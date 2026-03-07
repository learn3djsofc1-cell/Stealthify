import { twMerge } from 'tailwind-merge';

type BadgeVariant = 'active' | 'inactive' | 'verified' | 'warning' | 'error';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  inactive: 'bg-white/5 text-white/40 border-white/10',
  verified: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  error: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const dotColors: Record<BadgeVariant, string> = {
  active: 'bg-emerald-400',
  inactive: 'bg-white/30',
  verified: 'bg-purple-400',
  warning: 'bg-amber-400',
  error: 'bg-red-400',
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
