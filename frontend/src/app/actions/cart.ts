'use server';

import { cookies } from 'next/headers';
import {
  cartCreate,
  cartLinesAdd,
  cartLinesRemove,
  cartLinesUpdate,
  getCart,
  isShopifyId,
} from '@exclusive-wear/shopify';
import type { Cart } from '@exclusive-wear/shopify';

import type { CartMutationInput } from '@/types/cart';
import { CookieKey } from '@/types/keys';
import { CartMutationKind } from '@/types/machines';

/**
 * Cart server actions. The Storefront token never reaches the browser;
 * the cart id lives in an httpOnly cookie. These are public endpoints —
 * inputs are validated here, not just at the call site.
 */

const CART_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const MAX_LINE_QUANTITY = 99;

const readCartId = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get(CookieKey.CartId)?.value ?? null;
};

const persistCartId = async (cartId: string): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set(CookieKey.CartId, cartId, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: CART_COOKIE_MAX_AGE_SECONDS,
    secure: process.env.NODE_ENV === 'production',
  });
};

const assertQuantity = (quantity: number): void => {
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_LINE_QUANTITY) {
    throw new Error(`Invalid quantity: ${quantity}`);
  }
};

const assertId = (value: string, label: string): void => {
  // Shape-validate the Shopify GID, not merely "non-empty": these ids came from
  // our own product/cart data, so anything not gid://shopify/… is tampered.
  if (!isShopifyId(value)) {
    throw new Error(`Invalid ${label}`);
  }
};

const addLines = async (merchandiseId: string, quantity: number): Promise<Cart> => {
  const draft = [{ merchandiseId, quantity }];
  const cartId = await readCartId();

  if (cartId === null) {
    const cart = await cartCreate(draft);
    await persistCartId(cart.id);
    return cart;
  }

  try {
    return await cartLinesAdd(cartId, draft);
  } catch {
    // The stored cart id can go stale (completed or expired carts).
    const cart = await cartCreate(draft);
    await persistCartId(cart.id);
    return cart;
  }
};

const requireCartId = async (): Promise<string> => {
  const cartId = await readCartId();
  if (cartId === null) {
    throw new Error('No cart to update');
  }
  return cartId;
};

export async function syncCartAction(input: CartMutationInput): Promise<Cart> {
  switch (input.kind) {
    case CartMutationKind.AddLines: {
      assertId(input.merchandiseId, 'merchandise id');
      assertQuantity(input.quantity);
      return addLines(input.merchandiseId, input.quantity);
    }
    case CartMutationKind.UpdateLine: {
      assertId(input.lineId, 'line id');
      assertQuantity(input.quantity);
      const cartId = await requireCartId();
      return cartLinesUpdate(cartId, [{ lineId: input.lineId, quantity: input.quantity }]);
    }
    case CartMutationKind.RemoveLine: {
      assertId(input.lineId, 'line id');
      const cartId = await requireCartId();
      return cartLinesRemove(cartId, [input.lineId]);
    }
    default: {
      const exhaustive: never = input;
      throw new Error(`Unknown cart mutation: ${JSON.stringify(exhaustive)}`);
    }
  }
}

export async function fetchCartAction(): Promise<Cart | null> {
  const cartId = await readCartId();
  if (cartId === null) return null;
  try {
    return await getCart(cartId);
  } catch {
    return null;
  }
}
