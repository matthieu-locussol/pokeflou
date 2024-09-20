import type { NavbarItemProps } from '@nextui-org/navbar';
import type { NavItem } from '../config/site';

import { useStore } from '../store';

import { Language } from '../i18n/config';
import { NavbarMenuLink } from './navbar-menu-link';

interface NavbarMenuDropdownProps extends NavbarItemProps {
   item: NavItem;
   isLoading: boolean | null;
   isAuthenticated: boolean | null;
   lang: Language;
}

export const NavbarMenuDropdownLink = ({
   item,
   isLoading,
   isAuthenticated,
   lang,
}: NavbarMenuDropdownProps) => {
   const { menuStore } = useStore();

   if (item.subItems === undefined) {
      return null;
   }

   return (
      <>
         {item.subItems.map((subItem, index) => (
            <NavbarMenuLink
               key={`${subItem.label}-${index}`}
               isVisible={subItem.isVisible?.(isLoading, isAuthenticated)}
               item={subItem}
               onClick={() => menuStore.setOpen(false)}
               lang={lang}
            />
         ))}
      </>
   );
};
