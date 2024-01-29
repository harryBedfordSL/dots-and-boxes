<script setup lang="ts">
import Welcome from './Welcome.vue';
import { computed, type Component } from 'vue';
import { useGameStore } from '@/stores/GameStore';
import GameBoard from './GameBoard.vue';
import PostGame from './PostGame.vue';
import Page from './Page.vue';
import Score from './Score.vue';

const gameStore = useGameStore();

const preGame = computed(() => !gameStore.started && !gameStore.winner);

interface ActiveElement {
  component: Component;
  key: string;
}

const active = computed<ActiveElement>(() => {
  if (gameStore.winner) {
    return { component: PostGame, key: 'post-game' };
  }

  const component = preGame.value ? Welcome : GameBoard;
  const key = preGame.value ? 'welcome' : 'game-board';
  return {
    component,
    key
  };
});
</script>

<template>
  <Score />
  <Page :containerKey="active.key">
    <component :is="active.component" />
  </Page>
</template>
