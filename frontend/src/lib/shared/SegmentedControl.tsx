'use client';

import { useLayoutEffect, useRef } from 'react';

import { cx } from '@/utils/cx';

/**
 * Segmented picker on button semantics — variant pickers, sort options,
 * the DAY/NIGHT/AUTO switch. Sized to its content (never stretched), one
 * accent-tinted fill pill behind the selected option that slides to the
 * next selection (`--motion-switch`; reduced-motion gates it globally).
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
}: SegmentedControlProps<TValue>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const selectedIndex = options.findIndex((option) => option.value === value);

  // The fill pill tracks the selected button's measured box (labels vary in
  // width). Imperative style writes — positioning the pill is DOM sync work,
  // not React state. Runs pre-paint, so the mount position never animates.
  useLayoutEffect(() => {
    const container = containerRef.current;
    const indicator = indicatorRef.current;
    if (container === null || indicator === null) return;
    const selectedButton = container.querySelectorAll('button')[selectedIndex];
    if (selectedButton === undefined) {
      indicator.style.opacity = '0';
      return;
    }
    indicator.style.opacity = '1';
    indicator.style.transform = `translateX(${selectedButton.offsetLeft}px)`;
    indicator.style.width = `${selectedButton.offsetWidth}px`;
  }, [selectedIndex, options]);

  return (
    <div
      role="radiogroup"
      aria-label={label}
      ref={containerRef}
      className={cx(
        'relative isolate flex w-fit max-w-full self-start overflow-x-auto',
        'concentric-shell-1 border border-divider bg-surface scrollbar-none',
        className,
      )}
    >
      <span
        ref={indicatorRef}
        aria-hidden="true"
        className={cx(
          'absolute inset-y-1 left-0 -z-10 rounded-concentric bg-accent-tint opacity-0',
          'transition-[transform,width,opacity] duration-[var(--motion-switch)] ease-[var(--ease-soft)]',
        )}
      />
      {options.map((option) => {
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
              'cursor-pointer rounded-concentric px-4 py-2 text-sm whitespace-nowrap transition-colors duration-150',
              'disabled:cursor-not-allowed disabled:opacity-45 disabled:line-through',
              selected ? 'text-accent-ink' : 'text-ink-muted hover:text-ink',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
