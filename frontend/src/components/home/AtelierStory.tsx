import { siteContent } from '@/content/site';

/** The atelier story band (design 1a) — quiet, left-aligned, asymmetric. */
export const AtelierStory = () => (
  <section className="mx-auto w-full max-w-[1200px] px-6 py-20">
    <div className="fade-rule mb-16" />
    <div className="max-w-[560px]">
      <p className="kicker mb-4">{siteContent.atelier.kicker}</p>
      <h2 className="mb-6 text-h2">{siteContent.atelier.headline}</h2>
      <p className="text-base text-ink-muted">{siteContent.atelier.body}</p>
    </div>
  </section>
);
