/**
 * Appearance preference. `System` follows `prefers-color-scheme`;
 * Day/Night are explicit one-tap overrides (design: menu footer switch).
 */
export enum ThemeMode {
  Day = 'day',
  Night = 'night',
  System = 'system',
}

/** What actually lands on html[data-theme] — System always resolves. */
export type ResolvedThemeMode = Exclude<ThemeMode, ThemeMode.System>;
