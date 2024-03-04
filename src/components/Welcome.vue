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
  padding: 0 20px;
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: center;
  max-width: -webkit-fill-available;
}
</style>
