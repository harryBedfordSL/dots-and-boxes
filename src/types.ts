export type PlayerId = string;

export interface Grid {
    x: number;
    y: number;
};

export interface Game {
    grid: Grid;
    turn: PlayerId | null;
    started: boolean;
    winner: PlayerId | null;
}

export interface Player {
    color: string;
    id: PlayerId;
    name: string;
    score: number;
}

export type Players = Record<PlayerId, Player>;