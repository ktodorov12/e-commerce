import { Link } from '@/lib/shared/Link';
import type { NavigableRoute } from '@/types/routes';

/**
 * Full-width empty/placeholder state: kicker, headline, note, one CTA.
 * Used by the Search and Saved stubs until those features land.
 */
export interface EmptyStateProps {
  readonly kicker: string;
  readonly title: string;
  readonly body: string;
  readonly ctaLabel: string;
  readonly ctaRoute: NavigableRoute;
}

export const EmptyState = ({ kicker, title, body, ctaLabel, ctaRoute }: EmptyStateProps) => (
  <section className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-4 px-6 py-16">
    <p className="kicker">{kicker}</p>
    <h1 className="text-h2">{title}</h1>
    <p className="max-w-[46ch] text-sm text-ink-muted">{body}</p>
    <Link
      href={ctaRoute}
      className="mt-2 inline-flex items-center justify-center rounded-md border border-cta-border bg-cta px-8 py-4 text-h6 uppercase text-cta-text transition-colors"
    >
      {ctaLabel}
    </Link>
  </section>
);
