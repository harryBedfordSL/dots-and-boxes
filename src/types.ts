export type PlayerId = string;

export interface Grid {
    x: number;
    y: number;
};

export interface Game {
    grid: Grid;
    playerCount: number;
    turn: PlayerId;
}

export interface Player {
    color: string;
    id: PlayerId;
    name: string;
    score: number;
}

export type Players = Record<PlayerId, Player>;