import { describe, afterEach, expect, test, vi } from 'vitest';
import { getScoreForNewLine } from './scoring';

describe('scoring', () => {
  const onBoxMade = vi.fn();
  const lineConfig = {
    horizontals: [[0, 0], [0, 0], [0, 0]],
    verticals: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    boxes: [['', ''], ['', '']],
  };

  afterEach(() => {
    vi.resetAllMocks();
  })

  describe('horizontals', () => {
    const type = 'horizontals';

    test('no box made should return 0', () => {
      const newScore = getScoreForNewLine({
        rowIndex: 0,
        lineIndex: 0,
        lineConfig,
        type,
        onBoxMade,
      });

      expect(newScore).toBe(0);
      expect(onBoxMade).not.toHaveBeenCalled();
    });

    test('single box below made should return 1', () => {
      const newScore = getScoreForNewLine({
        rowIndex: 0,
        lineIndex: 0,
        lineConfig: {
          ...lineConfig,
          horizontals: [[0, 0], [1, 0], [0, 1]],
          verticals: [[1, 1, 0], [0, 0, 0], [0, 0, 0]],
        },
        type,
        onBoxMade,
      });

      expect(newScore).toBe(1);
      expect(onBoxMade).toHaveBeenCalledWith(0, 0);
    });

    test('single box above made should return 1', () => {
      const newScore = getScoreForNewLine({
        rowIndex: 1,
        lineIndex: 0,
        lineConfig: {
          ...lineConfig,
          horizontals: [[1, 0], [0, 0], [0, 0]],
          verticals: [[1, 1, 0], [0, 0, 0], [0, 0, 0]],
        },
        type,
        onBoxMade,
      });

      expect(newScore).toBe(1);
      expect(onBoxMade).toHaveBeenCalledWith(0, 0);
    });

    test('single box above and below made should return 2', () => {
      const newScore = getScoreForNewLine({
        rowIndex: 1,
        lineIndex: 0,
        lineConfig: {
          ...lineConfig,
          horizontals: [[1, 0], [0, 0], [1, 0]],
          verticals: [[1, 1, 0], [1, 1, 0], [0, 0, 0]],
        },
        type,
        onBoxMade,
      });

      expect(newScore).toBe(2);
      expect(onBoxMade).toHaveBeenCalledWith(0, 0);
      expect(onBoxMade).toHaveBeenCalledWith(1, 0);
    });
  });

  describe('verticals', () => {
    const type = 'verticals';
    test('no box made should return 0', () => {
      const newScore = getScoreForNewLine({
        rowIndex: 0,
        lineIndex: 0,
        lineConfig: lineConfig,
        type,
        onBoxMade,
      });

      expect(newScore).toBe(0);
      expect(onBoxMade).not.toHaveBeenCalled();
    });

    test('single box made to the left should return 1', () => {
      const newScore = getScoreForNewLine({
        rowIndex: 0,
        lineIndex: 1,
        lineConfig: {
          ...lineConfig,
          horizontals: [[1, 0], [1, 0], [0, 0]],
          verticals: [[1, 0, 0], [0, 0, 0], [0, 0, 0]],
        },
        type,
        onBoxMade,
      });

      expect(newScore).toBe(1);
      expect(onBoxMade).toHaveBeenCalledWith(0, 0);
    });

    test('single box made to the right should return 1', () => {
      const newScore = getScoreForNewLine({
        rowIndex: 0,
        lineIndex: 1,
        lineConfig: {
          ...lineConfig,
          horizontals: [[0, 1], [0, 1], [0, 0]],
          verticals: [[0, 0, 1], [0, 0, 0], [0, 0, 0]],
        },
        type,
        onBoxMade,
      });

      expect(newScore).toBe(1);
      expect(onBoxMade).toHaveBeenCalledWith(0, 1);
    });

    test('single box made to the left and right should return 2', () => {
      const newScore = getScoreForNewLine({
        rowIndex: 0,
        lineIndex: 1,
        lineConfig: {
          ...lineConfig,
          horizontals: [[1, 1], [1, 1], [0, 0]],
          verticals: [[1, 0, 1], [0, 0, 0], [0, 0, 0]],
        },
        type,
        onBoxMade,
      });

      expect(newScore).toBe(2);
      expect(onBoxMade).toHaveBeenCalledWith(0, 0);
      expect(onBoxMade).toHaveBeenCalledWith(0, 1);
    });
  });
});
