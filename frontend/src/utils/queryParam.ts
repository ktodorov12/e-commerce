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
  if (Array.isArray(raw)) throw new InvalidQueryParamError(param, raw.join(','));
  if ((allowed as readonly string[]).includes(raw)) return raw as TValue;
  throw new InvalidQueryParamError(param, raw);
};
