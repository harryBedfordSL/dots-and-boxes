<script setup lang="ts">
import { usePlayersStore } from '@/stores/PlayersStore';
import { computed } from 'vue';

const playersStore = usePlayersStore();

const players = computed(() => Object.values(playersStore.players));

const onInput = (event: Event, id: string) => {
  const target = event.target as HTMLInputElement;
  const newName = target.value;

  playersStore.updatePlayer(id, { name: newName });
};
</script>

<template>
  <input
    type="text"
    v-for="player in players"
    :key="player.id"
    :value="player.name"
    @input="onInput($event, player.id)"
  />
</template>

<style scoped>
input {
  width: 100px;
  text-align: center;
  font-size: 16px;
  padding: 8px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s ease-in-out;
  background-color: transparent;
  color: var(--text-color);
}

input:focus {
  border-color: #4caf50;
  box-shadow: 3px 3px 0px rgba(76, 175, 80, 0.5);
}
</style>
