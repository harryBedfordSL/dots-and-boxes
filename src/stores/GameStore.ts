import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { usePlayersStore } from './PlayersStore';

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

  return {
    grid,
    started,
    turn,
    winner,
    setWinner(playerId: string | null) {
      winner.value = playerId;
    },
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
