import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import GameBoard from './GameBoard.vue';

describe('GameBoard', () => {
  test('should render a game board with no errors', () => {
    expect(() => mount(GameBoard, { shallow: true })).not.toThrowError();
  });
});
