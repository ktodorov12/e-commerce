/** Formatting locale (EU market). One place to change when i18n lands. */
export enum Locale {
  Default = 'en-IE',
}

/** Document language tag (html[lang]). */
export enum LanguageTag {
  Default = 'en',
}

/** Display-currency preference (menu). A preference only until
    multi-market backends land — checkout stays in store currency. */
export enum CurrencyPreference {
  Eur = 'EUR',
  Usd = 'USD',
  Bgn = 'BGN',
}
