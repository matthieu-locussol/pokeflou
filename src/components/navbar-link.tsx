import type { NavbarItemProps } from '@nextui-org/navbar';
import type { NavItemBase } from '../config/site';

import { Chip } from '@nextui-org/chip';
import { NavbarItem } from '@nextui-org/navbar';
import { link as linkStyles } from '@nextui-org/theme';
import clsx from 'clsx';
import NextLink from 'next/link';
import { useTranslation } from '../i18n/client';
import { Language } from '../i18n/config';

interface NavbarLinkProps extends NavbarItemProps {
   item: NavItemBase;
   isVisible?: boolean | null | undefined;
   lang: Language;
}

export const NavbarLink = ({ item, isVisible, lang, ...rest }: NavbarLinkProps) => {
   const { t } = useTranslation(lang);

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
            {t(item.label)}
            {item.badge && (
               <Chip className="ml-2" color="primary" radius="sm" size="sm">
                  {item.badge}
               </Chip>
            )}
         </NextLink>
      </NavbarItem>
   );
};
