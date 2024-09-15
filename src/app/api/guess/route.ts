import { NextResponse } from 'next/server';
import { prisma } from '../../../prisma';
import { _assert } from '../../../utils/_assert';
import { getRandomPokemonId } from '../../../utils/numberMgt';

export async function GET(req: Request) {
   const url = new URL(req.url);
   const generationsParameter = url.searchParams.get('generations');
   const generations = generationsParameter ? generationsParameter.split(',').map(Number) : [];

   const pokemonId = getRandomPokemonId(generations);
   const pokemon = await prisma.pokemon.findUnique({
      where: {
         pokemonId,
      },
   });

   _assert(pokemon, `Pokemon not found for id '${pokemonId}'`);

   return NextResponse.json(pokemon);
}
