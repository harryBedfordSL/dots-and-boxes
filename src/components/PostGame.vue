<script setup lang="ts">
import { useGameStore } from '@/stores/GameStore';
import Button from './Button.vue';
import { usePlayersStore } from '@/stores/PlayersStore';
import { computed } from 'vue';

const gameStore = useGameStore();
const playersStore = usePlayersStore();

const winnerId = computed(() => gameStore.winner);
const winner = computed(() => {
  if (!winnerId.value) {
    return null;
  }

  return playersStore.players[winnerId.value]
});
</script>

<template>
  <div class="container">
    <template v-if="winner">
      <h1>Congratualtions {{ winner.name }}!</h1>
      <p>You won the game with {{ winner.score }} points</p>
    </template>
    <template v-else>
      <h1>DRAW!</h1>
      <p>Both players have {{ Object.values(playersStore.players)[0].score }} points</p>
    </template>
    <div class="actions">
      <Button class="test-home" @click="gameStore.resetGame">Home</Button>
      <Button class="test-restart" @click="gameStore.restartGame">Play again</Button>
    </div>
  </div>
</template>

<style scoped>
.container {
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 50%;
  text-align: center;
}

.actions {
  display: flex;
  width: 75%;
  justify-content: space-evenly;
  margin-top: 20px;
}
</style>