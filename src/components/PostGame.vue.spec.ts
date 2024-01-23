import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, test } from 'vitest';
import PostGame from './PostGame.vue';
import { createTestingPinia } from '@pinia/testing';
import { nextTick } from 'vue';
import { useGameStore } from '@/stores/GameStore';

describe('PostGame', () => {
  let wrapper: ReturnType<typeof mount>;
  let store: ReturnType<typeof useGameStore>;

  beforeEach(() => {
    wrapper = mount(PostGame, {
      global: {
        plugins: [createTestingPinia()]
      }
    });
    store = useGameStore();
  });

  test('Should render with no errors', () => {
    expect(() => wrapper).not.toThrowError();
  });

  test('Clicking on home should fire the correct action', async () => {
    wrapper.find('.test-home').trigger('click');

    await nextTick();
    expect(store.resetGame).toHaveBeenCalled();
  });

  test('Clicking on play again should fire the correct action', async () => {
    wrapper.find('.test-restart').trigger('click');

    await nextTick();
    expect(store.restartGame).toHaveBeenCalled();
  });
});
