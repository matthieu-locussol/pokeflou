import type { Config } from 'tailwindcss';

import { nextui } from '@nextui-org/theme';

const config: Config = {
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
   ],
   theme: {
      extend: {
         colors: {
            background: 'var(--background)',
            foreground: 'var(--foreground)',
         },
      },
   },
   plugins: [
      nextui({
         themes: {
            light: {
               colors: {
                  primary: {
                     DEFAULT: '#006FEE',
                  },
                  secondary: {
                     DEFAULT: '#9353d3',
                  },
               },
            },
            dark: {
               colors: {
                  primary: {
                     DEFAULT: '#006FEE',
                  },
                  secondary: {
                     DEFAULT: '#9353d3',
                  },
               },
            },
         },
      }),
   ],
};
export default config;
