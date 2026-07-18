import { describe, expect, it } from 'vitest';

import { deepEqual } from './deepEqual';

describe('deepEqual', () => {
  it('compares primitives', () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual('a', 'a')).toBe(true);
    expect(deepEqual(true, false)).toBe(false);
    expect(deepEqual(1, '1')).toBe(false);
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(undefined, undefined)).toBe(true);
    expect(deepEqual(null, undefined)).toBe(false);
    expect(deepEqual(0, -0)).toBe(false); // Object.is semantics
  });

  it('treats NaN as equal to NaN', () => {
    expect(deepEqual(Number.NaN, Number.NaN)).toBe(true);
    expect(deepEqual({ value: Number.NaN }, { value: Number.NaN })).toBe(true);
    expect(deepEqual(Number.NaN, 0)).toBe(false);
  });

  it('compares arrays structurally', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEqual([1, 2, 3], [1, 2])).toBe(false);
    expect(deepEqual([1, 2, 3], [3, 2, 1])).toBe(false);
    expect(deepEqual([], [])).toBe(true);
    expect(deepEqual([1], { 0: 1, length: 1 })).toBe(false);
  });

  it('compares nested objects structurally', () => {
    const left = { cart: { lines: [{ id: 'a', quantity: 2 }], total: { amount: '10.0' } } };
    const right = { cart: { lines: [{ id: 'a', quantity: 2 }], total: { amount: '10.0' } } };
    expect(deepEqual(left, right)).toBe(true);
    expect(deepEqual(left, { cart: { ...right.cart, total: { amount: '11.0' } } })).toBe(false);
  });

  it('detects missing and extra keys', () => {
    expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
    expect(deepEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    expect(deepEqual({ a: undefined }, { b: undefined })).toBe(false);
  });

  it('compares dates by timestamp', () => {
    expect(deepEqual(new Date(1700000000000), new Date(1700000000000))).toBe(true);
    expect(deepEqual(new Date(1700000000000), new Date(1700000000001))).toBe(false);
    expect(deepEqual(new Date(0), 0)).toBe(false);
    expect(deepEqual({ at: new Date(42) }, { at: new Date(42) })).toBe(true);
  });

  it('compares functions and exotic objects by reference only', () => {
    const fn = () => 'noop';
    expect(deepEqual(fn, fn)).toBe(true);
    expect(
      deepEqual(
        () => 'noop',
        () => 'noop',
      ),
    ).toBe(false);
    const map = new Map([['k', 1]]);
    expect(deepEqual(map, map)).toBe(true);
    expect(deepEqual(new Map([['k', 1]]), new Map([['k', 1]]))).toBe(false);
  });

  it('distinguishes plain objects from class instances', () => {
    class Money {
      constructor(public amount: string) {}
    }
    expect(deepEqual(new Money('1'), { amount: '1' })).toBe(false);
    expect(deepEqual(Object.create(null), Object.create(null))).toBe(true);
  });

  it('is the workhorse for the store hooks: recreated but unchanged trees are equal', () => {
    const snapshot = () => ({
      lines: [
        { id: 'line-1', quantity: 1, cost: { amount: '90.0', currencyCode: 'EUR' } },
        { id: 'line-2', quantity: 2, cost: { amount: '160.0', currencyCode: 'EUR' } },
      ],
      updatedAt: new Date(1700000000000),
    });
    expect(deepEqual(snapshot(), snapshot())).toBe(true);
  });
});
