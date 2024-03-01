<script setup lang="ts">
import { defaultTurn } from '@/types';
import SettingsModal from './modals/SettingsModal.vue';
import { useGameStore } from '@/stores/GameStore';
import { computed, onMounted } from 'vue';
import { usePlayersStore } from '@/stores/PlayersStore';
import { getRandomInt } from '@/services/randomNumber';
import { useLines } from '@/composables/useLines';
import Timer from './Timer.vue';
import { useTimer } from '@/composables/useTimer';

const gameStore = useGameStore();
const playersStore = usePlayersStore();

const xLinesAndDots = computed(() => gameStore.grid.x + (gameStore.grid.x - 1));
const yLinesAndDots = computed(() => gameStore.grid.y + (gameStore.grid.y - 1));

const { timeElapsed } = useTimer();

onMounted(() => {
  if (gameStore.turn !== null && gameStore.turn !== defaultTurn.value) {
    return;
  }

  const playerIds = Object.values(playersStore.players).map(({ id }) => id);
  const startingTurn = getRandomInt(1, playerIds.length);
  gameStore.setTurn(playerIds[startingTurn - 1]);
});

const { hasBeenClicked, onLineClick, getBoxStyle } = useLines();
</script>

<template>
  <div class="header">
    <SettingsModal />
    <Timer v-if="gameStore.timerConfig.enabled" :elapsed="timeElapsed" />
  </div>
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
              active: hasBeenClicked(row, cell, 'horizontals')
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
              active: hasBeenClicked(row, cell, 'verticals')
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
.header {
  position: absolute;
  top: 20px;
  gap: 20px;
  display: flex;
  justify-content: center;
}

.box-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45%;
  height: 80%;
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
  transition: background-color 0.3s ease-in-out;
}
</style>
