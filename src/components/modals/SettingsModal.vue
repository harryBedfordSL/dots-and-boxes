<script setup lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue';
import Button from '../Button.vue';
import { useGameStore } from '@/stores/GameStore';

const gameStore = useGameStore();

const isVisible = ref(false);

const onOpen = () => {
  isVisible.value = true;
  gameStore.setTimerPaused(true);
};

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

const onClose = () => {
  isVisible.value = false;
  gameStore.setTimerPaused(false);
};
</script>

<template>
  <img src="@/assets/icons/settings.svg" @click="onOpen" class="icon clickable test-toggle" />
  <Modal :is-visible="isVisible" @close="onClose">
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
.action {
  width: 150px
}
</style>
