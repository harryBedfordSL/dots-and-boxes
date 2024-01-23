import { mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, test } from 'vitest';
import GameContainer from './GameContainer.vue';
import { createTestingPinia } from '@pinia/testing';
import { useGameStore } from '@/stores/GameStore';

describe.only('GameContainer', () => {
  let wrapper: VueWrapper<typeof GameContainer>;
  let store: ReturnType<typeof useGameStore>;

  beforeEach(() => {
    wrapper = mount(GameContainer, {
      global: {
        plugins: [createTestingPinia()]
      }
    }) as VueWrapper<typeof GameContainer>;
    store = useGameStore();
  });

  test('Should render the container with no errors', () => {
    expect(() => wrapper).not.toThrowError();
  });

  test('Starting active component should be correct', () => {
    expect(wrapper.vm.active.key).toBe('welcome');
  });

  test('Setting the winner should set the correct active component', () => {
    store.winner = 'winner';

    expect(wrapper.vm.active.key).toBe('post-game');
  });

  test('Starting the game should set the correct active component', () => {
    store.started = true;

    expect(wrapper.vm.active.key).toBe('game-board');
  });
});
