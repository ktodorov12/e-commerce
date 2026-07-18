import type { Money } from '@exclusive-wear/shopify';

import { cx } from '@/utils/cx';
import { formatDiscount, formatMoney } from '@/utils/money';
import { Tag } from '@/lib/shared/Tag';
import { TagVariant } from '@/types/ui';

/**
 * Price with optional markdown: current price, struck-through compare-at
 * and a "−30%" tag — the design's sale treatment.
 */
export interface PriceProps {
  readonly price: Money;
  readonly compareAtPrice?: Money | null;
  readonly showDiscountTag?: boolean;
  readonly className?: string;
}

export const Price = ({
  price,
  compareAtPrice = null,
  showDiscountTag = false,
  className,
}: PriceProps) => {
  const discount = compareAtPrice ? formatDiscount(price, compareAtPrice) : '';
  const hasMarkdown = discount !== '';

  return (
    <span className={cx('inline-flex items-baseline gap-3', className)}>
      <span className={cx(hasMarkdown && 'text-accent-ink')}>{formatMoney(price)}</span>
      {hasMarkdown && compareAtPrice ? (
        <>
          <s className="text-ink-muted">{formatMoney(compareAtPrice)}</s>
          {showDiscountTag ? <Tag variant={TagVariant.Accent}>{discount}</Tag> : null}
        </>
      ) : null}
    </span>
  );
};
