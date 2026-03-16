import { twMerge } from 'tailwind-merge';

type BadgeVariant = 'active' | 'inactive' | 'verified' | 'warning' | 'error';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  active: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30',
  inactive: 'bg-black/[0.05] text-black/60 border-black/[0.12]',
  verified: 'bg-black/[0.08] text-black/70 border-black/[0.15]',
  warning: 'bg-amber-500/15 text-amber-700 border-amber-500/30',
  error: 'bg-red-500/15 text-red-600 border-red-500/30',
};

const dotColors: Record<BadgeVariant, string> = {
  active: 'bg-emerald-500',
  inactive: 'bg-black/50',
  verified: 'bg-black/60',
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
