import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // French is the default locale - deralis.digital shows French
  // deralis.digital/en shows English
  // The market is French. A visitor whose browser states no preference, and
  // every crawler, lands on French rather than on the second language.
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed' // Don't show /fr prefix for default locale
});

export type Locale = (typeof routing.locales)[number];
