// No-flicker theme resolution. Runs synchronously from <head> before first
// paint, so neither day nor night ever flashes. This is a STATIC asset with no
// dynamic or user-supplied content — there is no dangerouslySetInnerHTML and no
// injection surface. Its literals are the theme enums' values and are locked to
// them by src/components/layout/themeInit.test.ts (StorageKey.ThemePreference,
// ThemeMode.Day/Night, MediaQuery.PrefersDark, DataAttribute.Theme).
(() => {
  try {
    var stored = localStorage.getItem('ew.theme.v1');
    var mode = stored === 'day' || stored === 'night' ? stored : null;
    if (!mode) {
      mode = matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
    }
    document.documentElement.setAttribute('data-theme', mode);
  } catch (_) {
    document.documentElement.setAttribute('data-theme', 'day');
  }
})();
