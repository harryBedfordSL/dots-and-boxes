<script setup lang="ts">
import Welcome from './Welcome.vue';
import Modal from './Modal.vue';
import { ref } from 'vue';

const playModalVisible = ref(false);
const togglePlayModalVisibility = () => {
  playModalVisible.value = !playModalVisible.value;
};
</script>

<template>
  <Welcome @play="togglePlayModalVisibility" />
  <Modal :is-visible="playModalVisible" @close="playModalVisible = false" />
</template>

<style scoped></style>
