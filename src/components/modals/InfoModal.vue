<script setup lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue';

const infoVisible = ref(false);
const toggleInfoVisibility = () => {
  infoVisible.value = !infoVisible.value;
};
</script>

<template>
  <img src="@/assets/icons/info.svg" @click="toggleInfoVisibility" class="button test-info" />
  <Modal :is-visible="infoVisible" @close="infoVisible = false">
    <template #header>
      <h1>Info</h1>
    </template>
    <template #body>
      <p>
        Dots and Boxes is a simple yet strategic game that requires planning and foresight. Have fun
        playing!
      </p>
      <ol>
        <li>
          <strong>Setup:</strong> Start by drawing a grid of dots. The size of the grid can vary, but a common size
          is a 5x5 grid.
        </li>
        <li>
          <strong>Turns:</strong> Two players take turns connecting two adjacent dots with a line. The line can be
          horizontal or vertical, but not diagonal.
        </li>
        <li>
          <strong>Completing a Box:</strong> When a player completes the fourth side of a box by drawing a line, they
          get a point and get to take another turn.
        </li>
        <li>
          <strong>Strategy:</strong> The goal is to strategically create boxes and prevent your opponent from doing
          the same. If you complete a box, you get another turn, so try to set up multiple boxes in
          a single move.
        </li>
        <li>
          <strong>Game End:</strong> The game continues until all the dots are connected and no more moves can be
          made. The player with the most boxes wins the game.
        </li>
      </ol>
    </template>
  </Modal>
</template>

<style scoped>
.button {
  filter: invert(79%) sepia(24%) saturate(704%) hue-rotate(91deg) brightness(92%) contrast(83%);
  cursor: pointer;
  position: relative;
  bottom: 20px;
  width: 2rem;
}

.button:hover {
  filter: invert(87%) sepia(12%) saturate(1037%) hue-rotate(88deg) brightness(95%) contrast(90%);
}

.button:active {
  filter: invert(79%) sepia(24%) saturate(704%) hue-rotate(91deg) brightness(92%) contrast(83%);
}
</style>
