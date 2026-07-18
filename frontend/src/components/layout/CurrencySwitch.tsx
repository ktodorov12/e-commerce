'use client';

import { siteContent } from '@/content/site';
import { SegmentedControl } from '@/lib/shared/SegmentedControl';
import { useCurrencyStore } from '@/stores/currencyStore';
import { CurrencyPreference } from '@/types/i18n';

/** EUR / USD / BGN — the menu's display-currency switch. */
const OPTIONS = [
  { value: CurrencyPreference.Eur, label: siteContent.nav.currencyEur },
  { value: CurrencyPreference.Usd, label: siteContent.nav.currencyUsd },
  { value: CurrencyPreference.Bgn, label: siteContent.nav.currencyBgn },
] as const;

export const CurrencySwitch = () => {
  const { preference, setPreference } = useCurrencyStore((state) => ({
    preference: state.preference,
    setPreference: state.setPreference,
  }));

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-ink-muted">
        {siteContent.nav.currency} — {siteContent.nav.currencyNote}
      </span>
      <SegmentedControl
        options={OPTIONS}
        value={preference}
        onChange={setPreference}
        label={siteContent.a11y.currencySwitch}
      />
    </div>
  );
};
