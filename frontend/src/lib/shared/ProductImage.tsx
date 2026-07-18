import Image from 'next/image';
import type { ShopImage } from '@exclusive-wear/shopify';

import { siteContent } from '@/content/site';
import { cx } from '@/utils/cx';

/**
 * The only next/image in the app. Imagery treatment follows the design:
 * a warm-neutral image well on day; on night the photograph blends into
 * the ground (`mix-blend-mode: lighten`) so dark backdrops fall away.
 */
export interface ProductImageProps {
  readonly image: ShopImage | null;
  readonly alt?: string;
  readonly sizes?: string;
  readonly priority?: boolean;
  /** Aspect/layout come from the caller (e.g. `aspect-[3/4]`). */
  readonly className?: string;
  readonly placeholderLabel?: string;
  /** Night blend suits product shots on dark grounds — turn it off for
      lifestyle photography shot on light sets. */
  readonly blendOnNight?: boolean;
}

export const ProductImage = ({
  image,
  alt,
  sizes,
  priority = false,
  className,
  placeholderLabel,
  blendOnNight = true,
}: ProductImageProps) => (
  <div
    className={cx(
      'relative overflow-hidden bg-accent-tint night:bg-[transparent]',
      className,
    )}
  >
    {image ? (
      <Image
        src={image.url}
        alt={alt ?? image.altText ?? siteContent.a11y.productImage}
        fill
        sizes={sizes}
        priority={priority}
        className={cx('object-cover', blendOnNight && 'night:mix-blend-lighten')}
      />
    ) : (
      <span className="kicker absolute inset-0 flex items-center justify-center">
        {placeholderLabel ?? siteContent.a11y.productImage}
      </span>
    )}
  </div>
);
