import type { Metadata } from 'next';
import { getProducts, ProductSort } from '@exclusive-wear/shopify';

import { FilterSheet } from '@/components/collection/FilterSheet';
import { FilterSortBar } from '@/components/collection/FilterSortBar';
import { ListingOverlayProvider } from '@/components/collection/ListingOverlayProvider';
import { ListingPieceCount } from '@/components/collection/ListingPieceCount';
import { ProductListing } from '@/components/collection/ProductListing';
import { ProductListingProvider } from '@/components/collection/ProductListingProvider';
import { QuickPickModal } from '@/components/product/QuickPickModal';
import { siteContent } from '@/content/site';
import {
  AvailabilityFilter,
  BrandFilter,
  GenderFilter,
  LISTING_INITIAL_ITEM_COUNT,
  PRICE_FILTER_MAX,
  TypeFilter,
} from '@/types/catalog';
import type { ListingFilterSelection, ProductListingQuery } from '@/types/catalog';
import { QueryParamKey } from '@/types/keys';
import { buildProductListingQueryOptions } from '@/utils/listingQuery';
import { buildListingSearchParams } from '@/utils/listingUrl';
import {
  InvalidQueryParamError,
  parseEnumListParam,
  parseEnumParam,
  parseWholeNumberParam,
} from '@/utils/queryParam';

export const metadata: Metadata = {
  title: siteContent.listing.title,
};

interface ProductsPageProps {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/** "Men — Tops" from the picked facets; the catalog title when none. */
const buildListingHeading = (selection: ListingFilterSelection): string => {
  const genderPart = selection.genders
    .map((gender) => siteContent.listing.filters.genderLabels[gender])
    .join(siteContent.listing.headingValueJoiner);
  const typePart = selection.types
    .map((type) => siteContent.listing.filters.typeLabels[type])
    .join(siteContent.listing.headingValueJoiner);
  const parts = [genderPart, typePart].filter((part) => part.length > 0);
  return parts.length > 0
    ? parts.join(siteContent.listing.headingFacetJoiner)
    : siteContent.listing.title;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  // URL params are untrusted: each maps onto its enum/numeric domain, failing
  // closed. A value we never emit (hand-typed `?sort=drop`) throws rather than
  // silently defaulting — the internal query and the URL must agree before we
  // fetch.
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
  const types = parseEnumListParam(
    QueryParamKey.Type,
    params[QueryParamKey.Type],
    Object.values(TypeFilter),
  );
  const genders = parseEnumListParam(
    QueryParamKey.Gender,
    params[QueryParamKey.Gender],
    Object.values(GenderFilter),
  );
  const brands = parseEnumListParam(
    QueryParamKey.Brand,
    params[QueryParamKey.Brand],
    Object.values(BrandFilter),
  );
  const minPrice = parseWholeNumberParam(
    QueryParamKey.PriceMin,
    params[QueryParamKey.PriceMin],
    PRICE_FILTER_MAX,
  );
  const maxPrice = parseWholeNumberParam(
    QueryParamKey.PriceMax,
    params[QueryParamKey.PriceMax],
    PRICE_FILTER_MAX,
  );
  // Cross-field check: an inverted range is a URL we never emit.
  if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) {
    throw new InvalidQueryParamError(QueryParamKey.PriceMax, String(maxPrice));
  }

  const selection: ListingFilterSelection = {
    types,
    genders,
    brands,
    availability,
    minPrice,
    maxPrice,
  };
  const listingQuery: ProductListingQuery = { sort, selection };

  const initialPage = await getProducts({
    first: LISTING_INITIAL_ITEM_COUNT,
    ...buildProductListingQueryOptions(listingQuery),
  });

  // Remounts the pagination machine on any sort/filter change so a new query
  // starts from a clean slate instead of carrying over the previous query's
  // accumulated pages (client navigations here patch props in place, not the
  // component instance — see machines/productListingMachineContext.tsx).
  const listingQueryKey = buildListingSearchParams(selection, sort).toString();

  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 pt-10">
      <ProductListingProvider
        key={listingQueryKey}
        items={initialPage.items}
        endCursor={initialPage.endCursor}
        hasNextPage={initialPage.hasNextPage}
        query={listingQuery}
      >
        <div className="mb-5 flex flex-col gap-1">
          <h1 className="text-h3">{buildListingHeading(selection)}</h1>
          <ListingPieceCount />
        </div>

        <ListingOverlayProvider>
          <FilterSortBar sort={sort} selection={selection} />

          <ProductListing />

          <FilterSheet sort={sort} selection={selection} />
          <QuickPickModal />
        </ListingOverlayProvider>
      </ProductListingProvider>
    </div>
  );
}
