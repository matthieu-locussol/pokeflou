import { GuessStats, LeaderboardTable } from '../../components/leaderboard-table';
import { prisma } from '../../prisma';

export default async function Leaderboard() {
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
         <h1 className="text-center text-2xl">Leaderboard</h1>
         <h2 className="text-center text-md mb-4 italic text-default-500">Top 100 players</h2>
         <LeaderboardTable data={data} />
      </section>
   );
}
