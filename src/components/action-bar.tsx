'use client';

import { Button } from '@nextui-org/button';
import { CircularProgress } from '@nextui-org/progress';
import { observer } from 'mobx-react-lite';
import { useTranslation } from '../i18n/client';
import { Language } from '../i18n/config';
import { useStore } from '../store';
import { ButtonNoIdea } from './button-no-idea';

interface ActionBarProps {
   lang: Language;
}

export const ActionBar = observer(({ lang }: ActionBarProps) => {
   const { guessStore } = useStore();
   const { t } = useTranslation(lang);

   return (
      <div className="flex justify-between gap-4">
         {guessStore.canGuess && (
            <>
               <Button variant="shadow" color="primary" radius="sm" size="lg" type="submit">
                  {t('submit')}
               </Button>
               <ButtonNoIdea>{t('noIdea')}</ButtonNoIdea>
            </>
         )}
         {!guessStore.canGuess && (
            <Button
               variant="shadow"
               color="success"
               radius="sm"
               size="lg"
               fullWidth
               onClick={() => guessStore.fetchPokemon()}
               disabled={!guessStore.canNewGuess}
               isDisabled={!guessStore.canNewGuess}
            >
               {guessStore.loading ? (
                  <CircularProgress
                     aria-label="Loading..."
                     classNames={{
                        svg: 'w-7 h-7',
                        indicator: 'text-white',
                     }}
                  />
               ) : (
                  t(guessStore.newGuessDisplayedText)
               )}
            </Button>
         )}
      </div>
   );
});
