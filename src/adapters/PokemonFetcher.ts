import type { Pokemon } from '@prisma/client';
import { wait } from '../utils/wait';

export interface IPokemonFetcher {
   fetch: (url: RequestInfo | URL) => Promise<Pokemon>;
}

export const MockedPokemonFetcher = (results: Pokemon = makeMockedPokemon()): IPokemonFetcher => ({
   fetch: async () => {
      await wait(500);
      return Promise.resolve(results);
   },
});

export const PokemonFetcher: IPokemonFetcher = {
   fetch: async (url: RequestInfo | URL) => {
      const response = await fetch(url);
      const results: Pokemon = await response.json();
      return results;
   },
};

export const makeMockedPokemon = (overrides?: Partial<Pokemon>): Pokemon => ({
   id: '1',
   pokemonId: 1,
   name_fr: 'Bulbizarre',
   name_ko: 'Bulbasaur',
   name_zh: '妙蛙稀',
   name_de: 'Bisaflor',
   name_it: 'Bulbasaur',
   name_en: 'Bulbasaur',
   name_es: 'Bulbasaur',
   name_ja: 'フシギダネ',
   blurred_1: '',
   blurred_2: '',
   blurred_3: '',
   blurred_4: '',
   blurred_5: '',
   generation: 1,
   ...overrides,
});
