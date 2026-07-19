'use client';

import { siteContent } from '@/content/site';
import { useProductListingItems } from '@/hooks/useProductListingMachine';

/** Reflects the count of pieces actually loaded so far — the Storefront
    connection has no total-count field, so this grows as pages stream in
    rather than claiming an upfront total. */
export const ListingPieceCount = () => {
  const items = useProductListingItems();
  const countLabel =
    items.length === 1 ? siteContent.listing.pieceCountSingular : siteContent.listing.pieceCountPlural;

  return (
    <span className="text-xs text-ink-muted">
      {items.length} {countLabel}
    </span>
  );
};
