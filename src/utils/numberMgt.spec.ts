import { describe, expect, it } from 'vitest';

import {
   getGenerationPokemonIds,
   getPokemonGeneration,
   getPokemonIdsList,
   getRandomPokemonId,
   POKEMON_GEN_1_COUNT,
   POKEMON_GEN_2_COUNT,
   POKEMON_GEN_3_COUNT,
   POKEMON_GEN_7_COUNT,
   POKEMON_GEN_8_COUNT,
   random,
} from './numberMgt';

describe('numberMgt', () => {
   describe('random', () => {
      const samples = [
         {
            title: 'should return a number between min and max',
            min: 1,
            max: 10,
         },
         {
            title: 'should return a number between 0 and 1',
            min: 0,
            max: 1,
         },
         {
            title: 'should return a number between -10 and 10',
            min: -10,
            max: 10,
         },
         {
            title: 'should return a number between 0 and 100',
            min: 0,
            max: 100,
         },
         {
            title: 'should return a number between 0 and 10000',
            min: 0,
            max: 10000,
         },
         {
            title: 'should return a number between -10000 and 10000',
            min: -10000,
            max: 10000,
         },
         {
            title: 'should return a number between -1000000 and 1000000',
            min: -1000000,
            max: 1000000,
         },
      ];

      samples.forEach(({ title, min, max }) => {
         it(title, () => {
            const value = random(min, max);

            expect(value).toBeGreaterThanOrEqual(min);
            expect(value).toBeLessThanOrEqual(max);
         });
      });
   });

   describe('getPokemonGeneration', () => {
      const samples = [
         {
            title: 'should return 1 for id <= 151',
            id: 1,
            expected: 1,
         },
         {
            title: 'should return 1 for id <= 151',
            id: 151,
            expected: 1,
         },
         {
            title: 'should return 2 for the one right after',
            id: 152,
            expected: 2,
         },
         {
            title: 'should return 2 for id <= 251',
            id: 251,
            expected: 2,
         },
         {
            title: 'should return 3 for the one right after',
            id: 252,
            expected: 3,
         },
         {
            title: 'should return 3 for id <= 386',
            id: 386,
            expected: 3,
         },
         {
            title: 'should return 4 for the one right after',
            id: 387,
            expected: 4,
         },
         {
            title: 'should return 4 for id <= 493',
            id: 493,
            expected: 4,
         },
         {
            title: 'should return 5 for the one right after',
            id: 494,
            expected: 5,
         },
         {
            title: 'should return 5 for id <= 649',
            id: 649,
            expected: 5,
         },
         {
            title: 'should return 6 for the one right after',
            id: 650,
            expected: 6,
         },
         {
            title: 'should return 6 for id <= 721',
            id: 721,
            expected: 6,
         },
         {
            title: 'should return 7 for the one right after',
            id: 722,
            expected: 7,
         },
         {
            title: 'should return 7 for id <= 809',
            id: 809,
            expected: 7,
         },
         {
            title: 'should return 8 for the one right after',
            id: 810,
            expected: 8,
         },
         {
            title: 'should return 8 for id <= 905',
            id: 905,
            expected: 8,
         },
      ];

      samples.forEach(({ title, id, expected }) => {
         it(title, () => {
            expect(getPokemonGeneration(id)).toEqual(expected);
         });
      });

      const failedSamples = [
         {
            title: 'should throw an error for id > 905',
            id: 906,
         },
      ];

      failedSamples.forEach(({ title, id }) => {
         it(title, () => {
            expect(() => getPokemonGeneration(id)).toThrowError();
         });
      });
   });

   describe('getGenerationPokemonIds', () => {
      const samples = [
         {
            title: 'should return the correct ids array for generation 1',
            generation: 1,
            expected: Array.from({ length: POKEMON_GEN_1_COUNT }).map((_, i) => i + 1),
         },
         {
            title: 'should return the correct ids array for generation 2',
            generation: 2,
            expected: Array.from({ length: POKEMON_GEN_2_COUNT - POKEMON_GEN_1_COUNT }).map(
               (_, i) => i + 1 + POKEMON_GEN_1_COUNT,
            ),
         },
         {
            title: 'should return the correct ids array for generation 8',
            generation: 8,
            expected: Array.from({ length: POKEMON_GEN_8_COUNT - POKEMON_GEN_7_COUNT }).map(
               (_, i) => i + 1 + POKEMON_GEN_7_COUNT,
            ),
         },
      ];

      samples.forEach(({ title, generation, expected }) => {
         it(title, () => {
            expect(getGenerationPokemonIds(generation)).toEqual(expected);
         });
      });
   });

   describe('getPokemonIdsList', () => {
      const samples = [
         {
            title: 'should return an empty array for an empty array',
            generations: [],
            expected: [],
         },
         {
            title: 'should return an empty array for an array with only one generation',
            generations: [1],
            expected: Array.from({ length: POKEMON_GEN_1_COUNT }).map((_, i) => i + 1),
         },
         {
            title: 'should return the correct array for an array with multiple generations',
            generations: [1, 2, 8],
            expected: [
               ...Array.from({ length: POKEMON_GEN_1_COUNT }).map((_, i) => i + 1),
               ...Array.from({ length: POKEMON_GEN_2_COUNT - POKEMON_GEN_1_COUNT }).map(
                  (_, i) => i + 1 + POKEMON_GEN_1_COUNT,
               ),
               ...Array.from({ length: POKEMON_GEN_8_COUNT - POKEMON_GEN_7_COUNT }).map(
                  (_, i) => i + 1 + POKEMON_GEN_7_COUNT,
               ),
            ],
         },
      ];

      samples.forEach(({ title, generations, expected }) => {
         it(title, () => {
            expect(getPokemonIdsList(generations)).toEqual(expected);
         });
      });
   });

   describe('getRandomPokemonId', () => {
      const samples = [
         {
            title: 'should return a random id for an empty array',
            generations: [],
            min: 1,
            max: POKEMON_GEN_8_COUNT,
         },
         {
            title: 'should return a random id for an array with only one generation',
            generations: [1],
            min: 1,
            max: POKEMON_GEN_1_COUNT,
         },
         {
            title: 'should return a random id for an array with multiple generations',
            generations: [2, 3],
            min: POKEMON_GEN_1_COUNT + 1,
            max: POKEMON_GEN_3_COUNT,
         },
      ];

      samples.forEach(({ title, generations, min, max }) => {
         it(title, () => {
            const value = getRandomPokemonId(generations);

            expect(value).toBeGreaterThanOrEqual(min);
            expect(value).toBeLessThanOrEqual(max);
         });
      });
   });
});
