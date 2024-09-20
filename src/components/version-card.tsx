'use client';

import { Checkbox } from '@nextui-org/checkbox';
import { cn } from '@nextui-org/theme';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { useTranslation } from '../i18n/client';
import { Language } from '../i18n/config';
import { useStore } from '../store';

interface VersionCardProps {
   generation: number;
   lang: Language;
}

export const VersionCard = observer(({ generation, lang }: VersionCardProps) => {
   const { guessStore } = useStore();
   const { t } = useTranslation(lang);

   return (
      <Checkbox
         aria-label={`Toggle generation ${generation}`}
         classNames={{
            base: cn(
               'inline-flex max-w-md bg-default-100',
               'hover:bg-default-200 items-center justify-start',
               'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
               'data-[selected=true]:border-primary',
            ),
            label: 'w-full',
         }}
         isSelected={guessStore.generations.includes(generation)}
         onValueChange={(checked) => guessStore.setGeneration(generation, checked)}
      >
         <div className="w-full flex flex-col items-center justify-between gap-2">
            <Image
               src={`/releases/gen_${generation}.jpg`}
               alt={`Generation ${generation} cover`}
               width={96}
               height={96}
               className="rounded-md"
               priority
            />
            <h2 className="text-center">{t('generationLong', { generation })}</h2>
         </div>
      </Checkbox>
   );
});
