'use client';

import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { PokemonGuessBlock } from './pokemon-guess-block';
import { VersionsBlock } from './versions-block';

export const GameBlock = observer(() => {
   const { guessStore } = useStore();

   if (!guessStore.choseGenerations) {
      return <VersionsBlock />;
   }

   return (
      <>
         <h1 className="text-center text-2xl">
            What{' '}
            <span className="text-primary-500 font-[family-name:var(--font-pokemon)]">Pokémon</span>{' '}
            is this?
         </h1>
         <PokemonGuessBlock />
      </>
   );
});
