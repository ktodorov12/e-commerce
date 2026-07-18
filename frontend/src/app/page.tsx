import { getCollections, getFeaturedCollection } from '@exclusive-wear/shopify';

import { AtelierStory } from '@/components/home/AtelierStory';
import { CampaignHero } from '@/components/home/CampaignHero';
import { CollectionsShowcase } from '@/components/home/CollectionsShowcase';
import { CommunityStrip } from '@/components/home/CommunityStrip';
import { NewArrivals } from '@/components/home/NewArrivals';
import { TrustBadges } from '@/components/home/TrustBadges';

/** Home: campaign hero → new arrivals → atelier → collections → people → trust. */
export const revalidate = 300;

const COLLECTIONS_SHOWN = 3;

export default async function HomePage() {
  const [featured, collections] = await Promise.all([
    getFeaturedCollection(),
    getCollections(COLLECTIONS_SHOWN),
  ]);

  return (
    <>
      <CampaignHero />
      {featured !== null && featured.products.length > 0 ? (
        <NewArrivals collection={featured} />
      ) : null}
      <AtelierStory />
      <CollectionsShowcase collections={collections} />
      <CommunityStrip />
      <TrustBadges />
    </>
  );
}
