import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { StatsTable } from '../../../components/stats-table';
import { useTranslation } from '../../../i18n';
import { Language } from '../../../i18n/config';
import { prisma } from '../../../prisma';

interface StatsProps {
   params: {
      lang: Language;
   };
}

export default async function Stats({ params: { lang } }: StatsProps) {
   const { getUser } = getKindeServerSession();
   const { t } = await useTranslation(lang);

   const kindeUser = await getUser();
   if (kindeUser === null) {
      redirect(`/${lang}`);
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
         <h1 className="text-center text-2xl">{t('myStats')}</h1>
         <StatsTable data={data} lang={lang} />
      </section>
   );
}
