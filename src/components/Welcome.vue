<script setup lang="ts">
const emit = defineEmits(['play', 'info']);

const onPlay = () => {
  emit('play');
};

const onInfo = () => {
  emit('info');
};
</script>

<template>
  <div class="container">
    <h1>Welcome to Dots + Boxes</h1>
    <div class="actions">
      <img src="@/assets/icons/play.svg" @click="onPlay" class="button test-play" />
      <img src="@/assets/icons/info.svg" @click="onInfo" class="button test-info" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 50%;
  text-align: center;
}

.actions {
  display: flex;
  width: 75%;
  justify-content: space-evenly;
  margin-top: 20px;
}

.button {
  filter: invert(79%) sepia(24%) saturate(704%) hue-rotate(91deg) brightness(92%) contrast(83%);
  cursor: pointer;
}

.button:hover {
  filter: invert(87%) sepia(12%) saturate(1037%) hue-rotate(88deg) brightness(95%) contrast(90%);
}

.button:active {
  filter: invert(79%) sepia(24%) saturate(704%) hue-rotate(91deg) brightness(92%) contrast(83%);
}
</style>
