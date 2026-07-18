'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { ProductSort } from '@exclusive-wear/shopify';

import { siteContent } from '@/content/site';
import { SegmentedControl } from '@/lib/shared/SegmentedControl';
import { Tag } from '@/lib/shared/Tag';
import { AvailabilityFilter } from '@/types/catalog';
import { QueryParamKey } from '@/types/keys';
import { TagVariant } from '@/types/ui';
import { cx } from '@/utils/cx';

/**
 * Basic filters (design 1d): sort + availability, driven entirely by the
 * URL — the listing itself refetches on the server. Sticky under the
 * header with a blur backdrop.
 */

const SORT_OPTIONS = [
  { value: ProductSort.Newest, label: siteContent.listing.sortNewest },
  { value: ProductSort.PriceAsc, label: siteContent.listing.sortPriceAsc },
  { value: ProductSort.PriceDesc, label: siteContent.listing.sortPriceDesc },
] as const;

export interface FilterSortBarProps {
  readonly sort: ProductSort;
  readonly availability: AvailabilityFilter;
}

export const FilterSortBar = ({ sort, availability }: FilterSortBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParam = useCallback(
    (key: QueryParamKey, value: string | null) => {
      const params = new URLSearchParams(searchParams);
      if (value === null) params.delete(key);
      else params.set(key, value);
      const query = params.toString();
      router.replace(query.length > 0 ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const inStockOnly = availability === AvailabilityFilter.InStock;

  return (
    <div className="sticky top-[57px] z-30 -mx-6 mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-divider bg-[color-mix(in_srgb,var(--color-ground)_88%,transparent)] px-6 py-3 backdrop-blur-md">
      <button
        type="button"
        aria-pressed={inStockOnly}
        onClick={() =>
          setParam(
            QueryParamKey.Availability,
            inStockOnly ? null : AvailabilityFilter.InStock,
          )
        }
        className="cursor-pointer"
      >
        <Tag
          variant={inStockOnly ? TagVariant.Accent : TagVariant.Outline}
          className={cx('transition-colors', !inStockOnly && 'border-divider text-ink-muted')}
        >
          {siteContent.listing.availabilityInStock}
        </Tag>
      </button>

      <SegmentedControl
        label={siteContent.listing.sortLabel}
        options={SORT_OPTIONS}
        value={sort}
        onChange={(value) => setParam(QueryParamKey.Sort, value)}
      />
    </div>
  );
};
