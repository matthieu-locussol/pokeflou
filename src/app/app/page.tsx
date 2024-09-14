import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { PokemonImage } from '../../components/PokemonImage';
import { prisma } from '../../prisma';
import { _assert } from '../../utils/_assert';
import { getRandomPokemonId } from '../../utils/numberMgt';

const getRandomPokemonAction = async () => {
   const pokemonId = getRandomPokemonId([1, 2, 3, 4, 5, 6, 7, 8]);
   const pokemon = await prisma.pokemon.findUnique({
      where: {
         pokemonId,
      },
   });

   _assert(pokemon, `Pokemon not found!`);
   return pokemon;
};

export default async function App() {
   const { getUser } = getKindeServerSession();
   const user = await getUser();
   const pokemon = await getRandomPokemonAction();

   return (
      <div className="flex flex-col">
         <p>App fun</p>
         <p>Hello {user.given_name}!</p>
         <p>
            {pokemon.name_fr} ({pokemon.pokemonId})
         </p>
         {Array.from({ length: 5 }).map((_, i) => (
            <PokemonImage key={`guess_${i}`} pokemon={pokemon} blurredIdx={i + 1} />
         ))}
         <LogoutLink>Log Out</LogoutLink>
      </div>
   );
}
