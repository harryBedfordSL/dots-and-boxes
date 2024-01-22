<script setup lang="ts">
import { useClickOutside } from '@/composables/useClickOutside';
import { ref } from 'vue';

export interface ModalProps {
  isVisible?: boolean;
}

const emit = defineEmits(['close']);
withDefaults(defineProps<ModalProps>(), {
  isVisible: false
});

const modalContent = ref('modal');

const closeModal = (): void => {
  emit('close');
};

useClickOutside({
  target: modalContent,
  callback: closeModal
});
</script>

<template>
  <div class="modal-background" v-if="isVisible">
    <div :class="modalContent">
      <header class="modal-header">
        <slot name="header">
          <h1>Default header</h1>
        </slot>
        <button class="btn-close" @click="closeModal">
          <img src="@/assets/icons/close.svg" class="img-close" />
        </button>
      </header>
      <section class="modal-body">
        <slot name="body">Default body</slot>
      </section>
    </div>
  </div>
</template>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  min-width: 40%;
  min-height: 60%;
  border-radius: 5px;
  background: #12b754;
  box-shadow: 5px 5px 0px 1px var(--background-secondary);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 1rem;
  display: flex;
  position: relative;
  justify-content: center;
}

.modal-body {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  padding: 10px;
  cursor: pointer;
  background: transparent;
}

.img-close {
  width: 1rem;
  height: 1rem;
}
</style>
