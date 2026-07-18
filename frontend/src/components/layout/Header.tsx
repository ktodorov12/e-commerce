'use client';

import { siteContent } from '@/content/site';
import { useTopBarHidden } from '@/hooks/useScrollChrome';
import { Link } from '@/lib/shared/Link';
import { AppRoute } from '@/types/routes';
import { cx } from '@/utils/cx';

/**
 * Top bar: the wordmark only — it doubles as the Home link, and it
 * exists only at the very top of the page. Once you scroll it drops
 * away and stays away (transform only, so nothing jitters); the fixed
 * BottomDock is the navigation from there on.
 */
export const Header = () => {
  const hidden = useTopBarHidden();

  return (
    <header
      className={cx(
        'sticky top-0 z-40 border-b border-divider',
        'bg-[color-mix(in_srgb,var(--color-ground)_88%,transparent)] backdrop-blur-md',
        'transition-transform duration-[var(--motion-crossfade)] ease-[var(--ease-soft)]',
        hidden && '-translate-y-full',
      )}
    >
      <div className="mx-auto flex h-[var(--topbar-height)] w-full max-w-[1200px] items-center justify-center px-6">
        <Link href={AppRoute.Home} className="text-wordmark text-ink">
          {siteContent.brand.name}
        </Link>
      </div>
    </header>
  );
};
