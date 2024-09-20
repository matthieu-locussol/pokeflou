'use client';

import { observer } from 'mobx-react-lite';
import Confetti from 'react-canvas-confetti/dist/presets/fireworks';
import { useStore } from '../store';

export const Fireworks = observer(() => {
   const { guessStore } = useStore();

   if (!guessStore.won) {
      return null;
   }

   return (
      <Confetti
         autorun={{
            speed: 0.8,
            delay: 500,
         }}
      />
   );
});
