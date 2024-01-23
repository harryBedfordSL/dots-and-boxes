import { beforeEach, describe, expect, test } from 'vitest';
import { useGameStore } from './GameStore';
import { createPinia, setActivePinia } from 'pinia';

describe('GameStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('Should return a store with no errors', () => {
    expect(() => useGameStore()).not.toThrowError();
  })

  test('SetWinner should set the winner', () => {
    const winner = 'I am the winner'
    const store = useGameStore();

    store.setWinner(winner);

    expect(store.winner).toBe(winner);
  })

  test('StartGame should set started to true', () => {
    const store = useGameStore();

    store.startGame();

    expect(store.started).toBe(true);
  })

  test('ResetGame should reset the game', () => {
    const store = useGameStore();

    store.resetGame();

    expect(store.started).toBe(false);
    expect(store.turn).toBe(null);
    expect(store.winner).toBe(null);
  })

  test('RestartGame should restart the game', () => {
    const store = useGameStore();

    store.restartGame();

    expect(store.started).toBe(true);
    expect(store.turn).toBe(null);
    expect(store.winner).toBe(null);
  })

  test('EndGame should end the game', () => {
    const store = useGameStore();

    store.endGame();

    expect(store.started).toBe(false);
    expect(store.turn).toBe(null);
  })
});
