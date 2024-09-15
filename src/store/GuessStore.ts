import { Pokemon } from '@prisma/client';
import { makeAutoObservable } from 'mobx';
import { IPokemonFetcher } from '../adapters/PokemonFetcher';
import { toUpperCaseFirst } from '../utils/stringMgt';

export class GuessStore {
   private _fetcher: IPokemonFetcher;

   public blurredIdx: number = 5;

   public loading: boolean = true;

   public pokemon: Pokemon | null = null;

   public countdown: number = 3;

   constructor(fetcher: IPokemonFetcher) {
      makeAutoObservable(this);

      this._fetcher = fetcher;
   }

   public async fetchPokemon(generations: number[] = []) {
      this.loading = true;

      const url = `/api/guess?generations=${generations.join(',')}`;
      const pokemon = await this._fetcher.fetch(url);

      this.pokemon = pokemon;
      this.loading = false;
      this.blurredIdx = 1;
      this.countdown = 3;
   }

   public unpixelate() {
      this.blurredIdx = this.blurredIdx + 1;

      if (!this.canGuess) {
         const intervalId = setInterval(() => {
            this.countdown = this.countdown - 1;

            if (this.countdown <= 0) {
               clearInterval(intervalId);
            }
         }, 1000);
      }
   }

   public get canGuess(): boolean {
      return this.blurredIdx < 5;
   }

   public get displayedName(): string {
      if (this.canGuess) {
         return '???';
      }

      if (this.pokemon === null) {
         return '???';
      }

      return toUpperCaseFirst(this.pokemon.name_fr);
   }

   public get newGuessDisplayedText(): string {
      if (this.countdown === 0) {
         return 'New guess';
      }

      return `${this.countdown}s...`;
   }

   public get canNewGuess(): boolean {
      return this.countdown === 0 && !this.loading;
   }
}
