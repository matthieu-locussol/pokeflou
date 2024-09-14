'use client';

import type { ThemeProviderProps } from 'next-themes/dist/types';

import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { StoreProvider } from '../store';

export interface ProvidersProps {
   children: React.ReactNode;
   themeProps?: Omit<ThemeProviderProps, 'children'>;
}

export function Providers({ children, themeProps }: ProvidersProps) {
   const router = useRouter();

   return (
      <StoreProvider>
         <NextUIProvider navigate={router.push}>
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
         </NextUIProvider>
      </StoreProvider>
   );
}
