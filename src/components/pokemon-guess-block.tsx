'use client';

import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { _assert } from '../utils/_assert';
import { formatPokemonId } from '../utils/numberMgt';
import { PokemonCard } from './pokemon-card';
import { PokemonGuessForm } from './pokemon-guess-form';
import { PokemonLoadingCard } from './pokemon-loading-card';

export const PokemonGuessBlock = observer(() => {
   const { guessStore } = useStore();

   if (guessStore.loading) {
      return (
         <>
            <PokemonLoadingCard />
            <h2 className="text-center tracking-widest text-success-500 font-bold text-lg">???</h2>
            <PokemonGuessForm />
         </>
      );
   }

   _assert(guessStore.pokemon, 'Pokemon not found!');

   return (
      <>
         <PokemonCard pokemon={guessStore.pokemon} />
         <h2 className="text-center tracking-widest font-bold text-lg text-success-500">
            {guessStore.displayedName}
            {!guessStore.canGuess && (
               <span className="text-foreground-500">
                  {' '}
                  (#{formatPokemonId(guessStore.pokemon.pokemonId)})
               </span>
            )}
         </h2>
         <PokemonGuessForm />
      </>
   );
});
