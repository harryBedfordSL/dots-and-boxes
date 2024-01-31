import type { Players } from '@/types';

export interface Result {
  id: string;
  score: number;
}

export const calculateWinner = (setWinner: (id: string) => void, players: Players): void => {
  const result = Object.values(players).reduce<Result>(
    (result, { id, score }) => {
      if (score > result.score) {
        return { id, score };
      }
      if (score === result.score) {
        return { id: 'draw', score };
      }
      return result;
    },
    { id: 'draw', score: 0 }
  );

  setWinner(result.id);
};
