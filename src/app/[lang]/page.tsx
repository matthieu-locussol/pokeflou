import { Fireworks } from '../../components/fireworks';
import { GameBlock } from '../../components/game-block';
import { useTranslation } from '../../i18n';
import { Language } from '../../i18n/config';

interface AppProps {
   params: {
      lang: Language;
   };
}

export default async function App({ params: { lang } }: AppProps) {
   const { t } = await useTranslation({ lang });

   return (
      <section className="flex flex-col gap-4 p-4 md:p-8">
         <p>TEST: {t('title')}</p>
         <p>TEST: {t('howdy')}</p>
         <GameBlock />
         <Fireworks />
      </section>
   );
}
