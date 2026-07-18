import { getFeaturedCollection } from '@exclusive-wear/shopify';

import { AtelierStory } from '@/components/home/AtelierStory';
import { Hero } from '@/components/home/Hero';
import { NewArrivals } from '@/components/home/NewArrivals';
import { TrustBadges } from '@/components/home/TrustBadges';

/** Home: hero → featured collection → atelier story → trust row. */
export const revalidate = 300;

export default async function HomePage() {
  const featured = await getFeaturedCollection();
  const heroImage = featured?.products.find((product) => product.image !== null)?.image ?? null;

  return (
    <>
      <Hero image={heroImage} />
      {featured !== null && featured.products.length > 0 ? (
        <NewArrivals collection={featured} />
      ) : null}
      <AtelierStory />
      <TrustBadges />
    </>
  );
}
