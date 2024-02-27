import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { useLines } from './useLines';
import { createPinia, setActivePinia } from 'pinia';
import { useGameStore } from '@/stores/GameStore';
import { usePlayersStore } from '@/stores/PlayersStore';

describe('useLines', () => {
  let gameStore: ReturnType<typeof useGameStore>;
  let playersStore: ReturnType<typeof usePlayersStore>;
  let lines: ReturnType<typeof useLines>;

  beforeEach(() => {
    setActivePinia(createPinia());
    lines = useLines();
    gameStore = useGameStore();
    playersStore = usePlayersStore();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('hasBeenClicked', () => {
    test('should return false when no lines exist for type', () => {
      gameStore.lines.horizontals = [];

      expect(lines.hasBeenClicked(1, 2, 'horizontals')).toBe(false);
    });

    test('should return false when no lines have been clicked', () => {
      expect(lines.hasBeenClicked(1, 2, 'horizontals')).toBe(false);
    });

    test('should return true when a line has been clicked', () => {
      gameStore.lines.horizontals = [[1, 0, 0, 0, 0]];

      expect(lines.hasBeenClicked(1, 2, 'horizontals')).toBe(true);
    });
  });

  describe('onLineClick', () => {
    test('should not set line if line is already active', () => {
      gameStore.lines.horizontals = [[1, 0, 0, 0, 0]];
      const setLineSpy = vi.spyOn(gameStore, 'setLine');

      lines.onLineClick(1, 2, 'horizontals');

      expect(setLineSpy).not.toHaveBeenCalled();
    });

    test('should not set line if turn is null', () => {
      gameStore.turn = null;
      const setLineSpy = vi.spyOn(gameStore, 'setLine');

      lines.onLineClick(1, 2, 'horizontals');

      expect(setLineSpy).not.toHaveBeenCalled();
    });

    test('should set line and increment score when line is clicked', () => {
      const [playerId] = Object.keys(playersStore.players);
      gameStore.turn = playerId;
      const setLineSpy = vi.spyOn(gameStore, 'setLine');
      const incrementScoreSpy = vi.spyOn(playersStore, 'incrementScore');

      lines.onLineClick(1, 2, 'horizontals');

      expect(setLineSpy).toHaveBeenCalledWith(0, 0, 'horizontals', 1);
      expect(incrementScoreSpy).toHaveBeenCalledWith(playerId, 0);
    });

    test('should end turn when no box is made', () => {
      const [playerId] = Object.keys(playersStore.players);
      gameStore.turn = playerId;
      const endTurnSpy = vi.spyOn(gameStore, 'endTurn');

      lines.onLineClick(1, 2, 'horizontals');

      expect(endTurnSpy).toHaveBeenCalled();
    });

    test('should not end turn when a box is made', () => {
      const [playerId] = Object.keys(playersStore.players);
      gameStore.turn = playerId;
      gameStore.lines.horizontals = [
        [0, 0],
        [1, 0],
        [0, 0]
      ];
      gameStore.lines.verticals = [
        [1, 1, 0],
        [0, 0, 0]
      ];
      const endTurnSpy = vi.spyOn(gameStore, 'endTurn');
      
      lines.onLineClick(1, 2, 'horizontals');
      
      expect(endTurnSpy).not.toHaveBeenCalled();
    });
  });
  
  describe('getBoxStyle', () => {
    test('should return undefined when no boxes exist', () => {
      gameStore.lines.boxes = [];
      
      expect(lines.getBoxStyle(1, 2)).toBeUndefined();
    });
    
    test('should return player style when box is owned by a player', () => {
      const [playerId] = Object.keys(playersStore.players);
      gameStore.lines.boxes = [[playerId, ''], ['', '']];
      const color = 'red';
      playersStore.players[playerId] = { ...playersStore.players[playerId], color };

      expect(lines.getBoxStyle(1, 2)).toEqual({ backgroundColor: color });
    });

    test('should return transparent when box is not owned by a player', () => {
      gameStore.lines.boxes = [['', ''], ['', '']];
      
      expect(lines.getBoxStyle(1, 2)).toEqual({ backgroundColor: 'transparent' });
    });
  });
});
