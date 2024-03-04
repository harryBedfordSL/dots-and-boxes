import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import SettingsModal from './SettingsModal.vue';
import { useGameStore } from '@/stores/GameStore';
import { createTestingPinia } from '@pinia/testing';
import { nextTick } from 'vue';
import { afterEach } from 'node:test';

describe('SettingsModal', () => {
  let wrapper: ReturnType<typeof mount>;
  let store: ReturnType<typeof useGameStore>;

  beforeEach(() => {
    wrapper = mount(SettingsModal, {
      global: {
        plugins: [createTestingPinia()]
      }
    });

    store = useGameStore();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('Should render with no errors', () => {
    expect(() => wrapper).not.toThrowError();
  });

  test('Header should not exist by default', () => {
    expect(wrapper.find('h1').exists()).toBe(false);
  });

  test('toggling visibility should make the header visible', async () => {
    wrapper.find('.test-toggle').trigger('click');

    await nextTick();
    expect(wrapper.find('h1').exists()).toBe(true);
  });

  test('Clicking go home should close modal and call correct action', async () => {
    wrapper.find('.test-toggle').trigger('click');
    await nextTick();

    wrapper.find('.test-home').trigger('click');

    await nextTick();
    expect(wrapper.find('h1').exists()).toBe(false);
    expect(store.resetGame).toHaveBeenCalled();
    expect(store.setTimerPaused).toHaveBeenCalled();
  });

  test('Clicking reset game should close modal and call correct action', async () => {
    wrapper.find('.test-toggle').trigger('click');
    await nextTick();

    wrapper.find('.test-restart').trigger('click');

    await nextTick();
    expect(wrapper.find('h1').exists()).toBe(false);
    expect(store.restartGame).toHaveBeenCalled();
    expect(store.setTimerPaused).toHaveBeenCalled();
  });

  test('Clicking end game should close modal and call correct action', async () => {
    wrapper.find('.test-toggle').trigger('click');
    await nextTick();

    wrapper.find('.test-end').trigger('click');

    await nextTick();
    expect(wrapper.find('h1').exists()).toBe(false);
    expect(store.endGame).toHaveBeenCalled();
    expect(store.setTimerPaused).toHaveBeenCalled();
  });
});
