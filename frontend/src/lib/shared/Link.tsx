import NextLink from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

import { ExternalUrl } from '@/types/routes';
import type { NavigableRoute } from '@/types/routes';

/**
 * The only next/link in the app. `href` is typed to the route enums
 * (plus derived dynamic routes) — no plain string hrefs anywhere.
 * ExternalUrl destinations open in a new tab with a safe rel.
 */
export interface LinkProps extends Omit<ComponentPropsWithoutRef<typeof NextLink>, 'href'> {
  readonly href: NavigableRoute | ExternalUrl;
}

const EXTERNAL_URLS = new Set<string>(Object.values(ExternalUrl));

export const Link = ({ href, ...props }: LinkProps) =>
  EXTERNAL_URLS.has(href) ? (
    <NextLink href={href} target="_blank" rel="noreferrer" {...props} />
  ) : (
    <NextLink href={href} {...props} />
  );
