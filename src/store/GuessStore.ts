import { Pokemon } from '@prisma/client';
import { makeAutoObservable, runInAction } from 'mobx';
import { IPokemonFetcher } from '../adapters/PokemonFetcher';
import { formatPokemonName, toUpperCaseFirst } from '../utils/stringMgt';

export class GuessStore {
   private _fetcher: IPokemonFetcher;

   public blurredIdx: number = 5;

   public loading: boolean = true;

   public pokemon: Pokemon | null = null;

   public countdown: number = 3;

   public nameInput: string = '';

   public won: boolean = false;

   public generations: number[] = [];

   public choseGenerations: boolean = false;

   constructor(fetcher: IPokemonFetcher) {
      makeAutoObservable(this);

      this._fetcher = fetcher;

      const savedGenerations = localStorage.getItem('generations');
      if (savedGenerations !== null) {
         this.generations = JSON.parse(savedGenerations);
      }
   }

   public async fetchPokemon() {
      runInAction(() => {
         this.loading = true;
         this.nameInput = '';
      });

      const url = `/api/guess?generations=${this.generations.join(',')}`;
      const pokemon = await this._fetcher.fetch(url);

      runInAction(() => {
         this.pokemon = pokemon;
         this.loading = false;
         this.blurredIdx = 1;
         this.countdown = 3;
      });
   }

   public unpixelate() {
      this.blurredIdx = this.blurredIdx + 1;
      this.triggerCountdownIfNeeded();
   }

   public triggerCountdownIfNeeded() {
      if (!this.canGuess) {
         const intervalId = setInterval(() => {
            runInAction(() => {
               this.countdown = this.countdown - 1;
            });

            if (this.countdown <= 0) {
               clearInterval(intervalId);
            }
         }, 1000);
      }
   }

   public setNameInput(nameInput: string) {
      this.nameInput = nameInput;
   }

   public isNameValid(): boolean {
      return this.pokemonValidName === formatPokemonName(this.nameInput);
   }

   public setValidResult() {
      this.nameInput = '';
      this.blurredIdx = 5;
      this.won = true;

      this.triggerCountdownIfNeeded();

      setTimeout(() => {
         runInAction(() => {
            this.won = false;
         });
      }, 2800);
   }

   public guess() {
      if (this.isNameValid()) {
         this.setValidResult();
      } else {
         this.unpixelate();
      }
   }

   public setChoseGenerations(chose: boolean) {
      this.choseGenerations = chose;

      this.fetchPokemon();
   }

   public setGeneration(generation: number, checked: boolean) {
      if (checked) {
         if (!this.generations.includes(generation)) {
            this.generations.push(generation);
         }
      } else {
         this.generations = this.generations.filter((g) => g !== generation);
      }

      localStorage.setItem('generations', JSON.stringify(this.generations));
   }

   public get canStartGame(): boolean {
      return this.generations.length > 0;
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

   public get pokemonValidName(): string {
      if (this.pokemon === null) {
         return '???';
      }

      return formatPokemonName(this.pokemon.name_fr);
   }
}
