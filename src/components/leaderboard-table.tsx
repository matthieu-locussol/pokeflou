'use client';

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';

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
}

export const LeaderboardTable = ({ data }: LeaderboardTableProps) => {
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
            <TableColumn>RANK</TableColumn>
            <TableColumn>USER</TableColumn>
            <TableColumn>GUESSES</TableColumn>
            <TableColumn>CORRECT</TableColumn>
            <TableColumn>INCORRECT</TableColumn>
            <TableColumn>RATIO</TableColumn>
         </TableHeader>
         <TableBody>
            {data.length === 0 ? (
               <TableRow>
                  <TableCell colSpan={5}>No data yet</TableCell>
               </TableRow>
            ) : (
               data.map(
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
                        <TableCell className="text-danger-500">
                           {Number(incorrectGuesses)}
                        </TableCell>
                        <TableCell>{correctGuessPercentage}%</TableCell>
                     </TableRow>
                  ),
               )
            )}
         </TableBody>
      </Table>
   );
};
