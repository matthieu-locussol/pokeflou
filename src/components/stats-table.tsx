'use client';

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { useEffect } from 'react';
import { useSafeCallback } from '../hooks/useSafeCallback';
import { useTranslation } from '../i18n/client';
import { Language } from '../i18n/config';
import { useStore } from '../store';
import { StatsData } from '../store/StatsStore';

interface StatsTableProps {
   data: StatsData[];
   lang: Language;
}

export const StatsTable = ({ data, lang }: StatsTableProps) => {
   const { statsStore } = useStore();
   const { t } = useTranslation(lang);

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
         defaultSelectedKeys={['total']}
         classNames={{
            wrapper: 'rounded-none md:rounded-md',
         }}
      >
         <TableHeader>
            <TableColumn>{t('generation')}</TableColumn>
            <TableColumn>{t('guesses')}</TableColumn>
            <TableColumn>{t('correct')}</TableColumn>
            <TableColumn>{t('incorrect')}</TableColumn>
            <TableColumn>{t('ratio')}</TableColumn>
         </TableHeader>
         <TableBody emptyContent={t('noData')}>
            {statsStore.tableData.map(({ generation, correct, incorrect, total, ratio }) => (
               <TableRow key={generation}>
                  <TableCell>
                     {generation === 'total' ? t('total') : t('generationShort', { generation })}
                  </TableCell>
                  <TableCell>{total}</TableCell>
                  <TableCell className="text-success-500">{correct}</TableCell>
                  <TableCell className="text-danger-500">{incorrect}</TableCell>
                  <TableCell>{ratio}</TableCell>
               </TableRow>
            ))}
         </TableBody>
      </Table>
   );
};
