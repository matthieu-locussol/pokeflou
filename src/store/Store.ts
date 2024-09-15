import { makeAutoObservable } from 'mobx';

import { PokemonFetcher } from '../adapters/PokemonFetcher';
import { GuessStore } from './GuessStore';
import { MenuStore } from './MenuStore';

export class Store {
   public guessStore: GuessStore;

   public menuStore: MenuStore;

   constructor() {
      makeAutoObservable(this);

      this.guessStore = new GuessStore(PokemonFetcher);
      this.menuStore = new MenuStore();
   }
}
