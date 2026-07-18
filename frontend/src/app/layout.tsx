import type { Metadata } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';

import '@/styles/globals.css';

import { CartDrawer } from '@/components/cart/CartDrawer';
import { CartHydrator } from '@/components/cart/CartHydrator';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { MenuDrawer } from '@/components/layout/MenuDrawer';
import { Providers } from '@/components/layout/Providers';
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
    <html lang={LanguageTag.Default} className={inter.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <Providers>
          <AnnouncementBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <MenuDrawer />
          <CartDrawer />
          <CartHydrator />
        </Providers>
      </body>
    </html>
  );
}
