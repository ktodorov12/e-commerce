'use client';

import { useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ProductSort } from '@exclusive-wear/shopify';

import { siteContent } from '@/content/site';
import { useListingOverlayActions } from '@/hooks/useListingOverlayMachine';
import { Button } from '@/lib/shared/Button';
import { FilterIcon } from '@/lib/shared/icons';
import { LoadingOverlay } from '@/lib/shared/LoadingOverlay';
import { SegmentedControl } from '@/lib/shared/SegmentedControl';
import { Tag } from '@/lib/shared/Tag';
import { countSelectedFilters } from '@/types/catalog';
import type { ListingFilterSelection } from '@/types/catalog';
import { TagVariant } from '@/types/ui';
import { buildListingSearchParams } from '@/utils/listingUrl';

/**
 * Listing controls (design 2c): the Filter tab with its picked-count badge
 * opens the filter sheet; the sort control (newest / price up / price down)
 * sits beside it. Deliberately not sticky — the bar scrolls away with the
 * heading, nothing follows the grid.
 */

const SORT_OPTIONS = [
  { value: ProductSort.Newest, label: siteContent.listing.sortNewest },
  { value: ProductSort.PriceAsc, label: siteContent.listing.sortPriceAsc },
  { value: ProductSort.PriceDesc, label: siteContent.listing.sortPriceDesc },
] as const;

export interface FilterSortBarProps {
  readonly sort: ProductSort;
  readonly selection: ListingFilterSelection;
}

export const FilterSortBar = ({ sort, selection }: FilterSortBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { openFilters } = useListingOverlayActions();
  // The refetch can be slow — the transition's pending state drives the
  // loading overlay while the sorted listing streams in.
  const [isSortPending, startSortTransition] = useTransition();

  const selectedCount = countSelectedFilters(selection);

  const applySort = (nextSort: ProductSort) => {
    const query = buildListingSearchParams(selection, nextSort).toString();
    startSortTransition(() => {
      router.replace(query.length > 0 ? `${pathname}?${query}` : pathname, { scroll: false });
    });
  };

  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
      <LoadingOverlay active={isSortPending} />
      <Button
        onClick={openFilters}
        aria-haspopup="dialog"
        aria-label={siteContent.a11y.openFilters}
        className="border-accent text-accent-ink"
        data-testid="open-filters"
      >
        <FilterIcon size={14} />
        {siteContent.listing.filters.trigger}
        {selectedCount > 0 ? (
          <Tag variant={TagVariant.Accent} className="px-2 py-0">
            {selectedCount}
          </Tag>
        ) : null}
      </Button>

      <SegmentedControl
        label={siteContent.listing.sortLabel}
        options={SORT_OPTIONS}
        value={sort}
        onChange={applySort}
      />
    </div>
  );
};
