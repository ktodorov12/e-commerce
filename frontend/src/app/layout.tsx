import type { Metadata } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';

import '@/styles/globals.css';

import { CartDrawer } from '@/components/cart/CartDrawer';
import { CartHydrator } from '@/components/cart/CartHydrator';
import { BottomDock } from '@/components/layout/BottomDock';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { MenuDrawer } from '@/components/layout/MenuDrawer';
import { Providers } from '@/components/layout/Providers';
import { ThemeHydrator } from '@/components/layout/ThemeHydrator';
import { ThemeScript } from '@/components/layout/ThemeScript';
import { siteContent } from '@/content/site';
import { LanguageTag } from '@/types/i18n';

/** Self-hosted Inter (variable) — no runtime font dependency. */
const inter = localFont({
  src: '../fonts/InterVariable.woff2',
  variable: '--font-inter',
  weight: '100 900',
  display: 'swap',
});

/** Script accent face — the hero welcome line only (see tokens.css). */
const greatVibes = localFont({
  src: '../fonts/GreatVibes.woff2',
  variable: '--font-great-vibes',
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: siteContent.brand.name,
    template: `%s — ${siteContent.brand.legalName}`,
  },
  description: siteContent.brand.description,
};

Object.freeze(Function);
Object.freeze(Array);
Object.freeze(Object);

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    // data-theme is set pre-hydration by ThemeScript — the mismatch with the
    // server HTML is expected and suppressed (day/night must not flicker).
    <html
      lang={LanguageTag.Default}
      className={`${inter.variable} ${greatVibes.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      {/* dock-clearance keeps the footer readable above the fixed dock. */}
      <body className="dock-clearance">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <BottomDock />
          <MenuDrawer />
          <CartDrawer />
          <CartHydrator />
          <ThemeHydrator />
        </Providers>
      </body>
    </html>
  );
}
