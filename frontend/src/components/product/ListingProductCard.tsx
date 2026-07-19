'use client';

import { useRef, useState } from 'react';
import type { ProductListItem, ShopImage } from '@exclusive-wear/shopify';

import { siteContent } from '@/content/site';
import { useListingOverlayActions } from '@/hooks/useListingOverlayMachine';
import { Button } from '@/lib/shared/Button';
import { BagIcon, HeartIcon } from '@/lib/shared/icons';
import { Link } from '@/lib/shared/Link';
import { Price } from '@/lib/shared/Price';
import { ProductImage } from '@/lib/shared/ProductImage';
import { Tag } from '@/lib/shared/Tag';
import { useSavedStore } from '@/stores/savedStore';
import { buildProductRoute } from '@/types/routes';
import { ButtonSize, ButtonVariant, TagVariant } from '@/types/ui';
import { cx } from '@/utils/cx';

/**
 * Listing grid card (design 2c): a swipeable photo well with ticks flagging
 * that more photos exist, a heart (save) and bag (quick pick) floating over
 * it, then name on the left / price on the right. The card body is one link
 * to the PDP; the two buttons sit outside the anchor.
 */

// `!` because the Button base's rounded-md would otherwise win the cascade.
const FLOATING_ACTION_CLASSES =
  'h-12 w-12 rounded-full! bg-[color-mix(in_srgb,var(--color-ground)_75%,transparent)] backdrop-blur-sm';

const cardGalleryImages = (product: ProductListItem): readonly ShopImage[] => {
  if (product.images.length > 0) return product.images;
  return product.image !== null ? [product.image] : [];
};

export interface ListingProductCardProps {
  readonly product: ProductListItem;
  readonly priority?: boolean;
  /** When false, renders only the primary image — no swipe gallery, no dot indicator. */
  readonly imageGalleryScrollEnabled?: boolean;
}

export const ListingProductCard = ({
  product,
  priority = false,
  imageGalleryScrollEnabled = true,
}: ListingProductCardProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const { openQuickPick } = useListingOverlayActions();
  const { saved, toggleSaved } = useSavedStore((state) => ({
    saved: state.savedProductHandles.includes(product.handle),
    toggleSaved: state.toggleSaved,
  }));

  const images = cardGalleryImages(product);

  const onTrackScroll = () => {
    const track = trackRef.current;
    if (track === null || track.clientWidth === 0) return;
    setActiveImageIndex(Math.round(track.scrollLeft / track.clientWidth));
  };

  return (
    <div className="group relative">
      <Link
        href={buildProductRoute(product.handle)}
        className="flex flex-col gap-2"
        data-testid="product-card"
      >
        <div className="relative overflow-hidden rounded-md">
          {images.length === 0 ? (
            <ProductImage
              image={null}
              className="aspect-[3/4] w-full"
              placeholderLabel={product.title}
            />
          ) : imageGalleryScrollEnabled ? (
            <div
              ref={trackRef}
              onScroll={onTrackScroll}
              className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]"
            >
              {images.map((image, index) => (
                <ProductImage
                  key={image.url}
                  image={image}
                  alt={`${product.title}, ${siteContent.a11y.galleryImage} ${index + 1}`}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  priority={priority && index === 0}
                  className="aspect-[3/4] w-full shrink-0 snap-center"
                  placeholderLabel={product.title}
                />
              ))}
            </div>
          ) : (
            <ProductImage
              image={images[0] ?? null}
              alt={`${product.title}, ${siteContent.a11y.galleryImage} 1`}
              sizes="(max-width: 768px) 50vw, 25vw"
              priority={priority}
              className="aspect-[3/4] w-full"
              placeholderLabel={product.title}
            />
          )}

          {!product.available ? (
            <Tag variant={TagVariant.Neutral} className="absolute top-3 left-3">
              {siteContent.pdp.soldOut}
            </Tag>
          ) : null}

          {imageGalleryScrollEnabled && images.length > 1 ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5"
            >
              {images.map((image, index) => (
                <span
                  key={image.url}
                  className={cx(
                    'h-1 rounded-full transition-all duration-300',
                    index === activeImageIndex
                      ? 'w-6 bg-accent'
                      : 'w-2 bg-[color-mix(in_srgb,var(--color-ink)_25%,transparent)]',
                  )}
                />
              ))}
            </span>
          ) : null}
        </div>

        <span className="flex items-baseline justify-between gap-3">
          <span className="truncate text-xs text-ink-muted italic">{product.title}</span>
          <Price
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            className="shrink-0 text-sm font-medium text-ink"
          />
        </span>
      </Link>

      <span className="absolute top-3 right-3 flex flex-col gap-2">
        <Button
          variant={ButtonVariant.Ghost}
          size={ButtonSize.Icon}
          aria-label={saved ? siteContent.a11y.removeFromSaved : siteContent.a11y.addToSaved}
          aria-pressed={saved}
          onClick={() => toggleSaved(product.handle)}
          className={FLOATING_ACTION_CLASSES}
          data-testid="save-product"
        >
          <HeartIcon
            size={15}
            fill={saved ? 'currentColor' : 'none'}
            className={saved ? 'text-accent-ink' : 'text-ink'}
          />
        </Button>
        <Button
          variant={ButtonVariant.Ghost}
          size={ButtonSize.Icon}
          aria-label={siteContent.a11y.quickAdd}
          aria-haspopup="dialog"
          onClick={() => openQuickPick(product)}
          className={FLOATING_ACTION_CLASSES}
          data-testid="quick-add"
        >
          <BagIcon size={15} className="text-ink" />
        </Button>
      </span>
    </div>
  );
};
