import type { NavbarItemProps } from '@nextui-org/navbar';
import type { NavItemBase } from '../config/site';

import { Chip } from '@nextui-org/chip';
import { NavbarItem } from '@nextui-org/navbar';
import { link as linkStyles } from '@nextui-org/theme';
import clsx from 'clsx';
import NextLink from 'next/link';

interface NavbarLinkProps extends NavbarItemProps {
   item: NavItemBase;
   isVisible?: boolean | null | undefined;
}

export const NavbarLink = ({ item, isVisible, ...rest }: NavbarLinkProps) => {
   if (!isVisible) {
      return <></>;
   }

   return (
      <NavbarItem {...rest}>
         <NextLink
            className={clsx(
               linkStyles({ color: 'foreground' }),
               'data-[active=true]:text-primary data-[active=true]:font-medium',
            )}
            color="foreground"
            href={item.href}
         >
            {item.label}
            {item.badge && (
               <Chip className="ml-2" color="primary" radius="sm" size="sm">
                  {item.badge}
               </Chip>
            )}
         </NextLink>
      </NavbarItem>
   );
};
