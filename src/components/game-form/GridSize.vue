<script setup lang="ts">
import { useGameStore } from '@/stores/GameStore';
import Button from '../Button.vue';
import { computed } from 'vue';

const gameStore = useGameStore();

const x = computed(() => gameStore.grid.x);
const y = computed(() => gameStore.grid.y);
</script>

<template>
  <Button
    class="incrementor"
    @click="gameStore.decreaseGridX"
    :disabled="x === 2"
    ><strong>-</strong>
  </Button>
  <p>{{ x }}</p>
  <Button
    class="incrementor"
    @click="gameStore.increaseGridX"
    :disabled="x === 10"
    ><strong>+</strong>
  </Button
  >
  <img title="Number of Vertical Dots" class="icon" src="@/assets/icons/vertical-arrow.svg" />
  <Button
    class="incrementor"
    @click="gameStore.decreaseGridY"
    :disabled="y === 2"
    ><strong>-</strong>
  </Button>
  <p>{{ y }}</p>
  <Button
    class="incrementor"
    @click="gameStore.increaseGridY"
    :disabled="y === 10"
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
  width: 40px;
  text-align: center;
}
</style>
