'use client';

import { useMemo, useState } from 'react';
import type { ProductListItem, ProductVariant } from '@exclusive-wear/shopify';

/**
 * Option selection → resolved variant. Shared by the PDP's VariantPicker
 * and the listing's quick-pick sheet, so both resolve availability and
 * pre-select the first purchasable variant the same way.
 */

const findVariant = (
  variants: readonly ProductVariant[],
  selection: Readonly<Record<string, string>>,
): ProductVariant | null =>
  variants.find((variant) =>
    variant.selectedOptions.every((option) => selection[option.name] === option.value),
  ) ?? null;

const initialSelection = (product: ProductListItem): Record<string, string> => {
  const firstAvailable = product.variants.find((variant) => variant.available);
  const source = firstAvailable ?? product.variants[0];
  const selection: Record<string, string> = {};
  for (const option of source?.selectedOptions ?? []) {
    selection[option.name] = option.value;
  }
  return selection;
};

export const useVariantSelection = (product: ProductListItem) => {
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

  /** Skip the placeholder "Title" option Shopify adds to optionless products. */
  const meaningfulOptions = product.options.filter(
    (option) => option.values.length > 1 || product.options.length > 1,
  );

  return { selection, selectOption, selectedVariant, isValueAvailable, meaningfulOptions };
};
