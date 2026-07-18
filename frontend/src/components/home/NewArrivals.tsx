import type { FeaturedCollection } from '@exclusive-wear/shopify';

import { siteContent } from '@/content/site';
import { ProductCard } from '@/components/product/ProductCard';
import { Link } from '@/lib/shared/Link';
import { AppRoute } from '@/types/routes';

/**
 * Featured collection rail (design: "New Arrivals" carousel with
 * edge-peek). Horizontal scroll-snap on mobile, grid on desktop.
 */
export const NewArrivals = ({ collection }: { readonly collection: FeaturedCollection }) => (
  <section className="mx-auto w-full max-w-[1200px] px-6 py-10">
    <div className="mb-5 flex items-baseline justify-between">
      <h2 className="text-h4">{collection.title || siteContent.newArrivals.title}</h2>
      <Link
        href={AppRoute.Products}
        className="kicker transition-colors hover:text-accent"
      >
        {siteContent.newArrivals.viewAll}
      </Link>
    </div>

    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] md:grid md:grid-cols-4 md:gap-6 md:overflow-visible">
      {collection.products.map((product, index) => (
        <div key={product.id} className="w-[42vw] max-w-[260px] shrink-0 snap-start md:w-auto md:max-w-none">
          <ProductCard product={product} priority={index < 2} />
        </div>
      ))}
    </div>
  </section>
);
