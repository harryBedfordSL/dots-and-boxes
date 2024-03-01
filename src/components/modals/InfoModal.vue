<script setup lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue';

const infoVisible = ref(false);
const toggleInfoVisibility = () => {
  infoVisible.value = !infoVisible.value;
};
</script>

<template>
  <img
    src="@/assets/icons/info.svg"
    @click="toggleInfoVisibility"
    class="icon clickable relative test-info"
  />
  <Modal :is-visible="infoVisible" @close="infoVisible = false">
    <template #header>
      <h1 class="header">Info</h1>
    </template>
    <template #body>
      <p class="intro">
        Dots and Boxes is a simple yet strategic game that requires planning and foresight. Have fun
        playing!
      </p>
      <ol>
        <li class="step">
          <strong>Setup:</strong> Start by configuring your game. 2 - 4 players can play; you
          can enable a timer if you want to add a time limit to each turn.
        </li>
        <li class="step">
          <strong>Turns:</strong> Take turns connecting two adjacent dots with a
          line. The line can be horizontal or vertical, but not diagonal.
        </li>
        <li class="step">
          <strong>Completing a Box:</strong> When a player completes the fourth side of a box by
          drawing a line, they get a point and get to take another turn.
        </li>
        <li class="step">
          <strong>Strategy:</strong> The goal is to strategically create boxes and prevent your
          opponent from doing the same. If you complete a box, you get another turn, so try to set
          up multiple boxes in a single move.
        </li>
        <li class="step">
          <strong>Game End:</strong> The game continues until all the dots are connected and no more
          moves can be made. The player with the most boxes wins the game.
        </li>
      </ol>
    </template>
  </Modal>
</template>

<style scoped>
.header {
  margin: 0;
}

.intro {
  text-align: center;
  margin-top: 0;
}

.step {
  padding: 10px 2px;
}

.relative {
  position: relative;
  bottom: 20px;
  width: 2rem;
}
</style>
