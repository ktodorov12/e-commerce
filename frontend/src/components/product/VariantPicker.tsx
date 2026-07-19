'use client';

import type { Product } from '@exclusive-wear/shopify';

import { siteContent } from '@/content/site';
import { AddToCartBar } from '@/components/product/AddToCartBar';
import { useVariantSelection } from '@/hooks/useVariantSelection';
import { SegmentedControl } from '@/lib/shared/SegmentedControl';

/**
 * Option selection → resolved variant → sticky add-to-bag bar.
 * State lives at this leaf; the surrounding PDP is a server component
 * and never re-renders while the shopper picks a size.
 */
export const VariantPicker = ({ product }: { readonly product: Product }) => {
  const { selection, selectOption, selectedVariant, isValueAvailable, meaningfulOptions } =
    useVariantSelection(product);

  return (
    <div className="flex flex-col gap-6">
      {meaningfulOptions.map((option) => (
        <div key={option.name} className="flex flex-col gap-2">
          <span className="kicker">
            {option.name}
            {selection[option.name] ? `: ${selection[option.name]}` : ''}
          </span>
          <SegmentedControl
            label={option.name}
            options={option.values.map((value) => ({
              value,
              label: value,
              disabled: !isValueAvailable(option.name, value),
            }))}
            value={selection[option.name] ?? null}
            onChange={(value) => selectOption(option.name, value)}
          />
        </div>
      ))}

      {selectedVariant !== null && !selectedVariant.available ? (
        <p className="text-xs text-ink-muted">
          {selectedVariant.title}, {siteContent.pdp.soldOut}
        </p>
      ) : null}

      <AddToCartBar variant={selectedVariant} />
    </div>
  );
};
