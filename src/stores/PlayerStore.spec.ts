import { beforeEach, describe, expect, test } from 'vitest';
import { usePlayersStore } from './PlayersStore';
import { createPinia, setActivePinia } from 'pinia';

describe('GameStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('Should return a store with no errors', () => {
    expect(() => usePlayersStore()).not.toThrowError();
  });

  test('addPlayer should add a third player', () => {
    const store = usePlayersStore();

    store.addPlayer();

    expect(Object.keys(store.players).length).toBe(3);
  });
  
  test('removePlayer should remove the third player', () => {
    const store = usePlayersStore();
    store.addPlayer();
    
    store.removePlayer();
    
    expect(Object.keys(store.players).length).toBe(2);
  });

  test('updatePlayer should update a player', () => {
    const store = usePlayersStore();
    const [playerId] = Object.keys(store.players);

    store.updatePlayer(playerId, { name: 'New Name' });

    expect(store.players[playerId].name).toBe('New Name');
  });

  test('resetScores should reset the scores', () => {
    const store = usePlayersStore();
    const [playerId] = Object.keys(store.players);
    store.updatePlayer(playerId, { score: 10 });

    store.resetScores();

    expect(store.players[playerId].score).toBe(0);
  });

  test('incrementScore should increment the score by 1 by default', () => {
    const store = usePlayersStore();
    const [playerId] = Object.keys(store.players);

    store.incrementScore(playerId);

    expect(store.players[playerId].score).toBe(1);
  });

  test('incrementScore should increment the score by the given value', () => {
    const store = usePlayersStore();
    const [playerId] = Object.keys(store.players);
    const value = 10;

    store.incrementScore(playerId, value);

    expect(store.players[playerId].score).toBe(value);
  });
});
