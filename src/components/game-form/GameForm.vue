<script setup lang="ts">
import { useGameStore } from '@/stores/GameStore';
import NumberOfPlayersVue from './NumberOfPlayers.vue';
import PlayerNames from './PlayerNames.vue';
import PlayerColors from './PlayerColors.vue';
import GridSize from './GridSize.vue';
import TimerConfig from './TimerConfig.vue';
import Button from '../Button.vue';

const gameStore = useGameStore();
</script>

<template>
  <form class="form-container" @submit.prevent=''>
    <div class="form-item">
      <img title="Number of Players" src="@/assets/icons/people.svg" class="icon" />
      <NumberOfPlayersVue />
    </div>
    <div class="players-group">
      <div class="form-item">
        <img title="Player Names" src="@/assets/icons/edit.svg" class="icon" />
        <PlayerNames />
      </div>
      <div class="form-item">
        <img title="Player Colors" src="@/assets/icons/color.svg" class="icon" />
        <PlayerColors />
      </div>
    </div>
    <div class="form-item">
      <img title="Number of Horizontal Dots" src="@/assets/icons/horizontal-arrow.svg" class="icon" />
      <GridSize />
    </div>
    <div class="form-item">
      <img title="Turn Timer (seconds)" src="@/assets/icons/timer.svg" class="icon" />
      <TimerConfig />
    </div>
    <Button @click="gameStore.startGame">
      PLAY
    </Button>
  </form>
</template>

<style scoped>
.play {
  height: 100px;
  width: 100px;
}

.form-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  max-width: -webkit-fill-available;
  padding: 20px;
}

.players-group {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  width: 100%;
  overflow-x: auto;
}

.form-item {
  align-items: center;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  width: 100%;
}
</style>
