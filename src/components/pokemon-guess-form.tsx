'use client';

import { Input } from '@nextui-org/input';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { ActionBar } from './action-bar';

export const PokemonGuessForm = observer(() => {
   const { guessStore } = useStore();

   return (
      <form className="flex flex-col gap-4">
         <Input
            autoFocus
            placeholder="E.g. Bulbizarre, Bulbasaur, フシギダネ..."
            radius="sm"
            size="lg"
            disabled={!guessStore.canGuess}
            isDisabled={!guessStore.canGuess}
            classNames={{
               input: 'text-center',
            }}
         />
         <ActionBar />
      </form>
   );
});
