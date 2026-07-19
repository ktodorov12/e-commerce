import type { GetProductsOptions } from '@exclusive-wear/shopify';

import { AvailabilityFilter, BRAND_FILTER_VENDORS, GenderSharedTag } from '@/types/catalog';
import type { ProductListingQuery } from '@/types/catalog';

/**
 * The one mapping from the canonical listing query (sort + filter selection)
 * to the Storefront `getProducts` filter shape. Shared by the page's initial
 * server-rendered fetch and the load-more server action, so page N rebuilds
 * exactly the same query as page 1 — never duplicate this mapping.
 */
export const buildProductListingQueryOptions = (
  query: ProductListingQuery,
): Omit<GetProductsOptions, 'first' | 'after'> => {
  const { sort, selection } = query;
  return {
    sort,
    availableOnly: selection.availability === AvailabilityFilter.InStock,
    filter: {
      // TypeFilter/GenderFilter values double as the store's tags
      // (types/catalog.ts). Unisex pieces belong to both genders, so the
      // unisex tag joins any gender pick.
      tagGroups: [
        selection.types,
        selection.genders.length > 0 ? [...selection.genders, GenderSharedTag.Unisex] : [],
      ],
      vendors: selection.brands.map((brand) => BRAND_FILTER_VENDORS[brand]),
      minPrice: selection.minPrice ?? undefined,
      maxPrice: selection.maxPrice ?? undefined,
    },
  };
};
