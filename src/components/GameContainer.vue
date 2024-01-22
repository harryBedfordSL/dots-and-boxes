<script setup lang="ts">
import Welcome from './Welcome.vue';
import { computed } from 'vue';
import { useGameStore } from '@/stores/GameStore';
import GameBoard from './GameBoard.vue';
import PostGame from './PostGame.vue';

const gameStore = useGameStore();

const preGame = computed(() => !gameStore.started && !gameStore.winner);
const inGame = computed(() => gameStore.started && !gameStore.winner);
</script>

<template>
  <Welcome v-if="preGame" />
  <GameBoard v-if="inGame" />
  <PostGame v-if="gameStore.winner" />
</template>

<style scoped></style>
