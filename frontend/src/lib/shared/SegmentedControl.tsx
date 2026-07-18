'use client';

import { cx } from '@/utils/cx';

/**
 * The design system's `.seg` control on button semantics — used for
 * variant pickers, sort options and the DAY/NIGHT/AUTO switch.
 */
export interface SegmentedOption<TValue extends string> {
  readonly value: TValue;
  readonly label: string;
  readonly disabled?: boolean;
}

export interface SegmentedControlProps<TValue extends string> {
  readonly options: ReadonlyArray<SegmentedOption<TValue>>;
  readonly value: TValue | null;
  readonly onChange: (value: TValue) => void;
  readonly label: string;
  readonly className?: string;
}

export const SegmentedControl = <TValue extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: SegmentedControlProps<TValue>) => (
  <div
    role="radiogroup"
    aria-label={label}
    className={cx('inline-flex overflow-hidden rounded-md border border-divider', className)}
  >
    {options.map((option, index) => {
      const selected = option.value === value;
      return (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={selected}
          disabled={option.disabled}
          onClick={() => onChange(option.value)}
          className={cx(
            'cursor-pointer px-4 py-2 text-sm transition-colors duration-150',
            'disabled:cursor-not-allowed disabled:opacity-45 disabled:line-through',
            index > 0 && 'border-l border-divider',
            selected
              ? 'text-accent-ink shadow-[inset_0_0_0_1px_var(--color-accent)]'
              : 'hover:bg-[color-mix(in_srgb,var(--color-ink)_7%,transparent)]',
          )}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);
