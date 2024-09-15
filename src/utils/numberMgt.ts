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

const POKEMON_GENERATIONS = [
   POKEMON_GEN_1_COUNT,
   POKEMON_GEN_2_COUNT,
   POKEMON_GEN_3_COUNT,
   POKEMON_GEN_4_COUNT,
   POKEMON_GEN_5_COUNT,
   POKEMON_GEN_6_COUNT,
   POKEMON_GEN_7_COUNT,
   POKEMON_GEN_8_COUNT,
];

export const getPokemonGeneration = (id: number) => {
   const generationIndex = POKEMON_GENERATIONS.findIndex((count) => id <= count);

   if (generationIndex === -1) {
      throw new Error(`Unknown generation for id '${id}'`);
   }

   return generationIndex + 1;
};

export const getGenerationPokemonIds = (generation: number) => {
   if (generation < 1 || generation > POKEMON_GENERATIONS.length) {
      throw new Error(`Unknown generation '${generation}'`);
   }

   const startId = generation === 1 ? 1 : POKEMON_GENERATIONS[generation - 2] + 1;
   const endId = POKEMON_GENERATIONS[generation - 1];

   return Array.from({ length: endId - startId + 1 }, (_, i) => startId + i);
};

export const getPokemonIdsList = (generations: number[]) => {
   if (generations.length === 0) {
      return [];
   }

   const sortedGenerations = generations.sort((a, b) => a - b);
   const pokemonIds = sortedGenerations.flatMap((generation) =>
      getGenerationPokemonIds(generation),
   );

   return pokemonIds;
};

export const getRandomPokemonId = (generations: number[]) => {
   const pokemonIds = getPokemonIdsList(generations);

   if (pokemonIds.length === 0) {
      return random(1, POKEMON_GEN_8_COUNT);
   }

   return pokemonIds[random(0, pokemonIds.length - 1)];
};

export const formatPokemonId = (id: number) => {
   return id.toString().padStart(3, '0');
};
