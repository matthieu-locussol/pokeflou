'use client';

import { Icon } from '@iconify/react';
import { LoginLink, LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Button } from '@nextui-org/button';
import {
   NavbarBrand,
   NavbarContent,
   NavbarItem,
   NavbarMenu,
   NavbarMenuItem,
   NavbarMenuToggle,
   Navbar as NextUINavbar,
} from '@nextui-org/navbar';
import { Spinner } from '@nextui-org/spinner';
import { observer } from 'mobx-react-lite';
import NextLink from 'next/link';

import { siteConfig } from '../config/site';
import { useStore } from '../store';
import { ThemeSwitch } from './theme-switch';

import { CustomIcon } from './icons';
import { Logo } from './logo';
import { NavbarDropdown } from './navbar-dropdown';
import { NavbarLink } from './navbar-link';
import { NavbarMenuDropdownLink } from './navbar-menu-dropdown';
import { NavbarMenuLink } from './navbar-menu-link';
import { UserMenu } from './user-menu';

export const Navbar = observer(() => {
   const { menuStore } = useStore();
   const { getUser, isLoading, isAuthenticated } = useKindeBrowserClient();
   const user = getUser();

   const NavbarEndItems = () => {
      return (
         <>
            {isLoading ? (
               <NavbarItem as="li" className="hidden md:flex">
                  <Spinner color="default" labelColor="foreground" size="sm" />
               </NavbarItem>
            ) : isAuthenticated ? (
               <NavbarItem as="li" className="hidden md:flex">
                  <UserMenu />
               </NavbarItem>
            ) : (
               <LoginLink>
                  <Button className="text-small" color="primary" radius="sm" size="sm">
                     Login
                  </Button>
               </LoginLink>
            )}
            <NavbarItem as="li" className="hidden sm:flex">
               <ThemeSwitch />
            </NavbarItem>
         </>
      );
   };

   return (
      <NextUINavbar
         className="border-b-1 border-primary-100 bg-primary-50/80 backdrop-blur-sm"
         isMenuOpen={menuStore.open}
         maxWidth="xl"
         position="sticky"
         role="navigation"
         onMenuOpenChange={(open) => menuStore.setOpen(open)}
      >
         <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
            <NavbarBrand as="li" className="gap-3 max-w-fit">
               <NextLink
                  className="flex justify-start items-center gap-2"
                  href="/"
                  onClick={() => menuStore.setOpen(false)}
               >
                  <Logo />
                  <p className="font-bold text-inherit font-[family-name:var(--font-pokemon)]">
                     {siteConfig.title}
                  </p>
               </NextLink>
            </NavbarBrand>
         </NavbarContent>

         <NavbarContent className="hidden lg:flex basis-1/5 sm:basis-full sm:gap-8" justify="end">
            {siteConfig.navItems.map((item) =>
               item.subItems === undefined ? (
                  <NavbarLink
                     key={item.href}
                     as="li"
                     isVisible={item.isVisible?.(isLoading, isAuthenticated)}
                     item={item}
                  />
               ) : (
                  <NavbarDropdown key={item.href} as="li" item={item} />
               ),
            )}
            <NavbarEndItems />
         </NavbarContent>

         <NavbarContent
            className="hidden sm:flex lg:hidden basis-1/5 sm:basis-full sm:gap-8"
            justify="end"
         >
            {siteConfig.navItems
               .filter((item) => item.important)
               .map((item) =>
                  item.subItems === undefined ? (
                     <NavbarLink
                        key={item.href}
                        as="li"
                        isVisible={item.isVisible?.(isLoading, isAuthenticated)}
                        item={item}
                     />
                  ) : (
                     <NavbarDropdown key={item.href} as="li" item={item} />
                  ),
               )}
            <NavbarEndItems />
         </NavbarContent>

         <NavbarContent className="flex sm:hidden basis-1/5 sm:basis-full sm:gap-8" justify="end">
            <NavbarEndItems />
         </NavbarContent>

         <NavbarMenuToggle
            aria-label="Toggle menu"
            className="lg:hidden flex ml-4"
            icon={(isOpen) => (
               <Icon
                  className="text-default-500 transition-opacity hover:opacity-80"
                  icon={isOpen ? 'lucide:x' : 'lucide:menu'}
               />
            )}
         />

         <NavbarMenu className="pt-4 flex flex-col gap-2">
            {[...siteConfig.navItems, ...siteConfig.userMenuItems.flat()].map((item, index) =>
               item.subItems === undefined ? (
                  <NavbarMenuLink
                     key={`${item}-${index}`}
                     as="li"
                     isVisible={item.isVisible?.(isLoading, isAuthenticated)}
                     item={item}
                     onClick={() => menuStore.setOpen(false)}
                  />
               ) : (
                  <NavbarMenuDropdownLink
                     key={item.href}
                     as="li"
                     isAuthenticated={isAuthenticated}
                     isLoading={isLoading}
                     item={item}
                  />
               ),
            )}
            {user === null ? (
               <NavbarMenuItem as="li">
                  <LoginLink
                     className="text-primary-500 flex items-center"
                     onClick={() => menuStore.setOpen(false)}
                  >
                     <CustomIcon className="text-primary-500" icon="solar:login-3-bold-duotone" />
                     &nbsp;&nbsp;Login
                  </LoginLink>
               </NavbarMenuItem>
            ) : (
               <NavbarMenuItem as="li">
                  <LogoutLink
                     className="text-danger flex items-center"
                     onClick={() => menuStore.setOpen(false)}
                  >
                     <CustomIcon className="text-danger" icon="solar:logout-2-bold-duotone" />
                     &nbsp;&nbsp;Logout
                  </LogoutLink>
               </NavbarMenuItem>
            )}
         </NavbarMenu>
      </NextUINavbar>
   );
});
