import NextLink from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

import type { NavigableRoute } from '@/types/routes';

/**
 * The only next/link in the app. `href` is typed to the route enum
 * (plus derived dynamic routes) — no plain string hrefs anywhere.
 */
export interface LinkProps extends Omit<ComponentPropsWithoutRef<typeof NextLink>, 'href'> {
  readonly href: NavigableRoute;
}

export const Link = ({ href, ...props }: LinkProps) => <NextLink href={href} {...props} />;
