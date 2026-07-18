'use client';

import { useCallback } from 'react';

import { CartMachineContext } from '@/machines/cartMachineContext';
import { CartDrawerState, CartEventType, CartSyncState } from '@/types/machines';
import type { CartMutationInput } from '@/types/cart';

/**
 * The only way components talk to the cart machine. Small hooks with
 * narrow subscriptions — a component re-renders only for the slice of
 * machine state it actually reads.
 */

export const useCartDrawerOpen = (): boolean =>
  CartMachineContext.useSelector((snapshot) =>
    snapshot.matches({ drawer: CartDrawerState.Open }),
  );

export const useCartDrawerActions = () => {
  const actorRef = CartMachineContext.useActorRef();
  const open = useCallback(() => actorRef.send({ type: CartEventType.OpenDrawer }), [actorRef]);
  const close = useCallback(() => actorRef.send({ type: CartEventType.CloseDrawer }), [actorRef]);
  const toggle = useCallback(() => actorRef.send({ type: CartEventType.ToggleDrawer }), [actorRef]);
  return { open, close, toggle };
};

export const useCartMutating = (): boolean =>
  CartMachineContext.useSelector((snapshot) => snapshot.matches({ sync: CartSyncState.Mutating }));

export const useCartRedirecting = (): boolean =>
  CartMachineContext.useSelector((snapshot) =>
    snapshot.matches({ sync: CartSyncState.Redirecting }),
  );

export const useCartError = (): string | null =>
  CartMachineContext.useSelector((snapshot) => snapshot.context.errorMessage);

/** The mutation in flight — lets a single line render its own busy state. */
export const usePendingMutation = (): CartMutationInput | null =>
  CartMachineContext.useSelector((snapshot) => snapshot.context.pending);

export const useAddToCart = () => {
  const actorRef = CartMachineContext.useActorRef();
  return useCallback(
    (merchandiseId: string, quantity = 1) =>
      actorRef.send({ type: CartEventType.AddLines, merchandiseId, quantity }),
    [actorRef],
  );
};

export const useUpdateCartLine = () => {
  const actorRef = CartMachineContext.useActorRef();
  return useCallback(
    (lineId: string, quantity: number) =>
      actorRef.send({ type: CartEventType.UpdateLine, lineId, quantity }),
    [actorRef],
  );
};

export const useRemoveCartLine = () => {
  const actorRef = CartMachineContext.useActorRef();
  return useCallback(
    (lineId: string) => actorRef.send({ type: CartEventType.RemoveLine, lineId }),
    [actorRef],
  );
};

export const useBeginCheckout = () => {
  const actorRef = CartMachineContext.useActorRef();
  return useCallback(
    (checkoutUrl: string) => actorRef.send({ type: CartEventType.BeginCheckout, checkoutUrl }),
    [actorRef],
  );
};
