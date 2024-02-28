import { beforeEach, describe, expect, test } from 'vitest';
import { useGameStore } from './GameStore';
import { createPinia, setActivePinia } from 'pinia';
import { nextTick } from 'vue';

describe('GameStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('Should return a store with no errors', () => {
    expect(() => useGameStore()).not.toThrowError();
  });

  test('SetWinner should set the winner', () => {
    const winner = 'I am the winner';
    const store = useGameStore();

    store.setWinner(winner);

    expect(store.winner).toBe(winner);
  });

  test('StartGame should set started to true', () => {
    const store = useGameStore();

    store.startGame();

    expect(store.started).toBe(true);
  });

  test('ResetGame should reset the game', () => {
    const store = useGameStore();

    store.resetGame();

    expect(store.started).toBe(false);
    expect(store.winner).toBe(null);
  });

  test('RestartGame should restart the game', () => {
    const store = useGameStore();

    store.restartGame();

    expect(store.started).toBe(true);
    expect(store.turn).toBe(null);
    expect(store.winner).toBe(null);
  });

  test('EndGame should end the game', () => {
    const store = useGameStore();

    store.endGame();

    expect(store.started).toBe(false);
    expect(store.turn).toBe(null);
  });

  test('setLine should set the line', () => {
    const store = useGameStore();
    const rowIndex = 0;
    const lineIndex = 0;
    const type = 'horizontals';
    const value = 1;

    store.setLine(rowIndex, lineIndex, type, value);

    expect(store.lines[type][rowIndex][lineIndex]).toBe(value);
  });

  test('setBox with no turn should not set the box', () => {
    const store = useGameStore();

    store.setBox(0, 0);

    expect(store.lines.boxes[0][0]).toBe('');
  });

  test('setBox with turn should set the box to the current turn', () => {
    const store = useGameStore();
    store.setTurn('player1');

    store.setBox(0, 0);

    expect(store.lines.boxes[0][0]).toBe('player1');
  });

  test('changing grid x dimension should result in new line dimensions', async () => {
    const store = useGameStore();
    expect(store.lines.horizontals.length).toBe(5);
    expect(store.lines.horizontals[0].length).toBe(4);
    expect(store.lines.verticals.length).toBe(4);
    expect(store.lines.verticals[0].length).toBe(5);
    expect(store.lines.boxes.length).toBe(4);
    expect(store.lines.boxes[0].length).toBe(4);
    
    store.increaseGridX();
    
    await nextTick();
    expect(store.lines.horizontals.length).toBe(5);
    expect(store.lines.horizontals[0].length).toBe(5);
    expect(store.lines.verticals.length).toBe(4);
    expect(store.lines.verticals[0].length).toBe(6);
    expect(store.lines.boxes.length).toBe(4);
    expect(store.lines.boxes[0].length).toBe(5);
  })
  
  test('changing grid y dimension should result in new lines', async () => {
    const store = useGameStore();
    expect(store.lines.horizontals.length).toBe(5);
    expect(store.lines.horizontals[0].length).toBe(4);
    expect(store.lines.verticals.length).toBe(4);
    expect(store.lines.verticals[0].length).toBe(5);
    expect(store.lines.boxes.length).toBe(4);
    expect(store.lines.boxes[0].length).toBe(4);
    
    store.increaseGridY();
    
    await nextTick();
    expect(store.lines.horizontals.length).toBe(6);
    expect(store.lines.horizontals[0].length).toBe(4);
    expect(store.lines.verticals.length).toBe(5);
    expect(store.lines.verticals[0].length).toBe(5);
    expect(store.lines.boxes.length).toBe(5);
    expect(store.lines.boxes[0].length).toBe(4);
  })
});
