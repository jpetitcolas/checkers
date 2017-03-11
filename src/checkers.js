export const EMPTY_CELL = 0;
export const PLAYER_1 = 1;
export const PLAYER_2 = 2;

export const createBoard = () => [
    [PLAYER_1, EMPTY_CELL, PLAYER_1, EMPTY_CELL, PLAYER_1, EMPTY_CELL, PLAYER_1, EMPTY_CELL],
    [EMPTY_CELL, PLAYER_1, EMPTY_CELL, PLAYER_1, EMPTY_CELL, PLAYER_1, EMPTY_CELL, PLAYER_1],
    [PLAYER_1, EMPTY_CELL, PLAYER_1, EMPTY_CELL, PLAYER_1, EMPTY_CELL, PLAYER_1, EMPTY_CELL],
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    [EMPTY_CELL, PLAYER_2, EMPTY_CELL, PLAYER_2, EMPTY_CELL, PLAYER_2, EMPTY_CELL, PLAYER_2],
    [PLAYER_2, EMPTY_CELL, PLAYER_2, EMPTY_CELL, PLAYER_2, EMPTY_CELL, PLAYER_2, EMPTY_CELL],
    [EMPTY_CELL, PLAYER_2, EMPTY_CELL, PLAYER_2, EMPTY_CELL, PLAYER_2, EMPTY_CELL, PLAYER_2],
];

const getCellValue = (board, x, y) => {
    if (x < 0 || y < 0 || x >= board.length || y >= board.length) {
        return null;
    }

    return board[x][y];
};

const getPostCapturePosition = (currentPlayer, board, x, y, direction) => {
    // do not capture our own men
    const capturedManColor = board[x + direction[0]][y + direction[1]];
    if (capturedManColor === currentPlayer) {
        return;
    }

    const postBattlePosition = [x + 2 * direction[0], y + 2 * direction[1]];
    const postCapturePosition = getCellValue(board, ...postBattlePosition);
    if (postCapturePosition === EMPTY_CELL) {
        return postBattlePosition;
    }
};

export const getPlayablePositions = (board, x, y) => {
    const playablePositions = [];

    [
        [x - 1, y - 1],
        [x + 1, y - 1],
        [x - 1, y + 1],
        [x + 1, y + 1],
    ].forEach(coordinates => {
        const adjacentValue = getCellValue(board, coordinates[0], coordinates[1]);

        // outside from board
        if (adjacentValue === null) {
            return;
        }

        // near diagnoal empty cell: that's playable!
        if (adjacentValue === EMPTY_CELL) {
            playablePositions.push([...coordinates]);
            return;
        }

        // ennemy spotted? let's check if we can engage battle!
        const postCapturePosition = getPostCapturePosition(
            board[x][y],
            board,
            x, y,
            [coordinates[0] - x, coordinates[1] - y],
        );

        if (postCapturePosition) {
            playablePositions.push(postCapturePosition);
        }
    });

    return playablePositions;
};
