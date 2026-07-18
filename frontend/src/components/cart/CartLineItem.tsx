'use client';

import type { CartLine } from '@exclusive-wear/shopify';

import { siteContent } from '@/content/site';
import { usePendingMutation, useRemoveCartLine, useUpdateCartLine } from '@/hooks/useCartMachine';
import { Button } from '@/lib/shared/Button';
import { MinusIcon, PlusIcon } from '@/lib/shared/icons';
import { Price } from '@/lib/shared/Price';
import { ProductImage } from '@/lib/shared/ProductImage';
import { CartMutationKind } from '@/types/machines';
import { cx } from '@/utils/cx';

/**
 * One bag line. Quantity/remove flow goes through the cart machine —
 * the row dims while its own mutation is in flight.
 */
export const CartLineItem = ({ line }: { readonly line: CartLine }) => {
  const updateLine = useUpdateCartLine();
  const removeLine = useRemoveCartLine();
  const pending = usePendingMutation();

  const isBusy =
    pending !== null && pending.kind !== CartMutationKind.AddLines && pending.lineId === line.id;

  const optionSummary = line.merchandise.selectedOptions
    .map((option) => option.value)
    .join(' · ');

  return (
    <div className={cx('flex gap-4 py-4 transition-opacity', isBusy && 'opacity-45')}>
      <ProductImage
        image={line.merchandise.image}
        alt={line.merchandise.productTitle}
        sizes="80px"
        className="w-[80px] shrink-0 rounded-md aspect-[3/4]"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate text-sm text-ink">{line.merchandise.productTitle}</span>
        {optionSummary ? <span className="text-xs text-ink-muted">{optionSummary}</span> : null}
        <Price price={line.cost} className="text-sm" />

        <div className="mt-2 flex items-center gap-4">
          <div className="inline-flex items-center rounded-md border border-divider">
            <Button
              aria-label={siteContent.a11y.decreaseQuantity}
              disabled={isBusy || line.quantity <= 1}
              onClick={() => updateLine(line.id, line.quantity - 1)}
              className="border-0 px-3 py-1 text-ink"
            >
              <MinusIcon size={12} />
            </Button>
            <span className="min-w-8 text-center text-sm">{line.quantity}</span>
            <Button
              aria-label={siteContent.a11y.increaseQuantity}
              disabled={isBusy}
              onClick={() => updateLine(line.id, line.quantity + 1)}
              className="border-0 px-3 py-1 text-ink"
            >
              <PlusIcon size={12} />
            </Button>
          </div>

          <Button
            disabled={isBusy}
            onClick={() => removeLine(line.id)}
            className="border-0 px-2 py-1 text-xs text-ink-muted underline underline-offset-4 hover:text-accent-ink"
          >
            {siteContent.cart.remove}
          </Button>
        </div>
      </div>
    </div>
  );
};
