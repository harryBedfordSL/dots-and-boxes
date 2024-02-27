import { afterEach, describe, expect, test, vi } from 'vitest';
import { calculateWinner } from './winner';
import { useGameStore } from '@/stores/GameStore';
import { usePlayersStore } from '@/stores/PlayersStore';

vi.mock('@/stores/GameStore', () => ({
  useGameStore: () => ({
    setWinner: vi.fn()
  })
}));

vi.mock('@/stores/PlayersStore', () => ({
  usePlayersStore: () => ({
    players: vi.fn()
  })
}));

describe('winner', () => {
  afterEach(() => {
    vi.resetAllMocks();
  })

  const gameStore = useGameStore();
  const playersStore = usePlayersStore();

  test('Should call set winner action', () => {
    calculateWinner(gameStore.setWinner, playersStore.players);

    expect(gameStore.setWinner).toHaveBeenCalled();
  });

  test('Should call set winner action with the correct winner id', () => {
    playersStore.players = {
      a: { score: 10, color: 'red', id: 'a', name: 'Player 1' },
      b: { score: 5, color: 'blue', id: 'b', name: 'Player 1' },
    };
    
    calculateWinner(gameStore.setWinner, playersStore.players);
    
    expect(gameStore.setWinner).toHaveBeenCalledWith('a');
  });
  
  test('Should call set winner action with draw when no winner', () => {
    playersStore.players = {
      a: { score: 10, color: 'red', id: 'a', name: 'Player 1' },
      b: { score: 10, color: 'blue', id: 'b', name: 'Player 1' },
    };

    calculateWinner(gameStore.setWinner, playersStore.players);
    
    expect(gameStore.setWinner).toHaveBeenCalledWith('draw');
  });
});
