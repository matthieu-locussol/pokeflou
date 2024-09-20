'use client';

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { useTranslation } from '../i18n/client';
import { Language } from '../i18n/config';

export interface GuessStats {
   firstname: string;
   lastname: string;
   correctGuesses: number;
   incorrectGuesses: number;
   totalGuesses: number;
   correctGuessPercentage: number;
}

interface LeaderboardTableProps {
   data: GuessStats[];
   lang: Language;
}

export const LeaderboardTable = ({ data, lang }: LeaderboardTableProps) => {
   const { t } = useTranslation(lang);

   return (
      <Table
         aria-label="My guesses statistics"
         radius="sm"
         color="default"
         selectionMode="single"
         defaultSelectedKeys={['TOTAL']}
         classNames={{
            wrapper: 'rounded-none md:rounded-md',
         }}
      >
         <TableHeader>
            <TableColumn>{t('rank')}</TableColumn>
            <TableColumn>{t('username')}</TableColumn>
            <TableColumn>{t('guesses')}</TableColumn>
            <TableColumn>{t('correct')}</TableColumn>
            <TableColumn>{t('incorrect')}</TableColumn>
            <TableColumn>{t('ratio')}</TableColumn>
         </TableHeader>
         <TableBody emptyContent={t('noData')}>
            {data.map(
               (
                  {
                     firstname,
                     lastname,
                     totalGuesses,
                     correctGuesses,
                     incorrectGuesses,
                     correctGuessPercentage,
                  },
                  idx,
               ) => (
                  <TableRow key={`${firstname}-${lastname}-${idx}`}>
                     <TableCell>#{idx + 1}</TableCell>
                     <TableCell>
                        {firstname} {lastname}
                     </TableCell>
                     <TableCell>{Number(totalGuesses)}</TableCell>
                     <TableCell className="text-success-500">{Number(correctGuesses)}</TableCell>
                     <TableCell className="text-danger-500">{Number(incorrectGuesses)}</TableCell>
                     <TableCell>{correctGuessPercentage}%</TableCell>
                  </TableRow>
               ),
            )}
         </TableBody>
      </Table>
   );
};
