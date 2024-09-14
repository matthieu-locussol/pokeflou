import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import { Icon } from '@iconify/react';
import { Link } from '@nextui-org/link';
import { cn } from '@nextui-org/theme';

import { siteConfig } from '../config/site';

import { ThemeSwitch } from './theme-switch';

export const FooterSocial = ({
   className,
   ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
   return (
      <div className={cn('flex gap-8', className)} {...rest}>
         <Link isExternal aria-label="discord" href={siteConfig.links.discord}>
            <Icon className="text-2xl text-default-500" icon="ic:baseline-discord" />
         </Link>
         <ThemeSwitch />
      </div>
   );
};
