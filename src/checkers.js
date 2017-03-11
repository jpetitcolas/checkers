export const PLAYER_1 = 1;
export const PLAYER_2 = 2;

export const createBoard = () => [
    [PLAYER_1, null, PLAYER_1, null, PLAYER_1, null, PLAYER_1, null],
    [null, PLAYER_1, null, PLAYER_1, null, PLAYER_1, null, PLAYER_1],
    [PLAYER_1, null, PLAYER_1, null, PLAYER_1, null, PLAYER_1, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, PLAYER_2, null, PLAYER_2, null, PLAYER_2, null, PLAYER_2],
    [PLAYER_2, null, PLAYER_2, null, PLAYER_2, null, PLAYER_2, null],
    [null, PLAYER_2, null, PLAYER_2, null, PLAYER_2, null, PLAYER_2],
];

export const isPlayable = (x, y) => (x % 2 && y % 1);
