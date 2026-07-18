import { Fragment } from 'react';

import { siteContent } from '@/content/site';

/**
 * The live marquee bar (design: announcement ticker above the header).
 * Content is duplicated for the seamless loop; the copy is aria-hidden.
 * Reduced motion stops the animation globally (globals.css).
 */
const tickerLine = siteContent.announcements.join(' · ');

const TickerContent = ({ hidden }: { readonly hidden?: boolean }) => (
  <span aria-hidden={hidden} className="whitespace-nowrap px-4">
    {siteContent.announcements.map((announcement) => (
      <Fragment key={announcement}>
        <span className="px-8">{announcement}</span>
        <span aria-hidden="true" className="text-accent-ink">
          ·
        </span>
      </Fragment>
    ))}
  </span>
);

export const AnnouncementBar = () => (
  <div
    role="marquee"
    aria-label={siteContent.a11y.announcement}
    title={tickerLine}
    className="overflow-hidden border-b border-divider bg-surface py-2 text-2xs tracking-widest uppercase"
  >
    <div className="flex w-max animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
      <TickerContent />
      <TickerContent hidden />
    </div>
  </div>
);
