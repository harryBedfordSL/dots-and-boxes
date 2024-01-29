<script setup lang="ts">
import { useGameStore } from '@/stores/GameStore';
import { usePlayersStore } from '@/stores/PlayersStore';
import { computed, ref, type Ref } from 'vue';
import { defaultTurn, type Option } from '@/types';

const playersStore = usePlayersStore();
const gameStore = useGameStore();

const options: Ref<Option[]> = computed(() => [
  defaultTurn,
  ...Object.values(playersStore.players).map((player) => ({
    value: player.id,
    label: player.name
  }))
]);

const selected: Ref<Option> = computed(() => {
  return options.value.find(({ value }) => value === gameStore.turn) ?? defaultTurn;
});
const open = ref(false);

const onSelect = (option: Option) => {
  selected.value = option;
  open.value = false;
  gameStore.setTurn(option.value);
};
</script>

<template>
  <div class="custom-select" @blur="open = false">
    <div class="selected" :class="{ open }" @click="open = !open">
      {{ selected.label }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="option of options"
        :key="option.value"
        @click="onSelect(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  font-size: 16px;
  outline: none;
  height: 2.5rem;
  line-height: 2.5rem;
}

.custom-select .selected {
  border-radius: 6px;
  border: 1px solid var(--border-color);
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  border: 1px solid var(--border-color);
  border-radius: 6px 6px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: '';
  top: 1rem;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: var(--text-color) transparent transparent transparent;
}

.custom-select .items {
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  position: absolute;
  background-color: var(--background-secondary);
  left: 0;
  right: 0;
  z-index: 1;
}

.custom-select .items div {
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: var(--background-primary);
}

.selectHide {
  display: none;
}
</style>
