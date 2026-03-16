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
          {label && <div className="text-sm font-medium text-black/90 group-hover:text-black transition-colors">{label}</div>}
          {description && <div className="text-xs text-black/60 mt-0.5">{description}</div>}
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
            ? 'bg-black border-black/40'
            : 'bg-black/20 border-black/20'
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
