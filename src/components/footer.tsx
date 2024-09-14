import { Icon } from '@iconify/react';
import { Link } from '@nextui-org/link';
import { default as NextLink } from 'next/link';

import { siteConfig } from '../config/site';
import { getVersion } from '../utils/versionMgt';

import { FooterSocial } from './footer-social';

export const Footer = () => {
   return (
      <footer
         className="w-full justify-center items-center flex border-t-1 border-primary-100 bg-primary-50/80"
         role="contentinfo"
      >
         <div className="container mx-auto max-w-7xl py-6 px-6 flex-grow">
            <div className="flex justify-between items-center">
               <div className="flex flex-col">
                  <NextLink className="flex justify-start items-center gap-2" href="/">
                     <Icon
                        className="text-xl text-primary-500"
                        icon="noto-v1:flag-for-flag-france"
                     />
                     <p className="font-bold text-md">Frencheers</p>
                  </NextLink>
                  <p className="font-bold text-xs italic text-default-500">
                     {getVersion('Build v')}
                  </p>
               </div>
               <FooterSocial className="hidden sm:flex" />
            </div>
            <Link
               className="font-bold text-xs mt-2 text-primary-500"
               href={siteConfig.author.website}
               rel="noreferrer"
               target="_blank"
            >
               Made with ❤️ from France
            </Link>
            <div className="flex items-center justify-between mt-4">
               <FooterSocial className="flex sm:hidden" />
            </div>
         </div>
      </footer>
   );
};
