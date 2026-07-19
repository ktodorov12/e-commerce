'use client';

import { useRef, useState } from 'react';
import type { ShopImage } from '@exclusive-wear/shopify';

import { siteContent } from '@/content/site';
import { ProductImage } from '@/lib/shared/ProductImage';
import { cx } from '@/utils/cx';

/**
 * Edge-to-edge swipe gallery with counter and ticks (design: 1f).
 * Scroll-snap does the swiping; a passive scroll listener derives the
 * active index (passive — it never calls preventDefault).
 */
export const ProductGallery = ({
  images,
  title,
}: {
  readonly images: readonly ShopImage[];
  readonly title: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const track = trackRef.current;
    if (track === null || track.clientWidth === 0) return;
    setActiveIndex(Math.round(track.scrollLeft / track.clientWidth));
  };

  if (images.length === 0) {
    return <ProductImage image={null} placeholderLabel={title} className="aspect-[3/4] w-full" />;
  }

  return (
    <figure className="relative m-0">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none]"
      >
        {images.map((image, index) => (
          <ProductImage
            key={image.url}
            image={image}
            alt={`${title}, ${siteContent.a11y.galleryImage} ${index + 1}`}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
            className="aspect-[3/4] w-full shrink-0 snap-center"
          />
        ))}
      </div>

      {images.length > 1 ? (
        <figcaption className="mt-3 flex items-center justify-between px-1">
          <span className="kicker">
            {activeIndex + 1} / {images.length} · {siteContent.pdp.galleryHint}
          </span>
          <span className="flex items-center gap-2" aria-hidden="true">
            {images.map((image, index) => (
              <span
                key={image.url}
                className={cx(
                  'h-1 rounded-full transition-all duration-300',
                  index === activeIndex ? 'w-8 bg-accent' : 'w-3 bg-divider',
                )}
              />
            ))}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
};
