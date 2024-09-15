import { describe, expect, it } from 'vitest';

import { MockedPokemonFetcher } from '../adapters/PokemonFetcher';
import { GuessStore } from './GuessStore';

describe('GuessStore', () => {
   it('should be initialized', () => {
      const store = new GuessStore(MockedPokemonFetcher());

      expect(store).toBeDefined();
      expect(store.blurredIdx).toEqual(5);
      expect(store.loading).toBe(true);
      expect(store.pokemon).toBeNull();
      expect(store.countdown).toEqual(3);
   });

   it('should fetch pokemon', async () => {
      const store = new GuessStore(MockedPokemonFetcher());

      expect(store.loading).toBe(true);
      expect(store.pokemon).toBeNull();

      await store.fetchPokemon();

      expect(store.loading).toBe(false);
      expect(store.pokemon).not.toBeNull();
   });
});
