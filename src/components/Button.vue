<script setup lang="ts">
export interface ButtonProps {
  type?: 'primary' | 'secondary';
}

withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
});

const emit = defineEmits(['click']);

const onClick = () => {
  emit('click');
};
</script>

<template>
  <button class="btn" :class="type === 'primary' ? 'primary' : 'secondary'" @click="onClick">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  border-radius: 5px;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  transition: 0.3s;
}

.primary {
  background-color: var(--accent-primary);
}

.primary:hover {
  background-color: var(--accent-primary-hover);
}

.primary:active {
  background-color: var(--accent-primary);
}

.secondary {
  background-color: var(--accent-secondary);
}

.secondary:hover {
  background-color: var(--accent-secondary-hover);
}

.secondary:active {
  background-color: var(--accent-secondary);
}
</style>
