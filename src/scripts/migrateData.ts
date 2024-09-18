import { readFileSync } from 'fs';
import { join } from 'path';
import { z } from 'zod';
import { prisma } from '../prisma';
import { getPokemonGeneration, POKEMON_GEN_8_COUNT } from '../utils/numberMgt';

const POKEMON_COUNT = POKEMON_GEN_8_COUNT;

const zData = z.array(
   z.object({
      id: z.number(),
      names: z.object({
         ja: z.string(),
         ko: z.string(),
         zh: z.string(),
         fr: z.string(),
         de: z.string(),
         it: z.string(),
         en: z.string(),
         es: z.string(),
      }),
   }),
);

type Data = z.infer<typeof zData>;

const zSprite = z.object({
   '1': z.string(),
   '2': z.string(),
   '3': z.string(),
   '4': z.string(),
   '7': z.string(),
});

type Sprite = z.infer<typeof zSprite>;

export const migrateData = async () => {
   const records: Record<
      string,
      {
         names: Data[number]['names'];
         data: Sprite;
      }
   > = {};

   const dataPath = join(process.cwd(), 'public/data.json');
   const dataBlob = JSON.parse(readFileSync(dataPath, 'utf-8'));
   const data = zData.parse(dataBlob);

   const pokemonIds = new Array(POKEMON_COUNT).fill(0).map((_, i) => i + 1);

   for (const id of pokemonIds) {
      const { names } = data.find((pokemon) => pokemon.id === id)!;

      const pokemonPath = join(process.cwd(), `public/sprites/${id}.json`);
      const pokemonBlob = readFileSync(pokemonPath, 'utf-8');
      const pokemonData = zSprite.parse(JSON.parse(pokemonBlob));

      records[id] = {
         names,
         data: pokemonData,
      };
   }

   await prisma.pokemon.createMany({
      data: Object.entries(records).map(([id, { names, data }]) => ({
         name_ja: names.ja,
         name_ko: names.ko,
         name_zh: names.zh,
         name_fr: names.fr,
         name_de: names.de,
         name_it: names.it,
         name_en: names.en,
         name_es: names.es,
         blurred_1: data['1'],
         blurred_2: data['2'],
         blurred_3: data['3'],
         blurred_4: data['4'],
         blurred_5: data['7'],
         generation: getPokemonGeneration(+id),
         pokemonId: +id,
      })),
      skipDuplicates: true,
   });
};

migrateData();
