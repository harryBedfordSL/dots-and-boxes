import type { Player, Players } from '@/types';
import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';

export type PlayersStore = ReturnType<typeof usePlayersStore>;

const initialId = uuid();
const initialId2 = uuid();

const randomColor = (): string => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const usePlayersStore = defineStore('players', {
  state: (): { players: Players } => ({
    players: {
      [initialId]: {
        color: randomColor(),
        id: initialId,
        name: 'Player 1',
        score: 0
      },
      [initialId2]: {
        color: randomColor(),
        id: initialId2,
        name: 'Player 2',
        score: 0
      }
    }
  }),
  actions: {
    addPlayer() {
      const id = uuid();
      const numberOfPlayer = Object.keys(this.players).length;
      const newPlayer = {
        color: randomColor(),
        id,
        name: `Player ${numberOfPlayer + 1}`,
        score: 0
      };

      this.players[id] = newPlayer;
    },
    removePlayer() {
      const numberOfPlayer = Object.keys(this.players).length;
      const newPlayers = Object.entries(this.players)
        .slice(0, numberOfPlayer - 1)
        .reduce<Record<string, Player>>((result, curr) => {
          const [key, value] = curr;
          result[key] = value;
          return result;
        }, {});

      this.players = newPlayers;
    },
    updatePlayer(playerId: string, update: Partial<Player>) {
      this.players[playerId] = {
        ...this.players[playerId],
        ...update
      };
    },
    resetScores() {
      Object.keys(this.players).forEach((key) => {
        this.players[key].score = 0;
      });
    },
    incrementScore(playerId: string) {
      this.players[playerId].score++;
    }
  }
});
