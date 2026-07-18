import { CampaignFilm } from '@/components/home/CampaignFilm';
import { siteContent } from '@/content/site';
import { ChevronDownIcon } from '@/lib/shared/icons';
import { Link } from '@/lib/shared/Link';
import { AppRoute } from '@/types/routes';

/**
 * Full-screen campaign hero: a gif-like film (autoplay · muted · loop)
 * bleeding edge-to-edge below the top bar — the sanctioned full-bleed
 * exception to the inset rule. Overlaid in the lower third: the welcome
 * line in the script face, a quiet tagline, and two compact CTAs. The
 * drifting ambient gradient beneath covers loading, reduced motion and
 * a missing film asset.
 */
const HERO_CTA_CLASSES =
  'inline-flex items-center justify-center rounded-md border px-6 py-3 text-h6 uppercase transition-colors';

export const CampaignHero = () => (
  <section>
    <div className="relative isolate flex min-h-[calc(100svh-var(--topbar-height))] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-drift bg-[radial-gradient(120%_90%_at_50%_30%,var(--color-accent-tint)_0%,var(--color-ground)_55%,var(--color-surface)_100%)] bg-[size:140%_140%] motion-reduce:animate-none" />
        <CampaignFilm />
        {/* Legibility scrim — ground-tinted, so it works in both modes. */}
        <div className="absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--color-ground)_92%,transparent)] via-[color-mix(in_srgb,var(--color-ground)_30%,transparent)] to-[transparent]" />
      </div>

      {/* dock-clearance: the fixed dock overlays the hero's lower edge. */}
      <div className="dock-clearance mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-6">
        <h1 className="animate-rise font-script text-h1 font-normal tracking-normal text-ink">
          {siteContent.hero.headline}
        </h1>
        <p
          className="animate-rise text-xs text-ink-muted"
          style={{ animationDelay: 'var(--motion-stagger)' }}
        >
          {siteContent.hero.tagline}
        </p>

        <div
          className="flex animate-rise gap-3"
          style={{ animationDelay: 'calc(var(--motion-stagger) * 2)' }}
        >
          <Link
            href={AppRoute.Products}
            className={`${HERO_CTA_CLASSES} border-cta-border bg-cta text-cta-text`}
          >
            {siteContent.hero.ctaPrimary}
          </Link>
          <Link
            href={AppRoute.Products}
            className={`${HERO_CTA_CLASSES} border-accent text-accent-ink hover:bg-accent-tint`}
          >
            {siteContent.hero.ctaSecondary}
          </Link>
        </div>

        <span
          aria-hidden
          className="animate-bounce-soft mt-2 self-center text-ink-muted motion-reduce:animate-none"
        >
          <ChevronDownIcon />
        </span>
      </div>
    </div>
  </section>
);
