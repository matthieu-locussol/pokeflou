import { Pokemon } from '@prisma/client';
import { makeAutoObservable, runInAction } from 'mobx';
import { IPokemonFetcher } from '../adapters/PokemonFetcher';
import { Language } from '../i18n/config';
import { decodePokemonName, formatPokemonName, toUpperCaseFirst } from '../utils/stringMgt';

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

   public wonBlurredIdx: number = 5;

   constructor(fetcher: IPokemonFetcher) {
      makeAutoObservable(this);

      this._fetcher = fetcher;

      if (typeof window !== 'undefined') {
         const savedGenerations = localStorage.getItem('generations');
         if (savedGenerations !== null) {
            this.generations = JSON.parse(savedGenerations);
         }
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

   public isNameValid(lang: Language): boolean {
      return this.getPokemonValidName(lang) === formatPokemonName(this.nameInput);
   }

   public setValidResult() {
      this.nameInput = '';
      this.wonBlurredIdx = this.blurredIdx;
      this.blurredIdx = 5;
      this.won = true;

      this.triggerCountdownIfNeeded();

      setTimeout(() => {
         runInAction(() => {
            this.won = false;
         });
      }, 2800);
   }

   public guess(lang: Language) {
      if (this.isNameValid(lang)) {
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

      if (typeof window !== 'undefined') {
         localStorage.setItem('generations', JSON.stringify(this.generations));
      }
   }

   public get canStartGame(): boolean {
      return this.generations.length > 0;
   }

   public get canGuess(): boolean {
      return this.blurredIdx < 5;
   }

   public get displayedNames() {
      if (this.canGuess || this.pokemon === null) {
         return {
            en: '???',
            ja: '???',
            ko: '???',
            zh: '???',
            fr: '???',
            de: '???',
            it: '???',
            es: '???',
         };
      }

      return {
         en: toUpperCaseFirst(decodePokemonName(this.pokemon.name_en)),
         ja: toUpperCaseFirst(decodePokemonName(this.pokemon.name_ja)),
         ko: toUpperCaseFirst(decodePokemonName(this.pokemon.name_ko)),
         zh: toUpperCaseFirst(decodePokemonName(this.pokemon.name_zh)),
         fr: toUpperCaseFirst(decodePokemonName(this.pokemon.name_fr)),
         de: toUpperCaseFirst(decodePokemonName(this.pokemon.name_de)),
         it: toUpperCaseFirst(decodePokemonName(this.pokemon.name_it)),
         es: toUpperCaseFirst(decodePokemonName(this.pokemon.name_es)),
      };
   }

   public get newGuessDisplayedText(): string {
      if (this.countdown === 0) {
         return 'newGuess';
      }

      return `${this.countdown}s...`;
   }

   public get canNewGuess(): boolean {
      return this.countdown === 0 && !this.loading;
   }

   public getPokemonValidName(lang: Language): string {
      if (this.pokemon === null) {
         return '???';
      }

      const name = {
         en: this.pokemon.name_en,
         ja: this.pokemon.name_ja,
         ko: this.pokemon.name_ko,
         zh: this.pokemon.name_zh,
         fr: this.pokemon.name_fr,
         de: this.pokemon.name_de,
         it: this.pokemon.name_it,
         es: this.pokemon.name_es,
      }[lang];

      return formatPokemonName(decodePokemonName(name));
   }
}
