import { Chip } from '@nextui-org/chip';
import { Link } from '@nextui-org/link';
import type { NavbarItemProps } from '@nextui-org/navbar';
import { NavbarMenuItem } from '@nextui-org/navbar';
import type { NavItemBase } from '../config/site';
import { useTranslation } from '../i18n/client';
import { Language } from '../i18n/config';
import { CustomIcon } from './icons';

interface NavbarMenuLinkProps extends Omit<NavbarItemProps, 'onClick'> {
   item: NavItemBase;
   onClick?: () => void;
   isVisible?: boolean | null | undefined;
   lang: Language;
}

export const NavbarMenuLink = ({
   item,
   onClick,
   isVisible,
   lang,
   ...rest
}: NavbarMenuLinkProps) => {
   const { t } = useTranslation(lang);

   if (!isVisible) {
      return <></>;
   }

   return (
      <NavbarMenuItem {...rest}>
         <Link className="w-full" color="foreground" href={item.href} size="lg" onClick={onClick}>
            <CustomIcon icon={item.icon} />
            &nbsp;&nbsp;
            {t(item.label)}
            {item.badge && (
               <Chip className="ml-auto" color="primary" radius="sm" size="sm">
                  {item.badge}
               </Chip>
            )}
         </Link>
      </NavbarMenuItem>
   );
};
