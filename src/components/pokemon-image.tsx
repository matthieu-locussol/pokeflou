import { Pokemon } from '@prisma/client';
import Image from 'next/image';
import { z } from 'zod';

interface PokemonImageProps {
   pokemon: Pokemon;
   blurredIdx: number;
}

const zIndex = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]);

export const PokemonImage = ({ pokemon, blurredIdx }: PokemonImageProps) => {
   const idx = zIndex.parse(blurredIdx);

   return (
      <Image
         src={`data:image/png;base64,${pokemon[`blurred_${idx}`]}`}
         alt="Guess the image!"
         width={200}
         height={200}
      />
   );
};
