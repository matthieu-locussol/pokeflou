import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import * as Sentry from '@sentry/nextjs';
import { useState } from 'react';
import { useStore } from '../store';
import { _assert } from '../utils/_assert';

export const useSaveUserData = () => {
   const { user, isAuthenticated } = useKindeBrowserClient();
   const { guessStore } = useStore();
   const [loading, setLoading] = useState(false);

   const saveUserData = async () => {
      try {
         setLoading(true);

         if (isAuthenticated && user !== null) {
            const { won, blurredIdx, wonBlurredIdx, pokemon } = guessStore;

            if (won || blurredIdx === 5) {
               const { id } = user;

               _assert(pokemon, 'Pokemon not found!');

               const formData = new FormData();
               formData.append('userId', id);
               formData.append('pokemonId', pokemon.id);
               formData.append('won', won.toString());
               formData.append(
                  'blurredIdx',
                  won ? wonBlurredIdx.toString() : blurredIdx.toString(),
               );

               await fetch('/api/upload', {
                  method: 'POST',
                  body: formData,
               });

               setLoading(false);
            }
         }
      } catch (error) {
         Sentry.captureException(error);

         setLoading(false);
      }
   };

   return { saveUserData, loading };
};
