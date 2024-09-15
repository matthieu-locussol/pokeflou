import { describe, expect, it } from 'vitest';
import { decodePokemonName, toUpperCaseFirst } from './stringMgt';

describe('stringMgt', () => {
   describe('decodePokemonName', () => {
      const samples = [
         {
            title: 'should return a number between min and max',
            pokemonName: '',
            expected: '',
         },
      ];

      samples.forEach(({ title, pokemonName, expected }) => {
         it(title, () => {
            expect(decodePokemonName(pokemonName)).toEqual(expected);
         });
      });
   });

   describe('toUpperCaseFirst', () => {
      it('should return the string with the first character in uppercase', () => {
         const strings = ['user', 'User', 'USER', '123user', 'user123', 'user_123', 'user-123'];
         const expectedResults = [
            'User',
            'User',
            'USER',
            '123user',
            'User123',
            'User_123',
            'User-123',
         ];

         const results = strings.map((str) => toUpperCaseFirst(str));

         results.forEach((result, index) => expect(result).toBe(expectedResults[index]));
      });
   });
});
