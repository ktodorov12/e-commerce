import type { ReactNode } from 'react';

import { TagVariant } from '@/types/ui';
import { cx } from '@/utils/cx';

/** Small label tinted from the palette (NEW badges, markdowns, filters). */
const VARIANT_CLASSES: Readonly<Record<TagVariant, string>> = {
  [TagVariant.Accent]: 'bg-accent-tint text-accent-ink',
  [TagVariant.Outline]: 'border border-accent text-accent-ink',
  [TagVariant.Neutral]: 'bg-surface text-ink-muted',
};

export interface TagProps {
  readonly variant?: TagVariant;
  readonly className?: string;
  readonly children: ReactNode;
}

export const Tag = ({ variant = TagVariant.Neutral, className, children }: TagProps) => (
  <span
    className={cx(
      'inline-flex items-center rounded-sm px-3 py-1 text-xs tracking-wide',
      VARIANT_CLASSES[variant],
      className,
    )}
  >
    {children}
  </span>
);
