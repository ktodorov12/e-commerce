'use client';

import { siteContent } from '@/content/site';
import { CurrencySwitch } from '@/components/layout/CurrencySwitch';
import { ThemeSwitch } from '@/components/layout/ThemeSwitch';
import { useMenuActions, useMenuOpen } from '@/hooks/useMenuMachine';
import { Button } from '@/lib/shared/Button';
import { CloseIcon, HeartIcon, HomeIcon, SearchIcon, ShopIcon } from '@/lib/shared/icons';
import { Drawer } from '@/lib/shared/Drawer';
import { Link } from '@/lib/shared/Link';
import { AppRoute } from '@/types/routes';
import { ButtonSize, ButtonVariant, DrawerSide } from '@/types/ui';

/**
 * Full-screen burger menu as a grid of tiles: the four destinations as
 * tappable boxes, then the appearance and currency preferences as
 * full-width tiles. No footer section — everything lives in the grid.
 */
const MENU_TILES = [
  { href: AppRoute.Home, label: siteContent.nav.home, Icon: HomeIcon },
  { href: AppRoute.Products, label: siteContent.nav.shopAll, Icon: ShopIcon },
  { href: AppRoute.Search, label: siteContent.nav.search, Icon: SearchIcon },
  { href: AppRoute.Saved, label: siteContent.nav.saved, Icon: HeartIcon },
] as const;

const MENU_TILE_CLASSES = 'animate-rise rounded-lg border border-divider bg-surface p-5';

export const MenuDrawer = () => {
  const open = useMenuOpen();
  const { close } = useMenuActions();

  return (
    <Drawer open={open} onClose={close} side={DrawerSide.Full} label={siteContent.nav.menuTitle}>
      <div className="flex items-center justify-between px-6 py-4">
        <span className="text-wordmark text-ink">{siteContent.brand.name}</span>
        <Button
          variant={ButtonVariant.Ghost}
          size={ButtonSize.Icon}
          aria-label={siteContent.a11y.closeMenu}
          onClick={close}
          className="text-ink"
        >
          <CloseIcon size={20} />
        </Button>
      </div>

      <nav
        aria-label={siteContent.a11y.mainNavigation}
        className="flex flex-1 flex-col justify-center overflow-y-auto px-6 pb-6"
      >
        <div className="grid grid-cols-2 gap-3">
          {MENU_TILES.map((tile, index) => (
            <Link
              key={tile.href}
              href={tile.href}
              onClick={close}
              className={`${MENU_TILE_CLASSES} flex h-40 flex-col justify-between text-ink transition-colors hover:border-accent`}
              style={{ animationDelay: `calc(var(--motion-stagger) * ${index})` }}
            >
              <tile.Icon size={20} className="text-accent-ink" />
              <span className="text-h5">{tile.label}</span>
            </Link>
          ))}

          <div
            className={`${MENU_TILE_CLASSES} col-span-2`}
            style={{ animationDelay: `calc(var(--motion-stagger) * ${MENU_TILES.length})` }}
          >
            <ThemeSwitch />
          </div>
          <div
            className={`${MENU_TILE_CLASSES} col-span-2`}
            style={{ animationDelay: `calc(var(--motion-stagger) * ${MENU_TILES.length + 1})` }}
          >
            <CurrencySwitch />
          </div>
        </div>
      </nav>
    </Drawer>
  );
};
