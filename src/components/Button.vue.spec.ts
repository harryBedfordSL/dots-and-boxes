import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import Button from './Button.vue';

describe('Button', () => {
  test('should render a button with no errors', () => {
    expect(() => mount(Button)).not.toThrowError();
  });

  test('should render a button with the correct text', () => {
    const text = 'Click me';

    const wrapper = mount(Button, {
      slots: {
        default: text
      }
    });

    expect(wrapper.text()).toBe(text);
  });

  test('Should emit a click event when clicked', () => {
    const wrapper = mount(Button);

    wrapper.trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
