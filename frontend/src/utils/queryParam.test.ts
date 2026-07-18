import { describe, expect, it } from 'vitest';

import { InvalidQueryParamError, parseEnumParam } from './queryParam';

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
