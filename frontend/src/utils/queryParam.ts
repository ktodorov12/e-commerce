/**
 * Fail-closed parsing for URL search params (see CLAUDE.md → Security).
 *
 * The app owns the canonical query state; the URL is a projection of it. A raw
 * param value is mapped onto a member of its canonical domain (an enum's
 * values). It never reaches a Storefront query as-is.
 */

/** A URL query value was present but is not a member of its canonical domain. */
export class InvalidQueryParamError extends Error {
  constructor(
    readonly param: string,
    readonly received: string,
  ) {
    super(`Invalid value for query parameter "${param}"`);
    this.name = 'InvalidQueryParamError';
  }
}

/**
 * Map a raw search-param value onto an allowed enum value, failing closed:
 * - absent (`undefined`) → the documented default (the user sent nothing);
 * - present and maps → the matched member;
 * - present and does not map → throw (never silently default, never forward);
 * - repeated (`?x=a&x=b`) → throw (we never emit array params).
 *
 * Because a valid value equals its own enum member, this is also the URL⇄state
 * round-trip check: anything that doesn't round-trip is rejected.
 */
export const parseEnumParam = <TValue extends string>(
  param: string,
  raw: string | string[] | undefined,
  allowed: readonly TValue[],
  fallback: TValue,
): TValue => {
  if (raw === undefined) return fallback;
  if (Array.isArray(raw)) throw new InvalidQueryParamError(param, raw.join(LIST_SEPARATOR));
  if ((allowed as readonly string[]).includes(raw)) return raw as TValue;
  throw new InvalidQueryParamError(param, raw);
};

/** Multi-value facets travel as one comma-joined param (never repeated params). */
const LIST_SEPARATOR = ',';

/** Canonical serialization of a multi-select facet (used for the round-trip check too). */
export const serializeEnumListParam = (values: readonly string[]): string =>
  values.join(LIST_SEPARATOR);

/**
 * Map a comma-joined multi-select param onto a subset of an enum's values,
 * failing closed. Canonical form is enum declaration order with no duplicates
 * and no unknown tokens — anything whose canonical re-serialization differs
 * from the incoming value is rejected, not repaired.
 */
export const parseEnumListParam = <TValue extends string>(
  param: string,
  raw: string | string[] | undefined,
  allowed: readonly TValue[],
): readonly TValue[] => {
  if (raw === undefined) return [];
  if (Array.isArray(raw)) throw new InvalidQueryParamError(param, raw.join(LIST_SEPARATOR));
  const tokens = raw.split(LIST_SEPARATOR);
  const selected = allowed.filter((value) => (tokens as readonly string[]).includes(value));
  if (serializeEnumListParam(selected) !== raw) throw new InvalidQueryParamError(param, raw);
  return selected;
};

/** Canonical whole-number form: no sign, no leading zeros, no separators. */
const WHOLE_NUMBER_PATTERN = /^(0|[1-9]\d*)$/;

/**
 * Map a whole-number param (price bounds) onto its numeric domain, failing
 * closed: absent → null; anything non-canonical or above `max` → throw.
 */
export const parseWholeNumberParam = (
  param: string,
  raw: string | string[] | undefined,
  max: number,
): number | null => {
  if (raw === undefined) return null;
  if (Array.isArray(raw)) throw new InvalidQueryParamError(param, raw.join(LIST_SEPARATOR));
  if (!WHOLE_NUMBER_PATTERN.test(raw)) throw new InvalidQueryParamError(param, raw);
  const value = Number.parseInt(raw, 10);
  if (value > max) throw new InvalidQueryParamError(param, raw);
  return value;
};
