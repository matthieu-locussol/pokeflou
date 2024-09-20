'use client';

import { Button, ButtonProps } from '@nextui-org/button';

import { observer } from 'mobx-react-lite';
import { useSaveUserData } from '../hooks/useSaveUserData';
import { useStore } from '../store';

export const ButtonNoIdea = observer((props: ButtonProps) => {
   const { guessStore } = useStore();
   const { saveUserData } = useSaveUserData();

   return (
      <Button
         variant="shadow"
         color="secondary"
         radius="sm"
         size="lg"
         disabled={!guessStore.canGuess}
         isDisabled={!guessStore.canGuess}
         onClick={() => {
            guessStore.unpixelate();
            saveUserData();
         }}
         {...props}
      />
   );
});
