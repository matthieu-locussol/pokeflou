import type { Viewport } from 'next';

import clsx from 'clsx';
import '../styles/globals.css';

import { Footer } from '../components/footer';
import { Navbar } from '../components/navbar';
import { pokemonFont } from '../config/fonts';
import { getMetadata } from '../config/metadata';

import { Providers } from './providers';

export const metadata = getMetadata();

export const viewport: Viewport = {
   themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'white' },
      { media: '(prefers-color-scheme: dark)', color: 'black' },
   ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html suppressHydrationWarning lang="en">
         <head />
         <body
            className={clsx(
               'min-h-screen bg-background font-sans antialiased',
               pokemonFont.variable,
            )}
         >
            <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
               <div className="relative flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex w-full justify-center mx-auto flex-grow" role="main">
                     {children}
                  </main>
                  <Footer />
               </div>
            </Providers>
         </body>
      </html>
   );
}
