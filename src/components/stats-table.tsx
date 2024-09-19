'use client';

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { useEffect } from 'react';
import { useSafeCallback } from '../hooks/useSafeCallback';
import { useStore } from '../store';
import { StatsData } from '../store/StatsStore';

interface StatsTableProps {
   data: StatsData[];
}

export const StatsTable = ({ data }: StatsTableProps) => {
   const { statsStore } = useStore();

   const setData = useSafeCallback(() => {
      statsStore.setData(data);
   });

   useEffect(() => {
      setData();
   }, [setData]);

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
            <TableColumn>GENERATION</TableColumn>
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
               statsStore.tableData.map(({ generation, correct, incorrect, total, ratio }) => (
                  <TableRow key={generation}>
                     <TableCell>{generation}</TableCell>
                     <TableCell>{total}</TableCell>
                     <TableCell className="text-success-500">{correct}</TableCell>
                     <TableCell className="text-danger-500">{incorrect}</TableCell>
                     <TableCell>{ratio}</TableCell>
                  </TableRow>
               ))
            )}
         </TableBody>
      </Table>
   );
};
