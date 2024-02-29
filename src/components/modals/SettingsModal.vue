<script setup lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue';
import Button from '../Button.vue';
import { useGameStore } from '@/stores/GameStore';
import { usePlayersStore } from '@/stores/PlayersStore';

const isVisible = ref(false);
const toggleModalVisibility = () => {
  isVisible.value = !isVisible.value;
};

const gameStore = useGameStore();
const playersStore = usePlayersStore();

const goHome = () => {
  gameStore.resetGame();
  isVisible.value = false;
};

const restartGame = () => {
  gameStore.restartGame();
  isVisible.value = false;
};

const endGame = () => {
  gameStore.endGame();
  isVisible.value = false;
};
</script>

<template>
  <img src="@/assets/icons/settings.svg" @click="toggleModalVisibility" class="icon clickable settings test-toggle" />
  <Modal :is-visible="isVisible" @close="isVisible = false">
    <template #header>
      <h1>Settings</h1>
    </template>
    <template #body>
      <Button class="action test-home" @click="goHome">Home</Button>
      <Button class="action test-restart" @click="restartGame">Restart</Button>
      <Button class="action test-end" @click="endGame">End Game</Button>
    </template>
  </Modal>
</template>

<style scoped>
.settings {
  position: absolute;
  top: 20px;
  width: 2rem;
}

.action {
  width: 150px
}
</style>
