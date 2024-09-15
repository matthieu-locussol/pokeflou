'use client';

import { Button } from '@nextui-org/button';
import { CircularProgress } from '@nextui-org/progress';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { ButtonNoIdea } from './button-no-idea';

export const ActionBar = observer(() => {
   const { guessStore } = useStore();

   return (
      <div className="flex justify-between gap-4">
         {guessStore.canGuess && (
            <>
               <Button variant="shadow" color="primary" radius="sm" size="lg">
                  Submit
               </Button>
               <ButtonNoIdea />
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
                  guessStore.newGuessDisplayedText
               )}
            </Button>
         )}
      </div>
   );
});
