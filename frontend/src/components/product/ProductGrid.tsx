import type { ProductListItem } from '@exclusive-wear/shopify';

import { ListingProductCard } from '@/components/product/ListingProductCard';
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton';

export interface ProductGridProps {
  readonly products: readonly ProductListItem[];
  /** Trailing placeholder cards while the next page is in flight — rendered
      inside the same grid so columns stay aligned across the boundary. */
  readonly skeletonCount?: number;
}

/** The 2-col mobile / 4-col desktop listing grid from the design. */
export const ProductGrid = ({ products, skeletonCount = 0 }: ProductGridProps) => (
  <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
    {products.map((product, index) => (
      <ListingProductCard key={product.id} product={product} priority={index < 4} />
    ))}
    {Array.from({ length: skeletonCount }, (_, index) => (
      <ProductCardSkeleton key={`skeleton-${index}`} />
    ))}
  </div>
);
