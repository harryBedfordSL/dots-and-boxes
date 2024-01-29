import { type GameStore } from "@/stores/GameStore";
import { type PlayersStore } from "@/stores/PlayersStore";

export interface Result {
  id: string;
  score: number;
}

export const calculateWinner = (gameStore: GameStore, playersStore: PlayersStore): void => {
  const result = Object.values(playersStore.players).reduce<Result>((result, { id, score }) => {
    if (score > result.score) {
      return { id, score };
    }
    if (score === result.score) {
      return { id: 'draw', score };
    }
    return result;
  }, { id: 'draw', score: 0 });
  
  gameStore.setWinner(result.id); 
}