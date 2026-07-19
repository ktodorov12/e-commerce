import { ProductSort } from '@exclusive-wear/shopify';

import { AvailabilityFilter } from '@/types/catalog';
import type { ListingFilterSelection } from '@/types/catalog';
import { QueryParamKey } from '@/types/keys';
import { serializeEnumListParam } from '@/utils/queryParam';

/**
 * Serialize the canonical listing state into its URL projection. Defaults
 * are omitted so an untouched listing keeps a clean URL; the parsers in
 * utils/queryParam.ts reverse this exactly (round-trip contract).
 */
export const buildListingSearchParams = (
  selection: ListingFilterSelection,
  sort: ProductSort,
): URLSearchParams => {
  const params = new URLSearchParams();
  if (sort !== ProductSort.Newest) params.set(QueryParamKey.Sort, sort);
  if (selection.types.length > 0) {
    params.set(QueryParamKey.Type, serializeEnumListParam(selection.types));
  }
  if (selection.genders.length > 0) {
    params.set(QueryParamKey.Gender, serializeEnumListParam(selection.genders));
  }
  if (selection.brands.length > 0) {
    params.set(QueryParamKey.Brand, serializeEnumListParam(selection.brands));
  }
  if (selection.availability !== AvailabilityFilter.All) {
    params.set(QueryParamKey.Availability, selection.availability);
  }
  if (selection.minPrice !== null) params.set(QueryParamKey.PriceMin, String(selection.minPrice));
  if (selection.maxPrice !== null) params.set(QueryParamKey.PriceMax, String(selection.maxPrice));
  return params;
};
