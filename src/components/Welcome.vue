<script setup lang="ts">
import InfoModalVue from './modals/InfoModal.vue';
import GameForm from './game-form/GameForm.vue';
</script>

<template>
  <div class="header">
    <h1>Welcome to Dots + Boxes</h1>
    <InfoModalVue />
  </div>
  <GameForm />
</template>

<style scoped>
.header {
  align-items: center;
  display: flex;
  width: 50%;
  gap: 10px;
  justify-content: center;
}
</style>
