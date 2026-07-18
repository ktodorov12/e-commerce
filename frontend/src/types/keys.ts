/** Cookie names (versioned so the schema can evolve without conflicts). */
export enum CookieKey {
  CartId = 'ew.cart-id.v1',
}

/** localStorage keys (versioned; reads are always wrapped in try/catch). */
export enum StorageKey {
  ThemePreference = 'ew.theme.v1',
}

/** URL query parameters understood by the product listing. */
export enum QueryParamKey {
  Sort = 'sort',
  Availability = 'availability',
}

/** Data attributes we set on <html>. */
export enum DataAttribute {
  Theme = 'data-theme',
  ThemeTransition = 'data-theme-transition',
}
