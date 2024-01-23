import type { Game } from '@/types';
import { defineStore } from 'pinia';

export type GameStore = ReturnType<typeof useGameStore>;

export const useGameStore = defineStore('game', {
    state: (): Game => ({
      grid: {
        x: 5,
        y: 5
      },
      playerCount: 2,
      started: false,
      turn: null,
      winner: null
    }),
    actions: {
      setWinner(playerId: string | null) {
        this.winner = playerId;
      },
      startGame() {
        this.started = true;
      },
      resetGame() {
        this.started = false;
        this.turn = null;
        this.winner = null;
      },
      restartGame() {
        this.resetGame();
        this.startGame();
      },
      endGame() {
        this.started = false;
        this.turn = null;
      }
    }
  });
