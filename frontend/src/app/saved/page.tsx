import type { Metadata } from 'next';

import { siteContent } from '@/content/site';
import { EmptyState } from '@/lib/shared/EmptyState';
import { AppRoute } from '@/types/routes';

/** Saved stub — a dock destination today, a wishlist store later. */
export const metadata: Metadata = { title: siteContent.savedPage.title };

export default function SavedPage() {
  return (
    <EmptyState
      kicker={siteContent.savedPage.kicker}
      title={siteContent.savedPage.title}
      body={siteContent.savedPage.body}
      ctaLabel={siteContent.savedPage.cta}
      ctaRoute={AppRoute.Products}
    />
  );
}
