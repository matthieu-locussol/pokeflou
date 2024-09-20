'use client';

import { observer } from 'mobx-react-lite';
import { Language } from '../i18n/config';
import { useStore } from '../store';
import { _assert } from '../utils/_assert';
import { formatPokemonId } from '../utils/numberMgt';
import { PokemonCard } from './pokemon-card';
import { PokemonGuessForm } from './pokemon-guess-form';
import { PokemonLoadingCard } from './pokemon-loading-card';

interface PokemonGuessBlockProps {
   lang: Language;
}

export const PokemonGuessBlock = observer(({ lang }: PokemonGuessBlockProps) => {
   const { guessStore } = useStore();

   if (guessStore.loading) {
      return (
         <>
            <PokemonLoadingCard />
            <h2 className="text-center tracking-widest text-success-500 font-bold text-lg">???</h2>
            <PokemonGuessForm lang={lang} />
         </>
      );
   }

   _assert(guessStore.pokemon, 'Pokemon not found!');

   return (
      <>
         <PokemonCard pokemon={guessStore.pokemon} />
         <h2 className="text-center tracking-widest font-bold text-lg text-success-500">
            {guessStore.displayedNames[lang]}
            {!guessStore.canGuess && (
               <span className="text-foreground-500">
                  {' '}
                  (#{formatPokemonId(guessStore.pokemon.pokemonId)})
               </span>
            )}
         </h2>
         <PokemonGuessForm lang={lang} />
      </>
   );
});
