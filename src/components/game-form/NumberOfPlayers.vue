<script setup lang="ts">
import { usePlayersStore } from '@/stores/PlayersStore';
import Button from '../Button.vue';
import { computed } from 'vue';

const playersStore = usePlayersStore();

const numberOfPlayers = computed(() => Object.keys(playersStore.players).length.toString());
</script>

<template>
  <Button
    class="incrementor"
    @click="playersStore.removePlayer"
    :disabled="parseInt(numberOfPlayers) === 2"
    ><strong>-</strong>
  </Button>
  <p>{{ numberOfPlayers }}</p>
  <Button
    class="incrementor"
    @click="playersStore.addPlayer"
    :disabled="parseInt(numberOfPlayers) === 4"
    ><strong>+</strong>
  </Button
  >
</template>

<style scoped>
.incrementor {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
}

p {
  width: 20px;
  text-align: center;
}
</style>
