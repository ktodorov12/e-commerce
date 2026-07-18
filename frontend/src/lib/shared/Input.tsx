import { useId } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

import { cx } from '@/utils/cx';

/** The only raw <input> wrapper. Label included — no unlabeled fields. */
export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  readonly label: string;
}

export const Input = ({ label, className, id, ...props }: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <div className={className}>
      <label htmlFor={inputId} className="mb-2 block text-xs text-ink-muted">
        {label}
      </label>
      <input
        id={inputId}
        className={cx(
          'w-full min-h-14 rounded-md border border-divider bg-surface px-4 py-2 text-sm text-ink',
          'caret-accent placeholder:text-ink-muted',
          'hover:border-[color-mix(in_srgb,var(--color-ink)_45%,transparent)]',
          'focus-visible:border-accent focus-visible:outline-offset-0',
        )}
        {...props}
      />
    </div>
  );
};
