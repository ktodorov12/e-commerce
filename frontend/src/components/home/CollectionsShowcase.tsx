import type { Collection } from '@exclusive-wear/shopify';

import { siteContent } from '@/content/site';
import { ArrowRightIcon } from '@/lib/shared/icons';
import { Link } from '@/lib/shared/Link';
import { ProductImage } from '@/lib/shared/ProductImage';
import { AppRoute } from '@/types/routes';
import { CapsuleTone } from '@/types/ui';
import { cx } from '@/utils/cx';

/**
 * Collections (design 2b): the backend collections as wide image cards,
 * followed by curated capsules (New Arrivals / Winter / Promo / Special)
 * rendered as toned tiles. Everything routes to the listing until
 * per-collection pages exist.
 */

const CAPSULE_TONE_CLASSES: Readonly<Record<CapsuleTone, string>> = {
  [CapsuleTone.Fresh]:
    'bg-[linear-gradient(160deg,var(--color-surface),var(--color-accent-tint))] text-ink',
  [CapsuleTone.Frost]:
    'bg-[linear-gradient(200deg,var(--color-accent-tint),var(--color-ground))] text-ink',
  [CapsuleTone.Sale]: 'border border-accent bg-accent-tint text-accent-ink',
  [CapsuleTone.Gold]: 'bg-ink text-ground night:bg-accent-tint night:text-ink',
};

export const CollectionsShowcase = ({
  collections,
}: {
  readonly collections: readonly Collection[];
}) => (
  <section className="mx-auto w-full max-w-[1200px] px-6 py-10">
    <h2 className="mb-5 text-h4">{siteContent.collections.title}</h2>

    {collections.length > 0 ? (
      <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={AppRoute.Products}
            className="group relative block overflow-hidden rounded-lg"
          >
            <ProductImage
              image={collection.image}
              alt={collection.title}
              sizes="(max-width: 768px) 90vw, 400px"
              className="aspect-[7/3] transition-transform duration-300 ease-[var(--ease-soft)] group-hover:scale-[1.01] md:aspect-[4/3]"
              placeholderLabel={collection.title}
            />
            <span className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-[color-mix(in_srgb,var(--color-ground)_85%,transparent)] to-[transparent] px-4 pt-8 pb-4 text-h5 text-ink">
              {collection.title}
              <ArrowRightIcon
                size={14}
                className="text-accent-ink transition-transform duration-300 ease-[var(--ease-soft)] group-hover:translate-x-1"
              />
            </span>
          </Link>
        ))}
      </div>
    ) : null}

    <div className="mt-4 grid grid-cols-2 gap-4 md:mt-6 md:grid-cols-4 md:gap-6">
      {siteContent.collections.curated.map((capsule) => (
        <Link
          key={capsule.label}
          href={AppRoute.Products}
          className={cx(
            'group flex aspect-[4/3] flex-col justify-end gap-1 rounded-lg p-5',
            CAPSULE_TONE_CLASSES[capsule.tone],
          )}
        >
          <span className="flex items-center gap-2 text-h5">
            {capsule.label}
            <ArrowRightIcon
              size={14}
              className="transition-transform duration-300 ease-[var(--ease-soft)] group-hover:translate-x-1"
            />
          </span>
          <span className="text-xs opacity-70">{capsule.note}</span>
        </Link>
      ))}
    </div>
  </section>
);
