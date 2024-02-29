<script setup lang="ts">
export interface ToggleProps {
  enabled: boolean;
}

withDefaults(defineProps<ToggleProps>(), {
  enabled: false
});

const emit = defineEmits(['toggle']);
</script>

<template>
  <div
    class="switch-container"
    :class="{ green: enabled }"
    @click="$emit('toggle')"
  >
    <div class="switch" :class="{ enabled }"></div>
  </div>
</template>

<style scoped>
.switch-container {
  align-items: center;
  background-color: var(--disabled-color);
  border-radius: 9999px;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: 1.75rem;
  padding: 4px;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  width: 4rem;
}

.switch {
  background-color: white;
  border-radius: 50%;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  height: 1.75rem;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  width: 1.75rem;
}

.green {
  background-color: var(--accent-primary);
}

.enabled {
  transform: translateX(2.25rem);
}
</style>
