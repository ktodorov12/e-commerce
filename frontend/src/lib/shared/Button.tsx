import type { ComponentPropsWithoutRef } from 'react';

import { ButtonSize, ButtonVariant } from '@/types/ui';
import { cx } from '@/utils/cx';

/**
 * The only <button> in the app. Primary ("Cta") follows the design's
 * mode inversion automatically: ink-filled on day, accent-outlined on
 * night — both come from the --color-cta* tokens.
 */

const BASE_CLASSES =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border ' +
  'font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-45';

const VARIANT_CLASSES: Readonly<Record<ButtonVariant, string>> = {
  [ButtonVariant.Cta]:
    'border-cta-border bg-cta text-cta-text ' +
    'hover:bg-[color-mix(in_srgb,var(--color-cta)_88%,var(--color-ground))] ' +
    'night:hover:bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] ' +
    'night:active:bg-[color-mix(in_srgb,var(--color-accent)_22%,transparent)]',
  [ButtonVariant.Outline]:
    'border-divider bg-[transparent] text-ink ' +
    'hover:bg-[color-mix(in_srgb,var(--color-ink)_7%,transparent)] ' +
    'active:bg-[color-mix(in_srgb,var(--color-ink)_14%,transparent)]',
  [ButtonVariant.Ghost]:
    'border-[transparent] bg-[transparent] text-accent-ink ' +
    'hover:bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] ' +
    'active:bg-[color-mix(in_srgb,var(--color-accent)_18%,transparent)]',
};

const SIZE_CLASSES: Readonly<Record<ButtonSize, string>> = {
  [ButtonSize.Md]: 'px-4 py-2 text-sm',
  [ButtonSize.Lg]: 'w-full px-6 py-4 text-base',
  [ButtonSize.Icon]: 'h-12 w-12 p-0',
};

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
}

export const Button = ({
  variant = ButtonVariant.Outline,
  size = ButtonSize.Md,
  type = 'button',
  className,
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={cx(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className)}
    {...props}
  />
);
