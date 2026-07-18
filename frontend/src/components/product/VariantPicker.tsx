'use client';

import { useMemo, useState } from 'react';
import type { Product, ProductVariant } from '@exclusive-wear/shopify';

import { siteContent } from '@/content/site';
import { AddToCartBar } from '@/components/product/AddToCartBar';
import { SegmentedControl } from '@/lib/shared/SegmentedControl';

/**
 * Option selection → resolved variant → sticky add-to-bag bar.
 * State lives at this leaf; the surrounding PDP is a server component
 * and never re-renders while the shopper picks a size.
 */

const findVariant = (
  variants: readonly ProductVariant[],
  selection: Readonly<Record<string, string>>,
): ProductVariant | null =>
  variants.find((variant) =>
    variant.selectedOptions.every((option) => selection[option.name] === option.value),
  ) ?? null;

const initialSelection = (product: Product): Record<string, string> => {
  const firstAvailable = product.variants.find((variant) => variant.available);
  const source = firstAvailable ?? product.variants[0];
  const selection: Record<string, string> = {};
  for (const option of source?.selectedOptions ?? []) {
    selection[option.name] = option.value;
  }
  return selection;
};

export const VariantPicker = ({ product }: { readonly product: Product }) => {
  const [selection, setSelection] = useState<Record<string, string>>(() =>
    initialSelection(product),
  );

  const selectedVariant = useMemo(
    () => findVariant(product.variants, selection),
    [product.variants, selection],
  );

  const selectOption = (name: string, value: string) =>
    setSelection((current) => ({ ...current, [name]: value }));

  /** An option value is disabled when no variant with it is purchasable. */
  const isValueAvailable = (name: string, value: string): boolean =>
    product.variants.some(
      (variant) =>
        variant.available &&
        variant.selectedOptions.some((option) => option.name === name && option.value === value),
    );

  const meaningfulOptions = product.options.filter(
    (option) => option.values.length > 1 || product.options.length > 1,
  );

  return (
    <div className="flex flex-col gap-6">
      {meaningfulOptions.map((option) => (
        <div key={option.name} className="flex flex-col gap-2">
          <span className="kicker">
            {option.name}
            {selection[option.name] ? ` — ${selection[option.name]}` : ''}
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
          {selectedVariant.title} — {siteContent.pdp.soldOut}
        </p>
      ) : null}

      <AddToCartBar variant={selectedVariant} />
    </div>
  );
};
