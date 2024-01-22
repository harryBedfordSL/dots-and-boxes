<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import Welcome from '@/components/Welcome.vue';
</script>

<template>
  <div class="container">
    <Welcome />
    <Modal />
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
