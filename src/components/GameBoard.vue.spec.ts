import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import GameBoard from './GameBoard.vue';
import { createTestingPinia } from '@pinia/testing';

describe('GameBoard', () => {
  test('should render a game board with no errors', () => {
    expect(() => mount(GameBoard, {
      shallow: true,
      global: {
        plugins: [createTestingPinia()]
      }
    })).not.toThrowError();
  });
});
