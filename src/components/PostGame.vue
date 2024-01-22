<script setup lang="ts">
import type { Player } from '@/types';

export interface PostGameProps {
  restartGame: () => void;
  goHome: () => void;
}

defineProps<PostGameProps>();

const winner: Player = {
  name: 'Player 1',
  color: 'red',
  id: 'uuid-a',
  score: 12
}
</script>

<template>
  <div class="container">
    <h1>Congratualtions {{ winner.name }}!</h1>
    <p>You won the game with {{ winner.score }} points</p>
    <div class="actions">
      <button @click="$props.restartGame">Play again</button>
      <button @click="$props.goHome">Home</button>
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