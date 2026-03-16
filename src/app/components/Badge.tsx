import { twMerge } from 'tailwind-merge';

type BadgeVariant = 'active' | 'inactive' | 'verified' | 'warning' | 'error';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  active: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  inactive: 'bg-black/[0.03] text-black/40 border-black/[0.06]',
  verified: 'bg-black/[0.05] text-black/60 border-black/[0.08]',
  warning: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  error: 'bg-red-500/10 text-red-500 border-red-500/20',
};

const dotColors: Record<BadgeVariant, string> = {
  active: 'bg-emerald-500',
  inactive: 'bg-black/30',
  verified: 'bg-black/50',
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
