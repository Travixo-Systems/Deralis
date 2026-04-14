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

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(fr|en)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
