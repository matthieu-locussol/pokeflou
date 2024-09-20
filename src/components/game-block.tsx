'use client';

import { observer } from 'mobx-react-lite';
import { Trans } from 'react-i18next';
import { Language } from '../i18n/config';
import { useStore } from '../store';
import { PokemonGuessBlock } from './pokemon-guess-block';
import { VersionsBlock } from './versions-block';

interface GameBlockProps {
   lang: Language;
}

export const GameBlock = observer(({ lang }: GameBlockProps) => {
   const { guessStore } = useStore();

   if (!guessStore.choseGenerations) {
      return <VersionsBlock lang={lang} />;
   }

   return (
      <>
         <h1 className="text-center text-2xl">
            <Trans
               i18nKey="whatPokemon"
               components={{
                  b: <span className="text-primary-500 font-[family-name:var(--font-pokemon)]" />,
               }}
            />
         </h1>
         <PokemonGuessBlock lang={lang} />
      </>
   );
});
