import Script from 'next/script';

import { AssetRoute } from '@/types/routes';

/**
 * No-flicker theme resolution. Loads a static script before hydration so
 * html[data-theme] is set ahead of first paint and neither mode ever flashes.
 *
 * The logic lives in a static asset (public/theme-init.js), not an inline
 * string, so there is **no `dangerouslySetInnerHTML` and no injection surface**.
 * `beforeInteractive` has Next inject it into the initial server HTML ahead of
 * app code; `themeInit.test.ts` locks the asset's literals to the theme enums so
 * the two can't drift. Any residual first-paint edge case is covered by the
 * script's own fallback and the layout's `suppressHydrationWarning`.
 */
export const ThemeScript = () => (
  <Script src={AssetRoute.ThemeInit} strategy="beforeInteractive" />
);
