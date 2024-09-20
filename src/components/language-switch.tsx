'use client';

import { Icon } from '@iconify/react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { usePathname, useRouter } from 'next/navigation';
import { getLangIcon, getLangName, LANGUAGES, zLanguage } from '../i18n/config';

export const LanguageSwitch = () => {
   const router = useRouter();
   const pathname = usePathname();
   const currentLang = zLanguage.parse(pathname.split('/')[1]);

   return (
      <Dropdown placement="bottom-end" radius="sm" size="md">
         <DropdownTrigger className="transition-opacity hover:opacity-80 cursor-pointer">
            <Icon icon={getLangIcon(currentLang)} className="text-2xl" />
         </DropdownTrigger>
         <DropdownMenu
            aria-label="Choose language"
            selectionMode="single"
            selectedKeys={[currentLang]}
            color="primary"
         >
            {LANGUAGES.map((lang) => (
               <DropdownItem
                  startContent={<Icon icon={getLangIcon(lang)} className="text-lg" />}
                  key={lang}
                  onClick={() => {
                     const newPathname = pathname.replace(/^\/[a-z]{2}/, `/${lang}`);
                     router.push(newPathname);
                  }}
               >
                  {getLangName(lang)}
               </DropdownItem>
            ))}
         </DropdownMenu>
      </Dropdown>
   );
};
