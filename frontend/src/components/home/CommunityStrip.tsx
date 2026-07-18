import type { ShopImage } from '@exclusive-wear/shopify';

import { siteContent } from '@/content/site';
import { ProductImage } from '@/lib/shared/ProductImage';
import { AssetRoute } from '@/types/routes';

/**
 * "The people" strip (elyx's lifestyle photography, recomposed as a
 * swipeable rail): portrait cards with a caption pinned to the lower
 * edge. Photography is mock (Unsplash, `public/people/`) until real
 * campaign shots exist — swap the files, keep the routes.
 */

const PORTRAIT_DIMENSIONS = { width: 800, height: 1200 } as const;

const toPortraitImage = (asset: AssetRoute, caption: string): ShopImage => ({
  url: asset,
  altText: caption,
  width: PORTRAIT_DIMENSIONS.width,
  height: PORTRAIT_DIMENSIONS.height,
});

const PORTRAITS: readonly ShopImage[] = [
  toPortraitImage(AssetRoute.CommunityPortraitOne, siteContent.community.captions.portraitOne),
  toPortraitImage(AssetRoute.CommunityPortraitTwo, siteContent.community.captions.portraitTwo),
  toPortraitImage(AssetRoute.CommunityPortraitThree, siteContent.community.captions.portraitThree),
  toPortraitImage(AssetRoute.CommunityPortraitFour, siteContent.community.captions.portraitFour),
];

export const CommunityStrip = () => (
  <section className="mx-auto w-full max-w-[1200px] px-6 py-10">
    <div className="mb-5 flex items-end justify-between">
      <div className="flex flex-col gap-2">
        <p className="kicker">{siteContent.community.kicker}</p>
        <h2 className="text-h4">{siteContent.community.title}</h2>
      </div>
      <span className="kicker">{siteContent.community.handle}</span>
    </div>

    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] md:grid md:grid-cols-4 md:gap-6 md:overflow-visible">
      {PORTRAITS.map((portrait) => (
        <figure
          key={portrait.url}
          className="relative w-[56vw] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-lg md:w-auto md:max-w-none"
        >
          <ProductImage
            image={portrait}
            alt={portrait.altText ?? siteContent.community.title}
            sizes="(max-width: 768px) 56vw, 300px"
            className="aspect-[3/4]"
            blendOnNight={false}
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--color-ground)_85%,transparent)] to-[transparent] px-4 pt-8 pb-3 text-xs text-ink">
            {portrait.altText}
          </figcaption>
        </figure>
      ))}
    </div>
  </section>
);
