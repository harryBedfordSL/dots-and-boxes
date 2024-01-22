import { mount } from '@vue/test-utils';
import { expect, test, describe } from 'vitest';
import Modal from './Modal.vue';

// double check code to commit and push
// also add tests to missing coverage (App, main.ts and types.ts)
//   + Maybe should ignore some files from coverage
describe('useClickOutside', () => {
  test('Should be visible when props isVisible is true', () => {
    const wrapper = mount(Modal, { props: { isVisible: true } });
    const modal = wrapper.find('.modal');

    expect(modal.exists()).toBe(true);
  });

  test('Should be hidden when props isVisible is false', () => {
    const wrapper = mount(Modal, { props: { isVisible: false } });
    const modal = wrapper.find('.modal');

    expect(modal.exists()).toBe(false);
  });

  test('Should be hidden by default', () => {
    const wrapper = mount(Modal);
    const modal = wrapper.find('.modal');

    expect(modal.exists()).toBe(false);
  });

  test('Should emit close when clicking on the close button', async () => {
    const wrapper = mount(Modal, { props: { isVisible: true } });
    const closeButton = wrapper.find('.btn-close');

    closeButton.trigger('click');

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
