import type { ProductSummary } from '@exclusive-wear/shopify';

import { siteContent } from '@/content/site';
import { Link } from '@/lib/shared/Link';
import { Price } from '@/lib/shared/Price';
import { ProductImage } from '@/lib/shared/ProductImage';
import { Tag } from '@/lib/shared/Tag';
import { buildProductRoute } from '@/types/routes';
import { TagVariant } from '@/types/ui';

/**
 * Grid card (server component): image well, title, price with markdown.
 * "NEW" tags come later — mock.shop exposes no reliable signal for it.
 */
export interface ProductCardProps {
  readonly product: ProductSummary;
  readonly priority?: boolean;
}

export const ProductCard = ({ product, priority = false }: ProductCardProps) => (
  <Link
    href={buildProductRoute(product.handle)}
    className="group flex flex-col gap-2"
    data-testid="product-card"
  >
    <div className="relative">
      <ProductImage
        image={product.image}
        alt={product.title}
        sizes="(max-width: 768px) 50vw, 25vw"
        priority={priority}
        className="aspect-[3/4] rounded-md transition-transform duration-300 ease-[var(--ease-soft)] group-hover:scale-[1.01]"
        placeholderLabel={product.title}
      />
      {!product.available ? (
        <Tag variant={TagVariant.Neutral} className="absolute top-3 left-3">
          {siteContent.pdp.soldOut}
        </Tag>
      ) : null}
    </div>
    <span className="truncate text-sm text-ink">{product.title}</span>
    <Price
      price={product.price}
      compareAtPrice={product.compareAtPrice}
      showDiscountTag
      className="text-sm"
    />
  </Link>
);
