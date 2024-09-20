import { Fireworks } from '../../components/fireworks';
import { GameBlock } from '../../components/game-block';
import { Language } from '../../i18n/config';

interface AppProps {
   params: {
      lang: Language;
   };
}

export default async function App({ params: { lang } }: AppProps) {
   return (
      <section className="flex flex-col gap-4 p-4 md:p-8">
         <GameBlock lang={lang} />
         <Fireworks />
      </section>
   );
}
