'use client';

import { Button } from '@nextui-org/button';

import { observer } from 'mobx-react-lite';
import { useStore } from '../store';

export const ButtonNoIdea = observer(() => {
   const { guessStore } = useStore();

   return (
      <Button
         variant="shadow"
         color="secondary"
         radius="sm"
         size="lg"
         disabled={!guessStore.canGuess}
         isDisabled={!guessStore.canGuess}
         onClick={() => guessStore.unpixelate()}
      >
         I don&apos;t know
      </Button>
   );
});
