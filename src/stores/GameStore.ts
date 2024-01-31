import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { usePlayersStore } from './PlayersStore';
import { calculateWinner } from '@/services/winner';

export type GameStore = ReturnType<typeof useGameStore>;

export const useGameStore = defineStore('game', () => {
  const grid = reactive({
    x: 5,
    y: 5
  });
  const started = ref(false);
  const turn = ref<string | null>(null);
  const winner = ref<string | null>(null);

  const playersStore = usePlayersStore();

  const resetGame = () => {
    playersStore.resetScores();
    started.value = false;
    winner.value = null;
  };
  const startGame = () => {
    playersStore.resetScores();
    started.value = true;
  };

  const setWinner = (playerId: string | null) => {
    winner.value = playerId;
  }

  const endTurn = () => {
    if (!turn.value) {
      return;
    }
    const playerIds = Object.keys(playersStore.players);
    const currentPlayerIndex = playerIds.indexOf(turn.value);
    const nextPlayerIndex = (playerIds.length - 1) === currentPlayerIndex ? 0 : currentPlayerIndex + 1;

    turn.value = playerIds[nextPlayerIndex];
  }

  return {
    grid,
    endTurn,
    started,
    turn,
    winner,
    setWinner,
    startGame,
    resetGame,
    restartGame() {
      resetGame();
      startGame();
    },
    setTurn(id: string) {
      turn.value = id;
    },
    endGame() {
      calculateWinner(setWinner, playersStore.players);
      started.value = false;
      turn.value = null;
    },
    increaseGridX() {
      grid.x++;
    },
    decreaseGridX() {
      grid.x--;
    },
    increaseGridY() {
      grid.y++;
    },
    decreaseGridY() {
      grid.y--;
    }
  };
});
