import { useGameStore } from "@/stores/GameStore";

export const calculateWinner = (): void => {
  // TODO: use playerStore to calculate the winner
  const gameStore = useGameStore();
  
  gameStore.setWinner('Player 1'); 
}