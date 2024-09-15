import { Link } from '@nextui-org/link';
import { default as NextLink } from 'next/link';

import { siteConfig } from '../config/site';
import { getVersion } from '../utils/versionMgt';

import { FooterSocial } from './footer-social';
import { Logo } from './logo';

export const Footer = () => {
   return (
      <footer
         className="w-full justify-center items-center flex border-t-1 border-primary-100 bg-primary-50/80"
         role="contentinfo"
      >
         <div className="container mx-auto max-w-7xl py-6 px-6 flex-grow">
            <div className="flex justify-between items-center">
               <div className="flex flex-col gap-1">
                  <NextLink className="flex justify-start items-center gap-2" href="/">
                     <Logo />
                     <p className="font-bold text-md font-[family-name:var(--font-pokemon)]">
                        {siteConfig.title}
                     </p>
                  </NextLink>
                  <p className="font-bold text-xs italic text-default-500">
                     {getVersion('Build v')}
                  </p>
               </div>
               <FooterSocial />
            </div>
            <Link
               className="font-bold text-xs mt-2 text-primary-500"
               href={siteConfig.author.website}
               rel="noreferrer"
               target="_blank"
            >
               Made with ❤️ from France
            </Link>
         </div>
      </footer>
   );
};
