import { routing } from "./routing";

export const BASE_URL = "https://www.deralis.digital";

/**
 * Absolute URL for a page in one locale.
 *
 * The default locale is served without a prefix, so which language owns the
 * bare domain follows `routing.defaultLocale` rather than being spelled out
 * at each call site. Canonicals, hreflang and the sitemap were each carrying
 * their own copy of that rule, which is three places to miss when the default
 * changes.
 */
export function localeUrl(locale: string, path = ""): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${BASE_URL}${prefix}${path}`;
}

/** hreflang map for a path, including x-default pointing at the default locale. */
export function alternateLanguages(path = ""): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = localeUrl(locale, path);
  }
  languages["x-default"] = localeUrl(routing.defaultLocale, path);
  return languages;
}
