/** Every navigable path in the app. Routes are never written as plain strings. */
export enum AppRoute {
  Home = '/',
  Products = '/products',
}

/** Dynamic product detail route, derived from {@link AppRoute.Products}. */
export type ProductRoute = `${AppRoute.Products}/${string}`;

export const buildProductRoute = (handle: string): ProductRoute => `${AppRoute.Products}/${handle}`;

/** Anything our shared Link primitive accepts as an href. */
export type NavigableRoute = AppRoute | ProductRoute;

/** Static assets served from `frontend/public/`. */
export enum AssetRoute {
  ThemeInit = '/theme-init.js',
}
