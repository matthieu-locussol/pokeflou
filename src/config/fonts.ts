import localFont from 'next/font/local';

export const pokemonFont = localFont({
   src: '../../public/fonts/Pokemon.woff2',
   variable: '--font-pokemon',
   weight: '100 900',
});
