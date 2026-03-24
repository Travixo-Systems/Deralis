import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // English is the default locale - deralis.digital shows English
  // deralis.digital/fr shows French
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed' // Don't show /en prefix for default locale
});

export type Locale = (typeof routing.locales)[number];
