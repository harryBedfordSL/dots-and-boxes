import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import InfoModal from './InfoModal.vue';
import { nextTick } from 'vue';

describe('InfoModal', () => {
  test('Should render with no errors', () => {
    expect(() => mount(InfoModal)).not.toThrowError()
  });

  test('Header should not exist by default', () => {
    const wrapper = mount(InfoModal);
    expect(wrapper.find('h1').exists()).toBe(false);
  });

  test('toggling visibility should make the header visible', async () => {
    const wrapper = mount(InfoModal);

    wrapper.find('.test-info').trigger('click');
    
    await nextTick();
    expect(wrapper.find('h1').exists()).toBe(true);
  });
});
