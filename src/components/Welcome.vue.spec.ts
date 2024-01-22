import { mount } from '@vue/test-utils';
import { expect, test, describe } from 'vitest';
import Welcome from './Welcome.vue';

describe('Welcome', () => {
  test('Should mount with no errors', () => {
    expect(() => {
      mount(Welcome);
    }).not.toThrowError();
  });

  test('Clicking on play should emit the correct event', () => {
    const wrapper = mount(Welcome);
    const playButton = wrapper.find('.test-play');

    playButton.trigger('click');

    expect(wrapper.emitted().play).toBeTruthy();
  });

  test('Clicking on the info button should emit the correct event', () => {
    const wrapper = mount(Welcome);
    const infoButton = wrapper.find('.test-info');

    infoButton.trigger('click');

    expect(wrapper.emitted().info).toBeTruthy();
  });
});
