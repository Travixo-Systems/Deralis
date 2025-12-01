import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // French is the default locale - deralis.digital shows French
  // deralis.digital/en shows English
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed' // Don't show /fr prefix for default locale
});

export type Locale = (typeof routing.locales)[number];
