import { twMerge } from 'tailwind-merge';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export default function Toggle({ checked, onChange, label, description, disabled = false }: ToggleProps) {
  return (
    <label
      className={twMerge(
        'flex items-center justify-between gap-4 cursor-pointer group',
        disabled && 'opacity-40 pointer-events-none'
      )}
    >
      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{label}</div>}
          {description && <div className="text-xs text-white/40 mt-0.5">{description}</div>}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        disabled={disabled}
        className={twMerge(
          'relative inline-flex h-6 w-11 shrink-0 rounded-full border transition-colors duration-200',
          checked
            ? 'bg-purple-500/80 border-purple-500/40'
            : 'bg-white/10 border-white/10'
        )}
      >
        <span
          className={twMerge(
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    </label>
  );
}
