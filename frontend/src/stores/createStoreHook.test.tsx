import { act, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createStore } from 'zustand/vanilla';

import { createStoreHook } from './createStoreHook';

interface Item {
  readonly id: string;
  readonly quantity: number;
}

interface TestState {
  readonly items: readonly Item[];
  readonly label: string;
  readonly setItems: (items: readonly Item[]) => void;
  readonly setLabel: (label: string) => void;
}

const makeStore = () =>
  createStore<TestState>()((set) => ({
    items: [{ id: 'a', quantity: 1 }],
    label: 'initial',
    setItems: (items) => set({ items }),
    setLabel: (label) => set({ label }),
  }));

describe('createStoreHook', () => {
  it('skips re-renders when the selection is recreated but structurally unchanged', () => {
    const store = makeStore();
    const useTestStore = createStoreHook(store);
    let renders = 0;

    const Probe = () => {
      renders += 1;
      useTestStore((state) => ({ ids: state.items.map((item) => item.id) }));
      return null;
    };

    render(<Probe />);
    expect(renders).toBe(1);

    // New array + new objects, same structure → deepEqual → no re-render.
    act(() => store.getState().setItems([{ id: 'a', quantity: 1 }]));
    expect(renders).toBe(1);

    // Structural change → re-render.
    act(() => store.getState().setItems([{ id: 'b', quantity: 2 }]));
    expect(renders).toBe(2);
  });

  it('does not re-render for changes outside the selection', () => {
    const store = makeStore();
    const useTestStore = createStoreHook(store);
    let renders = 0;

    const Probe = () => {
      renders += 1;
      useTestStore((state) => ({ label: state.label }));
      return null;
    };

    render(<Probe />);
    act(() => store.getState().setItems([{ id: 'z', quantity: 9 }]));
    expect(renders).toBe(1);

    act(() => store.getState().setLabel('changed'));
    expect(renders).toBe(2);
  });

  it('keeps a stable object identity while values stay fresh (Object.assign merge)', () => {
    const store = makeStore();
    const useTestStore = createStoreHook(store);
    const seen: Array<{ readonly ids: readonly string[] }> = [];

    const Probe = () => {
      seen.push(useTestStore((state) => ({ ids: state.items.map((item) => item.id) })));
      return null;
    };

    render(<Probe />);
    act(() => store.getState().setItems([{ id: 'b', quantity: 2 }]));

    expect(seen).toHaveLength(2);
    expect(seen[0]).toBe(seen[1]); // stable container reference
    expect(seen[1]?.ids).toEqual(['b']); // fresh values inside it
  });

  it('passes primitive selections through untouched', () => {
    const store = makeStore();
    const useTestStore = createStoreHook(store);
    let latest = -1;

    const Probe = () => {
      latest = useTestStore((state) => state.items.length);
      return null;
    };

    render(<Probe />);
    expect(latest).toBe(1);

    act(() => store.getState().setItems([]));
    expect(latest).toBe(0);
  });

  it('returns whole state without a selector', () => {
    const store = makeStore();
    const useTestStore = createStoreHook(store);
    let snapshot: TestState | null = null;

    const Probe = () => {
      snapshot = useTestStore();
      return null;
    };

    render(<Probe />);
    expect(snapshot).not.toBeNull();
    expect((snapshot as unknown as TestState).label).toBe('initial');
  });
});
