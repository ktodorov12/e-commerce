import type { Metadata } from 'next';

import { siteContent } from '@/content/site';
import { EmptyState } from '@/lib/shared/EmptyState';
import { AppRoute } from '@/types/routes';

/** Global fallback: unmatched URLs and every notFound() call land here. */
export const metadata: Metadata = { title: siteContent.notFoundPage.title };

export default function NotFoundPage() {
  return (
    <EmptyState
      kicker={siteContent.notFoundPage.kicker}
      title={siteContent.notFoundPage.title}
      body={siteContent.notFoundPage.body}
      ctaLabel={siteContent.notFoundPage.cta}
      ctaRoute={AppRoute.Products}
    />
  );
}
