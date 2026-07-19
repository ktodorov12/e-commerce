import { describe, expect, it } from 'vitest';

import {
  InvalidQueryParamError,
  parseEnumListParam,
  parseEnumParam,
  parseWholeNumberParam,
} from './queryParam';

enum Sample {
  A = 'a',
  B = 'b',
}

const allowed = Object.values(Sample);
const PARAM = 'sample';

describe('parseEnumParam', () => {
  it('returns the fallback when the value is absent', () => {
    expect(parseEnumParam(PARAM, undefined, allowed, Sample.A)).toBe(Sample.A);
  });

  it('returns the matched member when present and valid', () => {
    expect(parseEnumParam(PARAM, 'b', allowed, Sample.A)).toBe(Sample.B);
  });

  it('throws on a present-but-unknown value (fails closed, does not default)', () => {
    expect(() => parseEnumParam(PARAM, 'z', allowed, Sample.A)).toThrow(InvalidQueryParamError);
  });

  it('throws on a repeated (array) param', () => {
    expect(() => parseEnumParam(PARAM, ['a', 'b'], allowed, Sample.A)).toThrow(
      InvalidQueryParamError,
    );
  });

  it('carries the param name and received value on the error', () => {
    try {
      parseEnumParam(PARAM, 'z', allowed, Sample.A);
      expect.unreachable('should have thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidQueryParamError);
      expect((error as InvalidQueryParamError).param).toBe(PARAM);
      expect((error as InvalidQueryParamError).received).toBe('z');
    }
  });
});

describe('parseEnumListParam', () => {
  it('returns an empty selection when the value is absent', () => {
    expect(parseEnumListParam(PARAM, undefined, allowed)).toEqual([]);
  });

  it('maps a single valid token', () => {
    expect(parseEnumListParam(PARAM, 'b', allowed)).toEqual([Sample.B]);
  });

  it('maps a comma-joined list in canonical (declaration) order', () => {
    expect(parseEnumListParam(PARAM, 'a,b', allowed)).toEqual([Sample.A, Sample.B]);
  });

  it('throws when any token is unknown (fails closed, does not repair)', () => {
    expect(() => parseEnumListParam(PARAM, 'a,z', allowed)).toThrow(InvalidQueryParamError);
  });

  it('throws on duplicates — a URL we never emit', () => {
    expect(() => parseEnumListParam(PARAM, 'a,a', allowed)).toThrow(InvalidQueryParamError);
  });

  it('throws on non-canonical order — a URL we never emit', () => {
    expect(() => parseEnumListParam(PARAM, 'b,a', allowed)).toThrow(InvalidQueryParamError);
  });

  it('throws on a repeated (array) param', () => {
    expect(() => parseEnumListParam(PARAM, ['a', 'b'], allowed)).toThrow(InvalidQueryParamError);
  });
});

describe('parseWholeNumberParam', () => {
  const MAX = 999;

  it('returns null when the value is absent', () => {
    expect(parseWholeNumberParam(PARAM, undefined, MAX)).toBeNull();
  });

  it('maps a canonical whole number', () => {
    expect(parseWholeNumberParam(PARAM, '120', MAX)).toBe(120);
    expect(parseWholeNumberParam(PARAM, '0', MAX)).toBe(0);
  });

  it('throws on non-canonical forms (sign, decimals, leading zeros, text)', () => {
    for (const raw of ['-5', '+5', '1.5', '007', '12abc', '', ' 12']) {
      expect(() => parseWholeNumberParam(PARAM, raw, MAX)).toThrow(InvalidQueryParamError);
    }
  });

  it('throws above the domain maximum', () => {
    expect(() => parseWholeNumberParam(PARAM, '1000', MAX)).toThrow(InvalidQueryParamError);
  });

  it('throws on a repeated (array) param', () => {
    expect(() => parseWholeNumberParam(PARAM, ['1', '2'], MAX)).toThrow(InvalidQueryParamError);
  });
});
