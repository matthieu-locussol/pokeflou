import { Pokemon } from '@prisma/client';
import Image from 'next/image';
import { z } from 'zod';

const DEFAULT_SIZE = 256;

interface PokemonImageProps {
   pokemon: Pokemon;
   blurredIdx: number;
   width?: number;
   height?: number;
}

const zIndex = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]);

export const PokemonImage = ({
   pokemon,
   blurredIdx,
   width = DEFAULT_SIZE,
   height = DEFAULT_SIZE,
}: PokemonImageProps) => {
   const idx = zIndex.parse(blurredIdx);

   return (
      <Image
         src={`data:image/png;base64,${pokemon[`blurred_${idx}`]}`}
         alt="Guess the image!"
         width={width}
         height={height}
      />
   );
};
