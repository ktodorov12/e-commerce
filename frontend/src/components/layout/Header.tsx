import { siteContent } from '@/content/site';
import { CartTrigger } from '@/components/layout/CartTrigger';
import { MenuTrigger } from '@/components/layout/MenuTrigger';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { Link } from '@/lib/shared/Link';
import { AppRoute } from '@/types/routes';

/**
 * Header bar (server component — only the two triggers are client
 * islands, so the shell stays static and cheap).
 */
export const Header = () => (
  <header className="sticky top-0 z-40 border-b border-divider bg-[color-mix(in_srgb,var(--color-ground)_88%,transparent)] backdrop-blur-md">
    <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-6 py-4">
      <div className="flex items-center gap-2">
        <MenuTrigger />
        <nav aria-label={siteContent.a11y.mainNavigation} className="hidden gap-8 pl-4 text-sm md:flex">
          <Link href={AppRoute.Products} className="text-ink-muted transition-colors hover:text-accent-ink">
            {siteContent.nav.shopAll}
          </Link>
        </nav>
      </div>

      <Link
        href={AppRoute.Home}
        className="absolute left-1/2 -translate-x-1/2 text-h5 tracking-[0.14em] text-ink"
      >
        {siteContent.brand.name}
      </Link>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <CartTrigger />
      </div>
    </div>
  </header>
);
