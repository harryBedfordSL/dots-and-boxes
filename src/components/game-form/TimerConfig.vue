<script setup lang="ts">
import { useGameStore } from '@/stores/GameStore';
import Toggle from '@/components/Toggle.vue';
import Button from '../Button.vue';

const gameStore = useGameStore();

const onToggle = () => {
  gameStore.toggleTimerEnabled();
};
</script>

<template>
  <Toggle :enabled="gameStore.timerConfig.enabled" @toggle="onToggle()" />
  <div class="settings">
    <Button
      class="incrementor"
      @click="gameStore.setTimerLimit(gameStore.timerConfig.seconds - 1)"
      :disabled="!gameStore.timerConfig.enabled || gameStore.timerConfig.seconds <= 3"
      ><strong>-</strong>
    </Button>
    <p class="value">{{ gameStore.timerConfig.seconds }}</p>
    <Button
      class="incrementor"
      @click="gameStore.setTimerLimit(gameStore.timerConfig.seconds + 1)"
      :disabled="!gameStore.timerConfig.enabled || gameStore.timerConfig.seconds >= 60"
      ><strong>+</strong>
    </Button>
  </div>
</template>

<style scoped>
.settings {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px
}

.value {
  width: 20px;
  text-align: center;
}

.incrementor {
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  margin: 0;
}
</style>
