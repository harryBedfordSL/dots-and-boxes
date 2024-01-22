import { expect, test, describe, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import App from './App.vue';

describe('App', () => {
  test('Should mount with no errors', () => {
    expect(() => {
      mount(App, {
        global: {
          plugins: [createTestingPinia()]
        }
      });
    }).not.toThrowError();
  });
});
