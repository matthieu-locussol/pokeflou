import { GuessStats, LeaderboardTable } from '../../../components/leaderboard-table';
import { useTranslation } from '../../../i18n';
import { Language } from '../../../i18n/config';
import { prisma } from '../../../prisma';

interface LeaderboardProps {
   params: {
      lang: Language;
   };
}

export default async function Leaderboard({ params: { lang } }: LeaderboardProps) {
   const { t } = await useTranslation(lang);

   const data = await prisma.$queryRaw<GuessStats[]>`
      SELECT
         "firstname",
         "lastname",
         SUM(CASE WHEN "won" = TRUE THEN 1 ELSE 0 END) AS "correctGuesses",
         SUM(CASE WHEN "won" = FALSE THEN 1 ELSE 0 END) AS "incorrectGuesses",
         COUNT(*) AS "totalGuesses",
         ROUND(
            (SUM(CASE WHEN "won" = TRUE THEN 1 ELSE 0 END) * 100.0) / COUNT(*),
            2
         ) AS "correctGuessPercentage"
      FROM "Guess" g
      LEFT JOIN "User" u ON u."kindeId" = g."userId"
      GROUP BY "userId", "firstname", "lastname"
      ORDER BY "totalGuesses", "correctGuessPercentage" DESC
      LIMIT 100;
 `;

   return (
      <section className="flex flex-col py-4 px-0 md:p-8 max-w-4xl w-full">
         <h1 className="text-center text-2xl">{t('leaderboard')}</h1>
         <h2 className="text-center text-md mb-4 italic text-default-500">
            {t('leaderboardTop100')}
         </h2>
         <LeaderboardTable
            data={data.map(
               ({
                  firstname,
                  lastname,
                  totalGuesses,
                  correctGuesses,
                  incorrectGuesses,
                  correctGuessPercentage,
               }) => ({
                  firstname,
                  lastname,
                  totalGuesses: Number(totalGuesses),
                  correctGuesses: Number(correctGuesses),
                  incorrectGuesses: Number(incorrectGuesses),
                  correctGuessPercentage: Number(correctGuessPercentage),
               }),
            )}
            lang={lang}
         />
      </section>
   );
}
