import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { StatsTable } from '../../components/stats-table';
import { prisma } from '../../prisma';

export default async function Stats() {
   const { getUser } = getKindeServerSession();

   const kindeUser = await getUser();
   if (kindeUser === null) {
      redirect('/');
   }

   const user = await prisma.user.findUnique({
      select: {
         guesses: {
            select: {
               won: true,
               pokemon: {
                  select: {
                     generation: true,
                  },
               },
            },
         },
      },
      where: {
         kindeId: kindeUser.id,
      },
   });

   const data = user === null ? [] : user.guesses;

   return (
      <section className="flex flex-col gap-4 py-4 px-0 md:p-8 max-w-4xl w-full">
         <h1 className="text-center text-2xl">My statistics</h1>
         <StatsTable data={data} />
      </section>
   );
}
