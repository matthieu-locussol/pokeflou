import { Button } from '@nextui-org/button';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { VersionCard } from './version-card';

export const VersionsBlock = observer(() => {
   const { guessStore } = useStore();

   return (
      <>
         <h1 className="text-center text-2xl mb-2">Choose your versions</h1>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-4">
            {Array.from({ length: 8 }).map((_, i) => (
               <VersionCard generation={i + 1} key={i} />
            ))}
         </div>
         <Button
            variant="shadow"
            color="success"
            radius="sm"
            size="lg"
            fullWidth
            onClick={() => guessStore.setChoseGenerations(true)}
            disabled={!guessStore.canStartGame}
            isDisabled={!guessStore.canStartGame}
         >
            Start!
         </Button>
      </>
   );
});
