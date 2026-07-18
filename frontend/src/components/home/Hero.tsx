import type { ShopImage } from '@exclusive-wear/shopify';

import { siteContent } from '@/content/site';
import { Link } from '@/lib/shared/Link';
import { ProductImage } from '@/lib/shared/ProductImage';
import { AppRoute } from '@/types/routes';

/**
 * Campaign hero (design 1a/2b): slow-zooming media, kicker, headline
 * with a word-stagger rise, two CTAs in the lower third. The primary
 * CTA is ink-filled on day / accent-outlined on night via the cta tokens.
 */
const CTA_BASE_CLASSES =
  'inline-flex items-center justify-center rounded-md border px-8 py-4 text-sm transition-colors';

export const Hero = ({ image }: { readonly image: ShopImage | null }) => {
  const words = siteContent.hero.headline.split(' ');

  return (
    <section className="relative isolate flex min-h-[78svh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 -z-10 animate-slow-zoom motion-reduce:animate-none">
        <ProductImage
          image={image}
          alt={siteContent.hero.kicker}
          sizes="100vw"
          priority
          className="h-full w-full"
          placeholderLabel={siteContent.hero.kicker}
        />
        {/* Legibility scrim — ground-tinted, so it works in both modes. */}
        <div className="absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--color-ground)_92%,transparent)] via-[color-mix(in_srgb,var(--color-ground)_35%,transparent)] to-[transparent]" />
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-6 pb-16">
        <p className="kicker mb-4 animate-rise">{siteContent.hero.kicker}</p>
        <h1 className="mb-8 max-w-[14ch] text-h1 md:text-[56px] md:leading-[1.08]">
          {words.map((word, index) => (
            <span key={word} className="inline-block overflow-hidden pb-1 align-bottom">
              <span
                className="inline-block animate-rise pr-[0.28ch]"
                style={{ animationDelay: `calc(var(--motion-stagger) * ${index})` }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <div
          className="flex animate-rise gap-4"
          style={{ animationDelay: `calc(var(--motion-stagger) * ${words.length})` }}
        >
          <Link
            href={AppRoute.Products}
            className={`${CTA_BASE_CLASSES} border-cta-border bg-cta text-cta-text`}
          >
            {siteContent.hero.ctaPrimary}
          </Link>
          <Link
            href={AppRoute.Products}
            className={`${CTA_BASE_CLASSES} border-divider text-ink hover:border-accent`}
          >
            {siteContent.hero.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
};
