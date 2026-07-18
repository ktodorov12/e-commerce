import type { ProductSummary } from '@exclusive-wear/shopify';

import { ProductCard } from '@/components/product/ProductCard';

/** The 2-col mobile / 4-col desktop listing grid from the design. */
export const ProductGrid = ({ products }: { readonly products: readonly ProductSummary[] }) => (
  <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
    {products.map((product, index) => (
      <ProductCard key={product.id} product={product} priority={index < 4} />
    ))}
  </div>
);
