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
const container = ref(null);

const closeModal = (): void => {
  emit('close');
};

useClickOutside({
  callback: closeModal,
  container,
  target: modalContent
});
</script>

<template>
  <Transition name="fade">
    <div class="overlay" ref="container" v-if="isVisible"></div>
  </Transition>
  <Transition name="pop">
      <div :class="modalContent" v-if="isVisible">
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
  </Transition>
</template>

<style scoped>
.overlay {
  content: '';
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0.6;
  cursor: pointer;
}

.modal {
  overflow-x: auto;
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: fit-content;
  height: fit-content;
  max-width: 30em;
  max-height: 75%;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 5px 5px 0px 1px var(--background-secondary);
  background: var(--background-primary);
  z-index: 999;
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

.pop-enter-active,
.pop-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease-in-out;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
