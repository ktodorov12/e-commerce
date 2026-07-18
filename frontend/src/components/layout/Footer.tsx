import { siteContent } from '@/content/site';

export const Footer = () => (
  <footer className="mt-24">
    <div className="fade-rule" />
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 px-6 py-10 text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
      <span className="tracking-[0.14em]">{siteContent.brand.name}</span>
      <span>{siteContent.brand.description}</span>
    </div>
  </footer>
);
