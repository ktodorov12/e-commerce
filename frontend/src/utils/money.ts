import type { Money } from '@exclusive-wear/shopify';

import { CurrencyPreference, Locale } from '@/types/i18n';

/**
 * The storefront is EUR-branded, so prices always render in EUR regardless
 * of the backend's currency code (mock.shop reports CAD) — a deliberate
 * display override until multi-market backends land. Checkout still uses
 * the store currency.
 */
const DISPLAY_CURRENCY = CurrencyPreference.Eur;

const formatterCache = new Map<string, Intl.NumberFormat>();

/** "€80" for round amounts, "€79.50" otherwise — the design writes prices bare. */
export const formatMoney = (money: Money): string => {
  const amount = Number.parseFloat(money.amount);
  const isRound = Number.isInteger(amount);
  const cacheKey = `${DISPLAY_CURRENCY}:${isRound ? 0 : 2}`;

  let formatter = formatterCache.get(cacheKey);
  if (!formatter) {
    formatter = new Intl.NumberFormat(Locale.Default, {
      style: 'currency',
      currency: DISPLAY_CURRENCY,
      minimumFractionDigits: isRound ? 0 : 2,
      maximumFractionDigits: isRound ? 0 : 2,
    });
    formatterCache.set(cacheKey, formatter);
  }
  return formatter.format(amount);
};

/** The bare display-currency sign ("€") — for adorning price inputs. */
export const displayCurrencySymbol = (): string => {
  const parts = new Intl.NumberFormat(Locale.Default, {
    style: 'currency',
    currency: DISPLAY_CURRENCY,
  }).formatToParts(0);
  return parts.find((part) => part.type === 'currency')?.value ?? DISPLAY_CURRENCY;
};

/** Line total for a quantity — the quick-pick CTA shows price × quantity. */
export const multiplyMoney = (money: Money, quantity: number): Money => ({
  amount: (Number.parseFloat(money.amount) * quantity).toFixed(2),
  currencyCode: money.currencyCode,
});

/** "−30%" style markdown label for compare-at prices. */
export const formatDiscount = (price: Money, compareAt: Money): string => {
  const current = Number.parseFloat(price.amount);
  const original = Number.parseFloat(compareAt.amount);
  if (!(original > 0) || current >= original) return '';
  const percent = Math.round((1 - current / original) * 100);
  return `−${percent}%`;
};
