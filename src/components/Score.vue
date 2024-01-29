<script setup lang="ts">
import { useGameStore } from '@/stores/GameStore';
import { usePlayersStore } from '@/stores/PlayersStore';
import type { Player } from '@/types';
import { computed, type CSSProperties } from 'vue';

interface PlayerWithStyle extends Player {
  style: CSSProperties;
}

const playersStore = usePlayersStore();
const gameStore = useGameStore();

const positions: CSSProperties[] = [
  { top: 0, left: 0 },
  { top: 0, right: 0 },
  { bottom: 0, left: 0 },
  { bottom: 0, right: 0 }
];

const playing = computed(() => gameStore.started && !gameStore.winner);
const players = computed<PlayerWithStyle[]>(() =>
  Object.values(playersStore.players).map((player, index) => {
    const position = positions[index];
    const playingOpacity = gameStore.turn === player.id ? 1 : 0.25;
    return {
      ...player,
      style: { ...position, backgroundColor: player.color, opacity: playing.value ? playingOpacity : 0.25 }
    };
  })
);
</script>

<template>
  <div v-for="player in players" class="container" :style="player.style" :key="player.id">
    <div class="layout">
      <div class="name">
        {{ player.name.toLocaleUpperCase() }}
      </div>
      <div class="score">
        {{ player.score }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: absolute;
  padding: 1rem;
  margin: 1rem;
  width: 80px;
  height: 80px;
  border-radius: 10px;
  opacity: 0.5;
}

.layout {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 100%;
}

.name {
  font-weight: bold;
}

.score {
  font-size: 2rem;
  text-shadow: 2px 2px var(--background-primary);
}
</style>
