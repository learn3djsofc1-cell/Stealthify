import { type InputHTMLAttributes, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  label?: string;
}

export default function Input({ icon, label, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-white/70 mb-2">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/55">
            {icon}
          </div>
        )}
        <input
          className={twMerge(
            'w-full rounded-xl border border-white/[0.10] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none transition-all duration-200',
            'focus:border-[#F81719]/40 focus:ring-1 focus:ring-[#F81719]/20',
            icon && 'pl-10',
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
}
