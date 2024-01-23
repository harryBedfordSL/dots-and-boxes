import { describe, expect, test, vi } from 'vitest';
import { calculateWinner } from './winner';
import { useGameStore } from '@/stores/GameStore';

vi.mock('@/stores/GameStore', () => ({
  useGameStore: () => ({
    setWinner: vi.fn()
  })
}));

describe.only('winner', () => {
  test('Should call set winner action', () => {
    const store = useGameStore();

    calculateWinner(store);

    expect(store.setWinner).toHaveBeenCalled();
  });
});
