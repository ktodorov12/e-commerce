'use client';

import { siteContent } from '@/content/site';
import { ThemeSwitch } from '@/components/layout/ThemeSwitch';
import { useMenuActions, useMenuOpen } from '@/hooks/useMenuMachine';
import { Button } from '@/lib/shared/Button';
import { CloseIcon } from '@/lib/shared/icons';
import { Drawer } from '@/lib/shared/Drawer';
import { Link } from '@/lib/shared/Link';
import { AppRoute } from '@/types/routes';
import { ButtonSize, ButtonVariant, DrawerSide } from '@/types/ui';

/** Full-screen burger menu — "the menu as an editorial page". */
const MENU_LINKS = [
  { href: AppRoute.Home, label: siteContent.nav.home },
  { href: AppRoute.Products, label: siteContent.nav.shopAll },
] as const;

export const MenuDrawer = () => {
  const open = useMenuOpen();
  const { close } = useMenuActions();

  return (
    <Drawer open={open} onClose={close} side={DrawerSide.Full} label={siteContent.nav.menuTitle}>
      <div className="flex items-center justify-between px-6 py-4">
        <span className="text-h5 tracking-[0.14em]">{siteContent.brand.name}</span>
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
        className="flex flex-1 flex-col justify-center gap-2 px-6"
      >
        {MENU_LINKS.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={close}
            className="animate-rise py-3 text-h2 text-ink transition-colors hover:text-accent-ink"
            style={{ animationDelay: `calc(var(--motion-stagger) * ${index})` }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-divider px-6 py-6">
        <ThemeSwitch />
      </div>
    </Drawer>
  );
};
