export const random = (min: number, max: number) => {
   return Math.floor(Math.random() * (max - min + 1) + min);
};

export const POKEMON_GEN_1_COUNT = 151;
export const POKEMON_GEN_2_COUNT = 251;
export const POKEMON_GEN_3_COUNT = 386;
export const POKEMON_GEN_4_COUNT = 493;
export const POKEMON_GEN_5_COUNT = 649;
export const POKEMON_GEN_6_COUNT = 721;
export const POKEMON_GEN_7_COUNT = 809;
export const POKEMON_GEN_8_COUNT = 905;

export const getPokemonGeneration = (id: number) => {
   if (id <= POKEMON_GEN_1_COUNT) {
      return 1;
   }

   if (id <= POKEMON_GEN_2_COUNT) {
      return 2;
   }

   if (id <= POKEMON_GEN_3_COUNT) {
      return 3;
   }

   if (id <= POKEMON_GEN_4_COUNT) {
      return 4;
   }

   if (id <= POKEMON_GEN_5_COUNT) {
      return 5;
   }

   if (id <= POKEMON_GEN_6_COUNT) {
      return 6;
   }

   if (id <= POKEMON_GEN_7_COUNT) {
      return 7;
   }

   if (id <= POKEMON_GEN_8_COUNT) {
      return 8;
   }

   throw new Error(`Unknown generation for id '${id}'`);
};
