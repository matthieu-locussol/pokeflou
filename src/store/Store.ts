import { makeAutoObservable } from 'mobx';

import { PokemonFetcher } from '../adapters/PokemonFetcher';
import { GuessStore } from './GuessStore';
import { MenuStore } from './MenuStore';
import { StatsStore } from './StatsStore';

export class Store {
   public guessStore: GuessStore;

   public menuStore: MenuStore;

   public statsStore: StatsStore;

   constructor() {
      makeAutoObservable(this);

      this.guessStore = new GuessStore(PokemonFetcher);
      this.menuStore = new MenuStore();
      this.statsStore = new StatsStore();
   }
}
