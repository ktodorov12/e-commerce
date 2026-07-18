import type { Metadata } from 'next';

import { siteContent } from '@/content/site';
import { EmptyState } from '@/lib/shared/EmptyState';
import { AppRoute } from '@/types/routes';

/** Search stub — a dock destination today, a real Storefront search later. */
export const metadata: Metadata = { title: siteContent.searchPage.title };

export default function SearchPage() {
  return (
    <EmptyState
      kicker={siteContent.searchPage.kicker}
      title={siteContent.searchPage.title}
      body={siteContent.searchPage.body}
      ctaLabel={siteContent.searchPage.cta}
      ctaRoute={AppRoute.Products}
    />
  );
}
