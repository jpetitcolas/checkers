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

    return board[y][x];
};

const getPostCapturePosition = (currentPlayer, board, x, y, direction) => {
    // do not capture our own men
    const capturedManColor = board[y + direction[1]][x + direction[0]];
    if (capturedManColor === currentPlayer) {
        return;
    }

    const postBattlePosition = [x + 2 * direction[0], y + 2 * direction[1]];
    const postCapturePosition = getCellValue(board, ...postBattlePosition);
    if (postCapturePosition === EMPTY_CELL) {
        return {
            capture: true,
            position: postBattlePosition,
        };
    }
};

export const getPlayablePositions = (board, forwardDirection, x, y) => {
    const playablePositions = [];

    [[x - 1, y + forwardDirection], [x + 1, y + forwardDirection]].forEach(coordinates => {
        const adjacentValue = getCellValue(board, coordinates[0], coordinates[1]);

        // outside from board
        if (adjacentValue === null) {
            return;
        }

        // // near diagnoal empty cell: that's playable!
        if (adjacentValue === EMPTY_CELL) {
            playablePositions.push({
                capture: false,
                position: [...coordinates],
            });
            return;
        }

        // ennemy spotted? let's check if we can engage battle!
        const postCapturePosition = getPostCapturePosition(
            board[y][x],
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

export const getAllPlayablePositions = (board, player) => {
    let playablePositions = [];

    const forwardDirection = player === PLAYER_1 ? 1 : -1;

    const length = board.length;
    for (const y = 0 ; y < length ; y++) {
        for (const x = 0 ; x < length ; x++) {
            if (getCellValue(board, x, y) !== player) {
                continue;
            }

            playablePositions = playablePositions.concat(getPlayablePositions(board, forwardDirection, x, y));
        }
    }

    const captureMoves = playablePositions.filter(pp => pp.capture);
    if (captureMoves.length) {
        return captureMoves.map(m => m.position);
    }

    return playablePositions.map(m => m.position);
};
