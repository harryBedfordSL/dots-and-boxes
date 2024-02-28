import type { Grid } from '@/types';

export interface LineConfig {
  horizontals: number[][];
  verticals: number[][];
  boxes: string[][];
}

export const createLineConfig = (grid: Grid): LineConfig => ({
  verticals: Array.from({ length: grid.y - 1 }, () => Array.from({ length: grid.x }, () => 0)),
  horizontals: Array.from({ length: grid.y }, () => Array.from({ length: grid.x - 1 }, () => 0)),
  boxes: Array.from({ length: grid.y - 1 }, () => Array.from({ length: grid.x - 1 }, () => ''))
});
