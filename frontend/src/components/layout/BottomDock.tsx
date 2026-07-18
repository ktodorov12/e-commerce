'use client';

import { usePathname } from 'next/navigation';

import { siteContent } from '@/content/site';
import { useCartDrawerActions } from '@/hooks/useCartMachine';
import { useMenuActions } from '@/hooks/useMenuMachine';
import { Button } from '@/lib/shared/Button';
import { BagIcon, HeartIcon, HomeIcon, MenuIcon, SearchIcon, ShopIcon } from '@/lib/shared/icons';
import { Link } from '@/lib/shared/Link';
import { selectTotalQuantity, useCartStore } from '@/stores/cartStore';
import { AppRoute } from '@/types/routes';
import { ButtonSize, ButtonVariant } from '@/types/ui';
import { cx } from '@/utils/cx';

/**
 * The bottom dock (design 1b/1i, YouTube-style): part of the screen —
 * full-width, flush to the bottom edge on every page, icon-only, the
 * accent tick marks where you are. The top corners curve down into the
 * screen edges (the "wave", radius-xl) so the pill reads as spilling
 * out to the edges, with the ground visible above the curves.
 */

const DOCK_LINKS = [
  { href: AppRoute.Home, label: siteContent.nav.home, Icon: HomeIcon },
  { href: AppRoute.Products, label: siteContent.nav.shopAll, Icon: ShopIcon },
  { href: AppRoute.Search, label: siteContent.nav.search, Icon: SearchIcon },
  { href: AppRoute.Saved, label: siteContent.nav.saved, Icon: HeartIcon },
] as const;

const DOCK_ITEM_CLASSES =
  'relative flex h-full min-w-0 flex-1 flex-col items-center justify-center rounded-md transition-colors';
const DOCK_ICON_SIZE = 19;

/** Home matches exactly; section routes also own their subtree (PDP → Shop). */
const isDockRouteActive = (pathname: string, route: AppRoute): boolean =>
  route === AppRoute.Home ? pathname === AppRoute.Home : pathname.startsWith(route);

/** Leaf island — only this cell re-renders when the bag count changes. */
const DockBagButton = () => {
  const totalQuantity = useCartStore(selectTotalQuantity);
  const { open } = useCartDrawerActions();

  return (
    <Button
      variant={ButtonVariant.Dock}
      size={ButtonSize.Dock}
      aria-label={siteContent.a11y.openCart}
      onClick={open}
      className="text-ink-muted hover:text-ink"
    >
      <span className="relative">
        <BagIcon size={DOCK_ICON_SIZE} />
        {totalQuantity > 0 ? (
          <span aria-hidden className="absolute -top-1 -right-2 h-2 w-2 rounded-full bg-accent" />
        ) : null}
      </span>
    </Button>
  );
};

const DockMenuButton = () => {
  const { open } = useMenuActions();

  return (
    <Button
      variant={ButtonVariant.Dock}
      size={ButtonSize.Dock}
      aria-label={siteContent.a11y.openMenu}
      onClick={open}
      className="text-ink-muted hover:text-ink"
    >
      <MenuIcon size={DOCK_ICON_SIZE} />
    </Button>
  );
};

export const BottomDock = () => {
  const pathname = usePathname();

  return (
    <nav
      aria-label={siteContent.a11y.bottomNavigation}
      className={cx(
        'fixed inset-x-0 bottom-0 z-40',
        'rounded-t-xl border border-b-0 border-divider',
        'bg-[color-mix(in_srgb,var(--color-surface)_92%,transparent)] shadow-lg backdrop-blur-md',
        'pb-[env(safe-area-inset-bottom)]',
      )}
    >
      <div className="mx-auto flex h-20 max-w-[420px] items-stretch">
        {DOCK_LINKS.map(({ href, label, Icon }) => {
          const active = isDockRouteActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={active ? 'page' : undefined}
              className={cx(
                DOCK_ITEM_CLASSES,
                active ? 'text-accent-ink' : 'text-ink-muted hover:text-ink',
              )}
            >
              {active ? (
                <span aria-hidden className="absolute top-2 h-1 w-8 rounded-full bg-accent" />
              ) : null}
              <Icon size={DOCK_ICON_SIZE} />
            </Link>
          );
        })}
        <DockBagButton />
        <DockMenuButton />
      </div>
    </nav>
  );
};
