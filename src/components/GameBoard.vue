<script setup lang="ts">
import { defaultTurn, type Grid } from '@/types';
import SettingsModal from './modals/SettingsModal.vue';
import { useGameStore } from '@/stores/GameStore';
import { onMounted, reactive } from 'vue';
import { usePlayersStore } from '@/stores/PlayersStore';
import { getRandomInt } from '@/services/randomNumber';

const gameStore = useGameStore();
const playersStore = usePlayersStore();

const grid: Grid = reactive({
  x: gameStore.grid.x,
  y: gameStore.grid.y
})

onMounted(() => {
  if (gameStore.turn !== null && gameStore.turn !== defaultTurn.value) {
    return
  }

  const playerIds = Object.values(playersStore.players).map(({ id }) => id)
  const startingTurn = getRandomInt(1, playerIds.length);
  gameStore.setTurn(playerIds[startingTurn - 1])
})
</script>

<template>
  <SettingsModal />
  <table class="table">
    <tr v-for="y in grid.y" :key="y">
      <td v-for="x in grid.x" :key="x">
        <div class="dot">+</div>
      </td>
    </tr>
  </table>
</template>

<style scoped>
.table {
  width: 75%;
  height: 100%;
  text-align: center;
}
</style>
