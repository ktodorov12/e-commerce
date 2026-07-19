'use client';

import { useEffect, useRef } from 'react';

import { ProductGrid } from '@/components/product/ProductGrid';
import { siteContent } from '@/content/site';
import {
  useLoadMoreProducts,
  useProductListingHasNextPage,
  useProductListingItems,
  useProductListingLoadingMore,
} from '@/hooks/useProductListingMachine';
import { LISTING_LOAD_MORE_ITEM_COUNT } from '@/types/catalog';

/**
 * Infinite-scroll grid (design 2c continued): the sentinel sits after the
 * loaded rows and triggers the next page via `rootMargin` well before it
 * actually scrolls into view, so the next 6 rows are already streaming in —
 * covered by the trailing skeleton batch — by the time the shopper reaches
 * them.
 */
const LOAD_MORE_ROOT_MARGIN = '600px 0px';

export const ProductListing = () => {
  const items = useProductListingItems();
  const hasNextPage = useProductListingHasNextPage();
  const loadingMore = useProductListingLoadingMore();
  const loadMore = useLoadMoreProducts();
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage) return undefined;
    const sentinel = sentinelRef.current;
    if (sentinel === null) return undefined;

    // Recreated whenever the item count changes so a still-visible sentinel
    // (short viewport, short page) re-fires immediately instead of waiting
    // for a scroll event that may never come.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) loadMore();
      },
      { rootMargin: LOAD_MORE_ROOT_MARGIN },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, loadMore, items.length]);

  if (items.length === 0) {
    return <p className="py-20 text-center text-sm text-ink-muted">{siteContent.listing.empty}</p>;
  }

  return (
    <>
      <ProductGrid products={items} skeletonCount={loadingMore ? LISTING_LOAD_MORE_ITEM_COUNT : 0} />
      {hasNextPage ? <div ref={sentinelRef} aria-hidden="true" className="h-px" /> : null}
    </>
  );
};
