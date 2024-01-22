<script setup lang="ts">
import Welcome from './Welcome.vue';
import Modal from './Modal.vue';
import { ref } from 'vue';
import type { Player } from '@/types';
import GameBoard from './GameBoard.vue';
import PostGame from './PostGame.vue';

const playVisible = ref(false);
const togglePlayVisibility = () => {
  playVisible.value = !playVisible.value;
};

const infoVisible = ref(false);
const toggleInfoVisibility = () => {
  infoVisible.value = !infoVisible.value;
};

const gameStarted = ref(false);
const startGame = () => {
  playVisible.value = false;
  gameStarted.value = true
};
const endGame = () => (gameStarted.value = false);

const winner = ref<Player | null>(null);
const setWinner = (player: Player | null) => (winner.value = player);

const resetGame = () => {
  endGame();
  setWinner(null);
};

const restartGame = () => {
  resetGame();
  startGame();
};
</script>

<template>
  <Welcome v-if="!gameStarted && !winner" @play="togglePlayVisibility" @info="toggleInfoVisibility" />
  <GameBoard v-if="gameStarted && !winner" />
  <PostGame v-if="winner" :go-home="resetGame" :restart-game="restartGame" />
  <Modal :is-visible="playVisible" @close="playVisible = false">
    <template #header>
      <h1>Settings</h1>
    </template>
    <template #body>
      <p>Game settings will be set here</p>
      <button @click="startGame">START</button>
    </template>
  </Modal>
  <Modal :is-visible="infoVisible" @close="infoVisible = false">
    <template #header>
      <h1>Info</h1>
    </template>
    <template #body> Game info will be displayed here </template>
  </Modal>
</template>

<style scoped></style>
