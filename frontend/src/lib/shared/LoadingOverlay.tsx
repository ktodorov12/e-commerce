'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

import { siteContent } from '@/content/site';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cx } from '@/utils/cx';

/**
 * Full-screen navigation loader: a wave of accent squares (GSAP stagger,
 * each square yoyo-lifting after the previous) over a blurred ground
 * scrim, "Loading" underneath. Reduced motion shows the squares still.
 */

const WAVE_SQUARE_COUNT = 4;
/** GSAP tween values (px / seconds) — animation intensity, not layout. */
const WAVE_LIFT = 10;
const WAVE_DURATION_SECONDS = 0.32;
const WAVE_STAGGER_SECONDS = 0.11;

export interface LoadingOverlayProps {
  /** Defaults to true so route `loading.tsx` files can render it bare. */
  readonly active?: boolean;
}

export const LoadingOverlay = ({ active = true }: LoadingOverlayProps) => {
  const squaresRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (!active || reducedMotion) return undefined;
    const squares = squaresRef.current?.children;
    if (squares === undefined || squares.length === 0) return undefined;
    const wave = gsap.to(squares, {
      y: -WAVE_LIFT,
      duration: WAVE_DURATION_SECONDS,
      ease: 'sine.inOut',
      stagger: { each: WAVE_STAGGER_SECONDS, repeat: -1, yoyo: true },
    });
    return () => {
      wave.kill();
      gsap.set(squares, { y: 0 });
    };
  }, [active, reducedMotion]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={!active}
      className={cx(
        'fixed inset-0 z-50 flex flex-col items-center justify-center gap-5',
        'bg-[color-mix(in_srgb,var(--color-ground)_80%,transparent)] backdrop-blur-sm',
        'transition-opacity duration-[var(--motion-crossfade)]',
        active ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <div ref={squaresRef} className="flex items-end gap-2">
        {Array.from({ length: WAVE_SQUARE_COUNT }, (_, squareIndex) => (
          <span key={squareIndex} className="h-3 w-3 rounded-sm bg-accent" />
        ))}
      </div>
      <span className="kicker">{siteContent.loading.label}</span>
    </div>
  );
};
