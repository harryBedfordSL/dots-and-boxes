<script setup lang="ts">
import { usePlayersStore } from '@/stores/PlayersStore';
import { computed } from 'vue';

const playersStore = usePlayersStore();

const players = computed(() => Object.values(playersStore.players));

const onColorChange = (event: Event, id: string) => {
  const target = event.target as HTMLInputElement;
  const newColor = target.value;

  playersStore.updatePlayer(id, { color: newColor });
};
</script>

<template>
  <div class="container" v-for="player in players">
    <input
      class="custom-color-input"
      type="color"
      :value="player.color"
      @change="onColorChange($event, player.id)"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  min-width: 118px;
}

.custom-color-input:hover {
  transform: scale(1.1);
}

.custom-color-input {
  --webkit-appearance: none;
  background-color: transparent;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  height: 60px;
  outline: none;
  transition: transform 0.2s ease-in-out;
  width: 60px;
}

.custom-color-input::-webkit-color-swatch {
  border: none;
  border-radius: 30%;
}
</style>
