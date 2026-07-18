import type { Metadata } from 'next';
import { getProducts, ProductSort } from '@exclusive-wear/shopify';

import { FilterSortBar } from '@/components/collection/FilterSortBar';
import { ProductGrid } from '@/components/product/ProductGrid';
import { siteContent } from '@/content/site';
import { AvailabilityFilter } from '@/types/catalog';
import { QueryParamKey } from '@/types/keys';
import { parseEnumParam } from '@/utils/queryParam';

export const metadata: Metadata = {
  title: siteContent.listing.title,
};

const PAGE_SIZE = 24;

interface ProductsPageProps {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  // URL params are untrusted: map each onto its enum, failing closed. A value
  // we never emit (hand-typed `?sort=drop`) throws rather than silently
  // defaulting — the internal query and the URL must agree before we fetch.
  const sort = parseEnumParam(
    QueryParamKey.Sort,
    params[QueryParamKey.Sort],
    Object.values(ProductSort),
    ProductSort.Newest,
  );
  const availability = parseEnumParam(
    QueryParamKey.Availability,
    params[QueryParamKey.Availability],
    Object.values(AvailabilityFilter),
    AvailabilityFilter.All,
  );

  const products = await getProducts({
    first: PAGE_SIZE,
    sort,
    availableOnly: availability === AvailabilityFilter.InStock,
  });

  const countLabel =
    products.length === 1
      ? siteContent.listing.pieceCountSingular
      : siteContent.listing.pieceCountPlural;

  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 pt-10">
      <div className="mb-6 flex items-baseline justify-between">
        <h1 className="text-h3">{siteContent.listing.title}</h1>
        <span className="text-xs text-ink-muted">
          {products.length} {countLabel}
        </span>
      </div>

      <FilterSortBar sort={sort} availability={availability} />

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p className="py-20 text-center text-sm text-ink-muted">{siteContent.listing.empty}</p>
      )}
    </div>
  );
}
