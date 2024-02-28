import { defineStore } from 'pinia';
import { reactive, ref, watch } from 'vue';
import { usePlayersStore } from './PlayersStore';
import { calculateWinner } from '@/services/winner';
import type { Grid } from '@/types';

export type GameStore = ReturnType<typeof useGameStore>;

export interface Lines {
  horizontals: number[][];
  verticals: number[][];
  boxes: string[][];
}

export type LineType = 'horizontals' | 'verticals';

export const useGameStore = defineStore('game', () => {
  const grid = reactive({
    x: 5,
    y: 5
  });
  const started = ref(false);
  const turn = ref<string | null>(null);
  const winner = ref<string | null>(null);

  const playersStore = usePlayersStore();

  const lines = reactive<Lines>({
    verticals: Array.from({ length: grid.y - 1 }, () => Array.from({ length: grid.x }, () => 0)),
    horizontals: Array.from({ length: grid.y }, () => Array.from({ length: grid.x - 1 }, () => 0)),
    boxes: Array.from({ length: grid.y - 1 }, () => Array.from({ length: grid.x - 1 }, () => ''))
  });
  const resetLinesAndBoxes = (newGrid: Grid): void => {
    lines.horizontals = Array.from({ length: newGrid.y }, () =>
      Array.from({ length: newGrid.x - 1 }, () => 0)
    );
    lines.verticals = Array.from({ length: newGrid.y - 1 }, () =>
      Array.from({ length: newGrid.x }, () => 0)
    );
    lines.boxes = Array.from({ length: newGrid.y - 1 }, () =>
      Array.from({ length: newGrid.x - 1 }, () => '')
    );
  };
  watch(grid, (newGrid): void => {
    resetLinesAndBoxes(newGrid);
  });

  const resetGame = () => {
    playersStore.resetScores();
    resetLinesAndBoxes(grid);
    started.value = false;
    winner.value = null;
  };
  const startGame = () => {
    playersStore.resetScores();
    started.value = true;
  };

  const setWinner = (playerId: string | null) => {
    winner.value = playerId;
  };

  const endTurn = () => {
    if (!turn.value) {
      return;
    }
    const playerIds = Object.keys(playersStore.players);
    const currentPlayerIndex = playerIds.indexOf(turn.value);
    const nextPlayerIndex =
      playerIds.length - 1 === currentPlayerIndex ? 0 : currentPlayerIndex + 1;

    turn.value = playerIds[nextPlayerIndex];
  };

  return {
    lines,
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
    },
    setLine(rowIndex: number, lineIndex: number, type: LineType, value: number) {
      lines[type][rowIndex][lineIndex] = value;
    },
    setBox(rowIndex: number, lineIndex: number) {
      if (!turn.value) {
        return;
      }
      
      lines.boxes[rowIndex][lineIndex] = turn.value;
    }
  };
});
