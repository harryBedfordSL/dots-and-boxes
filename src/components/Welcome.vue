<script setup lang="ts">
import { useGameStore } from '@/stores/GameStore';
import InfoModalVue from './modals/InfoModal.vue';

const gameStore = useGameStore();
</script>

<template>
  <div class="header">
    <h1>Welcome to Dots + Boxes</h1>
    <InfoModalVue />
  </div>
  <p>Number of Players</p>
  <p>Player Colour</p>
  <p>Grid Size</p>
  <p>Starting Player</p>
  <img src="@/assets/icons/play.svg" @click="gameStore.startGame" class="button test-play" />
</template>

<style scoped>
.header {
  align-items: center;
  display: flex;
  width: 50%;
  gap: 10px;
  justify-content: center;
}

.actions {
  display: flex;
  width: 75%;
  justify-content: space-evenly;
  margin-top: 20px;
}

.button {
  filter: invert(79%) sepia(24%) saturate(704%) hue-rotate(91deg) brightness(92%) contrast(83%);
  cursor: pointer;
}

.button:hover {
  filter: invert(87%) sepia(12%) saturate(1037%) hue-rotate(88deg) brightness(95%) contrast(90%);
}

.button:active {
  filter: invert(79%) sepia(24%) saturate(704%) hue-rotate(91deg) brightness(92%) contrast(83%);
}
</style>
