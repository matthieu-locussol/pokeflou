import type { NavbarItemProps } from '@nextui-org/navbar';
import type { NavItem } from '../config/site';

import { useStore } from '../store';

import { NavbarMenuLink } from './navbar-menu-link';

interface NavbarMenuDropdownProps extends NavbarItemProps {
   item: NavItem;
   isLoading: boolean | null;
   isAuthenticated: boolean | null;
}

export const NavbarMenuDropdownLink = ({
   item,
   isLoading,
   isAuthenticated,
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
            />
         ))}
      </>
   );
};
