import { siteContent } from '@/content/site';

/**
 * The atelier story band (design 2b): the page's one saturated
 * "presence" moment — an ink-flooded card with gold type on day, the
 * indigo accent tint on night. Inset and rounded per the composition
 * rules, never a full-bleed flood.
 */
export const AtelierStory = () => (
  <section className="mx-auto w-full max-w-[1200px] px-6 py-10">
    <div className="flex flex-col items-start gap-4 rounded-lg bg-ink p-10 night:bg-accent-tint">
      <p className="kicker text-accent night:text-accent-ink">{siteContent.atelier.kicker}</p>
      <h2 className="max-w-[18ch] text-h3 text-ground night:text-ink">
        {siteContent.atelier.headline}
      </h2>
      <p className="max-w-[44ch] text-sm text-ground/70 night:text-ink-muted">
        {siteContent.atelier.body}
      </p>
    </div>
  </section>
);
