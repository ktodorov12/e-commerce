/**
 * Availability facet on the product listing. Sort options come from
 * `ProductSort` in @exclusive-wear/shopify (single source, also used as the
 * URL parameter value) — never redefine them here.
 */
export enum AvailabilityFilter {
  All = 'all',
  InStock = 'in-stock',
}
