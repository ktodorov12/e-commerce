import { siteContent } from '@/content/site';

/** Delivery / returns / payment assurances (design 1a footer band). */
export const TrustBadges = () => (
  <section className="mx-auto w-full max-w-[1200px] px-6 pb-4">
    <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
      {siteContent.trust.map((badge) => (
        <div key={badge.title} className="flex flex-col gap-1">
          <span className="text-sm text-ink">{badge.title}</span>
          <span className="text-xs text-ink-muted">{badge.note}</span>
        </div>
      ))}
    </div>
  </section>
);
