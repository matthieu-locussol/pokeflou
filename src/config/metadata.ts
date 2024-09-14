import type { Metadata } from 'next';

import { siteConfig } from './site';

export const getMetadata = () =>
   ({
      metadataBase: new URL(siteConfig.baseUrl),
      title: siteConfig.title,
      description: siteConfig.description,
      applicationName: siteConfig.title,
      authors: [
         {
            name: siteConfig.author.name,
            url: 'https://www.matthieu-locussol.com',
         },
      ],
      generator: 'Next.js',
      keywords: [
         'learn to speak french fast',
         'french conjugation',
         'french grammar rules',
         'french vocabulary',
         'french language learning',
      ],
      referrer: 'origin',
      creator: siteConfig.author.name,
      publisher: siteConfig.author.name,
      robots: {
         index: true,
         follow: true,
      },
      alternates: {
         canonical: new URL(siteConfig.baseUrl),
      },
      icons: [
         {
            rel: 'icon',
            type: 'image/png',
            sizes: '192x192',
            url: `/android-chrome-192x192.png?v=${siteConfig.faviconVersion}`,
         },
         {
            rel: 'icon',
            type: 'image/png',
            sizes: '512x512',
            url: `/android-chrome-512x512.png?v=${siteConfig.faviconVersion}`,
         },
         {
            rel: 'apple-touch-icon',
            url: `/apple-touch-icon.png?v=${siteConfig.faviconVersion}`,
         },
         {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            url: `/favicon-16x16.png?v=${siteConfig.faviconVersion}`,
         },
         {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            url: `/favicon-32x32.png?v=${siteConfig.faviconVersion}`,
         },
         {
            rel: 'shortcut icon',
            url: `/favicon.ico?v=${siteConfig.faviconVersion}`,
         },
      ],
      manifest: new URL('/site.webmanifest', siteConfig.baseUrl),
      openGraph: {
         type: 'website',
         title: siteConfig.title,
         description: siteConfig.description,
         url: new URL(siteConfig.baseUrl),
         siteName: siteConfig.title,
         images: [
            {
               url: new URL('/assets/favicon.svg', siteConfig.baseUrl).href,
               width: 1200,
               height: 630,
               alt: `${siteConfig.title} Logo`,
            },
         ],
      },
      twitter: {
         card: 'summary_large_image',
         creator: siteConfig.author.twitter,
         site: siteConfig.author.website,
      },
   } satisfies Metadata);
