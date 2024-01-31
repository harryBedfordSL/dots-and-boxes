<script setup lang="ts">
import { defaultTurn, type Grid } from '@/types';
import SettingsModal from './modals/SettingsModal.vue';
import { useGameStore } from '@/stores/GameStore';
import { computed, onMounted, reactive, ref } from 'vue';
import { usePlayersStore } from '@/stores/PlayersStore';
import { getRandomInt } from '@/services/randomNumber';

const gameStore = useGameStore();
const playersStore = usePlayersStore();

const grid: Grid = reactive({
  x: gameStore.grid.x,
  y: gameStore.grid.y
});

const xLinesAndDots = computed(() => grid.x + (grid.x - 1));
const yLinesAndDots = computed(() => grid.y + (grid.y - 1));

onMounted(() => {
  if (gameStore.turn !== null && gameStore.turn !== defaultTurn.value) {
    return;
  }

  const playerIds = Object.values(playersStore.players).map(({ id }) => id);
  const startingTurn = getRandomInt(1, playerIds.length);
  gameStore.setTurn(playerIds[startingTurn - 1]);
});

type LineType = 'horizontals' | 'verticals';

const getNormalisedLineCoordinates = (
  row: number,
  cell: number,
  type: LineType
): [number, number] => {
  const rowIndex = type === 'horizontals' ? (row - 1) / 2 : row / 2 - 1;
  const lineIndex = type === 'horizontals' ? cell / 2 - 1 : (cell - 1) / 2;

  return [rowIndex, lineIndex];
};

const getNormalisedBoxCoordinates = (row: number, cell: number): [number, number] => {
  const rowIndex = Math.floor((row - 1) / 2);
  const cellIndex = Math.floor((cell - 1) / 2);

  return [rowIndex, cellIndex];
};

const getBoxStyle = (row: number, cell: number) => {
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

const remainingLines = computed(() => {
  const horizontalLines = gameStore.lines.horizontals.flat().filter(Boolean).length;
  const verticalLines = gameStore.lines.verticals.flat().filter(Boolean).length;

  return (grid.x - 1) * grid.y + (grid.y - 1) * grid.x - (horizontalLines + verticalLines);
});

const checkForCompleteBox = (rowIndex: number, lineIndex: number, type: LineType): boolean => {
  let madeBox = false;
  if (type === 'horizontals') {
    const lineAbove = gameStore.lines.horizontals[rowIndex - 1]?.[lineIndex];
    const leftUpperLine = gameStore.lines.verticals[rowIndex - 1]?.[lineIndex];
    const rightUpperLine = gameStore.lines.verticals[rowIndex - 1]?.[lineIndex + 1];
    if (
      lineAbove &&
      leftUpperLine &&
      rightUpperLine &&
      gameStore.lines.boxes[rowIndex - 1][lineIndex] === '' &&
      gameStore.turn
    ) {
      gameStore.lines.boxes[rowIndex - 1][lineIndex] = gameStore.turn;
      playersStore.incrementScore(gameStore.turn);
      madeBox = true;
    }

    const lineBelow = gameStore.lines.horizontals[rowIndex + 1]?.[lineIndex];
    const leftLowerLine = gameStore.lines.verticals[rowIndex]?.[lineIndex];
    const rightLowerLine = gameStore.lines.verticals[rowIndex]?.[lineIndex + 1];
    if (
      lineBelow &&
      leftLowerLine &&
      rightLowerLine &&
      gameStore.lines.boxes[rowIndex][lineIndex] === '' &&
      gameStore.turn
    ) {
      gameStore.lines.boxes[rowIndex][lineIndex] = gameStore.turn;
      playersStore.incrementScore(gameStore.turn);
      madeBox = true;
    }

    return madeBox;
  }

  const lineLeft = gameStore.lines.verticals[rowIndex]?.[lineIndex - 1];
  const leftUpperLine = gameStore.lines.horizontals[rowIndex]?.[lineIndex - 1];
  const leftLowerLine = gameStore.lines.horizontals[rowIndex + 1]?.[lineIndex - 1];
  if (
    lineLeft &&
    leftUpperLine &&
    leftLowerLine &&
    gameStore.lines.boxes[rowIndex][lineIndex - 1] === '' &&
    gameStore.turn
  ) {
    gameStore.lines.boxes[rowIndex][lineIndex - 1] = gameStore.turn;
    playersStore.incrementScore(gameStore.turn);
    madeBox = true;
  }

  const lineRight = gameStore.lines.verticals[rowIndex]?.[lineIndex + 1];
  const rightUpperLine = gameStore.lines.horizontals[rowIndex]?.[lineIndex];
  const rightLowerLine = gameStore.lines.horizontals[rowIndex + 1]?.[lineIndex];
  if (
    lineRight &&
    rightUpperLine &&
    rightLowerLine &&
    gameStore.lines.boxes[rowIndex][lineIndex] === '' &&
    gameStore.turn
  ) {
    gameStore.lines.boxes[rowIndex][lineIndex] = gameStore.turn;
    playersStore.incrementScore(gameStore.turn);
    madeBox = true;
  }

  return madeBox;
};

const onLineClick = (row: number, cell: number, type: LineType): void => {
  const [rowIndex, lineIndex] = getNormalisedLineCoordinates(row, cell, type);
  const line = gameStore.lines[type][rowIndex][lineIndex];
  if (line) {
    return;
  }

  gameStore.lines[type][rowIndex][lineIndex] = 1;

  const madeBox = checkForCompleteBox(rowIndex, lineIndex, type);

  if (remainingLines.value === 0) {
    setTimeout(() => {
      gameStore.endGame();
    }, 1000);
    return;
  }

  if (!madeBox) {
    gameStore.endTurn();
  }
};

const isActive = (row: number, cell: number, type: 'horizontals' | 'verticals'): boolean => {
  if (gameStore.lines[type].length === 0) {
    return false;
  }

  const [rowIndex, lineIndex] = getNormalisedLineCoordinates(row, cell, type);
  return Boolean(gameStore.lines[type][rowIndex][lineIndex]);
};
</script>

<template>
  <SettingsModal />
  <div class="box-container">
    <div v-for="row in yLinesAndDots" class="row" :class="{ border: row % 2 }">
      <template class="row-border" v-if="row % 2" v-for="cell in xLinesAndDots">
        <template v-if="cell % 2">
          <div>+</div>
        </template>
        <template v-else>
          <div
            class="x-line-container"
            :class="{
              active: isActive(row, cell, 'horizontals')
            }"
            @click="onLineClick(row, cell, 'horizontals')"
          >
            <div class="x-line"></div>
          </div>
        </template>
      </template>
      <template v-else v-for="cell in xLinesAndDots">
        <template v-if="cell % 2">
          <div
            class="y-line-container"
            :class="{
              active: isActive(row, cell, 'verticals')
            }"
            @click="onLineClick(row, cell, 'verticals')"
          >
            <div class="y-line"></div>
          </div>
        </template>
        <template v-else>
          <div class="fill" :style="getBoxStyle(row, cell)"></div>
        </template>
      </template>
    </div>
  </div>
</template>

<style scoped>
.box-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75%;
  height: 75%;
}

.x-line-container {
  opacity: 0;
  padding: 10px;
  flex: 1;
}

.y-line-container {
  opacity: 0;
  padding: 0 10px;
  height: 100%;
}

.x-line-container:not(.active),
.y-line-container:not(.active) {
  cursor: pointer;
}

.x-line-container:hover,
.y-line-container:hover {
  opacity: 1;
}

.x-line-container:active:not(.active) .x-line,
.y-line-container:active:not(.active) .y-line {
  background-color: var(--accent-primary);
}

.active {
  opacity: 1;
}

.row {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: -webkit-fill-available;
}

.border {
  flex: none;
  padding: 0 0.5rem;
}

.x-line {
  height: 2px;
  background-color: var(--text-color);
  border-radius: 5px;
}

.y-line {
  width: 2px;
  background-color: var(--text-color);
  border-radius: 5px;
  height: 100%;
}

.fill {
  height: 100%;
  flex: 1;
  border-radius: 5px;
}
</style>
