import type { Money } from '@exclusive-wear/shopify';

import { Locale } from '@/types/i18n';

const formatterCache = new Map<string, Intl.NumberFormat>();

/** "€80" for round amounts, "€79.50" otherwise — the design writes prices bare. */
export const formatMoney = (money: Money): string => {
  const amount = Number.parseFloat(money.amount);
  const isRound = Number.isInteger(amount);
  const cacheKey = `${money.currencyCode}:${isRound ? 0 : 2}`;

  let formatter = formatterCache.get(cacheKey);
  if (!formatter) {
    formatter = new Intl.NumberFormat(Locale.Default, {
      style: 'currency',
      currency: money.currencyCode,
      minimumFractionDigits: isRound ? 0 : 2,
      maximumFractionDigits: isRound ? 0 : 2,
    });
    formatterCache.set(cacheKey, formatter);
  }
  return formatter.format(amount);
};

/** "−30%" style markdown label for compare-at prices. */
export const formatDiscount = (price: Money, compareAt: Money): string => {
  const current = Number.parseFloat(price.amount);
  const original = Number.parseFloat(compareAt.amount);
  if (!(original > 0) || current >= original) return '';
  const percent = Math.round((1 - current / original) * 100);
  return `−${percent}%`;
};
