import { expect, test, describe, vi } from 'vitest';
import { ref, h, defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import {
  noCallbackErrorMessage,
  noTargetErrorMessage,
  type UseClickOutside,
  useClickOutside
} from './useClickOutside';

const createTestComponent = ({ callback, target }: UseClickOutside) => {
  const TestComponent = defineComponent({
    setup() {
      useClickOutside({
        target,
        callback
      });
    },
    render() {
      return h('div', { class: 'app' }, [h('div', { class: 'inner' })]);
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

  test('Clicking on the inner element should not invoke the callback', () => {
    const callback = vi.fn();
    const wrapper = createTestComponent({
      target: ref('inner'),
      callback
    });
    const innerEl = wrapper.find('.inner');

    innerEl.trigger('click');

    expect(callback).not.toHaveBeenCalled();
  });

  test('Clicking on the outer element should invoke the callback', () => {
    const callback = vi.fn();
    const wrapper = createTestComponent({
      target: ref('inner'),
      callback
    });
    const outerEl = wrapper.find('.app');

    outerEl.trigger('click');

    expect(callback).toHaveBeenCalled();
  });

  test('Clicking on the outer element after unmounting should not invoke the callback', () => {
    const callback = vi.fn();
    const wrapper = createTestComponent({
      target: ref('inner'),
      callback
    });
    const outerEl = wrapper.find('.app');
    wrapper.unmount();
    
    outerEl.trigger('click');

    expect(callback).not.toHaveBeenCalled();
  });
});
