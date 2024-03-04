<script setup lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue';
import Button from '../Button.vue';
import { useGameStore } from '@/stores/GameStore';
import TimerConfig from '../game-form/TimerConfig.vue';

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
      <h1 class="heading">Settings</h1>
    </template>
    <template #body>
      <div class="setting">
        <span>TIMER</span>
        <div class="setting-actions">
          <TimerConfig />
        </div>
      </div>
      <div class="actions-container">
        <Button class="action test-home" @click="goHome">Home</Button>
        <Button class="action test-restart" @click="restartGame">Restart</Button>
        <Button class="action test-end" @click="endGame">End Game</Button>
      </div>
    </template>
  </Modal>
</template>

<style scoped>
.heading {
  margin: 0;
}

.setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.setting-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.actions-container {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 20px 0 0 0;
  max-width: -webkit-fill-available;
}

.action {
  width: 150px;
}
</style>
