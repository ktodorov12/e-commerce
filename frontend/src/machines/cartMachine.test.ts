import { describe, expect, it } from 'vitest';
import { createActor, fromPromise, waitFor } from 'xstate';
import type { Cart, CurrencyCode } from '@exclusive-wear/shopify';

import type { CartMutationInput } from '@/types/cart';
import {
  CartDrawerState,
  CartEventType,
  CartMutationKind,
  CartSyncState,
} from '@/types/machines';

import { cartMachine } from './cartMachine';

// CurrencyCode is a generated union type; 'EUR' is validated against it here.
const EUR: CurrencyCode = 'EUR';
const money = (amount: string) => ({ amount, currencyCode: EUR });

const fakeCart: Cart = {
  id: 'gid://shopify/Cart/test',
  checkoutUrl: 'https://mock.shop/checkout/test',
  totalQuantity: 1,
  subtotal: money('80.0'),
  total: money('80.0'),
  lines: [],
};

interface Harness {
  readonly received: CartMutationInput[];
  readonly commits: Cart[];
  readonly redirects: string[];
  readonly actor: ReturnType<typeof createActor<typeof cartMachine>>;
}

const makeHarness = ({ fail = false }: { readonly fail?: boolean } = {}): Harness => {
  const received: CartMutationInput[] = [];
  const commits: Cart[] = [];
  const redirects: string[] = [];

  const machine = cartMachine.provide({
    actors: {
      syncCart: fromPromise<Cart, CartMutationInput>(async ({ input }) => {
        received.push(input);
        if (fail) throw new Error('sync failed');
        return fakeCart;
      }),
    },
    actions: {
      commitCart: (_args, params: { readonly cart: Cart }) => {
        commits.push(params.cart);
      },
      redirectToCheckout: (_args, params: { readonly url: string }) => {
        redirects.push(params.url);
      },
    },
  });

  const actor = createActor(machine);
  actor.start();
  return { received, commits, redirects, actor };
};

describe('cartMachine', () => {
  it('starts closed and idle', () => {
    const { actor } = makeHarness();
    expect(actor.getSnapshot().matches({ drawer: CartDrawerState.Closed })).toBe(true);
    expect(actor.getSnapshot().matches({ sync: CartSyncState.Idle })).toBe(true);
  });

  it('opens, toggles and closes the drawer', () => {
    const { actor } = makeHarness();
    actor.send({ type: CartEventType.OpenDrawer });
    expect(actor.getSnapshot().matches({ drawer: CartDrawerState.Open })).toBe(true);
    actor.send({ type: CartEventType.ToggleDrawer });
    expect(actor.getSnapshot().matches({ drawer: CartDrawerState.Closed })).toBe(true);
    actor.send({ type: CartEventType.ToggleDrawer });
    expect(actor.getSnapshot().matches({ drawer: CartDrawerState.Open })).toBe(true);
    actor.send({ type: CartEventType.CloseDrawer });
    expect(actor.getSnapshot().matches({ drawer: CartDrawerState.Closed })).toBe(true);
  });

  it('add-to-cart: mutates, commits the cart and auto-opens the drawer', async () => {
    const { actor, received, commits } = makeHarness();

    actor.send({ type: CartEventType.AddLines, merchandiseId: 'variant-1', quantity: 2 });
    expect(actor.getSnapshot().matches({ sync: CartSyncState.Mutating })).toBe(true);

    await waitFor(actor, (snapshot) => snapshot.matches({ sync: CartSyncState.Idle }));

    expect(received).toEqual([
      { kind: CartMutationKind.AddLines, merchandiseId: 'variant-1', quantity: 2 },
    ]);
    expect(commits).toEqual([fakeCart]);
    expect(actor.getSnapshot().matches({ drawer: CartDrawerState.Open })).toBe(true);
    expect(actor.getSnapshot().context.pending).toBeNull();
  });

  it('line updates do not touch the drawer', async () => {
    const { actor, received } = makeHarness();

    actor.send({ type: CartEventType.UpdateLine, lineId: 'line-1', quantity: 3 });
    await waitFor(actor, (snapshot) => snapshot.matches({ sync: CartSyncState.Idle }));
    expect(actor.getSnapshot().matches({ drawer: CartDrawerState.Closed })).toBe(true);

    actor.send({ type: CartEventType.RemoveLine, lineId: 'line-1' });
    await waitFor(actor, (snapshot) => snapshot.matches({ sync: CartSyncState.Idle }));

    expect(received).toEqual([
      { kind: CartMutationKind.UpdateLine, lineId: 'line-1', quantity: 3 },
      { kind: CartMutationKind.RemoveLine, lineId: 'line-1' },
    ]);
  });

  it('surfaces failures and returns to idle without committing', async () => {
    const { actor, commits } = makeHarness({ fail: true });

    actor.send({ type: CartEventType.AddLines, merchandiseId: 'variant-1', quantity: 1 });
    await waitFor(actor, (snapshot) => snapshot.matches({ sync: CartSyncState.Idle }));

    expect(commits).toEqual([]);
    expect(actor.getSnapshot().context.errorMessage).toBe('sync failed');
    expect(actor.getSnapshot().matches({ drawer: CartDrawerState.Closed })).toBe(true);
  });

  it('ignores concurrent mutations while one is in flight', async () => {
    const { actor, received } = makeHarness();

    actor.send({ type: CartEventType.AddLines, merchandiseId: 'variant-1', quantity: 1 });
    actor.send({ type: CartEventType.AddLines, merchandiseId: 'variant-2', quantity: 1 });
    await waitFor(actor, (snapshot) => snapshot.matches({ sync: CartSyncState.Idle }));

    expect(received).toHaveLength(1);
  });

  it('checkout hands off once and stays in redirecting', () => {
    const { actor, redirects, received } = makeHarness();

    actor.send({ type: CartEventType.BeginCheckout, checkoutUrl: fakeCart.checkoutUrl });
    expect(redirects).toEqual([fakeCart.checkoutUrl]);
    expect(actor.getSnapshot().matches({ sync: CartSyncState.Redirecting })).toBe(true);

    // Nothing else can start once the browser is leaving.
    actor.send({ type: CartEventType.BeginCheckout, checkoutUrl: fakeCart.checkoutUrl });
    actor.send({ type: CartEventType.AddLines, merchandiseId: 'variant-1', quantity: 1 });
    expect(redirects).toHaveLength(1);
    expect(received).toHaveLength(0);
  });
});
