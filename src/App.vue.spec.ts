import { expect, test, describe, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import App from './App.vue';

describe('App', () => {
  test('Should mount with no errors', () => {
    expect(() => {
      mount(App);
    }).not.toThrowError();
  });
});
