import { siteContent } from '@/content/site';
import { InstagramIcon, TelegramIcon } from '@/lib/shared/icons';
import { Link } from '@/lib/shared/Link';
import { Tag } from '@/lib/shared/Tag';
import { buildInfoRoute, ExternalUrl } from '@/types/routes';
import type { InfoTopic } from '@/types/routes';
import { TagVariant } from '@/types/ui';

/**
 * Footer (elyx structure in the house style): brand line → link columns
 * (guarded /info/[topic] pages) + socials + region → payment badges +
 * copyright. Server component; the year is resolved per revalidation.
 */

const FOOTER_LINK_CLASSES = 'text-sm text-ink-muted transition-colors hover:text-ink';

const COPYRIGHT_YEAR = new Date().getFullYear();

const FooterLinkColumn = ({
  title,
  links,
}: {
  readonly title: string;
  readonly links: readonly { readonly topic: InfoTopic; readonly label: string }[];
}) => (
  <nav aria-label={title} className="flex flex-col gap-3">
    <span className="kicker">{title}</span>
    {links.map((link) => (
      <Link key={link.topic} href={buildInfoRoute(link.topic)} className={FOOTER_LINK_CLASSES}>
        {link.label}
      </Link>
    ))}
  </nav>
);

export const Footer = () => (
  <footer className="mt-24">
    <div className="fade-rule" />
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-6 py-10">
      <div className="flex flex-col gap-3">
        <span className="text-wordmark text-ink">{siteContent.brand.name}</span>
        <span className="max-w-[52ch] text-xs text-ink-muted">
          {siteContent.brand.description}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        <FooterLinkColumn
          title={siteContent.footer.customerService}
          links={siteContent.footer.serviceLinks}
        />
        <FooterLinkColumn title={siteContent.footer.about} links={siteContent.footer.aboutLinks} />

        <div className="flex flex-col gap-3">
          <span className="kicker">{siteContent.footer.follow}</span>
          <div className="flex gap-3">
            <Link
              href={ExternalUrl.Instagram}
              aria-label={siteContent.footer.socialInstagram}
              className="text-ink-muted transition-colors hover:text-ink"
            >
              <InstagramIcon />
            </Link>
            <Link
              href={ExternalUrl.Telegram}
              aria-label={siteContent.footer.socialTelegram}
              className="text-ink-muted transition-colors hover:text-ink"
            >
              <TelegramIcon />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="kicker">{siteContent.footer.regionTitle}</span>
          <span className="text-sm text-ink-muted">{siteContent.footer.region}</span>
        </div>
      </div>

      <div className="fade-rule" />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {siteContent.footer.payments.map((method) => (
            <Tag key={method} variant={TagVariant.Outline}>
              {method}
            </Tag>
          ))}
        </div>
        <span className="text-xs text-ink-muted">
          © {COPYRIGHT_YEAR} {siteContent.brand.legalName}
        </span>
      </div>
    </div>
  </footer>
);
