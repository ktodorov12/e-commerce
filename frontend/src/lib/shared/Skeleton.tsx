import { cx } from '@/utils/cx';

/** Loading placeholder — a quiet pulse on the surface tone. */
export interface SkeletonProps {
  readonly className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <div aria-hidden="true" className={cx('animate-pulse rounded-md bg-surface', className)} />
);
