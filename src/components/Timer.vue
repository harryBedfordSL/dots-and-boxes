<script setup lang="ts">
import { useGameStore } from '@/stores/GameStore';
import { computed, type StyleValue, ref } from 'vue';

export interface TimerProps {
  elapsed: number;
}

const props = defineProps<TimerProps>();

const gameStore = useGameStore();
const timeLimit = computed(() => gameStore.timerConfig.seconds);

const timeLeft = computed(() => timeLimit.value - props.elapsed);

const timeLeftDisplay = computed(() => {
  const seconds = timeLeft.value % 60;

  return String(seconds);
});

const pathStyle = computed<StyleValue>(() => {
  const radius = 45;
  const totalLength = 2 * Math.PI * radius;
  const timeFraction = timeLeft.value / timeLimit.value;
  const adjustedFraction = timeFraction - (1 - timeFraction) / timeLimit.value;
  const elapsedDash = Math.floor(adjustedFraction * totalLength);

  return {
    strokeDasharray: `${elapsedDash} ${totalLength}`,
    transition: timeLeft.value === timeLimit.value ? 'unset' : '1s linear all'
  };
});
</script>

<template>
  <div class="container">
    <svg class="svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="circle">
        <circle class="time-elapsed-path" cx="50" cy="50" r="45" />
        <path
          v-if="timeLeft > 0"
          class="time-left-path"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
          :style="pathStyle"
        ></path>
      </g>
    </svg>
    <div class="time-left-container">
      <span class="time-left-label">{{ timeLeftDisplay }}</span>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 80px;
  width: 80px;
  position: relative;
}

.circle {
  fill: none;
  stroke: none;
}

.time-elapsed-path {
  stroke-width: 7px;
  stroke: #424242;
}

.time-left-container {
  height: inherit;
  width: inherit;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.time-left-label {
  font-size: 2rem;
  font-family: 'Segoe UI';
  color: var(--text-color);
}

.time-left-path {
  stroke-width: 7px;
  stroke-linecap: round;
  transform: rotate(90deg);
  transform-origin: center;
  stroke: var(--accent-primary);
}

.svg {
  transform: scaleX(-1);
}
</style>
