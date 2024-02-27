import { getScoreForNewLine } from '@/services/scoring';
import { useGameStore, type LineType } from '@/stores/GameStore';
import { usePlayersStore } from '@/stores/PlayersStore';
import { computed, type StyleValue } from 'vue';

export interface BoxStyle {
  backgroundColor: string;
}

export interface UseLines {
  hasBeenClicked: (row: number, cell: number, type: LineType) => boolean;
  onLineClick: (row: number, cell: number, type: LineType) => void;
  getBoxStyle: (row: number, cell: number) => StyleValue;
}

export const useLines = (): UseLines => {
  const gameStore = useGameStore();
  const playersStore = usePlayersStore();

  const getNormalisedLineCoordinates = (
    row: number,
    cell: number,
    type: LineType
  ): [number, number] => {
    const rowIndex = type === 'horizontals' ? (row - 1) / 2 : row / 2 - 1;
    const lineIndex = type === 'horizontals' ? cell / 2 - 1 : (cell - 1) / 2;

    return [rowIndex, lineIndex];
  };

  const remainingLines = computed(() => {
    const horizontalLines = gameStore.lines.horizontals.flat().filter(Boolean).length;
    const verticalLines = gameStore.lines.verticals.flat().filter(Boolean).length;

    return (
      (gameStore.grid.x - 1) * gameStore.grid.y +
      (gameStore.grid.y - 1) * gameStore.grid.x -
      (horizontalLines + verticalLines)
    );
  });

  const onLineClick = (row: number, cell: number, type: LineType): void => {
    const [rowIndex, lineIndex] = getNormalisedLineCoordinates(row, cell, type);
    const lineAlreadyActive = gameStore.lines[type][rowIndex][lineIndex];
    if (lineAlreadyActive || !gameStore.turn) {
      return;
    }

    gameStore.setLine(rowIndex, lineIndex, type, 1);

    const score = getScoreForNewLine({
      lineIndex,
      lines: gameStore.lines,
      onBoxMade: gameStore.setBox,
      rowIndex,
      type
    });
    playersStore.incrementScore(gameStore.turn, score);

    if (score === 0) {
      gameStore.endTurn();
    }

    if (remainingLines.value === 0) {
      setTimeout(() => {
        gameStore.endGame();
      }, 1000);
      return;
    }
  };

  const hasBeenClicked = (row: number, cell: number, type: LineType): boolean => {
    if (gameStore.lines[type].length === 0) {
      return false;
    }

    const [rowIndex, lineIndex] = getNormalisedLineCoordinates(row, cell, type);
    const lines = gameStore.lines[type];
    const normalisedRow = lines[rowIndex];

    return Boolean(normalisedRow[lineIndex]);
  };

  const getNormalisedBoxCoordinates = (row: number, cell: number): [number, number] => {
    const rowIndex = Math.floor((row - 1) / 2);
    const cellIndex = Math.floor((cell - 1) / 2);

    return [rowIndex, cellIndex];
  };

  const getBoxStyle = (row: number, cell: number): StyleValue => {
    if (gameStore.lines.boxes.length === 0) {
      return;
    }
    const [rowIndex, cellIndex] = getNormalisedBoxCoordinates(row, cell);
    const boxId = gameStore.lines.boxes[rowIndex][cellIndex];
    const player = playersStore.players[boxId];

    return {
      backgroundColor: player?.color || 'transparent'
    };
  };

  return {
    getBoxStyle,
    hasBeenClicked,
    onLineClick
  };
};
