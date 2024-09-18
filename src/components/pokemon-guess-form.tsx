'use client';

import { Icon } from '@iconify/react';
import { Input } from '@nextui-org/input';
import { observer } from 'mobx-react-lite';
import { FormEvent } from 'react';
import { useSaveUserData } from '../hooks/useSaveUserData';
import { useStore } from '../store';
import { ActionBar } from './action-bar';

export const PokemonGuessForm = observer(() => {
   const { guessStore } = useStore();
   const { saveUserData } = useSaveUserData();

   const onSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      guessStore.guess();
      saveUserData();
   };

   return (
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
         <Input
            autoFocus
            radius="sm"
            size="lg"
            disabled={!guessStore.canGuess}
            isDisabled={!guessStore.canGuess}
            classNames={{
               input: 'text-center',
               description: 'italic',
            }}
            onChange={(e) => guessStore.setNameInput(e.target.value)}
            value={guessStore.nameInput}
            startContent={<Icon icon="solar:question-circle-bold-duotone" className="text-2xl" />}
            description='E.g. "Bulbizarre", "pikachu", "RAYQUAZA"...'
         />
         <ActionBar />
      </form>
   );
});
