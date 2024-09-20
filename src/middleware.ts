import { withAuth } from '@kinde-oss/kinde-auth-nextjs/middleware';
import acceptLanguage from 'accept-language';
import { NextResponse, type NextRequest } from 'next/server';
import { COOKIE_NAME, FALLBACK_LANG, Language, LANGUAGES, zLanguage } from './i18n/config';

const PUBLIC_FILE = /\.(.*)$/;

acceptLanguage.languages(LANGUAGES.map((lang) => lang.toString()));

export default function middleware(req: NextRequest) {
   if (
      req.nextUrl.pathname.startsWith('/_next') ||
      req.nextUrl.pathname.includes('/api/') ||
      PUBLIC_FILE.test(req.nextUrl.pathname)
   ) {
      return NextResponse.next();
   }

   let lang: Language | undefined = undefined;

   if (req.cookies.has(COOKIE_NAME)) {
      lang = zLanguage.parse(acceptLanguage.get(req.cookies.get(COOKIE_NAME)!.value));
   }

   if (!lang) {
      lang = zLanguage.parse(acceptLanguage.get(req.headers.get('Accept-Language')));
   }

   if (!lang) {
      lang = FALLBACK_LANG;
   }

   if (
      !LANGUAGES.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
      !req.nextUrl.pathname.startsWith('/_next')
   ) {
      return NextResponse.redirect(new URL(`/${lang}${req.nextUrl.pathname}`, req.url));
   }

   if (req.nextUrl.pathname.startsWith(`/${lang}/stats`)) {
      return withAuth(req);
   }

   if (req.headers.has('referer')) {
      const refererUrl = new URL(req.headers.get('referer')!);
      const langInReferer = LANGUAGES.find((loc) => refererUrl.pathname.startsWith(`/${loc}`));
      const response = NextResponse.next();

      if (langInReferer) {
         response.cookies.set(COOKIE_NAME, langInReferer);
      }

      return response;
   }

   return NextResponse.next();
}

export const config = {
   matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)'],
};
