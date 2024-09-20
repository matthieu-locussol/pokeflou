import type { DropdownProps } from '@nextui-org/dropdown';
import type { NavItem } from '../config/site';

import { Icon } from '@iconify/react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { link as linkStyles } from '@nextui-org/theme';
import clsx from 'clsx';

import { useTranslation } from '../i18n/client';
import { Language } from '../i18n/config';
import { CustomIcon } from './icons';

interface NavbarDropdownProps extends Omit<DropdownProps, 'children'> {
   item: NavItem;
   lang: Language;
}

export const NavbarDropdown = ({ item, lang, ...rest }: NavbarDropdownProps) => {
   const { t } = useTranslation(lang);

   return (
      <Dropdown
         showArrow
         classNames={{
            base: 'before:bg-default-200',
            content:
               'py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-primary-50 dark:from-primary-50 dark:to-black',
         }}
         placement="top"
         radius="sm"
         {...rest}
      >
         <DropdownTrigger>
            <li
               className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'cursor-pointer data-[active=true]:text-primary data-[active=true]:font-medium',
               )}
            >
               {t(item.label)}
               <Icon className="w-4 ml-1" icon="lucide:chevron-down" />
            </li>
         </DropdownTrigger>
         {item.subItems !== undefined && (
            <DropdownMenu
               aria-label="Dropdown menu with description"
               disabledKeys={item.subItems
                  .filter((value) => value.disabled)
                  .map((item) => item.label)}
               variant="faded"
            >
               {item.subItems.map((subItem) => (
                  <DropdownItem
                     key={subItem.label}
                     description={t(subItem.description || '')}
                     href={subItem.href}
                     startContent={<CustomIcon icon={subItem.icon} />}
                  >
                     {t(subItem.label)}
                  </DropdownItem>
               ))}
            </DropdownMenu>
         )}
      </Dropdown>
   );
};
