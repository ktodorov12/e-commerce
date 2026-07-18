import { useRef } from 'react';
import type { StoreApi } from 'zustand/vanilla';
import { useStoreWithEqualityFn } from 'zustand/traditional';

import { deepEqual } from '@/utils/deepEqual';

/**
 * The one store recipe (see CLAUDE.md → "State"):
 *
 * 1. Stores are created with vanilla `createStore` (state + actions).
 * 2. This factory wraps them in a typed hook.
 * 3. Subscription goes through zustand's `useStoreWithEqualityFn` with our
 *    `deepEqual` as the compare fn — re-renders are skipped when selectors
 *    return recreated but structurally unchanged arrays/objects.
 * 4. Plain-object selections are merged (`Object.assign`) into one stable
 *    container per hook instance, so the returned reference never churns.
 *
 * Consequences to design around (documented, intentional):
 * - Because the container identity is stable, do not use the selected
 *   *object* in dependency arrays or as a memo prop — select the primitive
 *   fields you actually depend on instead.
 * - Selectors must return a consistent shape (no conditionally missing keys).
 */

export interface StoreHook<TState> {
  (): TState;
  <TSelected>(selector: (state: TState) => TSelected): TSelected;
}

/** Slice creator signature — slices exist to avoid cross-store imports. */
export type SliceCreator<TState, TSlice> = (
  set: StoreApi<TState>['setState'],
  get: StoreApi<TState>['getState'],
) => TSlice;

const identity = (value: unknown): unknown => value;

const isMergeableObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  Object.getPrototypeOf(value) === Object.prototype;

export const createStoreHook = <TState>(store: StoreApi<TState>): StoreHook<TState> => {
  const useBoundStore = <TSelected>(
    selector: (state: TState) => TSelected = identity as (state: TState) => TSelected,
  ): TSelected => {
    const selected = useStoreWithEqualityFn(store, selector, deepEqual);
    const containerRef = useRef<Record<string, unknown> | null>(null);

    if (!isMergeableObject(selected)) {
      containerRef.current = null;
      return selected;
    }

    if (containerRef.current === null) {
      containerRef.current = Object.assign({}, selected);
    } else {
      Object.assign(containerRef.current, selected);
    }
    return containerRef.current as TSelected;
  };

  return useBoundStore as StoreHook<TState>;
};
