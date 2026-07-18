import { describe, expect, it } from 'vitest';
import { isShopifyHandle, isShopifyId } from '@exclusive-wear/shopify';

describe('isShopifyId', () => {
  it('accepts a well-formed GID', () => {
    expect(isShopifyId('gid://shopify/ProductVariant/123')).toBe(true);
    expect(isShopifyId('gid://shopify/CartLine/abc?cart=xyz')).toBe(true);
  });

  it('rejects non-GID, empty, prefix-only and non-string values', () => {
    for (const value of [
      '',
      'ProductVariant/123',
      'gid://shopify/',
      'https://evil.example/gid://shopify/x',
      42,
      null,
      undefined,
    ]) {
      expect(isShopifyId(value)).toBe(false);
    }
  });
});

describe('isShopifyHandle', () => {
  it('accepts lowercase, hyphen-joined handles', () => {
    expect(isShopifyHandle('linen-shirt')).toBe(true);
    expect(isShopifyHandle('tshirt2')).toBe(true);
  });

  it('rejects uppercase, spaces, path traversal, edge hyphens and empty', () => {
    for (const value of ['', 'Linen-Shirt', 'a b', '../etc/passwd', '-lead', 'trail-', 'a--b', 7]) {
      expect(isShopifyHandle(value)).toBe(false);
    }
  });
});
