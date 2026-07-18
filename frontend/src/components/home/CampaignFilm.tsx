'use client';

import { useState } from 'react';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { AssetRoute } from '@/types/routes';
import { cx } from '@/utils/cx';

/**
 * The hero's moving layer. Mounted only after hydration and only when
 * the visitor allows motion (autoplay ignores the CSS reduced-motion
 * gate, so it is checked here). Fades in once frames are actually
 * rendering; on any load error it unmounts and the ambient still
 * beneath stays — the page never shows a broken player.
 */
export const CampaignFilm = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [filmPlaying, setFilmPlaying] = useState(false);
  const [filmFailed, setFilmFailed] = useState(false);

  if (prefersReducedMotion || filmFailed) return null;

  return (
    <video
      className={cx(
        'absolute inset-0 h-full w-full object-cover',
        'transition-opacity duration-[var(--motion-crossfade)]',
        filmPlaying ? 'opacity-100' : 'opacity-0',
      )}
      src={AssetRoute.CampaignFilm}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onPlaying={() => setFilmPlaying(true)}
      onError={() => setFilmFailed(true)}
    />
  );
};
