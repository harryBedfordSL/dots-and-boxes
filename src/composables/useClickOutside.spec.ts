import { expect, test, describe, vi } from 'vitest';
import { ref, h, defineComponent, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import {
  noCallbackErrorMessage,
  noTargetErrorMessage,
  type UseClickOutside,
  useClickOutside
} from './useClickOutside';

const defaultContainer = ref<HTMLElement | null>(document.body);

const createTestComponent = ({ callback, target, container }: UseClickOutside) => {
  const TestComponent = defineComponent({
    setup() {
      useClickOutside({
        target,
        callback,
        container
      });
    },
    render() {
      return h('div', { class: 'app', ref: container }, [h('div', { class: 'inner' })]);
    }
  });

  return mount(TestComponent, {
    attachTo: document.body
  });
};

describe('useClickOutside', () => {
  test('Throws error when no target classname is provided', () => {
    expect(() =>
      createTestComponent({
        callback: vi.fn()
      } as unknown as UseClickOutside)
    ).toThrowError(noTargetErrorMessage);
  });

  test('Throws error when no callback is  provided', () => {
    expect(() =>
      createTestComponent({
        target: ref('inner')
      } as unknown as UseClickOutside)
    ).toThrowError(noCallbackErrorMessage);
  });

  test('Clicking on the inner element should not invoke the callback', async () => {
    const callback = vi.fn();
    const wrapper = createTestComponent({
      target: ref('inner'),
      callback,
      container: defaultContainer
    });
    const innerEl = wrapper.find('.inner');
    await nextTick();

    innerEl.trigger('click');

    expect(callback).not.toHaveBeenCalled();
  });

  test('Clicking on the outer element should invoke the callback', async () => {
    const callback = vi.fn();
    const wrapper = createTestComponent({
      target: ref('inner'),
      callback,
      container: defaultContainer
    });
    const outerEl = wrapper.find('.app');
    await nextTick();

    outerEl.trigger('click');

    expect(callback).toHaveBeenCalled();
  });

  test('Clicking on the outer element after unmounting should not invoke the callback', async () => {
    const callback = vi.fn();
    const wrapper = createTestComponent({
      target: ref('inner'),
      callback,
      container: defaultContainer
    });
    const outerEl = wrapper.find('.app');
    wrapper.unmount();

    outerEl.trigger('click');

    expect(callback).not.toHaveBeenCalled();
  });

  test('Changing container value', async () => {
    const callback = vi.fn();
    const container = ref<HTMLElement | null>(null);
    createTestComponent({
      target: ref('inner'),
      callback,
      container
    });
    const addEventListenerMock = vi.fn();
    const newContainerValue = {
      addEventListener: addEventListenerMock
    } as unknown as HTMLElement;

    container.value = newContainerValue;
    await nextTick()

    expect(addEventListenerMock).toHaveBeenCalled();
  });
});
