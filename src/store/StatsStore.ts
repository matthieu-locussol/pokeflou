import { makeAutoObservable } from 'mobx';

export type StatsData = {
   won: boolean;
   pokemon: {
      generation: number;
   };
};

interface Stats {
   correct: number;
   incorrect: number;
}

const makeDefaultStats = (): Stats => ({
   correct: 0,
   incorrect: 0,
});

export class StatsStore {
   public data: StatsData[] = [];

   constructor() {
      makeAutoObservable(this);
   }

   public setData(data: StatsData[]) {
      this.data = [...data];
   }

   public get stats() {
      const statsMap: Record<number, Stats> = {
         1: makeDefaultStats(),
         2: makeDefaultStats(),
         3: makeDefaultStats(),
         4: makeDefaultStats(),
         5: makeDefaultStats(),
         6: makeDefaultStats(),
         7: makeDefaultStats(),
         8: makeDefaultStats(),
      };

      for (const {
         won,
         pokemon: { generation },
      } of this.data) {
         if (!won) {
            statsMap[generation].incorrect++;
         } else {
            statsMap[generation].correct++;
         }
      }

      return statsMap;
   }

   public get tableData() {
      const generationsData = Array.from({ length: 8 }).map((_, idx) => {
         const correct = this.stats[idx + 1]!.correct;
         const incorrect = this.stats[idx + 1]!.incorrect;
         const total = correct + incorrect;

         return {
            generation: `Gen. ${idx + 1}`,
            correct,
            incorrect,
            total,
            ratio: total === 0 ? 'N/A' : `${Math.round((correct / total) * 10000) / 100}%`,
         };
      });

      const totalCorrect = Object.values(this.stats).reduce((acc, stats) => acc + stats.correct, 0);
      const totalIncorrect = Object.values(this.stats).reduce(
         (acc, stats) => acc + stats.incorrect,
         0,
      );
      const total = totalCorrect + totalIncorrect;

      const totalData = {
         generation: 'TOTAL',
         correct: totalCorrect,
         incorrect: totalIncorrect,
         total,
         ratio: `${Math.round((totalCorrect / total) * 10000) / 100}%`,
      };

      return [...generationsData, totalData];
   }
}
