import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 301 redirect: /services → /methode (preserve locale prefix)
  const servicesRedirect = pathname.match(/^(\/[a-z]{2})?\/services(\/.*)?$/);
  if (servicesRedirect) {
    const localePrefix = servicesRedirect[1] || '';
    const rest = servicesRedirect[2] || '';
    const url = request.nextUrl.clone();
    url.pathname = `${localePrefix}/methode${rest}`;
    return NextResponse.redirect(url, 301);
  }

  // French moved from /fr to the bare domain when it became the default locale
  // (see i18n/routing.ts). next-intl redirects the old prefix itself, but with a
  // 307, which asks search engines to keep the old URL indexed. Every French
  // page on the site moved permanently, so the redirect is issued as a 301 here
  // instead, ahead of the intl middleware. Remove this if French ever stops
  // being the default, or it will strand the prefix it is meant to rescue.
  const strandedDefault = pathname.match(/^\/fr(\/.*)?$/);
  if (strandedDefault) {
    const url = request.nextUrl.clone();
    url.pathname = strandedDefault[1] || '/';
    return NextResponse.redirect(url, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(fr|en)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
