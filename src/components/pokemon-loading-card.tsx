'use client';

import { Card } from '@nextui-org/card';
import { Skeleton } from '@nextui-org/skeleton';
import { observer } from 'mobx-react-lite';

export const PokemonLoadingCard = observer(() => {
   return (
      <Card className="p-8" radius="sm">
         <Skeleton className="rounded-lg">
            <div className="rounded-lg bg-default-300 w-64 h-64"></div>
         </Skeleton>
      </Card>
   );
});
