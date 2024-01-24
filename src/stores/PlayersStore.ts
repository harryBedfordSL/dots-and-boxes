import type { Player, Players } from '@/types';
import { defineStore } from 'pinia';

export type PlayersStore = ReturnType<typeof usePlayersStore>;

export const usePlayersStore = defineStore('players', {
  state: (): { players: Players } => ({
    players: {
      'player-1': {
        color: '#ff0000',
        id: 'player-1',
        name: 'Player 1',
        score: 0
      },
      'player-2': {
        color: '#0000ff',
        id: 'player-2',
        name: 'Player 2',
        score: 0
      }
    }
  }),
  actions: {
    addPlayer() {
      const newPlayerId = `player-${Object.keys(this.players).length + 1}`;
      const newPlayer = { color: 'red', id: newPlayerId, name: newPlayerId, score: 0 }
      
      this.players[newPlayerId] = newPlayer;
    },
    removePlayer() {
      const numberOfPlayer = Object.keys(this.players).length;
      const newPlayers = Object.entries(this.players).slice(0, numberOfPlayer - 1).reduce<Record<string, Player>>((result, curr) => {
        const [key, value] = curr;
        result[key] = value;
        return result;
      }, {});

      this.players = newPlayers;
    }
  }
});
