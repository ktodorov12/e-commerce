'use client';

import { useEffect, useState, useTransition } from 'react';
import type { Product } from '@exclusive-wear/shopify';

import { getSavedProductsAction } from '@/app/actions/products';
import { ListingOverlayProvider } from '@/components/collection/ListingOverlayProvider';
import { ProductGrid } from '@/components/product/ProductGrid';
import { QuickPickModal } from '@/components/product/QuickPickModal';
import { siteContent } from '@/content/site';
import { EmptyState } from '@/lib/shared/EmptyState';
import { useSavedStore } from '@/stores/savedStore';
import { AppRoute } from '@/types/routes';

/**
 * Saved page body: `savedProductHandles` is client-only (localStorage via
 * PreferencesHydrator), so the product data is fetched here rather than in
 * the page's server component.
 */
export const SavedProductGrid = () => {
  const savedProductHandles = useSavedStore((state) => state.savedProductHandles);
  const [savedProducts, setSavedProducts] = useState<readonly Product[]>([]);
  const [isFetchPending, startFetchTransition] = useTransition();

  useEffect(() => {
    if (savedProductHandles.length === 0) return;
    startFetchTransition(async () => {
      setSavedProducts(await getSavedProductsAction(savedProductHandles));
    });
  }, [savedProductHandles, startFetchTransition]);

  if (savedProductHandles.length === 0) {
    return (
      <EmptyState
        title={siteContent.savedPage.title}
        body={siteContent.savedPage.body}
        ctaLabel={siteContent.savedPage.cta}
        ctaRoute={AppRoute.Products}
      />
    );
  }

  const pieceCountLabel =
    savedProductHandles.length === 1
      ? siteContent.listing.pieceCountSingular
      : siteContent.listing.pieceCountPlural;

  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 pt-10">
      <div className="mb-5 flex flex-col gap-1">
        <h1 className="text-h3">{siteContent.savedPage.title}</h1>
        <span className="text-xs text-ink-muted">
          {savedProductHandles.length} {pieceCountLabel}
        </span>
      </div>
      <ListingOverlayProvider>
        <ProductGrid
          products={savedProducts}
          skeletonCount={isFetchPending ? savedProductHandles.length : 0}
        />
        <QuickPickModal />
      </ListingOverlayProvider>
    </div>
  );
};
