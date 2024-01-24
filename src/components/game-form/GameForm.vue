<script setup lang="ts">
import { useGameStore } from '@/stores/GameStore';
import NumberOfPlayersVue from './NumberOfPlayers.vue';
import PlayerNames from './PlayerNames.vue';
import PlayerColors from './PlayerColors.vue';

const gameStore = useGameStore();
</script>

<template>
  <form class="form-container" @submit.prevent=''>
    <div class="form-item">
      <img src="@/assets/icons/people.svg" class="icon" />
      <NumberOfPlayersVue />
    </div>
    <div class="form-item">
      <img src="@/assets/icons/edit.svg" class="icon" />
      <PlayerNames />
    </div>
    <div class="form-item">
      <img src="@/assets/icons/color.svg" class="icon" />
      <PlayerColors />
    </div>
    <div class="form-item">
      <img src="@/assets/icons/dots.svg" class="icon" />
      Grid Size
    </div>
    <div class="form-item">
      <img src="@/assets/icons/first.svg" class="icon" />
      Starting Player
    </div>
    <img
      src="@/assets/icons/play.svg"
      @click="gameStore.startGame"
      class="icon clickable test-play"
    />
  </form>
</template>

<style scoped>
.form-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  width: 30%;
  padding: 20px;
}
.form-item {
  align-items: center;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  width: 100%;
}
</style>
