/**
 * Structural equality for plain data trees: primitives (incl. NaN),
 * arrays, nested plain objects and Dates.
 *
 * This is the single equality function used by every store hook
 * (see stores/createStoreHook.ts) — re-renders are skipped when arrays
 * or objects are recreated but structurally unchanged.
 *
 * Scope, by design:
 * - Functions, Maps, Sets, RegExps compare by reference (`Object.is`).
 * - Input is assumed acyclic (store state trees are).
 */
export const deepEqual = (a: unknown, b: unknown): boolean => {
  if (Object.is(a, b)) return true; // primitives, identical refs, NaN

  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;

  if (a instanceof Date || b instanceof Date) {
    return a instanceof Date && b instanceof Date && a.getTime() === b.getTime();
  }

  const aIsArray = Array.isArray(a);
  if (aIsArray !== Array.isArray(b)) return false;

  if (aIsArray) {
    const left = a as readonly unknown[];
    const right = b as readonly unknown[];
    if (left.length !== right.length) return false; // cheap check first
    for (let index = 0; index < left.length; index += 1) {
      if (!deepEqual(left[index], right[index])) return false;
    }
    return true;
  }

  // Non-plain exotic objects (Map, Set, RegExp, class instances) are only
  // equal by reference, which Object.is already handled above.
  const aProto: unknown = Object.getPrototypeOf(a);
  const bProto: unknown = Object.getPrototypeOf(b);
  if (aProto !== bProto) return false;
  if (aProto !== Object.prototype && aProto !== null) return false;

  const left = a as Record<string, unknown>;
  const right = b as Record<string, unknown>;
  const leftKeys = Object.keys(left);
  if (leftKeys.length !== Object.keys(right).length) return false;

  for (const key of leftKeys) {
    if (!Object.hasOwn(right, key) || !deepEqual(left[key], right[key])) return false;
  }
  return true;
};
