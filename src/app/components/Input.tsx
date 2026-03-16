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
        <label className="block text-sm font-medium text-black/50 mb-2">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-black/30">
            {icon}
          </div>
        )}
        <input
          className={twMerge(
            'w-full rounded-xl border border-black/[0.08] bg-white/60 px-4 py-3 text-sm text-black placeholder:text-black/25 outline-none transition-all duration-200',
            'focus:border-black/20 focus:bg-white focus:ring-1 focus:ring-black/10',
            icon && 'pl-10',
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
}
