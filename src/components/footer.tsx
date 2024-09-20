import { Link } from '@nextui-org/link';
import { default as NextLink } from 'next/link';
import { siteConfig } from '../config/site';
import { useTranslation } from '../i18n';
import { Language } from '../i18n/config';
import { getVersion } from '../utils/versionMgt';
import { FooterSocial } from './footer-social';
import { Logo } from './logo';

interface FooterProps {
   lang: Language;
}

export const Footer = async ({ lang }: FooterProps) => {
   const { t } = await useTranslation(lang);

   return (
      <footer
         className="w-full justify-center items-center flex border-t-1 border-primary-100 bg-primary-50/80"
         role="contentinfo"
      >
         <div className="container mx-auto max-w-7xl py-6 px-6 flex-grow">
            <div className="flex justify-between items-center">
               <div className="flex flex-col gap-1">
                  <NextLink className="flex justify-start items-center gap-2" href={`/${lang}`}>
                     <Logo />
                     <p className="font-bold text-md font-[family-name:var(--font-pokemon)]">
                        {siteConfig.title}
                     </p>
                  </NextLink>
                  <p className="font-bold text-xs italic text-default-500">
                     {getVersion(t('build'))}
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
               {t('madeWith')}
            </Link>
         </div>
      </footer>
   );
};
