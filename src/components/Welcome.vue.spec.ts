import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import  { useGameStore } from '@/stores/GameStore';
import { expect, test, describe } from 'vitest';
import Welcome from './Welcome.vue';

describe('Welcome', () => {
  test('Should mount with no errors', () => {
    expect(() => {
      mount(Welcome, {
        global: {
          plugins: [createTestingPinia()]
        }
      });
    }).not.toThrowError();
  });

  test('Clicking on play should fire off correct pinia action', () => {
    const wrapper = mount(Welcome);
    const playButton = wrapper.find('.test-play');
    const store = useGameStore();

    playButton.trigger('click');

    expect(store.startGame).toHaveBeenCalled();
  });
});
