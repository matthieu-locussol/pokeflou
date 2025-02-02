import clsx from 'clsx';
import { dir } from 'i18next';
import type { Viewport } from 'next';
import { Footer } from '../../components/footer';
import { Navbar } from '../../components/navbar';
import { pokemonFont } from '../../config/fonts';
import { getMetadata } from '../../config/metadata';
import { Language, LANGUAGES } from '../../i18n/config';
import '../../styles/globals.css';
import { Providers } from '../providers';

export const metadata = getMetadata();

export const viewport: Viewport = {
   themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'white' },
      { media: '(prefers-color-scheme: dark)', color: 'black' },
   ],
};

export async function generateStaticParams() {
   return LANGUAGES;
}

interface Params {
   lang: Language;
}

interface RootLayoutProps {
   children: React.ReactNode;
   params: Params;
}

export default async function RootLayout({ children, params: { lang } }: RootLayoutProps) {
   return (
      <html suppressHydrationWarning lang={lang} dir={dir(lang)}>
         <head />
         <body
            className={clsx(
               'min-h-screen bg-background font-sans antialiased',
               pokemonFont.variable,
            )}
         >
            <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
               <div className="relative flex flex-col min-h-screen">
                  <Navbar lang={lang} />
                  <main className="flex w-full justify-center mx-auto flex-grow" role="main">
                     {children}
                  </main>
                  <Footer lang={lang} />
               </div>
            </Providers>
         </body>
      </html>
   );
}
