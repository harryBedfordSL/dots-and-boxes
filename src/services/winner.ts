import type { GameStore } from "@/stores/GameStore";

export const calculateWinner = (gameStore: GameStore): void => {
  // TODO: use playerStore to calculate the winner  
  gameStore.setWinner('Player 1'); 
}