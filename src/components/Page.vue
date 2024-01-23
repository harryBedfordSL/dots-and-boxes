<script setup lang="ts">
export interface PageProps {
  containerKey: string;
}

defineProps<PageProps>();
</script>

<template>
  <Transition mode="out-in">
    <div :key="containerKey" class="page-container">
      <slot></slot>
    </div>
  </Transition>
</template>

<style scoped>
.page-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
