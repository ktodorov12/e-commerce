'use client';

import { Moon, Sun } from 'lucide-react';

import { siteContent } from '@/content/site';
import { Button } from '@/lib/shared/Button';
import { readAppliedTheme, useThemeStore } from '@/stores/themeStore';
import { ThemeMode } from '@/types/theme';
import { ButtonSize, ButtonVariant } from '@/types/ui';

/**
 * Header day/night toggle. Both glyphs are always in the DOM; CSS swaps them
 * on `html[data-theme]` — which ThemeScript sets before first paint — so the
 * right icon shows from the first frame and there is no hydration swap. The
 * click writes an explicit Day/Night preference; the theme store persists it to
 * localStorage and applies it. The menu's segmented control keeps the AUTO
 * (follow-system) option — this is the fast binary flip most sites offer.
 */

/** Matches the other header icon buttons (bag, menu). */
const ICON_SIZE = 20;
/** Thin stroke, to sit with the hand-inlined Phosphor-styled header icons. */
const ICON_STROKE = 1.5;

export const ThemeToggle = () => {
  const { setPreference } = useThemeStore((state) => ({ setPreference: state.setPreference }));

  const toggle = () => {
    const next = readAppliedTheme() === ThemeMode.Night ? ThemeMode.Day : ThemeMode.Night;
    setPreference(next);
  };

  return (
    <Button
      variant={ButtonVariant.Ghost}
      size={ButtonSize.Icon}
      aria-label={siteContent.a11y.toggleTheme}
      onClick={toggle}
      className="text-ink"
    >
      <Sun size={ICON_SIZE} strokeWidth={ICON_STROKE} aria-hidden className="block night:hidden" />
      <Moon size={ICON_SIZE} strokeWidth={ICON_STROKE} aria-hidden className="hidden night:block" />
    </Button>
  );
};
