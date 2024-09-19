import { z } from 'zod';
import { prisma } from '../../../prisma';

export async function POST(req: Request) {
   try {
      const formData = await req.formData();

      const userId = z.string().parse(formData.get('userId'));
      const firstname = z.string().parse(formData.get('firstname'));
      const lastname = z.string().parse(formData.get('lastname'));
      const pokemonId = z.string().parse(formData.get('pokemonId'));
      const won = z.string().parse(formData.get('won')) === 'true';
      const blurredIdx = +z.string().parse(formData.get('blurredIdx'));

      const user = await prisma.user.findUnique({
         where: {
            kindeId: userId,
         },
      });

      if (user === null) {
         await prisma.user.create({
            data: {
               kindeId: userId,
               firstname,
               lastname,
               guesses: {
                  create: {
                     pokemonId,
                     won,
                     blurredIdx,
                  },
               },
            },
         });
      } else {
         await prisma.guess.create({
            data: {
               userId,
               pokemonId,
               won,
               blurredIdx,
            },
         });
      }

      return Response.json({ status: 'success' }, { status: 200 });
   } catch (error) {
      console.error(error);

      return Response.json({ status: 'error' }, { status: 500 });
   }
}
