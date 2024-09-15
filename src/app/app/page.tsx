'use client';

import { useEffect } from 'react';
import { PokemonGuessForm } from '../../components/pokemon-guess-form';
import { useSafeCallback } from '../../hooks/useSafeCallback';
import { useStore } from '../../store';

export default function App() {
   const { guessStore } = useStore();

   const fetchPokemon = useSafeCallback(() => guessStore.fetchPokemon());

   useEffect(() => {
      fetchPokemon();
   }, [fetchPokemon]);

   return (
      <section className="flex flex-col gap-4 p-4 md:p-8">
         <h1 className="text-center text-2xl">
            What{' '}
            <span className="text-primary-500 font-[family-name:var(--font-pokemon)]">Pokémon</span>{' '}
            is this?
         </h1>
         <PokemonGuessForm />
      </section>
   );
}
