import type { NavbarItemProps } from '@nextui-org/navbar';
import type { NavItemBase } from '../config/site';

import { Chip } from '@nextui-org/chip';
import { Link } from '@nextui-org/link';
import { NavbarMenuItem } from '@nextui-org/navbar';

import { CustomIcon } from './icons';

interface NavbarMenuLinkProps extends Omit<NavbarItemProps, 'onClick'> {
   item: NavItemBase;
   onClick?: () => void;
   isVisible?: boolean | null | undefined;
}

export const NavbarMenuLink = ({ item, onClick, isVisible, ...rest }: NavbarMenuLinkProps) => {
   if (!isVisible) {
      return <></>;
   }

   return (
      <NavbarMenuItem {...rest}>
         <Link className="w-full" color="foreground" href={item.href} size="lg" onClick={onClick}>
            <CustomIcon icon={item.icon} />
            &nbsp;&nbsp;
            {item.label}
            {item.badge && (
               <Chip className="ml-auto" color="primary" radius="sm" size="sm">
                  {item.badge}
               </Chip>
            )}
         </Link>
      </NavbarMenuItem>
   );
};
