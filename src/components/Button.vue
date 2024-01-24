<script setup lang="ts">
export interface ButtonProps {
  type?: 'primary' | 'secondary';
  disabled?: boolean;
}

withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  disabled: false
});

const emit = defineEmits(['click']);

const onClick = () => {
  emit('click');
};
</script>

<template>
  <button :disabled="disabled" :class="type === 'primary' ? 'primary' : 'secondary'" @click="onClick">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
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

button:disabled {
  background-color: var(--disabled-color);
  cursor: default;
}

.primary {
  background-color: var(--accent-primary);
}

.primary:not([disabled]):hover {
  background-color: var(--accent-primary-hover);
}

.primary:not([disabled]):active {
  background-color: var(--accent-primary);
}

.secondary {
  background-color: var(--accent-secondary);
}

.secondary:not([disabled]):hover {
  background-color: var(--accent-secondary-hover);
}

.secondary:not([disabled]):active {
  background-color: var(--accent-secondary);
}
</style>
