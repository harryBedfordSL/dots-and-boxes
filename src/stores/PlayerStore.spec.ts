import { beforeEach, describe, expect, test } from 'vitest';
import { usePlayersStore } from './PlayersStore';
import { createPinia, setActivePinia } from 'pinia';

describe('GameStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('Should return a store with no errors', () => {
    expect(() => usePlayersStore()).not.toThrowError();
  })
})