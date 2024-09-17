'use client';

import { Fireworks } from '../components/fireworks';
import { GameBlock } from '../components/game-block';

export default function App() {
   return (
      <section className="flex flex-col gap-4 p-4 md:p-8">
         <GameBlock />
         <Fireworks />
      </section>
   );
}
