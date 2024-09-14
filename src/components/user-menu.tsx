'use client';

import { createHash } from 'crypto';

import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import {
   Dropdown,
   DropdownItem,
   DropdownMenu,
   DropdownSection,
   DropdownTrigger,
} from '@nextui-org/dropdown';
import { User } from '@nextui-org/user';

import { siteConfig } from '../config/site';

import { CustomIcon } from './icons';

export const UserMenu = () => {
   const { getUser, isLoading, isAuthenticated } = useKindeBrowserClient();
   const user = getUser();
   const hash = createHash('sha256')
      .update(user?.email || '')
      .digest('hex');
   const gravatarUrl = `https://www.gravatar.com/avatar/${hash}`;

   return (
      <Dropdown
         showArrow
         classNames={{
            base: 'before:bg-default-200',
            content:
               'py-1 px-1 min-w-[260px] border border-default-200 bg-gradient-to-br from-white to-primary-50 dark:from-primary-50 dark:to-black',
         }}
         placement="top"
         radius="sm"
      >
         <DropdownTrigger>
            <User
               as="button"
               avatarProps={{
                  isBordered: true,
                  src: gravatarUrl,
                  size: 'sm',
                  className: 'mr-2',
                  showFallback: isLoading || !isAuthenticated,
                  color: 'primary',
               }}
               className="transition-transform"
               classNames={{
                  description: 'text-default-500',
               }}
               description="Premium user"
               name={user?.given_name}
            />
         </DropdownTrigger>
         <DropdownMenu
            aria-label="User menu"
            disabledKeys={siteConfig.userMenuItems.flatMap((section) =>
               section
                  .filter((value) => value.disabled)
                  .map((section) => `section-${section.label}`),
            )}
            variant="faded"
         >
            {[
               ...siteConfig.userMenuItems.map((section, idx) => (
                  <DropdownSection key={`section-${idx}`} showDivider>
                     {section.map((item) => (
                        <DropdownItem
                           key={`section-${item.label}`}
                           description={item.description}
                           href={item.href}
                           startContent={<CustomIcon icon={item.icon} />}
                        >
                           {item.label}
                        </DropdownItem>
                     ))}
                  </DropdownSection>
               )),
               <DropdownSection key="section-logout" className="mb-0">
                  <DropdownItem
                     key="logout"
                     className="text-danger"
                     color="danger"
                     startContent={
                        <CustomIcon className="text-danger" icon="solar:logout-2-bold-duotone" />
                     }
                  >
                     <LogoutLink>Logout</LogoutLink>
                  </DropdownItem>
               </DropdownSection>,
            ]}
         </DropdownMenu>
      </Dropdown>
   );
};
