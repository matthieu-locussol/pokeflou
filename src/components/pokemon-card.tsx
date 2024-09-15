'use client';

import { Card } from '@nextui-org/card';
import { Pokemon } from '@prisma/client';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { PokemonImage } from './pokemon-image';

interface PokemonCardProps {
   pokemon: Pokemon;
}

export const PokemonCard = observer(({ pokemon }: PokemonCardProps) => {
   const { guessStore } = useStore();

   return (
      <Card className="p-8" radius="sm">
         <PokemonImage pokemon={pokemon} blurredIdx={guessStore.blurredIdx} />
      </Card>
   );
});
