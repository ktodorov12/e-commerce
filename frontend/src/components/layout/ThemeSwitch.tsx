'use client';

import { siteContent } from '@/content/site';
import { SegmentedControl } from '@/lib/shared/SegmentedControl';
import { useThemeStore } from '@/stores/themeStore';
import { ThemeMode } from '@/types/theme';

/**
 * DAY / NIGHT / AUTO — the design's appearance switch (menu footer).
 * Preference persists via the theme store; AUTO follows the system.
 */
const OPTIONS = [
  { value: ThemeMode.Day, label: siteContent.nav.day },
  { value: ThemeMode.Night, label: siteContent.nav.night },
  { value: ThemeMode.System, label: siteContent.nav.auto },
] as const;

export const ThemeSwitch = () => {
  const { preference, setPreference } = useThemeStore((state) => ({
    preference: state.preference,
    setPreference: state.setPreference,
  }));

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-ink-muted">
        {siteContent.nav.appearance} · {siteContent.nav.appearanceNote}
      </span>
      <SegmentedControl
        options={OPTIONS}
        value={preference}
        onChange={setPreference}
        label={siteContent.a11y.themeSwitch}
      />
    </div>
  );
};
